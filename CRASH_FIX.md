# 🔧 Frontend Crash Fix

## Common Causes & Quick Fixes:

### 1. Missing Environment Variables
**Fix:** Make sure `.env` file exists:
```
VITE_API_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=rzp_test_RXA3SdfnERq9xX
```

### 2. Syntax Error
**Fix:** Clear cache and reinstall:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 3. TypeScript Errors
**Fix:** Check terminal for specific errors

### 4. Port Already in Use
**Fix:** Change port or kill process using port 5173/8080

## Quick Diagnostic Steps:

1. **Check terminal output** - Look for red error messages
2. **Open browser console** (F12) - Check for JavaScript errors
3. **Verify .env file** - Must exist in `picasso-product-polish-main/.env`
4. **Clear browser cache** - Hard refresh (Ctrl+Shift+R)

## Reset Everything:

```bash
# Stop server (Ctrl+C)
# Then:
cd picasso-product-polish-main
rm -rf node_modules .vite dist
npm install
npm run dev
```

---

**Need specific error?** Share the exact error message from terminal!

