'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  Bell,
  Bookmark,
  Calendar,
  CreditCard,
  Home,
  Hotel,
  Map,
  Percent,
  Search,
  Settings,
  Tag,
} from 'lucide-react';
import type * as React from 'react';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    navMain: [
      {
        title: 'Dashboard',
        url: '/',
        icon: Home,
        isActive: true,
        items: [
          {
            title: 'Overview',
            url: '/',
            disabled: false,
          },
          {
            title: 'Analytics',
            url: '/analytics',
            disabled: false,
          },
        ],
      },
      {
        title: 'Hotel Deals',
        url: '#',
        icon: Percent,
        isActive: true,
        items: [
          {
            title: 'Latest Deals',
            url: '/deals',
            disabled: false,
          },
          {
            title: 'Flash Sales',
            url: '/deals/flash',
            disabled: false,
          },
          {
            title: 'Seasonal Offers',
            url: '/deals/seasonal',
            disabled: false,
          },
        ],
      },
      {
        title: 'My Alerts',
        url: '#',
        icon: Bell,
        items: [
          {
            title: 'Active Alerts',
            url: '/alerts',
            disabled: false,
          },
          {
            title: 'Create Alert',
            url: '/alerts/new',
            disabled: false,
          },
          {
            title: 'Alert History',
            url: '/alerts/history',
            disabled: false,
          },
        ],
      },
      {
        title: 'Saved Hotels',
        url: '/saved',
        icon: Bookmark,
        items: [
          {
            title: 'Favorites',
            url: '/saved/favorites',
            disabled: false,
          },
          {
            title: 'Watch List',
            url: '/saved/watchlist',
            disabled: false,
          },
        ],
      },
      {
        title: 'Explore',
        url: '#',
        icon: Search,
        items: [
          {
            title: 'Search Hotels',
            url: '/explore/search',
            disabled: false,
          },
          {
            title: 'Popular Destinations',
            url: '/explore/destinations',
            disabled: false,
          },
          {
            title: 'Map View',
            url: '/explore/map',
            disabled: false,
          },
        ],
      },
      {
        title: 'Bookings',
        url: '#',
        icon: Calendar,
        items: [
          {
            title: 'Upcoming Stays',
            url: '/bookings/upcoming',
            disabled: false,
          },
          {
            title: 'Booking History',
            url: '/bookings/history',
            disabled: false,
          },
        ],
      },
      {
        title: 'Settings',
        url: '#',
        icon: Settings,
        items: [
          {
            title: 'Account Settings',
            url: '/settings/account',
            disabled: false,
          },
          {
            title: 'Notification Preferences',
            url: '/settings/notifications',
            disabled: false,
          },
          {
            title: 'Payment Methods',
            url: '/settings/payment',
            disabled: false,
          },
        ],
      },
    ],
    projects: [
      {
        name: 'Summer Vacation',
        url: '/trips/summer',
        icon: Hotel,
      },
      {
        name: 'Business Trip',
        url: '/trips/business',
        icon: CreditCard,
      },
      {
        name: 'Weekend Getaway',
        url: '/trips/weekend',
        icon: Map,
      },
    ],
  };

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader className="border-sidebar-border/50 border-b pb-4">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-sidebar-border/50 border-t pt-2">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
