# 🔧 Backend Server Fix

## ✅ Fixed Your Backend .env File!

Updated with correct Razorpay keys:
- ✅ `RAZORPAY_KEY_ID=rzp_test_RXA3SdfnERq9xX`
- ✅ `RAZORPAY_KEY_SECRET=029fn7db8kjHaLx7DNXuMHwT`
- ✅ `RAZORPAY_WEBHOOK_SECRET=dev_webhook_secret`

## 🚀 Start Backend Now:

### Method 1: Using PowerShell
```powershell
cd server
npm run dev
```

### Method 2: Check if Already Running
The backend might already be starting in background. Wait 10 seconds and check:
- Open: http://localhost:4000/health
- Should show: `{"status":"ok"}`

## ⚠️ If You See "MongoDB Connection Error":

### Option 1: Install MongoDB Locally
1. Download: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Restart backend server

### Option 2: Use MongoDB Atlas (Cloud) - RECOMMENDED
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account and database
3. Get connection string
4. Update `server/.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/picasso
```

## ✅ Check Backend is Working:

Open in browser: http://localhost:4000/health

**Should show:**
```json
{"status":"ok"}
```

If you see this, backend is working! ✅

## 🔍 Common Errors:

### Error: "Cannot find module"
**Fix:** Run `npm install` in server folder

### Error: "Port 4000 already in use"
**Fix:** 
```powershell
# Find and kill process
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### Error: "Mongo connection error"
**Fix:** Install MongoDB or use MongoDB Atlas

## 📋 Current Configuration:

Your `server/.env` file now has:
```
MONGO_URI=mongodb://127.0.0.1:27017/picasso
PORT=4000
RAZORPAY_KEY_ID=rzp_test_RXA3SdfnERq9xX
RAZORPAY_KEY_SECRET=029fn7db8kjHaLx7DNXuMHwT
RAZORPAY_WEBHOOK_SECRET=dev_webhook_secret
JWT_SECRET=dev_jwt_secret
```

## ✅ Next Step:

Once backend shows "Server running on http://localhost:4000", start frontend:

```powershell
# New Terminal
cd picasso-product-polish-main
npm run dev
```

---

**Backend should be starting now. Check: http://localhost:4000/health**

