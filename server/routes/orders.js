import express from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';

const router = express.Router();

// Get order by id
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('user', 'name email phone address');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
});

// Create order
router.post('/', async (req, res) => {
  try {
    const { userEmail, items, subtotal, tax, shipping, total, billing } = req.body;
    if (!userEmail) return res.status(400).json({ message: 'userEmail is required' });
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'items are required' });

    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const order = await Order.create({
      user: user._id,
      items,
      billing: billing || {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      subtotal,
      tax,
      shipping,
      total,
      status: 'pending',
    });

    const populated = await order.populate('user', 'name email phone address');
    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Update order (e.g., attach Razorpay order id or status)
router.patch('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const update = req.body || {};

    const order = await Order.findByIdAndUpdate(orderId, update, { new: true }).populate('user', 'name email phone address');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update order' });
  }
});

export default router;


