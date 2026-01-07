import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';

const router = express.Router();

// Initialize Razorpay lazily to ensure env vars are loaded
const getRazorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials not configured. Please check server/.env file.');
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
};

// Create Razorpay order
router.post('/order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    
    if (!amount) {
      return res.status(400).json({ message: 'amount is required' });
    }

    // Check if Razorpay is configured
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay keys not configured');
      return res.status(500).json({ 
        message: 'Payment gateway not configured. Please check server configuration.',
        error: 'RAZORPAY_KEYS_MISSING'
      });
    }

    console.log('Creating Razorpay order:', { amount, currency, receipt });

    const rzp = getRazorpay();
    const order = await rzp.orders.create({ 
      amount, 
      currency, 
      receipt: receipt || `rcpt_${Date.now()}` 
    });
    
    console.log('Razorpay order created:', order.id);
    res.json(order);
  } catch (err) {
    console.error('Razorpay order creation error:', err);
    res.status(500).json({ 
      message: 'Failed to create payment order',
      error: err.message || 'Unknown error'
    });
  }
});

// Verify payment signature
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error('Missing payment verification details');
      return res.status(400).json({ 
        success: false,
        message: 'Missing payment details' 
      });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay secret key not configured');
      return res.status(500).json({ 
        success: false,
        message: 'Payment verification failed - server configuration error' 
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    console.log('Payment verification:', {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      isAuthentic
    });

    if (isAuthentic) {
      // Update order status to paid
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { 
          status: 'paid',
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature
        },
        { new: true }
      ).populate('user', 'name email phone address');

      if (!order) {
        console.error('Order not found for payment verification:', razorpay_order_id);
        return res.status(404).json({ 
          success: false,
          message: 'Order not found' 
        });
      }

      console.log('Payment verified successfully for order:', order._id);
      res.json({ 
        success: true, 
        message: 'Payment verified successfully',
        order 
      });
    } else {
      console.error('Payment signature verification failed');
      res.status(400).json({ 
        success: false, 
        message: 'Payment verification failed - invalid signature' 
      });
    }
  } catch (err) {
    console.error('Payment verification error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Payment verification error',
      error: err.message 
    });
  }
});

// Webhook handler for Razorpay events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const body = req.body;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: 'Invalid webhook signature' });
    }

    const event = JSON.parse(body);
    console.log('Webhook event:', event.event);

    // Handle different payment events
    switch (event.event) {
      case 'payment.captured':
        // Payment was successful
        const paymentData = event.payload.payment.entity;
        await Order.findOneAndUpdate(
          { razorpayOrderId: paymentData.order_id },
          { 
            status: 'paid',
            razorpayPaymentId: paymentData.id
          }
        );
        break;
      
      case 'payment.failed':
        // Payment failed
        const failedPayment = event.payload.payment.entity;
        await Order.findOneAndUpdate(
          { razorpayOrderId: failedPayment.order_id },
          { status: 'cancelled' }
        );
        break;
    }

    res.json({ status: 'success' });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ message: 'Webhook processing failed' });
  }
});

export default router;





