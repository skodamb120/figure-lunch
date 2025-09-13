@echo off
REM Start development servers for Figure Lunch app

echo 🍽️  Starting Figure Lunch Development Servers...

REM Start backend
echo 🚀 Starting backend server on port 3000...
cd backend
start "Backend Server" cmd /k "npm run dev"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo 🎨 Starting frontend server on port 5173...
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"

echo ✅ Both servers are starting!
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend API: http://localhost:3000
echo 🔌 WebSocket: ws://localhost:3000
echo.
echo Close the terminal windows to stop the servers
pause
