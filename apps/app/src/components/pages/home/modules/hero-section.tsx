'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { scrollToSection } from '@/lib/scroll-utils';
import { cn } from '@/lib/utils';
import type { formSchema } from '@/lib/validation';
import { format } from 'date-fns';
import { ArrowRight, CalendarIcon } from 'lucide-react';
import type React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

interface HeroSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  date: {
    from: Date;
    to: Date;
  };
  setDate: React.Dispatch<
    React.SetStateAction<{
      from: Date;
      to: Date;
    }>
  >;
}

export default function HeroSection({ form, onSubmit, date, setDate }: HeroSectionProps) {
  return (
    <section id="hero" className="w-full pb-16 pt-32 md:pb-24 md:pt-40 lg:pb-32 ">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="mb-2 inline-flex" variant="outline">
                Save up to 50% on hotels
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Get Notified When Hotel Prices Drop
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Track hotel prices in your favorite cities and receive alerts instantly when deals
                become available.
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button size="lg" className="gap-1" onClick={() => scrollToSection('search-section')}>
                Find Deals Now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('how-it-works')}>
                How It Works
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Start tracking hotel deals</CardTitle>
                <CardDescription>Fill out the form below to get started.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter destination city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dates"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Travel Dates</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-full justify-start text-left font-normal',
                                    !date && 'text-muted-foreground',
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date?.from ? (
                                    date.to ? (
                                      <>
                                        {format(date.from, 'LLL dd, y')} -{' '}
                                        {format(date.to, 'LLL dd, y')}
                                      </>
                                    ) : (
                                      format(date.from, 'LLL dd, y')
                                    )
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={(newDate) => {
                                  if (newDate?.from && newDate?.to) {
                                    setDate({ from: newDate.from, to: newDate.to });
                                    field.onChange(newDate);
                                  }
                                }}
                                numberOfMonths={2}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormDescription>
                            We&apos;ll send price drop alerts to this email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Notify Me
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
