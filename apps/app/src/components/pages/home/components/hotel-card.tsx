'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Hotel } from '@/types';
import { MapPin, Star } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
  bookHotel: (hotel: Hotel) => void;
}

export default function HotelCard({ hotel, bookHotel }: HotelCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="relative">
          <img
            src={hotel.image || '/placeholder.svg'}
            alt={hotel.name}
            className="h-full min-h-[200px] w-full object-cover"
          />
          <Badge className="absolute right-2 top-2 bg-red-500 hover:bg-red-600">
            {hotel.discount}% OFF
          </Badge>
        </div>
        <div className="p-4 md:col-span-2">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">{hotel.name}</h3>
                  <div className="mt-1 flex items-center">
                    <MapPin className="mr-1 h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">{hotel.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(hotel.rating) ? 'fill-current' : 'fill-none'}`}
                      />
                    ))}
                    <span className="ml-1 text-gray-600">{hotel.rating}</span>
                  </div>
                  <div className="mt-1 flex items-center">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1">
                {hotel.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline" className="bg-gray-100">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <span className="text-sm text-gray-500 line-through">${hotel.originalPrice}</span>
                <span className="text-primary ml-2 text-2xl font-bold">${hotel.currentPrice}</span>
                <span className="text-sm text-gray-500">/night</span>
              </div>
              <Button onClick={() => bookHotel(hotel)}>Book Now</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
