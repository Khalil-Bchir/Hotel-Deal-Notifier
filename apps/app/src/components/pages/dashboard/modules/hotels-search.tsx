'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import {
  fetchHotels,
  selectHotels,
  selectHotelsError,
  selectHotelsLoading,
} from '@/services/v1/hotelSlice';
import { fetchFirstMatch } from '@/services/v1/locationSlice';
import type { DestType } from '@/types/v1/hotels';
import { format } from 'date-fns';
import { CalendarIcon, MapPinIcon, SearchIcon, StarIcon } from 'lucide-react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

export default function HotelSearch() {
  /* ---------------------------------------------------------------- */
  /* Local form state                                                 */
  /* ---------------------------------------------------------------- */
  const [query, setQuery] = useState<string>(''); // human-readable destination
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const dispatch = useAppDispatch();

  /* ---------------------------------------------------------------- */
  /* Slice state                                                      */
  /* ---------------------------------------------------------------- */
  const deals = useAppSelector(selectHotels);
  const loading = useAppSelector(selectHotelsLoading);
  const error = useAppSelector(selectHotelsError);

  /* ---------------------------------------------------------------- */
  /* Handlers                                                         */
  /* ---------------------------------------------------------------- */
  const handleSearch = async () => {
    if (!query.trim() || !dateRange?.from || !dateRange?.to) return;

    // 1️⃣ resolve city/country -> dest_id via RapidAPI
    const loc = await dispatch(fetchFirstMatch(query))
      .unwrap()
      .catch((msg) => {
        alert(msg); // you can replace with toast
        return null;
      });
    if (!loc) return;

    // 2️⃣ hit your hotel deals endpoint
    dispatch(
      fetchHotels({
        dest_id: loc.dest_id,
        dest_type: loc.dest_type as DestType,
        checkin_date: format(dateRange.from, 'yyyy-MM-dd'),
        checkout_date: format(dateRange.to, 'yyyy-MM-dd'),
        page_size: '25',
        page_number: '0',
      }),
    );
  };

  /* ---------------------------------------------------------------- */
  /* Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <Card className="rounded-2xl border-t border-t-indigo-100 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
          Search for Hotel Deals
        </CardTitle>
        <CardDescription className="text-base">
          Find the best hotel deals for your next trip.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search Form */}
        <div className="grid gap-4 rounded-xl bg-slate-50 p-4 md:grid-cols-3">
          {/* Destination (free text) -------------------------------- */}
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="destination" className="font-medium">
              Destination
            </Label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-indigo-500" />
              <Input
                id="destination"
                type="text"
                placeholder="City, country…"
                className="h-12 border-slate-200 pl-10 focus:border-indigo-300 focus:ring-indigo-200"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Dates picker ------------------------------------------ */}
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="dates" className="font-medium">
              Dates
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dates"
                  variant="outline"
                  className="h-12 w-full justify-start border-slate-200 font-normal hover:bg-slate-100 hover:text-slate-900"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-indigo-500" />
                  {dateRange?.from && dateRange?.to ? (
                    <span>
                      {format(dateRange.from, 'MMM d')} – {format(dateRange.to, 'MMM d')}
                    </span>
                  ) : (
                    <span className="text-slate-500">Pick dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  numberOfMonths={2}
                  selected={dateRange}
                  onSelect={setDateRange}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Search button ------------------------------------------ */}
          <div className="flex items-end md:col-span-1">
            <Button
              className="h-12 w-full bg-gradient-to-r from-indigo-500 to-blue-600 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg"
              disabled={loading}
              onClick={handleSearch}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Searching...
                </div>
              ) : (
                <>
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search Hotel Deals
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Feedback -------------------------------------------------- */}
        {error && (
          <div className="flex items-start rounded-lg border border-red-100 bg-red-50 p-4 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-medium">Error occurred</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && !deals.length && (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-none shadow-md">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="mb-2 h-6 w-3/4" />
                  <Skeleton className="mb-2 h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Results --------------------------------------------------- */}
        {deals.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deals.map((d) => (
              <Card
                key={d.id}
                className="group overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={d.image || '/placeholder.svg'}
                    alt={d.name}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {d.discountPct > 0 && (
                    <Badge className="absolute right-3 top-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                      {d.discountPct}% OFF
                    </Badge>
                  )}
                </div>
                <CardContent className="p-5">
                  <h3 className="mb-1 line-clamp-1 text-lg font-semibold">{d.name}</h3>
                  <div className="mb-2 flex items-center text-amber-500">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(Math.random() * 2) + 4 ? 'fill-current' : 'fill-none stroke-current opacity-40'}`}
                        />
                      ))}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Per night</p>
                      <p className="text-xl font-bold text-indigo-600">
                        {d.price} {d.currency}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="border border-indigo-100 bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                    >
                      View Deal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty state - only show when not loading and no results */}
        {!loading && !deals.length && !error && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-slate-100 p-4">
              <SearchIcon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mb-1 text-lg font-medium">No hotels found</h3>
            <p className="max-w-md text-slate-500">
              Search for a destination and select your dates to find the best hotel deals.
            </p>
          </div>
        )}
      </CardContent>

      {deals.length > 0 && (
        <CardFooter className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-700">{deals.length}</span> discounted
            hotels
          </p>
          <Button variant="outline" size="sm" className="text-xs">
            View all deals
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
