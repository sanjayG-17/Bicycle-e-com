# 🔧 Connect to MongoDB - Step by Step Guide

## Current Status
MongoDB service is installed but **not running**. It needs administrator privileges to start.

---

## ✅ Quick Fix Options

### Option 1: Start MongoDB Service (As Administrator) ⭐ RECOMMENDED

**Step 1:** Open PowerShell as Administrator
- Right-click on PowerShell
- Select "Run as Administrator"

**Step 2:** Start MongoDB
```powershell
net start MongoDB
```

**Step 3:** Verify it's running
```powershell
Get-Service -Name MongoDB*
```

Should show: `Status: Running`

**Step 4:** Test connection
```powershell
cd C:\Users\sanja\Downloads\picasso-product-polish-main\server
npm run test:db
```

---

### Option 2: Use MongoDB Atlas (Cloud - Easiest) ⭐⭐

**No installation needed!**

1. **Create Free Account:**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up (100% free forever)

2. **Create Database:**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select cloud provider and region
   - Click "Create"

3. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/`

4. **Configure Network Access:**
   - Go to "Network Access" in Atlas
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)

5. **Update server/.env:**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/picasso?retryWrites=true&w=majority
   ```
   Replace `username` and `password` with your actual credentials.

6. **Test Connection:**
   ```powershell
   cd server
   npm run test:db
   ```

---

### Option 3: Start MongoDB Manually

**Step 1:** Find MongoDB installation
```powershell
Get-ChildItem "C:\Program Files\MongoDB" -Recurse -Filter "mongod.exe" | Select-Object FullName
```

**Step 2:** Create data directory
```powershell
New-Item -ItemType Directory -Path C:\data\db -Force
```

**Step 3:** Start MongoDB manually
```powershell
"C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --dbpath C:\data\db
```

Keep this terminal open while MongoDB runs.

---

## 🧪 Test Connection

After starting MongoDB, test the connection:

```powershell
cd C:\Users\sanja\Downloads\picasso-product-polish-main\server
npm run test:db
```

**Expected Output:**
```
✅ MongoDB connection successful!
   Host: 127.0.0.1
   Database: picasso
   Ready State: Connected
```

---

## 🚀 Start Server

Once MongoDB is connected:

```powershell
cd C:\Users\sanja\Downloads\picasso-product-polish-main\server
npm run dev
```

**Expected Output:**
```
✅ Connected to MongoDB successfully
✅ Server running on http://localhost:4000
```

---

## 🔍 Verify Everything Works

1. **Check Health Endpoint:**
   - Open: http://localhost:4000/health
   - Should show: `"database": { "connected": true }`

2. **Check Server Logs:**
   - Should see: `✅ Connected to MongoDB successfully`

---

## 🐛 Troubleshooting

### Error: "Cannot open MongoDB service"
**Solution:** Run PowerShell as Administrator

### Error: "Service does not exist"
**Solution:** MongoDB not installed. Use MongoDB Atlas instead.

### Error: "Port 27017 already in use"
**Solution:** 
```powershell
netstat -ano | findstr :27017
taskkill /PID <PID> /F
```

### Error: "Connection timeout"
**Solution:** 
- Check firewall settings
- Verify MongoDB is actually running
- Try MongoDB Atlas (cloud)

---

## 📋 Current Configuration

Your `server/.env` file:
```
MONGO_URI=mongodb://127.0.0.1:27017/picasso
PORT=4000
```

---

## ✅ Recommended: MongoDB Atlas

**Why use MongoDB Atlas?**
- ✅ No installation needed
- ✅ Works immediately
- ✅ Free forever tier
- ✅ No administrator privileges needed
- ✅ Accessible from anywhere
- ✅ Automatic backups

**Get started:** https://www.mongodb.com/cloud/atlas

---

**Choose the option that works best for you and follow the steps above! 🚀**

