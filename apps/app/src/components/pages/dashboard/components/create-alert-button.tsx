'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { CreateAlertModal } from './create-alert-modal';

export function CreateAlertButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white"
      >
        <Plus className="mr-2 h-4 w-4" />
        Create Alert
      </Button>
      <CreateAlertModal open={open} onOpenChange={setOpen} />
    </>
  );
}
