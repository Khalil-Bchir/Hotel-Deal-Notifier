'use server';

import {
  fetchHotels,
  getHotelDetails,
  getTopDeals,
  subscribeToPriceAlerts,
} from '@/lib/api/amendus';
import type { Hotel } from '@/types';

export async function searchHotels(
  destination: string,
  checkIn?: string,
  checkOut?: string,
): Promise<Hotel[]> {
  try {
    return await fetchHotels(destination, checkIn, checkOut);
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw new Error('Failed to search hotels. Please try again later.');
  }
}

export async function fetchHotelDetails(hotelId: number): Promise<Hotel | null> {
  try {
    return await getHotelDetails(hotelId);
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    throw new Error('Failed to fetch hotel details. Please try again later.');
  }
}

export async function fetchTopDeals(limit = 4): Promise<Hotel[]> {
  try {
    return await getTopDeals(limit);
  } catch (error) {
    console.error('Error fetching top deals:', error);
    throw new Error('Failed to fetch top deals. Please try again later.');
  }
}

export async function subscribeToDeals(
  email: string,
  city: string,
  dates: { from: Date; to: Date },
): Promise<boolean> {
  try {
    return await subscribeToPriceAlerts(email, city, dates);
  } catch (error) {
    console.error('Error subscribing to deals:', error);
    throw new Error('Failed to subscribe to deals. Please try again later.');
  }
}
