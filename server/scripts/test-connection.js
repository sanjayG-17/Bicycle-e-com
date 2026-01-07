/**
 * MongoDB Connection Test Script
 * Run this to test your MongoDB connection before starting the server
 * 
 * Usage: node scripts/test-connection.js
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/picasso';

console.log('\n🔍 Testing MongoDB Connection...\n');
console.log(`📍 Connection URI: ${MONGO_URI.replace(/\/\/.*@/, '//***:***@')}\n`);

const testConnection = async () => {
  try {
    const connectionOptions = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(MONGO_URI, connectionOptions);
    
    console.log('✅ MongoDB connection successful!');
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Ready State: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected'}\n`);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📦 Collections found: ${collections.length}`);
    if (collections.length > 0) {
      console.log(`   Collections: ${collections.map(c => c.name).join(', ')}`);
    }
    
    await mongoose.connection.close();
    console.log('\n✅ Connection test completed successfully!\n');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ MongoDB connection failed!\n');
    console.error(`Error: ${error.message}\n`);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('💡 Solution: MongoDB is not running locally.');
      console.error('   - Install MongoDB: https://www.mongodb.com/try/download/community');
      console.error('   - Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas\n');
    } else if (error.message.includes('authentication failed')) {
      console.error('💡 Solution: Check your MongoDB username and password in the connection string.\n');
    } else if (error.message.includes('timeout')) {
      console.error('💡 Solution: MongoDB server is not reachable.');
      console.error('   - Check if MongoDB is running');
      console.error('   - Check your network connection');
      console.error('   - If using Atlas, check IP whitelist settings\n');
    } else {
      console.error('💡 Troubleshooting:');
      console.error('   1. Verify MONGO_URI in server/.env file');
      console.error('   2. Check MongoDB service status');
      console.error('   3. Verify network connectivity\n');
    }
    
    process.exit(1);
  }
};

testConnection();

