import React, { useState } from 'react';
import type { Restaurant } from '../types';
import { voteService } from '../services/api';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onVoteSubmitted: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onVoteSubmitted }) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVote = async () => {
    if (selectedRating === 0) return;
    
    setIsSubmitting(true);
    try {
      await voteService.submitVote(restaurant.id, selectedRating);
      onVoteSubmitted();
      setSelectedRating(0);
    } catch (error) {
      console.error('Failed to submit vote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        style={{
          fontSize: '20px',
          color: index < rating ? '#fbbf24' : '#d1d5db',
          cursor: interactive ? 'pointer' : 'default',
          marginRight: '2px'
        }}
        onClick={() => interactive && setSelectedRating(index + 1)}
      >
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '24px',
      marginBottom: '16px',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
          {restaurant.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#6b7280' }}>
          <span style={{ marginRight: '4px' }}>👥</span>
          {restaurant.votes} votes
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ marginRight: '8px' }}>📈</span>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Average Rating</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {renderStars(Math.round(restaurant.average_rating))}
          <span style={{ marginLeft: '8px', fontSize: '14px', color: '#6b7280' }}>
            ({restaurant.average_rating.toFixed(1)})
          </span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Rate this restaurant:
          </label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {renderStars(selectedRating, true)}
            <span style={{ marginLeft: '8px', fontSize: '14px', color: '#6b7280' }}>
              {selectedRating > 0 ? `${selectedRating} star${selectedRating > 1 ? 's' : ''}` : 'Select rating'}
            </span>
          </div>
        </div>

        <button
          onClick={handleVote}
          disabled={selectedRating === 0 || isSubmitting}
          style={{
            width: '100%',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: '500',
            border: 'none',
            cursor: selectedRating === 0 || isSubmitting ? 'not-allowed' : 'pointer',
            backgroundColor: selectedRating === 0 || isSubmitting ? '#d1d5db' : '#3b82f6',
            color: selectedRating === 0 || isSubmitting ? '#6b7280' : 'white',
            fontSize: '14px'
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Vote'}
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
