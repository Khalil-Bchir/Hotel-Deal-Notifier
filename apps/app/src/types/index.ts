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
  description?: string;
  checkInTime?: string;
  checkOutTime?: string;
  policies?: {
    cancellation?: string;
    payment?: string;
  };
}

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface SearchParams {
  destination: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
}
