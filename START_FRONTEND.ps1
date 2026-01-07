# Frontend Startup Script
Write-Host "🚀 Starting Frontend Server..." -ForegroundColor Green
Write-Host ""

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "⚠️  .env file not found. Creating from env.example..." -ForegroundColor Yellow
    if (Test-Path env.example) {
        Copy-Item env.example .env
        Write-Host "✅ Created .env file" -ForegroundColor Green
    } else {
        Write-Host "❌ env.example not found!" -ForegroundColor Red
        exit 1
    }
}

# Verify .env has required variables
$envContent = Get-Content .env -Raw
if (-not ($envContent -match "VITE_API_URL")) {
    Write-Host "⚠️  Adding VITE_API_URL to .env..." -ForegroundColor Yellow
    Add-Content .env "`nVITE_API_URL=http://localhost:4000"
}

if (-not ($envContent -match "VITE_RAZORPAY_KEY_ID")) {
    Write-Host "⚠️  Adding VITE_RAZORPAY_KEY_ID to .env..." -ForegroundColor Yellow
    Add-Content .env "`nVITE_RAZORPAY_KEY_ID=rzp_test_RXA3SdfnERq9xX"
}

# Check if node_modules exists
if (-not (Test-Path node_modules)) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
    npm install
}

Write-Host "✅ Starting frontend on http://localhost:5173" -ForegroundColor Green
Write-Host ""
npm run dev


