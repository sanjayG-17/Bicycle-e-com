# 🔧 MongoDB Troubleshooting Guide

## Quick Status Check

Run this command to check MongoDB status:
```powershell
cd server
npm run check:mongodb
```

This will check if MongoDB is running on ports 27017 and 27099.

---

## ✅ Check if MongoDB Is Running

### Method 1: Check Windows Service
```powershell
Get-Service -Name MongoDB*
```

**Expected Output:**
```
Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB Server
```

### Method 2: Check Process
```powershell
Get-Process -Name mongod
```

**Expected Output:**
```
Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName
-------  ------    -----      -----     ------     --  --- -----------
    123      45    12345     23456       1.23   1234   0 mongod
```

### Method 3: Check Port
```powershell
netstat -ano | findstr :27017
```

**Expected Output:**
```
TCP    0.0.0.0:27017          0.0.0.0:0              LISTENING       1234
```

---

## 🚀 Start MongoDB

### Option 1: Start Windows Service (Recommended)

**Check if service exists:**
```powershell
Get-Service -Name MongoDB*
```

**Start the service:**
```powershell
net start MongoDB
```

**Or use PowerShell (as Administrator):**
```powershell
Start-Service -Name MongoDB
```

**Or use the helper script:**
```powershell
cd server
.\scripts\start-mongodb.ps1
```

### Option 2: Start MongoDB Manually

**Default port (27017):**
```powershell
mongod --port 27017
```

**Custom port (e.g., 27099):**
```powershell
mongod --port 27099 --dbpath C:\data\db
```

**Note:** Make sure the data directory exists:
```powershell
# Create data directory if it doesn't exist
New-Item -ItemType Directory -Path C:\data\db -Force
```

### Option 3: Check MongoDB Configuration

**Find MongoDB config file:**
- Usually located at: `C:\Program Files\MongoDB\Server\<version>\bin\mongod.cfg`
- Or check: `C:\data\mongod.conf`

**Check port setting:**
```yaml
net:
  port: 27017
  bindIp: 127.0.0.1
```

**If using port 27099, update your `.env` file:**
```
MONGO_URI=mongodb://127.0.0.1:27099/picasso
```

---

## 🔍 Verify Port Configuration

### Test Network Connectivity

**Test port 27017:**
```powershell
Test-NetConnection -ComputerName localhost -Port 27017
```

**Test port 27099:**
```powershell
Test-NetConnection -ComputerName localhost -Port 27099
```

**Or use telnet:**
```powershell
telnet localhost 27017
```

**Expected:** Connection should succeed (you'll see a blank screen, press Ctrl+C to exit)

---

## 🐛 Common Issues & Solutions

### Issue 1: "ECONNREFUSED" or "Connection refused"

**Problem:** MongoDB is not running

**Solution:**
1. Start MongoDB service: `net start MongoDB`
2. Or start manually: `mongod --port 27017`
3. Verify it's running: `Get-Process -Name mongod`

---

### Issue 2: "Connection timeout"

**Problem:** MongoDB is starting or unreachable

**Solutions:**
1. Wait a few seconds and try again
2. Check if MongoDB is actually running
3. Check firewall settings
4. Verify the port number is correct

---

### Issue 3: Wrong Port Number

**Problem:** MongoDB is running on a different port

**Check what port MongoDB is using:**
```powershell
netstat -ano | findstr mongod
```

**Update your `.env` file:**
```
MONGO_URI=mongodb://127.0.0.1:27099/picasso
```

---

### Issue 4: Firewall Blocking Connection

**Problem:** Windows Firewall is blocking MongoDB

**Solution:**
1. Open Windows Defender Firewall
2. Click "Allow an app or feature"
3. Find MongoDB and enable it for Private/Public networks
4. Or temporarily disable firewall for testing

---

### Issue 5: MongoDB Not Installed

**Problem:** MongoDB is not installed on your system

**Solutions:**

**Option A: Install MongoDB Locally**
1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Edition
3. MongoDB service should start automatically

**Option B: Use MongoDB Atlas (Cloud - Recommended)**
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster
4. Get connection string
5. Update `.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/picasso
   ```

---

## 🧪 Test MongoDB Connection

### Using the Test Script
```powershell
cd server
npm run test:db
```

### Using MongoDB Shell
```powershell
mongosh --port 27017
```

**Or for custom port:**
```powershell
mongosh --port 27099
```

**Expected Output:**
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/?directConnection=true
Using MongoDB: ...
Using Mongosh: ...
```

---

## 📋 Quick Checklist

- [ ] MongoDB service is running (`Get-Service -Name MongoDB*`)
- [ ] MongoDB process is running (`Get-Process -Name mongod`)
- [ ] Port is accessible (`Test-NetConnection -ComputerName localhost -Port 27017`)
- [ ] `.env` file has correct `MONGO_URI`
- [ ] Firewall is not blocking MongoDB
- [ ] MongoDB configuration file has correct port

---

## 🎯 For Port 27099 Specifically

If you're using port 27099:

1. **Verify MongoDB is running on 27099:**
   ```powershell
   netstat -ano | findstr :27099
   ```

2. **Update server/.env:**
   ```
   MONGO_URI=mongodb://127.0.0.1:27099/picasso
   ```

3. **Test connection:**
   ```powershell
   cd server
   npm run check:mongodb 27099
   ```

4. **Start MongoDB on port 27099:**
   ```powershell
   mongod --port 27099 --dbpath C:\data\db
   ```

---

## 🚀 After MongoDB is Running

1. **Test connection:**
   ```powershell
   cd server
   npm run test:db
   ```

2. **Start server:**
   ```powershell
   npm run dev
   ```

3. **Check health:**
   Open: http://localhost:4000/health

   Should show:
   ```json
   {
     "status": "ok",
     "database": {
       "connected": true,
       "state": "connected",
       "name": "picasso"
     }
   }
   ```

---

## 📞 Still Having Issues?

1. Check MongoDB logs:
   - Windows: `C:\Program Files\MongoDB\Server\<version>\log\mongod.log`
   - Or check Event Viewer

2. Verify MongoDB installation:
   ```powershell
   mongod --version
   ```

3. Check if port is in use by another application:
   ```powershell
   netstat -ano | findstr :27017
   ```

4. Try MongoDB Atlas (cloud) as an alternative

---

**Need more help? Check the MongoDB documentation: https://docs.mongodb.com/manual/installation/**

