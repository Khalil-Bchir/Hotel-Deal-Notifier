'use client';

import * as layout from '@/components/layout';
import * as components from '@/components/pages/home/components';
import * as modules from '@/components/pages/home/modules';
import { allHotels } from '@/lib/data';
import { formSchema, searchSchema } from '@/lib/validation';
import type { Hotel } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export default function Home() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [searchResults, setSearchResults] = useState<Hotel[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setShowConfirmation(true);
  }

  function onSearch(values: z.infer<typeof searchSchema>) {
    setIsSearching(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Filter hotels based on destination (case insensitive partial match)
      const filteredHotels = allHotels.filter(
        (hotel) =>
          hotel.location.toLowerCase().includes(values.destination.toLowerCase()) ||
          hotel.name.toLowerCase().includes(values.destination.toLowerCase()),
      );

      setSearchResults(filteredHotels);
      setShowSearchResults(true);
      setIsSearching(false);
    }, 1500);
  }

  function bookHotel(hotel: Hotel) {
    setSelectedHotel(hotel);
    setShowBookingConfirmation(true);
  }

  function viewAllDeals() {
    searchForm.setValue('destination', '');
    onSearch({ destination: '' });
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
          topDeals={allHotels.slice(0, 4)}
          bookHotel={bookHotel}
          onViewAllDeals={viewAllDeals}
        />

        {/* Post-Search Process Section */}
        {/* <modules.PostSearchProcessSection /> */}
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
