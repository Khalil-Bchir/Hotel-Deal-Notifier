import { AMENDUS_API_KEY, AMENDUS_API_URL } from '@/lib/env';
import type { Hotel } from '@/types';

// Define the Amendus API response types
interface AmendusHotel {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
  };
  pricing: {
    original: number;
    current: number;
  };
  rating: number;
  images: string[];
  amenities: string[];
  stars: number;
  description?: string;
}

interface AmendusSearchResponse {
  hotels: AmendusHotel[];
  totalResults: number;
}

// Transform Amendus API response to our Hotel type
export function transformAmendusHotels(amendusHotels: AmendusHotel[]): Hotel[] {
  return amendusHotels.map((hotel) => ({
    id: Number.parseInt(hotel.id),
    name: hotel.name,
    location: `${hotel.location.city}, ${hotel.location.country}`,
    originalPrice: hotel.pricing.original,
    currentPrice: hotel.pricing.current,
    discount: Math.round(
      ((hotel.pricing.original - hotel.pricing.current) / hotel.pricing.original) * 100,
    ),
    rating: hotel.rating,
    image: hotel.images[0] || '/placeholder.svg?height=200&width=300',
    amenities: hotel.amenities,
    stars: hotel.stars,
    description: hotel.description,
  }));
}

// Fetch hotels from Amendus API
export async function fetchHotels(
  destination: string,
  checkIn?: string,
  checkOut?: string,
): Promise<Hotel[]> {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);

    // Make the API request
    const response = await fetch(`${AMENDUS_API_URL}/hotels/search?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AMENDUS_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Amendus API error: ${response.status} ${response.statusText}`);
    }

    const data: AmendusSearchResponse = await response.json();
    return transformAmendusHotels(data.hotels);
  } catch (error) {
    console.error('Error fetching hotels from Amendus:', error);
    throw error;
  }
}

// Get hotel details from Amendus API
export async function getHotelDetails(hotelId: number): Promise<Hotel | null> {
  try {
    // Make the API request
    const response = await fetch(`${AMENDUS_API_URL}/hotels/${hotelId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AMENDUS_API_KEY}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Amendus API error: ${response.status} ${response.statusText}`);
    }

    const hotel: AmendusHotel = await response.json();
    return transformAmendusHotels([hotel])[0];
  } catch (error) {
    console.error('Error fetching hotel details from Amendus:', error);
    throw error;
  }
}

// Get top deals from Amendus API
export async function getTopDeals(limit = 4): Promise<Hotel[]> {
  try {
    // Make the API request
    const response = await fetch(`${AMENDUS_API_URL}/hotels/deals?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AMENDUS_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Amendus API error: ${response.status} ${response.statusText}`);
    }

    const data: AmendusSearchResponse = await response.json();
    return transformAmendusHotels(data.hotels);
  } catch (error) {
    console.error('Error fetching top deals from Amendus:', error);
    throw error;
  }
}

// Subscribe to price alerts
export async function subscribeToPriceAlerts(
  email: string,
  destination: string,
  dates: { from: Date; to: Date },
): Promise<boolean> {
  try {
    const payload = {
      email,
      destination,
      checkIn: dates.from.toISOString().split('T')[0],
      checkOut: dates.to.toISOString().split('T')[0],
    };

    const response = await fetch(`${AMENDUS_API_URL}/subscriptions/price-alerts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AMENDUS_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Amendus API error: ${response.status} ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error subscribing to price alerts:', error);
    throw error;
  }
}
