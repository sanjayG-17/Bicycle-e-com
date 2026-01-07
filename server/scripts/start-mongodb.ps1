# MongoDB Start Helper Script for Windows
# This script helps you start MongoDB on Windows

Write-Host "`n🔍 Checking MongoDB Status...`n" -ForegroundColor Cyan

# Check if MongoDB service exists
$mongoService = Get-Service -Name MongoDB* -ErrorAction SilentlyContinue

if ($mongoService) {
    Write-Host "📋 Found MongoDB Service: $($mongoService.Name)" -ForegroundColor Yellow
    Write-Host "   Status: $($mongoService.Status)" -ForegroundColor Yellow
    
    if ($mongoService.Status -eq 'Running') {
        Write-Host "`n✅ MongoDB is already running!`n" -ForegroundColor Green
        exit 0
    } else {
        Write-Host "`n🔄 Starting MongoDB service...`n" -ForegroundColor Cyan
        try {
            Start-Service -Name $mongoService.Name
            Write-Host "✅ MongoDB service started successfully!`n" -ForegroundColor Green
            Write-Host "   Service: $($mongoService.Name)" -ForegroundColor Green
            Write-Host "   Status: Running`n" -ForegroundColor Green
        } catch {
            Write-Host "❌ Failed to start MongoDB service: $_`n" -ForegroundColor Red
            Write-Host "💡 Try running as Administrator or start manually:`n" -ForegroundColor Yellow
            Write-Host "   net start MongoDB`n" -ForegroundColor White
            exit 1
        }
    }
} else {
    Write-Host "⚠️  MongoDB service not found`n" -ForegroundColor Yellow
    Write-Host "💡 Options to start MongoDB:`n" -ForegroundColor Cyan
    
    Write-Host "Option 1: Start MongoDB service manually" -ForegroundColor White
    Write-Host "   Run as Administrator: net start MongoDB`n" -ForegroundColor Gray
    
    Write-Host "Option 2: Start MongoDB manually with custom port" -ForegroundColor White
    Write-Host "   mongod --port 27017 --dbpath C:\data\db`n" -ForegroundColor Gray
    Write-Host "   (Make sure C:\data\db directory exists)`n" -ForegroundColor Gray
    
    Write-Host "Option 3: Use MongoDB Atlas (Cloud - Recommended)" -ForegroundColor White
    Write-Host "   https://www.mongodb.com/cloud/atlas`n" -ForegroundColor Gray
    
    Write-Host "Option 4: Check if MongoDB is installed" -ForegroundColor White
    Write-Host "   Get-Process -Name mongod`n" -ForegroundColor Gray
    
    exit 1
}

# Verify MongoDB is accessible
Write-Host "🔍 Verifying MongoDB connection...`n" -ForegroundColor Cyan
Start-Sleep -Seconds 2

$testConnection = Test-NetConnection -ComputerName localhost -Port 27017 -WarningAction SilentlyContinue
if ($testConnection.TcpTestSucceeded) {
    Write-Host "✅ MongoDB is accessible on port 27017!`n" -ForegroundColor Green
} else {
    Write-Host "⚠️  MongoDB service is running but port 27017 is not accessible`n" -ForegroundColor Yellow
    Write-Host "   Check MongoDB configuration or firewall settings`n" -ForegroundColor Yellow
}

