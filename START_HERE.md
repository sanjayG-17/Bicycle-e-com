# 🚀 START HERE - Quick Setup

## ✅ Environment Files Ready!

Your `.env` files are already configured. Just run these commands:

## 🎯 3 Simple Steps to Start

### 1️⃣ Start Backend Server
```bash
cd server
npm install    # (only first time)
npm run dev
```
✅ Should show: "Server running on http://localhost:4000"

### 2️⃣ Start Frontend (in a NEW terminal)
```bash
cd picasso-product-polish-main
npm install    # (only first time)
npm run dev
```
✅ Should show: "Local: http://localhost:5173"

### 3️⃣ Test Payment
1. Open http://localhost:5173
2. Add items to cart
3. Click "Proceed to Checkout"
4. Fill billing details
5. Click **"Proceed to Payment"**
6. **QR Code appears automatically!** 📱
7. Scan with UPI app or use test card
8. See receipt with all details ✅

## ✅ What's Ready

- ✅ **Backend**: MongoDB + Express + Razorpay configured
- ✅ **Frontend**: React + Razorpay Checkout integrated
- ✅ **QR Code**: Shows automatically in payment modal
- ✅ **Receipt**: Complete bill with all details
- ✅ **Database**: All billing info saved to MongoDB

## 🧪 Test Payment Credentials

### Test Card:
- Number: `4111 1111 1111 1111`
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)

### Test UPI:
- Use `success@razorpay` for successful payment

## ⚠️ If Something Doesn't Work

1. **Backend won't start?**
   - Check if MongoDB is running
   - Verify `server/.env` exists

2. **Frontend won't start?**
   - Verify `picasso-product-polish-main/.env` exists
   - Run `npm install` again

3. **Payment fails?**
   - Open browser console (F12) for errors
   - Check both servers are running
   - Verify Razorpay keys in `.env` files

## 📦 All Files Configured

- ✅ `server/.env` - Backend config
- ✅ `picasso-product-polish-main/.env` - Frontend config
- ✅ Payment integration complete
- ✅ QR code feature ready
- ✅ Receipt page with billing details

## 🎉 You're All Set!

Everything is configured. Just start both servers and test the payment flow!

---

**Need more details?** See `SETUP_COMPLETE.md` or `PAYMENT_SETUP_GUIDE.md`

