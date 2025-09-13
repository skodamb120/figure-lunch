#!/bin/bash

# Start development servers for Figure Lunch app

echo "🍽️  Starting Figure Lunch Development Servers..."

# Function to kill background processes on exit
cleanup() {
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Set up cleanup on script exit
trap cleanup EXIT INT TERM

# Start backend
echo "🚀 Starting backend server on port 3000..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend server on port 5173..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "✅ Both servers are running!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:3000"
echo "🔌 WebSocket: ws://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait
