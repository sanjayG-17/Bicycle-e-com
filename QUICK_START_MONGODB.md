# ⚡ Quick Start - MongoDB Connection

## 🔍 Step 1: Check MongoDB Status

```powershell
cd server
npm run check:mongodb
```

This checks if MongoDB is running on ports 27017 and 27099.

---

## 🚀 Step 2: Start MongoDB (if not running)

### Quick Start Options:

**Option A: Start Windows Service**
```powershell
net start MongoDB
```

**Option B: Use Helper Script**
```powershell
cd server
.\scripts\start-mongodb.ps1
```

**Option C: Start Manually**
```powershell
# Default port 27017
mongod --port 27017

# Or custom port 27099
mongod --port 27099 --dbpath C:\data\db
```

**Option D: Use MongoDB Atlas (Cloud)**
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Get connection string
4. Update `server/.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/picasso
   ```

---

## ✅ Step 3: Verify Connection

```powershell
cd server
npm run test:db
```

**Expected Output:**
```
✅ MongoDB connection successful!
   Host: 127.0.0.1 (or cluster.mongodb.net)
   Database: picasso
   Ready State: Connected
```

---

## 🎯 Step 4: Start Server

```powershell
cd server
npm run dev
```

**Expected Output:**
```
✅ Connected to MongoDB successfully
✅ Server running on http://localhost:4000
```

---

## 🔧 For Port 27099

If you're using port 27099:

1. **Update `server/.env`:**
   ```
   MONGO_URI=mongodb://127.0.0.1:27099/picasso
   ```

2. **Start MongoDB on port 27099:**
   ```powershell
   mongod --port 27099 --dbpath C:\data\db
   ```

3. **Test connection:**
   ```powershell
   cd server
   npm run check:mongodb 27099
   ```

---

## 📋 Common Commands

| Command | Purpose |
|---------|---------|
| `npm run check:mongodb` | Check if MongoDB is running |
| `npm run test:db` | Test MongoDB connection |
| `npm run dev` | Start server |
| `Get-Service -Name MongoDB*` | Check MongoDB service status |
| `net start MongoDB` | Start MongoDB service |
| `Get-Process -Name mongod` | Check if MongoDB process is running |

---

## 🐛 Quick Troubleshooting

**MongoDB not running?**
```powershell
net start MongoDB
```

**Wrong port?**
- Check: `netstat -ano | findstr :27017`
- Update `.env` with correct port

**Connection timeout?**
- Check firewall settings
- Verify MongoDB is actually running
- Try MongoDB Atlas (cloud)

**Need more help?**
- See: `MONGODB_TROUBLESHOOTING.md`
- See: `MONGODB_CONNECTION_READY.md`

---

**That's it! Your MongoDB connection is ready! 🚀**

