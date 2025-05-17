'use client';

import { HotelCard, SearchFilters } from '@/components/pages/home/components';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Hotel } from '@/types';
import { HotelIcon } from 'lucide-react';
import { useState } from 'react';

interface SearchResultsSectionProps {
  searchResults: Hotel[];
  searchQuery: string;
  bookHotel: (hotel: Hotel) => void;
  date: {
    from: Date;
    to: Date;
  };
}

export default function SearchResultsSection({
  searchResults,
  searchQuery,
  bookHotel,
  date,
}: SearchResultsSectionProps) {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [starRating, setStarRating] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('recommended');

  function filterAndSortHotels() {
    if (!searchResults.length) return [];

    let filtered = [...searchResults];

    // Filter by price range
    filtered = filtered.filter(
      (hotel) => hotel.currentPrice >= priceRange[0] && hotel.currentPrice <= priceRange[1],
    );

    // Filter by star rating
    if (starRating) {
      filtered = filtered.filter((hotel) => hotel.stars === starRating);
    }

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((hotel) =>
        selectedAmenities.every((amenity) => hotel.amenities.includes(amenity)),
      );
    }

    // Sort results
    switch (sortOption) {
      case 'price-low':
        filtered.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        // "recommended" - no specific sort
        break;
    }

    return filtered;
  }

  const filteredHotels = filterAndSortHotels();

  if (searchResults.length === 0) {
    return (
      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="max-w-3xl space-y-2">
              <Badge variant="outline" className="mb-2">
                Search Results
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">No Hotels Found</h2>
              <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                We couldn't find any hotels matching your search criteria. Please try a different
                search.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="max-w-3xl space-y-2">
            <Badge variant="outline" className="mb-2">
              Search Results
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Hotels in {searchQuery || 'All Locations'}
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              We found {filteredHotels.length} hotels matching your search criteria.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              starRating={starRating}
              setStarRating={setStarRating}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              resetFilters={() => {
                setPriceRange([0, 500]);
                setStarRating(null);
                setSelectedAmenities([]);
              }}
            />
          </div>

          {/* Results */}
          <div className="space-y-6 lg:col-span-3">
            {/* Sort Options */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {filteredHotels.length} of {searchResults.length} hotels
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Sort by:</span>
                <select
                  className="rounded-md border px-2 py-1 text-sm"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>

            {/* Hotel Cards */}
            {filteredHotels.length > 0 ? (
              <div className="space-y-4">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} bookHotel={bookHotel} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <HotelIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium">No hotels found</h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your filters or search for a different destination.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setPriceRange([0, 500]);
                    setStarRating(null);
                    setSelectedAmenities([]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
