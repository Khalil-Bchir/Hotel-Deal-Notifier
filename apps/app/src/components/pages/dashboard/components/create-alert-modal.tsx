'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { CalendarIcon, Check, ChevronsUpDown, MapPin, Search } from 'lucide-react';
import { useState } from 'react';

const destinations = [
  { label: 'New York, NY', value: 'new-york' },
  { label: 'Los Angeles, CA', value: 'los-angeles' },
  { label: 'Chicago, IL', value: 'chicago' },
  { label: 'Miami, FL', value: 'miami' },
  { label: 'Las Vegas, NV', value: 'las-vegas' },
  { label: 'San Francisco, CA', value: 'san-francisco' },
  { label: 'Orlando, FL', value: 'orlando' },
  { label: 'Boston, MA', value: 'boston' },
];

export function CreateAlertModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [openDestination, setOpenDestination] = useState(false);
  const [date, setDate] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: undefined,
  });
  const [budget, setBudget] = useState([200]);
  const [stars, setStars] = useState('any');

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form
      onOpenChange(false);
      setStep(1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Alert</DialogTitle>
          <DialogDescription>Set up a new hotel deal alert in three easy steps.</DialogDescription>
        </DialogHeader>

        <div className="relative mt-2">
          <div className="bg-muted absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2"></div>
          <ol className="relative z-10 flex justify-between">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex items-center justify-center">
                <div
                  className={cn(
                    'bg-background flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold',
                    step >= i
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-muted-foreground text-muted-foreground',
                  )}
                >
                  {step > i ? <Check className="h-4 w-4" /> : i}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="destination">Where do you want to go?</Label>
                <Popover open={openDestination} onOpenChange={setOpenDestination}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openDestination}
                      className="w-full justify-between"
                    >
                      {destination
                        ? destinations.find((d) => d.value === destination)?.label
                        : 'Select destination...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search destination..." />
                      <CommandList>
                        <CommandEmpty>No destination found.</CommandEmpty>
                        <CommandGroup>
                          {destinations.map((d) => (
                            <CommandItem
                              key={d.value}
                              value={d.value}
                              onSelect={(currentValue) => {
                                setDestination(currentValue === destination ? '' : currentValue);
                                setOpenDestination(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  destination === d.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              <MapPin className="text-muted-foreground mr-2 h-4 w-4" />
                              {d.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Or search for a specific hotel</Label>
                <div className="relative">
                  <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
                  <Input type="text" placeholder="Hotel name" className="pl-8" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>When do you want to stay?</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {date.from.toLocaleDateString()} - {date.to.toLocaleDateString()}
                          </>
                        ) : (
                          date.from.toLocaleDateString()
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={date}
                      onSelect={(date) => setDate(date as { from: Date; to: Date | undefined })}
                      numberOfMonths={2}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Or select a flexible date range</Label>
                <RadioGroup defaultValue="any">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="any-dates" />
                    <Label htmlFor="any-dates">Any dates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekend" id="weekend" />
                    <Label htmlFor="weekend">Weekend getaway</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="week" id="week" />
                    <Label htmlFor="week">Week-long stay</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Maximum budget per night</Label>
                  <span className="text-sm font-medium">${budget[0]}</span>
                </div>
                <Slider defaultValue={[200]} max={1000} step={10} onValueChange={setBudget} />
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>$50</span>
                  <span>$1000+</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Star rating</Label>
                <RadioGroup value={stars} onValueChange={setStars}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="any-stars" />
                    <Label htmlFor="any-stars">Any rating</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="3-stars" />
                    <Label htmlFor="3-stars">3+ stars</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="4-stars" />
                    <Label htmlFor="4-stars">4+ stars</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="5-stars" />
                    <Label htmlFor="5-stars">5 stars only</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white"
          >
            {step === 3 ? 'Create Alert' : 'Next'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
