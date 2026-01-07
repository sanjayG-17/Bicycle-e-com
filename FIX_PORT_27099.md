# 🔧 Fix: MongoDB Connection on Port 27099

## ❌ Current Error
```
connect ECONNREFUSED 127.0.0.1:27099
```

This means MongoDB is **not running** on port 27099.

---

## ✅ Solution: Start MongoDB on Port 27099

### Method 1: Use Helper Script (Easiest)

```powershell
cd server
.\scripts\start-mongodb-27099.ps1
```

This script will:
- ✅ Check if MongoDB is installed
- ✅ Create data directory if needed
- ✅ Start MongoDB on port 27099
- ✅ Verify it's running

---

### Method 2: Start Manually

**Step 1: Create data directory**
```powershell
New-Item -ItemType Directory -Path C:\data\db -Force
```

**Step 2: Start MongoDB on port 27099**
```powershell
mongod --port 27099 --dbpath C:\data\db
```

**Note:** Keep this terminal window open. MongoDB runs in the foreground.

**To run in background (PowerShell):**
```powershell
Start-Process mongod -ArgumentList "--port","27099","--dbpath","C:\data\db"
```

---

### Method 3: Update MongoDB Config File

If you want MongoDB service to always use port 27099:

1. **Find MongoDB config file:**
   - Usually: `C:\Program Files\MongoDB\Server\<version>\bin\mongod.cfg`
   - Or: `C:\data\mongod.conf`

2. **Edit the config file:**
   ```yaml
   net:
     port: 27099
     bindIp: 127.0.0.1
   ```

3. **Restart MongoDB service:**
   ```powershell
   net stop MongoDB
   net start MongoDB
   ```

---

## 🔧 Update Your .env File

After starting MongoDB on port 27099, update `server/.env`:

```
MONGO_URI=mongodb://127.0.0.1:27099/picasso
```

**Or if using MongoDB Atlas:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/picasso
```

---

## ✅ Verify MongoDB is Running

### Check Port
```powershell
netstat -ano | findstr :27099
```

**Expected Output:**
```
TCP    0.0.0.0:27099          0.0.0.0:0              LISTENING       <PID>
```

### Test Connection
```powershell
cd server
npm run check:mongodb 27099
```

**Expected Output:**
```
✅ Port 27099: MongoDB is RUNNING
```

### Test with MongoDB Shell
```powershell
mongosh --port 27099
```

---

## 🚀 After MongoDB is Running

1. **Test Connection:**
   ```powershell
   cd server
   npm run test:db
   ```

2. **Start Server:**
   ```powershell
   npm run dev
   ```

3. **Check Health:**
   Open: http://localhost:4000/health

---

## 🐛 Troubleshooting

### Error: "mongod: command not found"

**Solution:** MongoDB is not in your PATH or not installed.

1. **Find MongoDB installation:**
   ```powershell
   Get-ChildItem "C:\Program Files\MongoDB" -Recurse -Filter "mongod.exe"
   ```

2. **Add to PATH or use full path:**
   ```powershell
   "C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --port 27099 --dbpath C:\data\db
   ```

### Error: "Address already in use"

**Solution:** Port 27099 is already in use.

1. **Find what's using the port:**
   ```powershell
   netstat -ano | findstr :27099
   ```

2. **Kill the process (if needed):**
   ```powershell
   taskkill /PID <PID> /F
   ```

### Error: "Permission denied"

**Solution:** Run as Administrator.

```powershell
# Right-click PowerShell and select "Run as Administrator"
# Then run the start command
```

---

## 📋 Quick Checklist

- [ ] MongoDB is installed
- [ ] Data directory exists: `C:\data\db`
- [ ] MongoDB is running on port 27099
- [ ] Port 27099 is accessible: `Test-NetConnection -ComputerName localhost -Port 27099`
- [ ] `.env` file has: `MONGO_URI=mongodb://127.0.0.1:27099/picasso`
- [ ] Connection test passes: `npm run test:db`

---

## 🎯 Alternative: Use Default Port 27017

If you prefer to use the default port:

1. **Start MongoDB on default port:**
   ```powershell
   net start MongoDB
   ```

2. **Update `.env`:**
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/picasso
   ```

---

**Once MongoDB is running on port 27099, your connection error will be resolved! 🚀**

