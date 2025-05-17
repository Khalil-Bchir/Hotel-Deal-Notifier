'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { searchSchema } from '@/lib/validation';
import { MapPin, Search } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

interface SearchSectionProps {
  searchForm: UseFormReturn<z.infer<typeof searchSchema>>;
  onSearch: (values: z.infer<typeof searchSchema>) => void;
  isSearching: boolean;
}

export default function SearchSection({ searchForm, onSearch, isSearching }: SearchSectionProps) {
  return (
    <section id="search-section" className="w-full py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Search for the Best Deals
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Find amazing hotel deals for your next trip. Enter your destination to see current
              offers.
            </p>
          </div>
          <div className="mt-6 w-full max-w-2xl">
            <Card className="border-2 shadow-lg">
              <CardContent className="pt-6">
                <Form {...searchForm}>
                  <form
                    onSubmit={searchForm.handleSubmit(onSearch)}
                    className="flex flex-col gap-4 sm:flex-row"
                  >
                    <FormField
                      control={searchForm.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                              <Input
                                className="h-12 pl-10"
                                placeholder="Where do you want to go?"
                                {...field}
                                disabled={isSearching}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="h-12" disabled={isSearching}>
                      {isSearching ? (
                        <div className="flex items-center">
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Searching...
                        </div>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Search Deals
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
