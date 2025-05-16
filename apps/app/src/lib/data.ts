import type { Hotel, Step } from '@/types';
import { CheckCircle2, CreditCard, Filter, ListFilter, MapPin, Ticket } from 'lucide-react';

// Mock data for hotel deals
export const allHotels: Hotel[] = [
  {
    id: 1,
    name: 'Grand Plaza Hotel',
    location: 'New York City',
    originalPrice: 299,
    currentPrice: 199,
    discount: 33,
    rating: 4.8,
    image: '/placeholder.svg?height=200&width=300',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant'],
    stars: 5,
  },
  {
    id: 2,
    name: 'Seaside Resort & Spa',
    location: 'Miami Beach',
    originalPrice: 349,
    currentPrice: 249,
    discount: 29,
    rating: 4.7,
    image: '/placeholder.svg?height=200&width=300',
    amenities: ['Free WiFi', 'Beach Access', 'Pool', 'Spa'],
    stars: 4,
  },
  {
    id: 3,
    name: 'Mountain View Lodge',
    location: 'Aspen',
    originalPrice: 399,
    currentPrice: 279,
    discount: 30,
    rating: 4.9,
    image: '/placeholder.svg?height=200&width=300',
    amenities: ['Free WiFi', 'Ski Access', 'Fireplace', 'Restaurant'],
    stars: 4,
  },
  {
    id: 4,
    name: 'Urban Boutique Hotel',
    location: 'San Francisco',
    originalPrice: 279,
    currentPrice: 189,
    discount: 32,
    rating: 4.6,
    image: '/placeholder.svg?height=200&width=300',
    amenities: ['Free WiFi', 'Breakfast', 'Bar', 'City Views'],
    stars: 4,
  },
  {
    id: 5,
    name: 'Luxury Downtown Suites',
    location: 'Chicago',
    originalPrice: 329,
    currentPrice: 229,
    discount: 30,
    rating: 4.5,
    image: '/placeholder.svg?height=200&width=300',
    amenities: ['Free WiFi', 'Gym', 'Business Center', 'Restaurant'],
    stars: 5,
  },
  {
    id: 6,
    name: 'Harbor View Inn',
    location: 'Seattle',
    originalPrice: 259,
    currentPrice: 179,
    discount: 31,
    rating: 4.4,
    image: '/placeholder.svg?height=200&width=300',
    amenities: ['Free WiFi', 'Waterfront', 'Restaurant', 'Bar'],
    stars: 3,
  },
  {
    id: 7,
    name: 'Desert Oasis Resort',
    location: 'Phoenix',
    originalPrice: 239,
    currentPrice: 159,
    discount: 33,
    rating: 4.3,
    image: '/placeholder.svg?height=200&width=300',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Golf Course'],
    stars: 4,
  },
  {
    id: 8,
    name: 'Historic District Hotel',
    location: 'Boston',
    originalPrice: 289,
    currentPrice: 199,
    discount: 31,
    rating: 4.7,
    image: '/placeholder.svg?height=200&width=300',
    amenities: ['Free WiFi', 'Breakfast', 'Historic Building', 'Bar'],
    stars: 4,
  },
];

// Process steps for how it works
export const howItWorksSteps: Step[] = [
  {
    id: 1,
    title: 'Choose your destination and dates',
    description: 'Tell us where you want to go and when you plan to travel.',
    icon: MapPin,
  },
  {
    id: 2,
    title: 'We track hotel prices for you',
    description: 'Our system continuously monitors prices across hundreds of booking sites.',
    icon: ListFilter,
  },
  {
    id: 3,
    title: 'You get notified when deals drop',
    description: 'Receive instant alerts when we find lower prices for your selected hotels.',
    icon: CheckCircle2,
  },
];

// Process steps after search
export const postSearchSteps: Step[] = [
  {
    id: 1,
    title: 'Browse Results',
    description:
      'View all available hotels matching your search criteria with detailed information and photos.',
    icon: ListFilter,
  },
  {
    id: 2,
    title: 'Compare & Filter',
    description:
      'Filter by price, rating, amenities, and more to find the perfect hotel for your needs.',
    icon: Filter,
  },
  {
    id: 3,
    title: 'Book Your Stay',
    description:
      'Secure the best rate with our price guarantee and complete your booking in minutes.',
    icon: CreditCard,
  },
  {
    id: 4,
    title: 'Receive Confirmation',
    description: 'Get instant confirmation and all booking details sent directly to your email.',
    icon: Ticket,
  },
];

export const allAmenities = [
  'Free WiFi',
  'Pool',
  'Spa',
  'Gym',
  'Restaurant',
  'Beach Access',
  'Breakfast',
  'Bar',
];
