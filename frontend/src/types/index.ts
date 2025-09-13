export interface Restaurant {
  id: number;
  name: string;
  votes: number;
  average_rating: number;
}

export interface Vote {
  restaurant_id: number;
  rating: number;
}

export interface VoteResponse {
  status: string;
  vote: Vote;
}
