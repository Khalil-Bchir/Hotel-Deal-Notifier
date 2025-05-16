'use client';

import { HotelDealCard } from '@/components/pages/home/components';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Hotel } from '@/types';
import { ArrowRight } from 'lucide-react';

interface TopPicksSectionProps {
  topDeals: Hotel[];
  bookHotel: (hotel: Hotel) => void;
  onViewAllDeals: () => void;
}

export default function TopPicksSection({
  topDeals,
  bookHotel,
  onViewAllDeals,
}: TopPicksSectionProps) {
  return (
    <section id="top-picks" className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="max-w-3xl space-y-2">
            <Badge variant="outline" className="mb-2">
              Featured Deals
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Top Picks This Week</h2>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Our curated selection of the best hotel deals available right now.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topDeals.map((deal) => (
            <HotelDealCard key={deal.id} hotel={deal} bookHotel={bookHotel} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg" onClick={onViewAllDeals}>
            View All Deals <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
