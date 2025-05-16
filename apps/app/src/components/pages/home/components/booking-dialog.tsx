'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Hotel } from '@/types';
import { format } from 'date-fns';
import { Star, X } from 'lucide-react';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotel: Hotel | null;
  date: {
    from: Date;
    to: Date;
  };
}

export default function BookingDialog({ open, onOpenChange, hotel, date }: BookingDialogProps) {
  if (!hotel) return null;

  const nights = Math.round((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24));
  const taxesAndFees = Math.round(hotel.currentPrice * nights * 0.15);
  const totalPrice = hotel.currentPrice * nights + taxesAndFees;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Complete Your Booking</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 overflow-hidden rounded-md">
              <img
                src={hotel.image || '/placeholder.svg'}
                alt={hotel.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold">{hotel.name}</h3>
              <p className="text-sm text-gray-500">{hotel.location}</p>
              <div className="mt-1 flex items-center">
                {[...Array(hotel.stars)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="confirm">Confirm</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="space-y-2">
                <h4 className="font-medium">Booking Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Check-in Date:</div>
                  <div className="font-medium">{format(date.from, 'MMM dd, yyyy')}</div>
                  <div>Check-out Date:</div>
                  <div className="font-medium">{format(date.to, 'MMM dd, yyyy')}</div>
                  <div>Guests:</div>
                  <div className="font-medium">2 Adults</div>
                  <div>Room Type:</div>
                  <div className="font-medium">Deluxe Room</div>
                </div>
              </div>
              <Button className="w-full">Continue to Payment</Button>
            </TabsContent>
            <TabsContent value="payment" className="space-y-4 pt-4">
              <div className="space-y-2">
                <h4 className="font-medium">Payment Information</h4>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <label className="text-sm">Card Number</label>
                    <Input placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-sm">Expiry Date</label>
                      <Input placeholder="MM/YY" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm">CVC</label>
                      <Input placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm">Name on Card</label>
                    <Input placeholder="John Doe" />
                  </div>
                </div>
              </div>
              <Button className="w-full">Continue to Confirm</Button>
            </TabsContent>
            <TabsContent value="confirm" className="space-y-4 pt-4">
              <div className="space-y-2">
                <h4 className="font-medium">Booking Summary</h4>
                <div className="space-y-2 rounded-md bg-gray-50 p-3">
                  <div className="flex justify-between">
                    <span>Room Rate (per night)</span>
                    <span>${hotel.currentPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of Nights</span>
                    <span>{nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>${taxesAndFees}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  onOpenChange(false);
                  // Show a success message or redirect to a confirmation page
                  alert('Booking confirmed! A confirmation email has been sent to your inbox.');
                }}
              >
                Confirm Booking
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
