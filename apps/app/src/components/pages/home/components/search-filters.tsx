'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { allAmenities } from '@/lib/data';
import { Star } from 'lucide-react';
import type React from 'react';

interface SearchFiltersProps {
  priceRange: number[];
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
  starRating: number | null;
  setStarRating: React.Dispatch<React.SetStateAction<number | null>>;
  selectedAmenities: string[];
  setSelectedAmenities: React.Dispatch<React.SetStateAction<string[]>>;
  resetFilters: () => void;
}

export default function SearchFilters({
  priceRange,
  setPriceRange,
  starRating,
  setStarRating,
  selectedAmenities,
  setSelectedAmenities,
  resetFilters,
}: SearchFiltersProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range Filter */}
        <div className="space-y-2">
          <h3 className="font-medium">Price Range</h3>
          <div className="pb-2 pt-4">
            <Slider
              defaultValue={[0, 500]}
              max={500}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <Separator />

        {/* Star Rating Filter */}
        <div className="space-y-2">
          <h3 className="font-medium">Star Rating</h3>
          <RadioGroup
            value={starRating?.toString() || ''}
            onValueChange={(value) => setStarRating(value ? Number.parseInt(value) : null)}
          >
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center space-x-2">
                <RadioGroupItem value={stars.toString()} id={`star-${stars}`} />
                <label htmlFor={`star-${stars}`} className="flex items-center">
                  {[...Array(stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {[...Array(5 - stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gray-300" />
                  ))}
                </label>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="star-any" />
              <label htmlFor="star-any">Any Rating</label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Amenities Filter */}
        <div className="space-y-2">
          <h3 className="font-medium">Amenities</h3>
          <div className="grid grid-cols-1 gap-2">
            {allAmenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedAmenities([...selectedAmenities, amenity]);
                    } else {
                      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
                    }
                  }}
                />
                <label htmlFor={`amenity-${amenity}`} className="text-sm">
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Reset Filters */}
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}
