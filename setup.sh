#!/bin/bash

# ISE Project Portal - Setup Script

echo "🚀 Setting up ISE Project Portal..."
echo "This script will install dependencies for both frontend and backend."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js $(node --version) found"
echo "✅ npm $(npm --version) found"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend

if [ ! -f "package.json" ]; then
    echo "❌ Backend package.json not found. Make sure you're in the correct directory."
    exit 1
fi

echo "Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Check if .env exists, if not copy from example
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo "📝 Creating .env file from example..."
        cp .env.example .env
        echo "⚠️  Please edit .env file with your MongoDB Atlas connection string"
    else
        echo "⚠️  Please create .env file with your configuration"
    fi
fi

cd ..

# Setup Frontend
echo ""
echo "🎨 Setting up Frontend..."
cd frontend

if [ ! -f "package.json" ]; then
    echo "❌ Frontend package.json not found. Make sure you're in the correct directory."
    exit 1
fi

echo "Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Configure your MongoDB Atlas database"
echo "2. Update backend/.env with your database connection string"
echo "3. Start the backend: cd backend && npm run dev"
echo "4. Start the frontend: cd frontend && npm run dev"
echo "5. Initialize admin user: curl -X POST http://localhost:5000/api/auth/init-admin"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:5000"
echo ""
echo "📖 For detailed instructions, see README.md"