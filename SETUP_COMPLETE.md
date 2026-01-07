# 🚀 Picasso E-commerce - Complete Setup Guide

## ✅ Environment Setup Complete!

I've created setup scripts that will automatically configure your environment files.

## 📋 Quick Start (3 Steps)

### Step 1: Setup Backend Environment
```bash
cd server
node setup-env.js
npm install
npm run dev
```
✅ Backend will run on: http://localhost:4000

### Step 2: Setup Frontend Environment  
```bash
cd picasso-product-polish-main
node setup-env.js
npm install
npm run dev
```
✅ Frontend will run on: http://localhost:5173

### Step 3: Test Payment Flow
1. Open http://localhost:5173
2. Add products to cart
3. Go to Cart → Click "Proceed to Checkout"
4. Fill billing details
5. Click "Proceed to Payment"
6. **QR Code will appear automatically** - Scan with any UPI app
7. After payment → See receipt with all details!

## 🎯 What's Configured

### ✅ Backend (server/)
- ✅ MongoDB connection configured
- ✅ Razorpay integration ready
- ✅ Order management with billing details
- ✅ Payment verification system
- ✅ Webhook handler for automatic status updates

### ✅ Frontend (picasso-product-polish-main/)
- ✅ Razorpay Checkout integrated
- ✅ QR Code payment prioritized
- ✅ Complete billing form
- ✅ Receipt page with all details
- ✅ Print/Download bill feature

### ✅ Payment Features
- ✅ **QR Code**: Automatically shows when "Proceed to Payment" clicked
- ✅ **UPI**: Scan QR or enter UPI ID
- ✅ **Cards**: Credit/Debit card support
- ✅ **Net Banking**: All major banks
- ✅ **Wallets**: Paytm, PhonePe, etc.

## 🧪 Test Mode Configuration

Your Razorpay keys are configured in **TEST MODE**:
- **Key ID**: `rzp_test_RXA3SdfnERq9xX`
- **Key Secret**: `029fn7db8kjHaLx7DNXuMHwT`

### Test Payment Methods:
- **Card**: `4111 1111 1111 1111` (any future date, any CVV)
- **UPI**: Use `success@razorpay` for success simulation
- **QR Code**: Scan with any UPI app in test mode

## 📦 What Gets Saved in MongoDB

When you complete checkout, these details are saved:
- ✅ User information (name, email, phone)
- ✅ Full billing address
- ✅ Order items with quantities
- ✅ Subtotal, tax, shipping, total
- ✅ Razorpay Order ID
- ✅ Razorpay Payment ID
- ✅ Payment status

## 🧾 Receipt Features

After successful payment:
- ✅ Complete order details
- ✅ Billing address
- ✅ Itemized bill
- ✅ Tax breakdown
- ✅ Print/Download option

## 🔧 Troubleshooting

### If backend won't start:
```bash
cd server
npm install
# Make sure MongoDB is running
npm run dev
```

### If frontend won't start:
```bash
cd picasso-product-polish-main
npm install
npm run dev
```

### If payment fails:
1. Check browser console (F12) for errors
2. Verify both servers are running
3. Check .env files exist in both directories
4. Ensure MongoDB is running

## 📝 Environment Files Created

The setup scripts automatically create:
- `server/.env` - Backend configuration
- `picasso-product-polish-main/.env` - Frontend configuration

## 🎉 You're Ready!

Everything is configured and ready to go. Just run the commands above and start accepting payments!

---

**Need Help?** Check the detailed guide in `PAYMENT_SETUP_GUIDE.md`

