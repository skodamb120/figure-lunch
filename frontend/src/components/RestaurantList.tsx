import React from 'react';
import { useRestaurants } from '../hooks/useRestaurants';
import { useWebSocket } from '../hooks/useWebSocket';
import RestaurantCard from './RestaurantCard';

const RestaurantList: React.FC = () => {
  const { restaurants, loading, error, fetchRestaurants, updateRestaurant } = useRestaurants();
  
  const handleWebSocketMessage = (message: any) => {
    if (message.type === 'vote') {
      // Refresh the restaurant list when a vote is received
      fetchRestaurants();
    }
  };
  
  const { isConnected } = useWebSocket('ws://localhost:3000', handleWebSocketMessage);

  const handleVoteSubmitted = () => {
    // The real-time update will handle refreshing the list
    // This is kept for backward compatibility
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '20px', border: '2px solid #3b82f6', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <span style={{ color: '#6b7280' }}>Loading restaurants...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <p style={{ color: '#dc2626', marginBottom: '16px' }}>{error}</p>
          <button
            onClick={fetchRestaurants}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>No restaurants found.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Connection Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '8px 16px', 
          borderRadius: '20px', 
          backgroundColor: 'white', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <span style={{ fontSize: '16px' }}>{isConnected ? '🟢' : '🔴'}</span>
          <span style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: isConnected ? '#059669' : '#dc2626' 
          }}>
            {isConnected ? 'Live Updates Enabled' : 'Offline - Manual Refresh Only'}
          </span>
        </div>
      </div>

      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onVoteSubmitted={handleVoteSubmitted}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
