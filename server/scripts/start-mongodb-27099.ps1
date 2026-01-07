# Start MongoDB on Port 27099
# This script starts MongoDB on the custom port 27099

Write-Host "`n🚀 Starting MongoDB on Port 27099...`n" -ForegroundColor Cyan

# Check if MongoDB is already running on port 27099
$portCheck = Test-NetConnection -ComputerName localhost -Port 27099 -WarningAction SilentlyContinue
if ($portCheck.TcpTestSucceeded) {
    Write-Host "✅ MongoDB is already running on port 27099!`n" -ForegroundColor Green
    exit 0
}

# Check if data directory exists
$dataPath = "C:\data\db"
if (-not (Test-Path $dataPath)) {
    Write-Host "📁 Creating data directory: $dataPath`n" -ForegroundColor Yellow
    try {
        New-Item -ItemType Directory -Path $dataPath -Force | Out-Null
        Write-Host "✅ Data directory created`n" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to create data directory: $_`n" -ForegroundColor Red
        Write-Host "💡 Try running as Administrator`n" -ForegroundColor Yellow
        exit 1
    }
}

# Check if mongod.exe exists
$mongodPath = Get-Command mongod -ErrorAction SilentlyContinue
if (-not $mongodPath) {
    Write-Host "❌ MongoDB (mongod) not found in PATH`n" -ForegroundColor Red
    Write-Host "💡 MongoDB installation paths to check:`n" -ForegroundColor Yellow
    Write-Host "   C:\Program Files\MongoDB\Server\*\bin\mongod.exe" -ForegroundColor White
    Write-Host "   C:\mongodb\bin\mongod.exe`n" -ForegroundColor White
    
    # Try to find MongoDB in common locations
    $commonPaths = @(
        "C:\Program Files\MongoDB\Server\*\bin\mongod.exe",
        "C:\mongodb\bin\mongod.exe"
    )
    
    $foundPath = $null
    foreach ($path in $commonPaths) {
        $resolved = Resolve-Path $path -ErrorAction SilentlyContinue
        if ($resolved) {
            $foundPath = $resolved[0].Path
            break
        }
    }
    
    if ($foundPath) {
        Write-Host "✅ Found MongoDB at: $foundPath`n" -ForegroundColor Green
        $mongodExe = $foundPath
    } else {
        Write-Host "❌ Please install MongoDB or add it to your PATH`n" -ForegroundColor Red
        Write-Host "   Download: https://www.mongodb.com/try/download/community`n" -ForegroundColor Yellow
        exit 1
    }
} else {
    $mongodExe = $mongodPath.Source
    Write-Host "✅ Found MongoDB: $mongodExe`n" -ForegroundColor Green
}

# Start MongoDB on port 27099
Write-Host "🔄 Starting MongoDB on port 27099...`n" -ForegroundColor Cyan
Write-Host "   Data path: $dataPath" -ForegroundColor Gray
Write-Host "   Port: 27099`n" -ForegroundColor Gray

try {
    # Start MongoDB in background
    $process = Start-Process -FilePath $mongodExe -ArgumentList "--port","27099","--dbpath","$dataPath" -NoNewWindow -PassThru
    
    Write-Host "⏳ Waiting for MongoDB to start...`n" -ForegroundColor Yellow
    Start-Sleep -Seconds 3
    
    # Check if process is still running
    if (-not (Get-Process -Id $process.Id -ErrorAction SilentlyContinue)) {
        Write-Host "❌ MongoDB process exited immediately. Check for errors.`n" -ForegroundColor Red
        exit 1
    }
    
    # Test connection
    $maxAttempts = 10
    $attempt = 0
    $connected = $false
    
    while ($attempt -lt $maxAttempts -and -not $connected) {
        $test = Test-NetConnection -ComputerName localhost -Port 27099 -WarningAction SilentlyContinue
        if ($test.TcpTestSucceeded) {
            $connected = $true
        } else {
            $attempt++
            Start-Sleep -Seconds 1
        }
    }
    
    if ($connected) {
        Write-Host "✅ MongoDB is now running on port 27099!`n" -ForegroundColor Green
        Write-Host "   Process ID: $($process.Id)" -ForegroundColor Gray
        Write-Host "   Port: 27099" -ForegroundColor Gray
        Write-Host "   Data: $dataPath`n" -ForegroundColor Gray
        Write-Host "💡 Update your server/.env file:" -ForegroundColor Yellow
        Write-Host "   MONGO_URI=mongodb://127.0.0.1:27099/picasso`n" -ForegroundColor White
    } else {
        Write-Host "⚠️  MongoDB process started but port 27099 is not accessible yet.`n" -ForegroundColor Yellow
        Write-Host "   Process ID: $($process.Id)" -ForegroundColor Gray
        Write-Host "   Check MongoDB logs for errors.`n" -ForegroundColor Gray
    }
    
} catch {
    Write-Host "❌ Failed to start MongoDB: $_`n" -ForegroundColor Red
    Write-Host "💡 Try running as Administrator`n" -ForegroundColor Yellow
    exit 1
}

