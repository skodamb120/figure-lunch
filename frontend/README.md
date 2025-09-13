# Figure Lunch Frontend

A modern React frontend for the Figure Lunch voting application, built with Vite, TypeScript, and Tailwind CSS.

## Features

- 🍽️ **Restaurant List**: View all available restaurants with their current ratings and vote counts
- ⭐ **Interactive Rating**: Rate restaurants with a 5-star system
- 📊 **Real-time Updates**: See vote counts and ratings update after submitting votes
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- The backend server running on port 3000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

The frontend communicates with the backend API:

- `GET /restaurants` - Fetches all restaurants with vote counts and average ratings
- `POST /vote` - Submits a vote for a restaurant with a rating

## Project Structure

```
src/
├── components/
│   ├── RestaurantCard.tsx    # Individual restaurant card component
│   └── RestaurantList.tsx    # List of all restaurants
├── services/
│   └── api.ts               # API service functions
├── types/
│   └── index.ts             # TypeScript type definitions
├── App.tsx                  # Main application component
├── App.css                  # Custom styles
├── index.css                # Tailwind CSS imports
└── main.tsx                 # Application entry point
```

## Development

The application uses:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Tailwind CSS** for utility-first styling
- **Vite** for fast HMR (Hot Module Replacement)

## Contributing

1. Make sure the backend is running on port 3000
2. Start the development server with `npm run dev`
3. Make your changes
4. Test thoroughly before submitting