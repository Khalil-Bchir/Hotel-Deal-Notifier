'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  city: string;
}

export default function ConfirmationDialog({ open, onOpenChange, city }: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thank you for signing up!</DialogTitle>
          <DialogDescription>
            We&apos;ll start tracking hotel prices for your trip to {city} and notify you of any
            price drops.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
