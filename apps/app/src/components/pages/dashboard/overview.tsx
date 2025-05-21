import { CreateAlertButton } from '@/components/pages/dashboard/components/create-alert-button';
import { HotelSearch } from '@/components/pages/dashboard/modules';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Bell, Hotel, Percent, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your hotel deal alerts.
          </p>
        </div>
        <CreateAlertButton />
      </div>

      <HotelSearch />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Bell className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-muted-foreground text-xs">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <Hotel className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-muted-foreground text-xs">+8 from last week</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Discount</CardTitle>
            <Percent className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-muted-foreground text-xs">+4% from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,248</div>
            <p className="text-muted-foreground text-xs">Based on current alerts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="rounded-2xl shadow-md lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Deals</CardTitle>
            <CardDescription>Your latest hotel deals based on your alerts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-muted h-16 w-16 rounded-md"></div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">Grand Hotel {i}</p>
                    <div className="flex items-center text-sm">
                      <span className="text-muted-foreground line-through">$299</span>
                      <span className="ml-2 font-medium text-green-600">$199</span>
                      <span className="ml-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        33% OFF
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href="/dashboard/deals"
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              View all deals
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
        <Card className="rounded-2xl shadow-md lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Your most recently created alerts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">New York City</p>
                    <p className="text-muted-foreground text-sm">Jun 15 - Jun 20 • $200/night</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href="/dashboard/alerts"
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              View all alerts
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
