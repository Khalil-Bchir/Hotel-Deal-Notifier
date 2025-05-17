'use client';

import * as layout from '@/components/layout';
import * as components from '@/components/pages/home/components';
import * as modules from '@/components/pages/home/modules';
import { toast } from '@/components/ui/use-toast';
import { fetchTopDeals, searchHotels, subscribeToDeals } from '@/lib/actions/hotel-actions';
import { formSchema, searchSchema } from '@/lib/validation';
import type { Hotel } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export default function Home() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [searchResults, setSearchResults] = useState<Hotel[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [topDeals, setTopDeals] = useState<Hotel[]>([]);
  const [isLoadingTopDeals, setIsLoadingTopDeals] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: '',
      dates: {
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      email: '',
    },
  });

  const searchForm = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      destination: '',
    },
  });

  // Fetch top deals on component mount
  useEffect(() => {
    async function loadTopDeals() {
      setIsLoadingTopDeals(true);
      setError(null);
      try {
        const deals = await fetchTopDeals(4);
        setTopDeals(deals);
      } catch (error) {
        console.error('Failed to fetch top deals:', error);
        setError('Failed to load top deals. Please try again later.');
        toast({
          title: 'Error',
          description: 'Failed to load top deals. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingTopDeals(false);
      }
    }

    loadTopDeals();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const success = await subscribeToDeals(values.email, values.city, values.dates);
      if (success) {
        setShowConfirmation(true);
        toast({
          title: 'Success',
          description: `You've been subscribed to price alerts for ${values.city}.`,
        });
      }
    } catch (error) {
      console.error('Error subscribing to deals:', error);
      toast({
        title: 'Error',
        description: 'Failed to subscribe to deals. Please try again later.',
        variant: 'destructive',
      });
    }
  }

  async function onSearch(values: z.infer<typeof searchSchema>) {
    setIsSearching(true);
    setError(null);
    try {
      const checkIn = date.from.toISOString().split('T')[0];
      const checkOut = date.to.toISOString().split('T')[0];

      const results = await searchHotels(values.destination, checkIn, checkOut);

      setSearchResults(results);
      setShowSearchResults(true);

      if (results.length === 0) {
        toast({
          title: 'No results found',
          description:
            "We couldn't find any hotels matching your search criteria. Please try a different search.",
        });
      }
    } catch (error) {
      console.error('Error searching hotels:', error);
      setError('Failed to search hotels. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to search hotels. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
    }
  }

  function bookHotel(hotel: Hotel) {
    setSelectedHotel(hotel);
    setShowBookingConfirmation(true);
  }

  async function viewAllDeals() {
    searchForm.setValue('destination', '');
    setIsSearching(true);
    setError(null);
    try {
      const results = await searchHotels('');
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error fetching all deals:', error);
      setError('Failed to fetch all deals. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to fetch all deals. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <layout.Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <modules.HeroSection form={form} onSubmit={onSubmit} date={date} setDate={setDate} />

        {/* How It Works Section */}
        <modules.HowItWorksSection />

        {/* Search Section */}
        <modules.SearchSection
          searchForm={searchForm}
          onSearch={onSearch}
          isSearching={isSearching}
        />

        {/* Error Message */}
        {error && (
          <div className="container mx-auto px-4 py-4">
            <div className="rounded-md bg-red-50 p-4 text-red-700">
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Search Results Section */}
        {showSearchResults && (
          <modules.SearchResultsSection
            searchResults={searchResults}
            searchQuery={searchForm.getValues().destination}
            bookHotel={bookHotel}
            date={date}
          />
        )}

        {/* Top Picks Section */}
        <modules.TopPicksSection
          topDeals={topDeals}
          bookHotel={bookHotel}
          onViewAllDeals={viewAllDeals}
          isLoading={isLoadingTopDeals}
        />
      </main>

      {/* Footer */}
      <layout.Footer />

      {/* Confirmation Dialog */}
      <components.ConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        city={form.getValues().city}
      />

      {/* Booking Confirmation Dialog */}
      <components.BookingDialog
        open={showBookingConfirmation}
        onOpenChange={setShowBookingConfirmation}
        hotel={selectedHotel}
        date={date}
      />
    </div>
  );
}
