import React from 'react';
import RestaurantList from './components/RestaurantList';

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '20px' }}>
      <header style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 10px 0' }}>
          🍽️ Figure Lunch
        </h1>
        <p style={{ textAlign: 'center', color: '#6b7280', margin: 0 }}>
          Vote for your favorite lunch spot and help the team decide where to eat!
        </p>
      </header>

      <main style={{ maxWidth: '1024px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>👥</span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Community Voting</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>⭐</span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Rating System</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>🍽️</span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Restaurant Reviews</span>
            </div>
          </div>
        </div>

        <RestaurantList />
      </main>

      <footer style={{ backgroundColor: 'white', padding: '20px', marginTop: '40px', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
          Made with ❤️ for better lunch decisions
        </p>
      </footer>
    </div>
  );
}

export default App;