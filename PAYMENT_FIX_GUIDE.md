# 🔧 Payment Failed - Troubleshooting Guide

## ✅ What I Fixed

1. **Enhanced Error Handling**: Added specific error messages for different failure scenarios
2. **Environment Validation**: Checks if API URL and Razorpay keys are configured before payment
3. **QR Code Configuration**: Optimized Razorpay options to show QR code prominently
4. **Better Logging**: Added detailed error logging to help debug issues

## 🚨 Common Issues & Solutions

### Issue 1: "Payment failed. Please try again"

**Check these:**

1. **Backend Server Running?**
   ```bash
   cd server
   npm run dev
   ```
   Should show: "Server running on http://localhost:4000"

2. **Environment Variables Set?**
   Check `picasso-product-polish-main/.env`:
   ```
   VITE_API_URL=http://localhost:4000
   VITE_RAZORPAY_KEY_ID=rzp_test_RXA3SdfnERq9xX
   ```
   
   Check `server/.env`:
   ```
   RAZORPAY_KEY_ID=rzp_test_RXA3SdfnERq9xX
   RAZORPAY_KEY_SECRET=029fn7db8kjHaLx7DNXuMHwT
   ```

3. **MongoDB Running?**
   - Start MongoDB service
   - Or use MongoDB Atlas (cloud)

4. **Check Browser Console (F12)**
   - Look for red error messages
   - Check Network tab for failed API calls

### Issue 2: QR Code Not Showing

**Solution:**
- Razorpay automatically shows QR code when UPI is enabled
- QR code appears in the payment modal
- Make sure you're using test mode keys
- The QR code is shown in the "UPI" section of the payment modal

### Issue 3: "Razorpay key not configured"

**Solution:**
1. Create `picasso-product-polish-main/.env` file:
   ```
   VITE_RAZORPAY_KEY_ID=rzp_test_RXA3SdfnERq9xX
   VITE_API_URL=http://localhost:4000
   ```

2. Restart frontend server (important!)

### Issue 4: "Could not connect to payment server"

**Solution:**
1. Make sure backend is running on port 4000
2. Check `VITE_API_URL` in frontend `.env` matches backend URL
3. Check CORS settings (already configured in backend)

## 🧪 Test Payment Flow

### Step-by-Step Test:

1. **Start Backend:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start Frontend (new terminal):**
   ```bash
   cd picasso-product-polish-main
   npm run dev
   ```

3. **Test Payment:**
   - Go to http://localhost:5173
   - Add items to cart
   - Fill checkout form
   - Click "Proceed to Payment"
   - **QR Code should appear in UPI section**
   - Use test card: `4111 1111 1111 1111`
   - Or scan QR with any UPI app

## 🔍 Debug Steps

### 1. Check Backend Logs
Look for errors in backend terminal:
- MongoDB connection issues
- Razorpay API errors
- Order creation failures

### 2. Check Frontend Console (F12)
Look for:
- Network errors (failed fetch requests)
- Razorpay script loading errors
- JavaScript errors

### 3. Verify API Endpoints

Test these URLs in browser:
- http://localhost:4000/health (should return `{"status":"ok"}`)
- http://localhost:4000/api/payments/order (should show error - needs POST)

### 4. Check Razorpay Keys
- Make sure keys match between frontend and backend
- Verify keys are from same Razorpay account
- Check if keys are test keys (start with `rzp_test_`)

## 💡 Quick Fixes

### Fix 1: Restart Everything
```bash
# Stop all servers (Ctrl+C)
# Then restart:
cd server && npm run dev
# New terminal:
cd picasso-product-polish-main && npm run dev
```

### Fix 2: Clear Browser Cache
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or clear browser cache

### Fix 3: Check Port Conflicts
- Backend should be on port 4000
- Frontend usually on port 5173
- Make sure no other apps using these ports

## 📞 Still Not Working?

Check these specific things:

1. **Browser Console Errors**: Share exact error message
2. **Backend Terminal**: Share any error messages
3. **Network Tab**: Check failed requests (status codes)
4. **Razorpay Dashboard**: Verify test keys are active

## ✅ Expected Behavior

When working correctly:
1. ✅ Checkout form validates all fields
2. ✅ "Proceed to Payment" button works
3. ✅ Razorpay modal opens
4. ✅ QR Code visible in UPI section
5. ✅ Can scan QR or use test card
6. ✅ Payment verification succeeds
7. ✅ Redirects to receipt page

---

**Need more help?** Check browser console and backend logs for specific error messages!

