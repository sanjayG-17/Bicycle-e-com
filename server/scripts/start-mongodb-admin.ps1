# Start MongoDB - Run as Administrator
# Right-click PowerShell and select "Run as Administrator", then run this script

Write-Host "`n🚀 Starting MongoDB...`n" -ForegroundColor Cyan

# Check if MongoDB service exists
$mongoService = Get-Service -Name MongoDB* -ErrorAction SilentlyContinue

if ($mongoService) {
    Write-Host "📋 Found MongoDB Service: $($mongoService.Name)" -ForegroundColor Yellow
    Write-Host "   Status: $($mongoService.Status)`n" -ForegroundColor Yellow
    
    if ($mongoService.Status -eq 'Running') {
        Write-Host "✅ MongoDB is already running!`n" -ForegroundColor Green
        exit 0
    }
    
    Write-Host "🔄 Starting MongoDB service...`n" -ForegroundColor Cyan
    try {
        Start-Service -Name $mongoService.Name -ErrorAction Stop
        Write-Host "✅ MongoDB service started successfully!`n" -ForegroundColor Green
        
        # Wait a moment for MongoDB to initialize
        Start-Sleep -Seconds 3
        
        # Verify it's running
        $test = Test-NetConnection -ComputerName localhost -Port 27017 -WarningAction SilentlyContinue
        if ($test.TcpTestSucceeded) {
            Write-Host "✅ MongoDB is accessible on port 27017!`n" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Service started but port 27017 not accessible yet. Wait a few seconds.`n" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ Failed to start MongoDB service: $_`n" -ForegroundColor Red
        Write-Host "💡 Make sure you're running as Administrator`n" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "❌ MongoDB service not found`n" -ForegroundColor Red
    Write-Host "💡 Options:`n" -ForegroundColor Yellow
    Write-Host "1. Install MongoDB: https://www.mongodb.com/try/download/community" -ForegroundColor White
    Write-Host "2. Use MongoDB Atlas (Cloud): https://www.mongodb.com/cloud/atlas`n" -ForegroundColor White
    exit 1
}

