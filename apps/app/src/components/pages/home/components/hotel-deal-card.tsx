'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Hotel } from '@/types';
import { MapPin, Star } from 'lucide-react';

interface HotelDealCardProps {
  hotel: Hotel;
  bookHotel: (hotel: Hotel) => void;
}

export default function HotelDealCard({ hotel, bookHotel }: HotelDealCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="relative">
        <img
          src={hotel.image || '/placeholder.svg'}
          alt={hotel.name}
          className="h-48 w-full object-cover"
        />
        <Badge className="absolute right-2 top-2 bg-red-500 hover:bg-red-600">
          {hotel.discount}% OFF
        </Badge>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1 text-lg">{hotel.name}</CardTitle>
        <CardDescription className="flex items-center">
          <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
          <span className="line-clamp-1">{hotel.location}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="mb-2 flex items-center text-sm">
          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(hotel.rating) ? 'fill-current' : 'fill-none'}`}
              />
            ))}
          </div>
          <span className="ml-1 text-gray-600">{hotel.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500 line-through">${hotel.originalPrice}</span>
            <span className="text-primary ml-2 text-xl font-bold">${hotel.currentPrice}</span>
            <span className="text-sm text-gray-500">/night</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => bookHotel(hotel)}>
          View Deal
        </Button>
      </CardFooter>
    </Card>
  );
}
