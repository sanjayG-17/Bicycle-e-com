# 📊 Database Schemas - MongoDB Collections

## Overview

This document describes all MongoDB collections (tables) in the Picasso E-commerce application.

---

## 📦 Collections

### 1. **users** - User Signup and Information

Stores user registration details, profile information, and account status.

#### Fields:

**Signup/Registration:**
- `name` (String, required) - User's full name
- `email` (String, required, unique) - User's email address
- `password` (String, required if registered) - Hashed password
- `phone` (String) - Phone number (10 digits)
- `registrationDate` (Date) - When user signed up
- `registrationSource` (String) - 'website', 'mobile', or 'social'
- `isRegistered` (Boolean) - True if user signed up with password

**User Information:**
- `address` (Object) - Shipping/billing address
  - `line1`, `line2`, `city`, `state`, `postalCode`, `country`
- `dateOfBirth` (Date) - User's date of birth
- `gender` (String) - 'male', 'female', 'other', or ''
- `profilePicture` (String) - URL to profile picture

**Account Status:**
- `isEmailVerified` (Boolean) - Email verification status
- `isPhoneVerified` (Boolean) - Phone verification status
- `isActive` (Boolean) - Account active status
- `role` (String) - 'customer' or 'admin'

**Activity Tracking:**
- `lastLoginDate` (Date) - Last login timestamp
- `lastLoginIP` (String) - Last login IP address

**Preferences:**
- `preferences` (Object)
  - `newsletter` (Boolean) - Newsletter subscription
  - `smsNotifications` (Boolean) - SMS notifications
  - `emailNotifications` (Boolean) - Email notifications

**Timestamps:**
- `createdAt` (Date) - Account creation date
- `updatedAt` (Date) - Last update date

#### Indexes:
- `email` (unique)
- `phone`
- `createdAt`
- `isActive`

---

### 2. **orders** - Order Details and History

Stores complete order information including items, billing, shipping, and payment details.

#### Fields:

**Order Identification:**
- `orderNumber` (String, unique) - Auto-generated order number (e.g., "ORD-2024-001234")
- `user` (ObjectId, ref: User) - Reference to user
- `userEmail` (String) - User's email

**Order Items:**
- `items` (Array) - Array of order items
  - `productId` (Number) - Product ID
  - `name` (String) - Product name
  - `price` (Number) - Unit price
  - `quantity` (Number) - Quantity ordered
  - `image` (String) - Product image URL
  - `category` (String) - Product category
  - `sku` (String) - Stock Keeping Unit
  - `total` (Number) - price * quantity

**Pricing:**
- `subtotal` (Number) - Subtotal before tax
- `tax` (Number) - Tax amount
- `taxRate` (Number) - Tax rate (default: 0.18 = 18%)
- `discount` (Number) - Discount amount
- `discountCode` (String) - Discount code used
- `shipping` (Number) - Shipping cost
- `total` (Number) - Final total amount
- `currency` (String) - Currency code (default: 'INR')

**Billing Information:**
- `billing` (Object)
  - `name`, `email`, `phone`
  - `address` (Object) - Billing address
  - `gstin` (String) - GST Identification Number

**Shipping Information:**
- `shipping` (Object)
  - `method` (String) - 'standard', 'express', 'overnight'
  - `carrier` (String) - Shipping carrier
  - `trackingNumber` (String) - Tracking number
  - `estimatedDelivery` (Date) - Estimated delivery date
  - `actualDelivery` (Date) - Actual delivery date
  - `shippingAddress` (Object) - Shipping address

**Order Status:**
- `status` (String) - Order status
  - 'pending', 'confirmed', 'processing', 'paid', 'shipped', 
    'out_for_delivery', 'delivered', 'cancelled', 'refunded'
- `statusHistory` (Array) - History of status changes
  - `status` (String) - Status value
  - `timestamp` (Date) - When status changed
  - `note` (String) - Optional note

**Payment Information:**
- `paymentMethod` (String) - 'razorpay', 'cod', 'wallet', 'card', 'upi', 'netbanking'
- `paymentStatus` (String) - 'pending', 'processing', 'completed', 'failed', 'refunded'
- `razorpayOrderId` (String) - Razorpay order ID
- `razorpayPaymentId` (String) - Razorpay payment ID
- `razorpaySignature` (String) - Payment signature
- `paymentDate` (Date) - Payment completion date

**Additional Details:**
- `notes` (String) - Customer notes
- `internalNotes` (String) - Admin/internal notes
- `cancellationReason` (String) - Reason for cancellation
- `refundAmount` (Number) - Refund amount
- `refundDate` (Date) - Refund date

**Timestamps:**
- `createdAt` (Date) - Order creation date
- `updatedAt` (Date) - Last update date
- `confirmedAt` (Date) - Order confirmation date
- `shippedAt` (Date) - Shipping date
- `deliveredAt` (Date) - Delivery date
- `cancelledAt` (Date) - Cancellation date

#### Indexes:
- `orderNumber` (unique)
- `user` + `createdAt`
- `userEmail` + `createdAt`
- `status` + `createdAt`
- `razorpayOrderId`

---

### 3. **carts** - Shopping Cart

Stores user's shopping cart items before checkout.

#### Fields:

**Cart Identification:**
- `user` (ObjectId, ref: User, unique) - Reference to user

**Cart Items:**
- `items` (Array) - Array of cart items
  - `productId` (Number) - Product ID
  - `name` (String) - Product name
  - `price` (Number) - Unit price
  - `quantity` (Number) - Quantity
  - `image` (String) - Product image URL
  - `category` (String) - Product category
  - `addedAt` (Date) - When item was added

**Cart Totals:**
- `subtotal` (Number) - Subtotal (auto-calculated)
- `tax` (Number) - Tax amount (auto-calculated)
- `shipping` (Number) - Shipping cost (auto-calculated)
- `total` (Number) - Total amount (auto-calculated)
- `lastUpdated` (Date) - Last update timestamp

**Timestamps:**
- `createdAt` (Date) - Cart creation date
- `updatedAt` (Date) - Last update date

#### Indexes:
- `user` (unique)

---

### 4. **sessions** - User Login Sessions

Tracks user authentication sessions and tokens.

#### Fields:

**Session Identification:**
- `user` (ObjectId, ref: User) - Reference to user
- `token` (String, unique) - Authentication token
- `refreshToken` (String) - Refresh token

**Session Details:**
- `ipAddress` (String) - IP address
- `userAgent` (String) - User agent string
- `device` (Object)
  - `type` (String) - 'desktop', 'mobile', 'tablet', 'unknown'
  - `os` (String) - Operating system
  - `browser` (String) - Browser name

**Session Status:**
- `isActive` (Boolean) - Session active status
- `expiresAt` (Date) - Session expiration date
- `lastActivity` (Date) - Last activity timestamp

**Timestamps:**
- `createdAt` (Date) - Session creation date
- `updatedAt` (Date) - Last update date

#### Indexes:
- `token` (unique)
- `user`
- `expiresAt` (TTL index for auto-cleanup)

---

## 🔧 Database Initialization

Run the initialization script to create indexes and validate setup:

```powershell
cd server
npm run init:db
```

This will:
- ✅ Create all necessary indexes
- ✅ Validate database connection
- ✅ Show collection statistics
- ✅ Display document counts

---

## 📊 Collection Relationships

```
users (1) ────< (many) orders
users (1) ────< (1) carts
users (1) ────< (many) sessions
```

---

## 🔍 Query Examples

### Get user with orders
```javascript
const user = await User.findById(userId).populate('orders');
```

### Get user's order history
```javascript
const orders = await Order.find({ user: userId })
  .sort({ createdAt: -1 })
  .limit(10);
```

### Get user's cart
```javascript
const cart = await Cart.findOne({ user: userId })
  .populate('user');
```

---

## ✅ All Collections Ready!

Your MongoDB database now has complete schemas for:
- ✅ User signup and registration
- ✅ User profile information
- ✅ Order details and history
- ✅ Shopping cart
- ✅ User sessions

**Everything is set up and ready to use! 🚀**


