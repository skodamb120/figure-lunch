import axios from 'axios';
import type { Restaurant, VoteResponse } from '../types';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const restaurantService = {
  getRestaurants: async (): Promise<Restaurant[]> => {
    const response = await api.get('/restaurants');
    return response.data;
  },
};

export const voteService = {
  submitVote: async (restaurantId: number, rating: number): Promise<VoteResponse> => {
    const response = await api.post('/vote', {
      restaurantId,
      rating,
    });
    return response.data;
  },
};
