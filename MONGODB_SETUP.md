# 🗄️ MongoDB Setup Guide

## ⚠️ Backend Can't Connect to MongoDB!

Your backend needs MongoDB to store data. Here are 3 ways to fix it:

## 🚀 Option 1: MongoDB Atlas (Cloud) - EASIEST & FREE

### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (free forever)
3. Create a new cluster (FREE tier)

### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster.mongodb.net/`

### Step 3: Update .env File
1. Open `server/.env`
2. Replace the MONGO_URI line with your connection string:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/picasso?retryWrites=true&w=majority
```
3. Replace `username` and `password` with your actual credentials

### Step 4: Restart Backend
```powershell
cd server
npm run dev
```

**Done! ✅**

---

## 🖥️ Option 2: Install MongoDB Locally

### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Download for Windows
3. Install MongoDB Community Edition

### Step 2: Start MongoDB Service
MongoDB usually starts automatically after installation.

### Step 3: Verify MongoDB is Running
```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB*
```

### Step 4: Restart Backend
```powershell
cd server
npm run dev
```

---

## 🐳 Option 3: Docker (Advanced)

If you have Docker:
```powershell
docker run -d -p 27017:27017 --name mongodb mongo
```

Then restart backend.

---

## ✅ Quick Test

After MongoDB is connected, test backend:
1. Open: http://localhost:4000/health
2. Should show: `{"status":"ok"}`

## 🔍 Check Backend Logs

Look at your backend terminal. You should see:
```
✅ Connected to MongoDB
✅ Server running on http://localhost:4000
```

If you see errors, check:
- MongoDB connection string is correct
- Username/password are correct (for Atlas)
- MongoDB service is running (for local)

---

## 💡 Recommended: Use MongoDB Atlas

**Why?**
- ✅ No installation needed
- ✅ Free forever
- ✅ Accessible from anywhere
- ✅ Easy to manage
- ✅ Automatic backups

**Try MongoDB Atlas** - Takes 5 minutes and works perfectly! 🚀

---

Need help? Check the MongoDB Atlas setup guide: https://docs.atlas.mongodb.com/getting-started/

