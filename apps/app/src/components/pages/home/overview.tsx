import { ThemeToggle } from '@/components/common/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold">
            <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
              Hotel Deal Notifier
            </span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/broll.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          {/* --- DARK/BLUR OVERLAY ------------------------------------ */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* --- FOREGROUND CONTENT ----------------------------------- */}
          <div className="container relative z-10 py-24 md:py-32">
            <div className="mx-auto max-w-3xl text-center text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Never Miss a{' '}
                <span className="bg-gradient-to-r from-indigo-300 to-blue-200 bg-clip-text text-transparent">
                  Hotel Deal
                </span>{' '}
                Again
              </h1>
              <p className="mt-6 text-lg text-gray-200">
                Get notified instantly when hotel prices drop for your favorite destinations. Save
                up to&nbsp;40% on your next vacation.
              </p>
            </div>

            {/* --- CALLS TO ACTION ------------------------------------- */}
            <div className="mx-auto mt-12 flex max-w-md flex-col gap-4">
              <div className="flex justify-center gap-4">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-500/30"
                  >
                    Get&nbsp;Started
                  </Button>
                </Link>

                <Link href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 bg-white/20 text-white hover:bg-white/30"
                  >
                    Learn&nbsp;More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="container py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Set up alerts for your favorite destinations and get notified when prices drop.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Create Alerts',
                description:
                  'Set up custom alerts for your favorite destinations, dates, and budget.',
              },
              {
                title: 'Get Notified',
                description:
                  'Receive instant notifications when prices drop for your saved alerts.',
              },
              {
                title: 'Book & Save',
                description:
                  'Book directly through our partner sites and save up to 40% on your stay.',
              },
            ].map((feature, index) => (
              <Card key={index} className="rounded-2xl shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t py-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground text-center text-sm md:text-left">
            &copy; {new Date().getFullYear()} HotelDealNotifier. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
              Terms
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
              Privacy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
