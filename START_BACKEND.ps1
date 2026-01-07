# Backend Startup Script
Write-Host "🚀 Starting Backend Server..." -ForegroundColor Green
Write-Host ""

cd server

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

# Check if node_modules exists
if (-not (Test-Path node_modules)) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
    npm install
}

Write-Host "✅ Starting server on http://localhost:4000" -ForegroundColor Green
Write-Host ""
npm run dev


