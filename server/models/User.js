import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

const UserSchema = new mongoose.Schema(
  {
    // Signup/Registration Details
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      index: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: { 
      type: String, 
      required: function() { return this.isRegistered; },
      minlength: 6,
      select: false // Don't return password by default
    },
    phone: { 
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    
    // User Information
    address: AddressSchema,
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other', ''], default: '' },
    
    // Account Status
    isRegistered: { type: Boolean, default: false }, // True if user signed up with password
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    
    // Registration Details
    registrationDate: { type: Date, default: Date.now },
    registrationSource: { type: String, enum: ['website', 'mobile', 'social'], default: 'website' },
    lastLoginDate: { type: Date },
    lastLoginIP: { type: String },
    
    // Preferences
    preferences: {
      newsletter: { type: Boolean, default: false },
      smsNotifications: { type: Boolean, default: true },
      emailNotifications: { type: Boolean, default: true },
    },
    
    // Additional Info
    profilePicture: { type: String },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  },
  { 
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ isActive: 1 });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for user's full name
UserSchema.virtual('fullName').get(function() {
  return this.name;
});

export default mongoose.model('User', UserSchema);




