#!/usr/bin/env node

// Cross-platform setup script for Figure Lunch
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🍽️  Setting up Figure Lunch...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js ${nodeVersion} detected`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js v16 or higher.');
  process.exit(1);
}

// Install backend dependencies
console.log('📦 Installing backend dependencies...');
try {
  execSync('npm install', { cwd: path.join(__dirname, 'backend'), stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

// Install frontend dependencies
console.log('📦 Installing frontend dependencies...');
try {
  execSync('npm install', { cwd: path.join(__dirname, 'frontend'), stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies');
  process.exit(1);
}

// Setup database
console.log('🗄️  Setting up database...');
try {
  execSync('node setup-sqlite.js', { cwd: path.join(__dirname, 'backend'), stdio: 'inherit' });
  console.log('✅ Database initialized with sample data');
} catch (error) {
  console.error('❌ Failed to setup database');
  process.exit(1);
}

console.log('\n🎉 Setup complete! You can now start the application:');
console.log('\nFor macOS/Linux:');
console.log('  ./start-dev.sh');
console.log('\nFor Windows:');
console.log('  start-dev.bat');
console.log('\nOr manually:');
console.log('  Backend: cd backend && npm run dev');
console.log('  Frontend: cd frontend && npm run dev');
