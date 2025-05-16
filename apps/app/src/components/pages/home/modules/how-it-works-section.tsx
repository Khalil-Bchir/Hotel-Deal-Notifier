import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { howItWorksSteps } from '@/lib/data';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="max-w-3xl space-y-2">
            <Badge variant="outline" className="mb-2">
              Price Tracking
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Never miss a price drop again with our automated hotel price tracking system.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-6 lg:grid-cols-3 lg:gap-12">
          {howItWorksSteps.map((step) => (
            <Card
              key={step.id}
              className="border-primary/20 border-2 transition-all duration-200 hover:shadow-md"
            >
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="text-xl font-bold">{step.id}</span>
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
