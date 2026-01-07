# Picasso E-commerce Setup Instructions

## Backend Setup (MongoDB + Express + Razorpay)

1. **Install MongoDB** (if not already installed):
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas

2. **Configure Backend Environment**:
   ```bash
   cd server
   # Edit .env file with your Razorpay credentials:
   RAZORPAY_KEY_ID=rzp_test_your_actual_key_here
   RAZORPAY_KEY_SECRET=your_actual_secret_here
   MONGO_URI=mongodb://127.0.0.1:27017/picasso
   ```

3. **Start Backend Server**:
   ```bash
   cd server
   npm install
   npm run dev
   ```
   Server runs on: http://localhost:4000

## Frontend Setup (React + Vite)

1. **Configure Frontend Environment**:
   ```bash
   cd picasso-product-polish-main
   # Edit .env file with your Razorpay public key:
   VITE_RAZORPAY_KEY_ID=rzp_test_your_actual_key_here
   ```

2. **Start Frontend**:
   ```bash
   cd picasso-product-polish-main
   npm install
   npm run dev
   ```
   Frontend runs on: http://localhost:5173

## Razorpay Setup

1. **Create Razorpay Account**:
   - Go to: https://razorpay.com/
   - Sign up for a test account
   - Get your test API keys from Dashboard > Settings > API Keys

2. **Test Payment Flow**:
   - Add products to cart
   - Go to cart page
   - Click "Proceed to Checkout"
   - Use Razorpay test card: 4111 1111 1111 1111
   - Any future expiry date and any CVV

## Features Implemented

✅ **Frontend**:
- Product catalog with categories
- Shopping cart with add/remove functionality
- Auto-sliding hero carousel
- Responsive design with Tailwind CSS
- Cart page with quantity controls

✅ **Backend**:
- Express.js server with MongoDB
- User management (create/update users)
- Order management (create/fetch orders)
- Razorpay payment integration
- CORS enabled for frontend communication

✅ **Database Models**:
- User model with address support
- Order model with items, pricing, and status
- MongoDB connection with Mongoose

## API Endpoints

- `GET /health` - Health check
- `POST /api/users` - Create/update user
- `GET /api/users/:email` - Get user by email
- `POST /api/orders` - Create order
- `GET /api/orders/user/:email` - Get user orders
- `POST /api/payments/order` - Create Razorpay order

## Testing the Complete Flow

1. Start both servers (backend on 4000, frontend on 5173)
2. Open http://localhost:5173
3. Add products to cart
4. Go to cart page
5. Click "Proceed to Checkout"
6. Complete payment with test card
7. Order should be saved to MongoDB

## Troubleshooting

- **MongoDB Connection Error**: Ensure MongoDB is running locally or update MONGO_URI
- **Razorpay Error**: Check API keys are correct and environment variables are set
- **CORS Error**: Backend has CORS enabled for all origins
- **Payment Not Working**: Check browser console for errors and ensure Razorpay script loads














