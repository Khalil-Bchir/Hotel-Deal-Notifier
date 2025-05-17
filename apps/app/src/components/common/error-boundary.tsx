'use client';

import { Button } from '@/components/ui/button';
import type React from 'react';
import { useEffect, useState } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error('Caught error:', error);
      setHasError(true);
      setError(error.error);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="flex min-h-[400px] w-full flex-col items-center justify-center p-8 text-center">
        <h2 className="mb-2 text-2xl font-bold">Something went wrong</h2>
        <p className="text-muted-foreground mb-6">
          {error?.message || 'An unexpected error occurred. Please try again later.'}
        </p>
        <Button onClick={() => window.location.reload()}>Refresh the page</Button>
      </div>
    );
  }

  return <>{children}</>;
}
