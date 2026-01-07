import mongoose from 'mongoose';

/**
 * MongoDB Connection Configuration
 * Handles connection, reconnection, and error management
 */

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/picasso';

// Connection options for better reliability
const connectionOptions = {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  maxPoolSize: 10, // Maintain up to 10 socket connections
  minPoolSize: 5, // Maintain at least 5 socket connections
  maxIdleTimeMS: 30000, // Close connections after 30s of inactivity
  retryWrites: true,
  w: 'majority',
};

// Connection state tracking
let isConnected = false;
let connectionAttempts = 0;
const MAX_RETRIES = 3;

/**
 * Connect to MongoDB with retry logic
 */
export const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('✅ MongoDB already connected');
    return;
  }

  try {
    connectionAttempts++;
    console.log(`🔄 Connecting to MongoDB... (Attempt ${connectionAttempts}/${MAX_RETRIES})`);
    
    await mongoose.connect(MONGO_URI, connectionOptions);
    
    isConnected = true;
    connectionAttempts = 0;
    console.log('✅ Connected to MongoDB successfully');
    
    // Set up connection event handlers
    setupConnectionHandlers();
    
  } catch (error) {
    console.error(`❌ MongoDB connection error (Attempt ${connectionAttempts}):`, error.message);
    
    if (connectionAttempts < MAX_RETRIES) {
      console.log(`⏳ Retrying connection in 3 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      return connectDB();
    } else {
      console.error('\n❌ Failed to connect to MongoDB after', MAX_RETRIES, 'attempts');
      console.error('\n📋 Troubleshooting steps:');
      console.error('1. If using local MongoDB: Make sure MongoDB is installed and running');
      console.error('   - Check: Get-Service -Name MongoDB*');
      console.error('   - Start: net start MongoDB');
      console.error('2. If using MongoDB Atlas: Check your connection string in .env');
      console.error('   - Format: mongodb+srv://username:password@cluster.mongodb.net/picasso');
      console.error('   - Make sure your IP is whitelisted in Atlas Network Access');
      console.error('3. Verify MONGO_URI in server/.env file');
      console.error(`   Current URI: ${MONGO_URI.replace(/\/\/.*@/, '//***:***@')}\n`);
      throw error;
    }
  }
};

/**
 * Setup MongoDB connection event handlers
 */
const setupConnectionHandlers = () => {
  mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB connection established');
    isConnected = true;
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message);
    isConnected = false;
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected');
    isConnected = false;
  });

  // Handle process termination
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });
};

/**
 * Check if MongoDB is connected
 */
export const isDBConnected = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

/**
 * Get MongoDB connection status
 */
export const getConnectionStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  
  return {
    state: states[mongoose.connection.readyState] || 'unknown',
    readyState: mongoose.connection.readyState,
    isConnected: isDBConnected(),
    host: mongoose.connection.host,
    name: mongoose.connection.name,
  };
};

export default connectDB;

