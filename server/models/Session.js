import mongoose from 'mongoose';

/**
 * User Session Model
 * Tracks user login sessions and authentication tokens
 */
const SessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    refreshToken: {
      type: String,
      index: true
    },
    ipAddress: { type: String },
    userAgent: { type: String },
    device: {
      type: { type: String, enum: ['desktop', 'mobile', 'tablet', 'unknown'] },
      os: { type: String },
      browser: { type: String }
    },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date, required: true, index: true },
    lastActivity: { type: Date, default: Date.now },
  },
  { 
    timestamps: true 
  }
);

// Index for cleanup of expired sessions
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Session', SessionSchema);


