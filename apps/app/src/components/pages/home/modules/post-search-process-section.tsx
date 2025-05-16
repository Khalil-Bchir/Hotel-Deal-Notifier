'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { postSearchSteps } from '@/lib/data';
import { scrollToSection } from '@/lib/scroll-utils';
import { ArrowRight, ThumbsUp } from 'lucide-react';

export default function PostSearchProcessSection() {
  return (
    <section id="post-search-process" className="w-full bg-gray-50 py-16 md:py-24 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="max-w-3xl space-y-2">
            <Badge variant="outline" className="mb-2">
              Seamless Experience
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              What Happens After You Search
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Our streamlined process makes finding and booking your perfect hotel simple and
              stress-free.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 bg-gray-200 md:block dark:bg-gray-800" />

          <div className="grid gap-8 md:gap-12">
            {postSearchSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <div
                  className={`grid gap-4 md:grid-cols-2 md:gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div
                    className={`flex flex-col justify-center ${index % 2 === 1 ? 'md:items-end md:text-right' : ''}`}
                  >
                    <div className="mb-2 flex items-center gap-4">
                      <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="max-w-md text-gray-500 dark:text-gray-400">{step.description}</p>
                  </div>
                  <div className="rounded-lg border bg-white p-6 shadow-md dark:bg-gray-800">
                    <div className="flex aspect-video items-center justify-center rounded-md bg-gray-100 dark:bg-gray-700">
                      <div className="text-center">
                        <step.icon className="mx-auto mb-2 h-10 w-10 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          {step.id === 1 && 'Search Results View'}
                          {step.id === 2 && 'Filter & Compare Interface'}
                          {step.id === 3 && 'Secure Booking Process'}
                          {step.id === 4 && 'Booking Confirmation'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {index < postSearchSteps.length - 1 && (
                  <div className="my-4 flex justify-center">
                    <ArrowRight className="h-6 w-6 rotate-90 text-gray-300 dark:text-gray-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Card className="border-primary/20 mx-auto max-w-2xl border-2">
            <CardHeader>
              <div className="bg-primary/10 text-primary mx-auto mb-4 rounded-full p-3">
                <ThumbsUp className="h-6 w-6" />
              </div>
              <CardTitle>100% Satisfaction Guarantee</CardTitle>
              <CardDescription>
                If you find a lower price elsewhere within 24 hours of booking, we'll match it and
                give you an additional 10% off.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center pb-6">
              <Button onClick={() => scrollToSection('search-section')}>Start Your Search</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
