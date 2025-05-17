import { Spinner } from './spinner';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export function Loading({ message = 'Loading...', fullScreen = false }: LoadingProps) {
  if (fullScreen) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Spinner />
          <p className="text-muted-foreground text-sm">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center py-12">
      <div className="flex flex-col items-center space-y-4">
        <Spinner />
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </div>
  );
}
