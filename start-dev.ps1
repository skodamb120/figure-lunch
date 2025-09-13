# PowerShell script for starting development servers
# Run with: powershell -ExecutionPolicy Bypass -File start-dev.ps1

Write-Host "🍽️  Starting Figure Lunch Development Servers..." -ForegroundColor Green

# Function to cleanup processes
function Stop-DevServers {
    Write-Host "🛑 Stopping servers..." -ForegroundColor Yellow
    Get-Process | Where-Object {$_.ProcessName -eq "node" -and $_.CommandLine -like "*vite*"} | Stop-Process -Force -ErrorAction SilentlyContinue
    Get-Process | Where-Object {$_.ProcessName -eq "node" -and $_.CommandLine -like "*ts-node-dev*"} | Stop-Process -Force -ErrorAction SilentlyContinue
}

# Set up cleanup on script exit
Register-EngineEvent PowerShell.Exiting -Action { Stop-DevServers }

# Start backend
Write-Host "🚀 Starting backend server on port 3000..." -ForegroundColor Blue
Set-Location backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend
Write-Host "🎨 Starting frontend server on port 5173..." -ForegroundColor Blue
Set-Location ..\frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔧 Backend API: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔌 WebSocket: ws://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow

# Keep script running
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    Stop-DevServers
}
