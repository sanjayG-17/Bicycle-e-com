import mongoose from 'mongoose';

/**
 * Shopping Cart Model
 * Stores user's cart items before checkout
 */
const CartItemSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    category: { type: String },
    addedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    items: { 
      type: [CartItemSchema], 
      default: [] 
    },
    subtotal: { type: Number, default: 0, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    shipping: { type: Number, default: 0, min: 0 },
    total: { type: Number, default: 0, min: 0 },
    lastUpdated: { type: Date, default: Date.now }
  },
  { 
    timestamps: true 
  }
);

// Calculate totals before saving
CartSchema.pre('save', function(next) {
  this.subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  this.tax = this.subtotal * 0.18; // 18% GST
  this.shipping = this.subtotal > 500 ? 0 : 50; // Free shipping above 500
  this.total = this.subtotal + this.tax + this.shipping;
  this.lastUpdated = new Date();
  next();
});

export default mongoose.model('Cart', CartSchema);


