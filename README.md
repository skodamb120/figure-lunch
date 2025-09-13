# Figure Lunch 🍽️

A modern lunch voting application that helps teams decide where to eat! Built with a Node.js/Express backend and React frontend with real-time updates.

## Features

- 🗳️ **Vote on Restaurants**: Rate restaurants with a 5-star system
- 📊 **Real-time Updates**: See vote counts and ratings update live via WebSocket
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development

## Tech Stack

### Backend
- **Node.js** with **Express**
- **TypeScript** for type safety
- **SQLite** with **Knex.js** for database operations
- **WebSocket** for real-time communication
- **Event-driven architecture** with EventEmitter

### Frontend
- **React 19** with **TypeScript**
- **Vite** for fast development and building
- **Custom CSS** for styling (no external dependencies)
- **Axios** for API communication
- **Custom hooks** for WebSocket and data management

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Git

### Option 1: Use the development script (Recommended)

**For macOS/Linux:**
```bash
# Make the script executable (if not already)
chmod +x start-dev.sh

# Start both backend and frontend
./start-dev.sh
```

**For Windows:**
```cmd
# Option A: Batch file
start-dev.bat

# Option B: PowerShell (recommended)
powershell -ExecutionPolicy Bypass -File start-dev.ps1
```

### Option 2: Manual setup

1. **Clone and setup:**
```bash
git clone <repository-url>
cd figure-lunch

# Run the setup script (installs dependencies and initializes database)
node setup.js
```

2. **Start the backend:**
```bash
cd backend
npm install
npm run dev
```

3. **Start the frontend (in a new terminal):**
```bash
cd frontend
npm install
npm run dev
```

4. **Open your browser:**
- Frontend: http://localhost:5173 (or the port shown in terminal)
- Backend API: http://localhost:3000

## Cross-Platform Compatibility

This project is designed to work on:
- ✅ **macOS** (tested)
- ✅ **Windows** (with provided scripts)
- ✅ **Linux** (with bash script)

**Windows users** should use the provided `.bat` or `.ps1` files instead of the `.sh` script.

## API Endpoints

- `GET /restaurants` - Get all restaurants with vote counts and ratings
- `POST /vote` - Submit a vote for a restaurant
- `WebSocket ws://localhost:3000` - Real-time vote updates

## Project Structure

```
figure-lunch/
├── backend/                 # Node.js/Express API server
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── routes/          # Express routes
│   │   ├── db/             # Database configuration
│   │   ├── events/         # Event bus for real-time updates
│   │   └── websocket/      # WebSocket server
│   └── package.json
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service functions
│   │   └── types/          # TypeScript type definitions
│   └── package.json
└── start-dev.sh           # Development startup script
```

## Development

The application supports:
- **Hot Module Replacement** for instant frontend updates
- **TypeScript** for type safety across the stack
- **ESLint** for code quality
- **Real-time updates** via WebSocket
- **Responsive design** for all screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details