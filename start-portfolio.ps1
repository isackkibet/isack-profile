# Portfolio Startup Script

Write-Host "🚀 Starting Isack Kibet Portfolio..." -ForegroundColor Green
Write-Host ""

# Start MongoDB (if installed as service)
Write-Host "📦 Checking MongoDB..." -ForegroundColor Yellow
$mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
if ($mongoService) {
    if ($mongoService.Status -ne 'Running') {
        Write-Host "Starting MongoDB service..." -ForegroundColor Yellow
        Start-Service MongoDB
    }
    Write-Host "✅ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "⚠️  MongoDB service not found. Please start MongoDB manually." -ForegroundColor Red
}

Write-Host ""

# Start Backend
Write-Host "🔧 Starting Backend Server..." -ForegroundColor Yellow
$backendPath = "c:\Users\isack\isacc profile\portfolio-backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; npm run dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "🎨 Starting Frontend..." -ForegroundColor Yellow
$frontendPath = "c:\Users\isack\isacc profile\portfolio-frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm run dev"

Write-Host ""
Write-Host "✅ Portfolio is starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "📍 Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "📍 Admin:    http://localhost:5173/admin/login" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
