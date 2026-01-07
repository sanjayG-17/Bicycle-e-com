# Picasso E-commerce Payment Setup Guide

## 🚀 Quick Setup Instructions

### 1. Backend Setup (MongoDB + Express + Razorpay)

1. **Install MongoDB** (if not already installed):
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas

2. **Configure Backend Environment**:
   ```bash
   cd server
   # Copy the example environment file
   cp env.example .env
   # Edit .env file with your configuration:
   ```
   
   **Your .env file should contain:**
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/picasso
   PORT=4000
   RAZORPAY_KEY_ID=rzp_test_RXA3SdfnERq9xX
   RAZORPAY_KEY_SECRET=029fn7db8kjHaLx7DNXuMHwT
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
   JWT_SECRET=your_jwt_secret_here
   ```

3. **Start Backend Server**:
   ```bash
   cd server
   npm install
   npm run dev
   ```
   Server runs on: http://localhost:4000

### 2. Frontend Setup (React + Vite)

1. **Configure Frontend Environment**:
   ```bash
   cd picasso-product-polish-main
   # Copy the example environment file
   cp env.example .env
   # Edit .env file with your configuration:
   ```
   
   **Your .env file should contain:**
   ```
   VITE_RAZORPAY_KEY_ID=rzp_test_RXA3SdfnERq9xX
   VITE_API_URL=http://localhost:4000
   ```

2. **Start Frontend**:
   ```bash
   cd picasso-product-polish-main
   npm install
   npm run dev
   ```
   Frontend runs on: http://localhost:5173

## 💳 Payment Features Implemented

### ✅ **Complete Payment Flow**:
- **QR Code Generation**: Automatic QR code generation for UPI payments
- **UPI Integration**: Support for all UPI apps (PhonePe, Google Pay, Paytm, etc.)
- **Multiple Payment Methods**: Cards, Net Banking, Wallets, UPI
- **Payment Verification**: Secure signature verification
- **Order Management**: Complete order tracking and status updates

### ✅ **Frontend Features**:
- **Checkout Page**: Complete billing information form
- **Payment Options**: Visual indicators for UPI, QR code, and card payments
- **Order Summary**: Detailed breakdown with tax and shipping
- **Responsive Design**: Works on all devices
- **Error Handling**: User-friendly error messages

### ✅ **Backend Features**:
- **User Management**: Store customer details and addresses
- **Order Processing**: Create and track orders
- **Payment Integration**: Razorpay order creation and verification
- **Webhook Support**: Handle payment events automatically
- **Database Models**: User and Order schemas with relationships

## 🔧 API Endpoints

### User Management
- `POST /api/users` - Create/update user
- `GET /api/users/:email` - Get user by email

### Order Management
- `POST /api/orders` - Create order
- `GET /api/orders/user/:email` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id` - Update order with Razorpay order ID
- `PATCH /api/orders/:id/status` - Update order status

### Payment Processing
- `POST /api/payments/order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment signature
- `POST /api/payments/webhook` - Handle Razorpay webhooks

## 🧪 Testing the Payment Flow

### 1. **Test Payment Process**:
1. Start both servers (backend on 4000, frontend on 5173)
2. Open http://localhost:5173
3. Add products to cart
4. Go to cart page
5. Click "Proceed to Checkout"
6. Fill in billing information
7. Click "Proceed to Payment"

### 2. **Test Payment Methods**:
- **UPI**: Use any UPI app to scan QR code or enter UPI ID
- **Cards**: Use test card: 4111 1111 1111 1111 (any future expiry, any CVV)
- **Net Banking**: Select any test bank
- **Wallets**: Use test wallet options

### 3. **Test Scenarios**:
- ✅ Successful payment
- ✅ Payment cancellation
- ✅ Payment failure
- ✅ Order creation and tracking
- ✅ User data storage

## 🔐 Security Features

- **Payment Verification**: Cryptographic signature verification
- **Webhook Security**: Signature validation for webhook events
- **Data Validation**: Input validation on all forms
- **Error Handling**: Secure error messages without sensitive data exposure

## 📱 Mobile Support

The payment interface is fully responsive and works on:
- Mobile phones (iOS/Android)
- Tablets
- Desktop computers
- All modern browsers

## 🚨 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running locally
   - Check MONGO_URI in .env file
   - For Atlas: Update connection string

2. **Razorpay Integration Error**:
   - Verify API keys are correct
   - Check environment variables are loaded
   - Ensure Razorpay script loads properly

3. **Payment Not Working**:
   - Check browser console for errors
   - Verify Razorpay key is set correctly
   - Ensure backend is running on port 4000

4. **CORS Errors**:
   - Backend has CORS enabled for all origins
   - Check if backend is accessible from frontend

## 📞 Support

For issues with:
- **Razorpay**: Check Razorpay documentation
- **MongoDB**: Check MongoDB setup guide
- **React/Vite**: Check project dependencies

## 🎯 Next Steps

1. **Production Setup**:
   - Replace test API keys with live keys
   - Set up production MongoDB
   - Configure webhook URLs

2. **Additional Features**:
   - Email notifications
   - Order tracking
   - Inventory management
   - Admin dashboard

3. **Security Enhancements**:
   - JWT authentication
   - Rate limiting
   - Input sanitization
   - HTTPS enforcement


