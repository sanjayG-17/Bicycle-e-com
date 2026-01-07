# 🔧 Fix: "Failed to fetch" Error

## ⚠️ This error means your frontend can't reach the backend!

## ✅ Quick Fix Steps:

### Step 1: Start Backend Server
```bash
cd server
npm run dev
```

**You should see:**
```
Connected to MongoDB
Server running on http://localhost:4000
```

### Step 2: Test Backend is Running
Open browser and go to:
- http://localhost:4000/health

**Should show:** `{"status":"ok"}`

### Step 3: Check Frontend .env File
Make sure `picasso-product-polish-main/.env` has:
```
VITE_API_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=rzp_test_RXA3SdfnERq9xX
```

### Step 4: Restart Frontend
After ensuring backend is running:
```bash
cd picasso-product-polish-main
npm run dev
```

## 🔍 Common Causes:

1. **Backend not running** → Start it!
2. **Wrong port** → Backend should be on port 4000
3. **MongoDB not running** → Backend can't start without MongoDB
4. **Wrong API URL** → Check `.env` file

## ✅ Verify Everything:

1. ✅ Backend terminal shows "Server running on http://localhost:4000"
2. ✅ http://localhost:4000/health works in browser
3. ✅ Frontend `.env` has correct `VITE_API_URL`
4. ✅ Frontend restarted after `.env` changes

---

**Still not working?** Check browser console (F12) for the exact error message!

