/**
 * MongoDB Status Check Script
 * Checks if MongoDB is running and accessible on various ports
 * 
 * Usage: node scripts/check-mongodb.js [port]
 * Example: node scripts/check-mongodb.js 27099
 */

import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

const DEFAULT_PORTS = [27017, 27099];
const MONGO_URI = process.env.MONGO_URI;

// Get port from command line argument or use default ports
const customPort = process.argv[2] ? parseInt(process.argv[2]) : null;
const portsToCheck = customPort ? [customPort] : DEFAULT_PORTS;

console.log('\n🔍 MongoDB Status Check\n');
console.log('='.repeat(50));

/**
 * Check if MongoDB is accessible on a specific port
 */
const checkPort = async (port) => {
  const uri = `mongodb://127.0.0.1:${port}/test`;
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
      socketTimeoutMS: 3000,
    });
    
    const adminDb = mongoose.connection.db.admin();
    const serverStatus = await adminDb.serverStatus();
    
    console.log(`\n✅ Port ${port}: MongoDB is RUNNING`);
    console.log(`   Version: ${serverStatus.version || 'Unknown'}`);
    console.log(`   Uptime: ${Math.floor((serverStatus.uptime || 0) / 60)} minutes`);
    console.log(`   Connections: ${serverStatus.connections?.current || 'N/A'}`);
    
    // List databases
    const dbList = await adminDb.listDatabases();
    console.log(`   Databases: ${dbList.databases.length}`);
    if (dbList.databases.length > 0) {
      const dbNames = dbList.databases.map(db => db.name).join(', ');
      console.log(`   Names: ${dbNames}`);
    }
    
    await mongoose.connection.close();
    return { port, status: 'running', accessible: true };
  } catch (error) {
    if (error.message.includes('ECONNREFUSED')) {
      console.log(`\n❌ Port ${port}: MongoDB is NOT RUNNING (Connection refused)`);
    } else if (error.message.includes('timeout')) {
      console.log(`\n⏱️  Port ${port}: Connection timeout (Server may be starting or unreachable)`);
    } else {
      console.log(`\n❌ Port ${port}: Error - ${error.message}`);
    }
    // Make sure to close connection on error
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close().catch(() => {});
    }
    return { port, status: 'not_running', accessible: false, error: error.message };
  }
};

/**
 * Check MongoDB service status (Windows)
 */
const checkWindowsService = () => {
  console.log('\n📋 Windows Service Status:');
  console.log('   Run this command to check: Get-Service -Name MongoDB*');
  console.log('   Run this command to start: net start MongoDB');
};

/**
 * Check if mongod process is running
 */
const checkProcess = () => {
  console.log('\n📋 Process Status:');
  console.log('   Run this command to check: Get-Process -Name mongod');
  console.log('   Or check Task Manager for "mongod.exe"');
};

/**
 * Test network connectivity
 */
const testNetworkConnectivity = async (port) => {
  console.log(`\n🌐 Testing network connectivity on port ${port}...`);
  
  try {
    const net = await import('net');
    return new Promise((resolve) => {
      const socket = new net.Socket();
      const timeout = 2000;
      
      socket.setTimeout(timeout);
      
      socket.on('connect', () => {
        socket.destroy();
        console.log(`   ✅ Port ${port} is accessible`);
        resolve(true);
      });
      
      socket.on('timeout', () => {
        socket.destroy();
        console.log(`   ❌ Port ${port} is not accessible (timeout)`);
        resolve(false);
      });
      
      socket.on('error', (err) => {
        console.log(`   ❌ Port ${port} is not accessible: ${err.message}`);
        resolve(false);
      });
      
      socket.connect(port, '127.0.0.1');
    });
  } catch (error) {
    console.log(`   ⚠️  Could not test network connectivity: ${error.message}`);
    return false;
  }
};

/**
 * Main check function
 */
const main = async () => {
  console.log(`\nChecking ports: ${portsToCheck.join(', ')}`);
  if (MONGO_URI) {
    console.log(`Environment MONGO_URI: ${MONGO_URI.replace(/\/\/.*@/, '//***:***@')}`);
  }
  
  const results = [];
  
  for (const port of portsToCheck) {
    // First test network connectivity
    const networkAccessible = await testNetworkConnectivity(port);
    
    if (networkAccessible) {
      // If network is accessible, try MongoDB connection
      const result = await checkPort(port);
      results.push(result);
    } else {
      results.push({ port, status: 'not_accessible', accessible: false });
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('\n📊 Summary:');
  
  const runningPorts = results.filter(r => r.accessible);
  if (runningPorts.length > 0) {
    console.log(`\n✅ MongoDB is running on port(s): ${runningPorts.map(r => r.port).join(', ')}`);
    console.log(`\n💡 Update your server/.env file:`);
    runningPorts.forEach(r => {
      console.log(`   MONGO_URI=mongodb://127.0.0.1:${r.port}/picasso`);
    });
  } else {
    console.log(`\n❌ MongoDB is NOT running on any checked ports`);
    console.log(`\n💡 Solutions:`);
    console.log(`   1. Start MongoDB service: net start MongoDB`);
    console.log(`   2. Or start manually: mongod --port 27017`);
    console.log(`   3. Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas`);
    checkWindowsService();
    checkProcess();
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
};

main().catch(console.error);

