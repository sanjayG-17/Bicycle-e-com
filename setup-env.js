import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    const envContent = fs.readFileSync(envExamplePath, 'utf8');
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created frontend/.env file from env.example');
  } else {
    const defaultEnv = `# Razorpay Public Key (Test)
VITE_RAZORPAY_KEY_ID=rzp_test_RXA3SdfnERq9xX

# Backend API URL
VITE_API_URL=http://localhost:4000
`;
    fs.writeFileSync(envPath, defaultEnv);
    console.log('✅ Created frontend/.env file with default values');
  }
} else {
  console.log('ℹ️  frontend/.env already exists');
}

