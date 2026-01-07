# 🛠️ Picasso E-commerce - Complete Tech Stack

## 📋 Project Overview
**Picasso Bikes** - A full-stack e-commerce application with integrated Razorpay payment gateway

---

## 🎨 Frontend Tech Stack

### Core Framework
- **React** `18.3.1` - UI library
- **TypeScript** `5.8.3` - Type-safe JavaScript
- **Vite** `5.4.19` - Build tool and dev server
- **React Router DOM** `6.30.1` - Client-side routing

### UI Framework & Styling
- **Tailwind CSS** `3.4.17` - Utility-first CSS framework
- **shadcn/ui** - Pre-built component library (via Radix UI)
- **Radix UI** - Unstyled, accessible component primitives
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog
  - Dropdown Menu, Hover Card, Label, Navigation Menu
  - Popover, Progress, Radio Group, Scroll Area, Select
  - Separator, Slider, Switch, Tabs, Toast, Tooltip, etc.
- **Tailwind CSS Animate** - Animation utilities
- **Tailwind Typography** - Typography plugin

### State Management & Data Fetching
- **React Context API** - Global state (Cart management)
- **TanStack React Query** `5.83.0` - Server state management
- **React Hook Form** `7.61.1` - Form handling
- **Zod** `3.25.76` - Schema validation
- **@hookform/resolvers** - Form validation resolvers

### UI Components & Icons
- **Lucide React** `0.462.0` - Icon library
- **Embla Carousel** `8.6.0` - Carousel component
- **Recharts** `2.15.4` - Chart library
- **Sonner** `1.7.4` - Toast notifications
- **date-fns** `3.6.0` - Date utility library
- **React Day Picker** `8.10.1` - Date picker component

### Utilities
- **clsx** `2.1.1` - Conditional classNames
- **tailwind-merge** `2.6.0` - Merge Tailwind classes
- **class-variance-authority** `0.7.1` - Component variants
- **cmdk** `1.1.1` - Command menu component
- **vaul** `0.9.9` - Drawer component
- **input-otp** `1.4.2` - OTP input component

### Development Tools
- **ESLint** `9.32.0` - Code linting
- **TypeScript ESLint** `8.38.0` - TypeScript linting
- **@vitejs/plugin-react-swc** `3.11.0` - Fast React refresh
- **Autoprefixer** `10.4.21` - CSS vendor prefixes
- **PostCSS** `8.5.6` - CSS processing

---

## ⚙️ Backend Tech Stack

### Core Framework
- **Node.js** - JavaScript runtime
- **Express.js** `4.19.2` - Web application framework
- **ES Modules** - Modern JavaScript modules

### Database
- **MongoDB** - NoSQL database
- **Mongoose** `8.6.0` - MongoDB object modeling

### Payment Gateway
- **Razorpay** `2.9.6` - Payment processing
  - QR Code payments
  - UPI integration
  - Card payments
  - Net Banking
  - Wallets

### Middleware & Utilities
- **CORS** `2.8.5` - Cross-Origin Resource Sharing
- **Morgan** `1.10.0` - HTTP request logger
- **dotenv** `16.4.5` - Environment variable management
- **crypto** (Node.js built-in) - Payment signature verification

### Development Tools
- **Nodemon** `3.1.7` - Auto-restart on file changes

---

## 🗄️ Database Schema

### Models
- **User Model** - Customer information, addresses
- **Order Model** - Orders with billing details, payment info

---

## 🔐 Environment & Configuration

### Backend (.env)
```
MONGO_URI - MongoDB connection string
PORT - Server port (4000)
RAZORPAY_KEY_ID - Razorpay API key
RAZORPAY_KEY_SECRET - Razorpay API secret
RAZORPAY_WEBHOOK_SECRET - Webhook signature verification
JWT_SECRET - Authentication token secret
```

### Frontend (.env)
```
VITE_API_URL - Backend API URL
VITE_RAZORPAY_KEY_ID - Razorpay public key
```

---

## 🏗️ Architecture

### Frontend Structure
```
picasso-product-polish-main/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route pages
│   ├── contexts/       # React Context (Cart)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── data/           # Static data (products)
│   └── assets/         # Images and static files
├── public/             # Public assets
└── dist/               # Build output
```

### Backend Structure
```
server/
├── routes/             # API route handlers
│   ├── users.js        # User management
│   ├── orders.js       # Order management
│   └── payments.js     # Payment processing
├── models/             # Database models
│   ├── User.js
│   └── Order.js
└── index.js            # Server entry point
```

---

## 🔌 API Endpoints

### User Management
- `POST /api/users` - Create/update user
- `GET /api/users/:email` - Get user by email

### Order Management
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id` - Update order

### Payment Processing
- `POST /api/payments/order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment signature
- `POST /api/payments/webhook` - Handle Razorpay webhooks

### Health Check
- `GET /health` - Server health check

---

## 🎯 Key Features

### Frontend Features
- ✅ Responsive design (Mobile-first)
- ✅ Shopping cart with Context API
- ✅ Product catalog with filtering
- ✅ Checkout flow with form validation
- ✅ Payment integration with Razorpay
- ✅ QR Code payment support
- ✅ Order receipt generation
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling

### Backend Features
- ✅ RESTful API
- ✅ MongoDB data persistence
- ✅ User management
- ✅ Order management
- ✅ Payment processing
- ✅ Payment verification
- ✅ Webhook handling
- ✅ Error handling & logging

---

## 📦 Package Managers
- **npm** - Node Package Manager

## 🚀 Build & Deploy
- **Vite** - Frontend build tool
- **Node.js** - Backend runtime
- **MongoDB** - Database (local or Atlas)

## 🔄 Development Workflow
1. **Frontend**: Vite dev server (HMR enabled)
2. **Backend**: Nodemon auto-restart
3. **Database**: MongoDB (local or cloud)

---

## 📊 Summary

**Frontend:**
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- React Router + React Query
- Razorpay Checkout integration

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- Razorpay SDK
- RESTful API

**Features:**
- Full e-commerce flow
- Payment gateway integration
- QR Code payments
- Order management
- Receipt generation

---

**Version:** 1.0.0  
**Last Updated:** 2025








