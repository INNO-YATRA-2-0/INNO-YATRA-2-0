#!/bin/bash

# ISE Project Portal - Development Start Script

echo "🚀 Starting ISE Project Portal in development mode..."
echo ""

# Check if node_modules exist
if [ ! -d "backend/node_modules" ] || [ ! -d "frontend/node_modules" ]; then
    echo "❌ Dependencies not installed. Please run ./setup.sh first."
    exit 1
fi

# Check if .env exists
if [ ! -f "backend/.env" ]; then
    echo "❌ Backend .env file not found. Please configure your environment variables."
    echo "Copy backend/.env.example to backend/.env and update with your settings."
    exit 1
fi

echo "📦 Starting Backend Server..."
# Start backend in background
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

echo "🎨 Starting Frontend Server..."
# Start frontend in background
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Both servers are starting..."
echo ""
echo "🌐 Access the application at:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:5000"
echo ""
echo "📊 API Health Check: http://localhost:5000/api/health"
echo "🔐 Admin Login: http://localhost:5173/admin/login"
echo "🎓 Student Login: http://localhost:5173/student/login"
echo ""
echo "⚡ To initialize admin user:"
echo "   curl -X POST http://localhost:5000/api/auth/init-admin"
echo ""
echo "🛑 To stop both servers, press Ctrl+C"
echo ""

# Function to handle cleanup
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Trap Ctrl+C and call cleanup
trap cleanup SIGINT SIGTERM

# Wait for either process to exit
wait