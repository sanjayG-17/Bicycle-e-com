import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true, index: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    category: { type: String },
    sku: { type: String }, // Stock Keeping Unit
    total: { type: Number }, // price * quantity
  },
  { _id: false }
);

const AddressSchema = new mongoose.Schema(
  {
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: 'India' },
  },
  { _id: false }
);

const ShippingSchema = new mongoose.Schema(
  {
    method: { type: String, enum: ['standard', 'express', 'overnight'], default: 'standard' },
    carrier: { type: String }, // e.g., 'FedEx', 'DHL', 'India Post'
    trackingNumber: { type: String },
    estimatedDelivery: { type: Date },
    actualDelivery: { type: Date },
    shippingAddress: AddressSchema,
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    // Order Identification
    orderNumber: { 
      type: String, 
      unique: true, 
      index: true,
      required: true 
    }, // e.g., "ORD-2024-001234"
    
    // User Reference
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      index: true
    },
    userEmail: { type: String, required: true, index: true },
    
    // Order Items
    items: { 
      type: [OrderItemSchema], 
      required: true,
      validate: {
        validator: function(v) { return v && v.length > 0; },
        message: 'Order must have at least one item'
      }
    },
    
    // Pricing Details
    subtotal: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0, default: 0 },
    taxRate: { type: Number, default: 0.18 }, // 18% GST
    discount: { type: Number, default: 0, min: 0 },
    discountCode: { type: String },
    shipping: { type: Number, required: true, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'INR' },
    
    // Billing Information
    billing: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: AddressSchema,
      gstin: { type: String }, // GST Identification Number
    },
    
    // Shipping Information
    shipping: ShippingSchema,
    
    // Order Status
    status: { 
      type: String, 
      enum: ['pending', 'confirmed', 'processing', 'paid', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'refunded'], 
      default: 'pending',
      index: true
    },
    statusHistory: [{
      status: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      note: { type: String }
    }],
    
    // Payment Information
    paymentMethod: { 
      type: String, 
      enum: ['razorpay', 'cod', 'wallet', 'card', 'upi', 'netbanking'],
      default: 'razorpay'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    razorpayOrderId: { type: String, index: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    paymentDate: { type: Date },
    
    // Additional Order Details
    notes: { type: String }, // Customer notes
    internalNotes: { type: String }, // Admin/internal notes
    cancellationReason: { type: String },
    refundAmount: { type: Number, default: 0 },
    refundDate: { type: Date },
    
    // Timestamps
    confirmedAt: { type: Date },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },
    cancelledAt: { type: Date },
  },
  { 
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ userEmail: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ razorpayOrderId: 1 });

// Generate order number before saving
OrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    const year = new Date().getFullYear();
    const orderNum = String(count + 1).padStart(6, '0');
    this.orderNumber = `ORD-${year}-${orderNum}`;
  }
  
  // Update status history
  if (this.isModified('status')) {
    if (!this.statusHistory) {
      this.statusHistory = [];
    }
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date()
    });
  }
  
  next();
});

// Virtual for order total items count
OrderSchema.virtual('totalItems').get(function() {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

export default mongoose.model('Order', OrderSchema);




