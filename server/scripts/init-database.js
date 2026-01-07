/**
 * Database Initialization Script
 * Creates indexes and validates database setup
 * 
 * Usage: node scripts/init-database.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/picasso';

// Import models to register them
import User from '../models/User.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Session from '../models/Session.js';

const initDatabase = async () => {
  try {
    console.log('\n🔍 Initializing Database...\n');
    console.log(`📍 Connecting to: ${MONGO_URI.replace(/\/\/.*@/, '//***:***@')}\n`);

    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ Connected to MongoDB\n');

    // Get database instance
    const db = mongoose.connection.db;
    const adminDb = db.admin();

    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('📦 Existing Collections:');
    if (collections.length === 0) {
      console.log('   (No collections found - will be created on first use)\n');
    } else {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
      console.log('');
    }

    // Create indexes for all models
    console.log('🔧 Creating indexes...\n');

    // User indexes
    try {
      await User.collection.createIndexes([
        { key: { email: 1 }, unique: true, name: 'email_unique' },
        { key: { phone: 1 }, name: 'phone_index' },
        { key: { createdAt: -1 }, name: 'createdAt_index' },
        { key: { isActive: 1 }, name: 'isActive_index' }
      ]);
      console.log('✅ User indexes created');
    } catch (err) {
      console.log('⚠️  User indexes:', err.message);
    }

    // Order indexes
    try {
      await Order.collection.createIndexes([
        { key: { orderNumber: 1 }, unique: true, name: 'orderNumber_unique' },
        { key: { user: 1, createdAt: -1 }, name: 'user_createdAt_index' },
        { key: { userEmail: 1, createdAt: -1 }, name: 'userEmail_createdAt_index' },
        { key: { status: 1, createdAt: -1 }, name: 'status_createdAt_index' },
        { key: { razorpayOrderId: 1 }, name: 'razorpayOrderId_index' }
      ]);
      console.log('✅ Order indexes created');
    } catch (err) {
      console.log('⚠️  Order indexes:', err.message);
    }

    // Cart indexes
    try {
      await Cart.collection.createIndexes([
        { key: { user: 1 }, unique: true, name: 'user_unique' }
      ]);
      console.log('✅ Cart indexes created');
    } catch (err) {
      console.log('⚠️  Cart indexes:', err.message);
    }

    // Session indexes
    try {
      await Session.collection.createIndexes([
        { key: { token: 1 }, unique: true, name: 'token_unique' },
        { key: { user: 1 }, name: 'user_index' },
        { key: { expiresAt: 1 }, name: 'expiresAt_index' }
      ]);
      console.log('✅ Session indexes created');
    } catch (err) {
      console.log('⚠️  Session indexes:', err.message);
    }

    console.log('\n📊 Database Statistics:\n');

    // Get collection stats
    const stats = await db.stats();
    console.log(`   Database: ${db.databaseName}`);
    console.log(`   Collections: ${stats.collections}`);
    console.log(`   Data Size: ${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Storage Size: ${(stats.storageSize / 1024 / 1024).toFixed(2)} MB`);

    // Count documents in each collection
    console.log('\n📈 Document Counts:\n');
    const models = [
      { name: 'User', model: User },
      { name: 'Order', model: Order },
      { name: 'Cart', model: Cart },
      { name: 'Session', model: Session }
    ];

    for (const { name, model } of models) {
      try {
        const count = await model.countDocuments();
        console.log(`   ${name}: ${count} documents`);
      } catch (err) {
        console.log(`   ${name}: Error counting - ${err.message}`);
      }
    }

    console.log('\n✅ Database initialization completed!\n');
    console.log('📋 Available Collections:');
    console.log('   - users (User signup and information)');
    console.log('   - orders (Order details and history)');
    console.log('   - carts (Shopping cart items)');
    console.log('   - sessions (User login sessions)\n');

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Database initialization failed:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Make sure MongoDB is running');
    console.error('   2. Check MONGO_URI in server/.env');
    console.error('   3. Verify network connectivity\n');
    process.exit(1);
  }
};

initDatabase();


