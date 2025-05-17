import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { fetchHotelDetails } from '@/lib/actions/hotel-actions';
import { Coffee, Dumbbell, MapPin, Star, Umbrella, Utensils, Waves, Wifi } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type React from 'react';

interface HotelDetailPageProps {
  params: {
    id: string;
  };
}

export default async function HotelDetailPage({ params }: HotelDetailPageProps) {
  const hotelId = Number.parseInt(params.id);

  if (isNaN(hotelId)) {
    notFound();
  }

  let hotel;
  try {
    hotel = await fetchHotelDetails(hotelId);
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    throw new Error('Failed to fetch hotel details. Please try again later.');
  }

  if (!hotel) {
    notFound();
  }

  // Map amenities to icons
  const amenityIcons: Record<string, React.ReactNode> = {
    'Free WiFi': <Wifi className="h-4 w-4" />,
    Breakfast: <Coffee className="h-4 w-4" />,
    Restaurant: <Utensils className="h-4 w-4" />,
    Gym: <Dumbbell className="h-4 w-4" />,
    Pool: <Waves className="h-4 w-4" />,
    'Beach Access': <Umbrella className="h-4 w-4" />,
  };

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-6">
        <Link href="/" className="text-primary hover:underline">
          ← Back to search
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
            <div className="text-muted-foreground mt-2 flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{hotel.location}</span>
            </div>
            <div className="mt-2 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < hotel.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-muted-foreground ml-2 text-sm">{hotel.rating} out of 5</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg">
            <img
              src={hotel.image || '/placeholder.svg'}
              alt={hotel.name}
              className="h-[300px] w-full object-cover"
            />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">About this hotel</h2>
            <p className="text-muted-foreground mt-2">
              {hotel.description ||
                `Experience luxury and comfort at ${hotel.name} located in the heart of ${hotel.location}. 
                Our hotel offers exceptional amenities and services to make your stay memorable.`}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Amenities</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {hotel.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  {amenityIcons[amenity] || <div className="bg-primary h-4 w-4 rounded-full" />}
                  <span className="ml-2">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Policies</h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium">Check-in/Check-out</h3>
                <p className="text-muted-foreground">
                  Check-in: {hotel.checkInTime || '3:00 PM'} • Check-out:{' '}
                  {hotel.checkOutTime || '11:00 AM'}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Cancellation Policy</h3>
                <p className="text-muted-foreground">
                  {hotel.policies?.cancellation ||
                    'Free cancellation up to 24 hours before check-in.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardContent className="p-6">
              <div className="mb-4">
                <Badge className="bg-red-500 text-white">SAVE {hotel.discount}%</Badge>
              </div>

              <div className="mb-6">
                <div className="flex items-end">
                  <span className="text-muted-foreground text-sm line-through">
                    ${hotel.originalPrice}
                  </span>
                  <span className="text-primary ml-2 text-3xl font-bold">
                    ${hotel.currentPrice}
                  </span>
                  <span className="text-muted-foreground">/night</span>
                </div>
                <p className="text-muted-foreground mt-1 text-xs">Excludes taxes and fees</p>
              </div>

              <Separator className="my-4" />

              <div className="mb-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Check-in</label>
                    <div className="mt-1 rounded-md border p-2">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Check-out</label>
                    <div className="mt-1 rounded-md border p-2">
                      {new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Guests</label>
                  <div className="mt-1 rounded-md border p-2">2 adults</div>
                </div>
              </div>

              <Button className="w-full">Book Now</Button>

              <div className="text-muted-foreground mt-4 text-center text-xs">
                You won't be charged yet
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
