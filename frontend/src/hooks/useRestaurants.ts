import { useState, useEffect, useCallback } from 'react';
import type { Restaurant } from '../types';
import { restaurantService } from '../services/api';

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await restaurantService.getRestaurants();
      setRestaurants(data);
    } catch (err) {
      setError('Failed to load restaurants. Please try again.');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRestaurant = useCallback((restaurantId: number, newVotes: number, newAverageRating: number) => {
    setRestaurants(prev => 
      prev.map(restaurant => 
        restaurant.id === restaurantId 
          ? { ...restaurant, votes: newVotes, average_rating: newAverageRating }
          : restaurant
      )
    );
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  return {
    restaurants,
    loading,
    error,
    fetchRestaurants,
    updateRestaurant
  };
};
