import type React from 'react';

export interface Hotel {
  id: number;
  name: string;
  location: string;
  originalPrice: number;
  currentPrice: number;
  discount: number;
  rating: number;
  image: string;
  amenities: string[];
  stars: number;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}
