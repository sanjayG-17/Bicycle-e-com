import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    const envContent = fs.readFileSync(envExamplePath, 'utf8');
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created server/.env file from env.example');
  } else {
    const defaultEnv = `# MongoDB Configuration
MONGO_URI=mongodb://127.0.0.1:27017/picasso

# Server Configuration
PORT=4000

# Razorpay Configuration (Test keys from env.example)
RAZORPAY_KEY_ID=rzp_test_RXA3SdfnERq9xX
RAZORPAY_KEY_SECRET=029fn7db8kjHaLx7DNXuMHwT
RAZORPAY_WEBHOOK_SECRET=dev_webhook_secret

# JWT Secret (for future authentication)
JWT_SECRET=dev_jwt_secret
`;
    fs.writeFileSync(envPath, defaultEnv);
    console.log('✅ Created server/.env file with default values');
  }
} else {
  console.log('ℹ️  server/.env already exists');
}

