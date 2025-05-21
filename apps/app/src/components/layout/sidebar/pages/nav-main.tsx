'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    badge?: string | number;
    items?: {
      title: string;
      url: string;
      disabled?: boolean;
      badge?: string | number;
    }[];
  }[];
}) {
  // Track active items for a more interactive experience
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    items.forEach((item) => {
      if (item.isActive) {
        initial[item.title] = true;
      }
    });
    return initial;
  });

  const toggleActive = (title: string) => {
    setActiveItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium">
          Main Navigation
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.slice(0, 2).map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={activeItems[item.title]}
                onOpenChange={() => toggleActive(item.title)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon className="text-sidebar-accent-foreground" />}
                      <span>{item.title}</span>
                      {item.badge && (
                        <SidebarMenuBadge className="bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                      <ChevronRight className="text-sidebar-foreground/50 ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            {subItem.disabled ? (
                              <span
                                className={cn(
                                  'w-full cursor-not-allowed opacity-50',
                                  'flex items-center rounded-md p-2 text-sm outline-none transition-colors',
                                  'focus:bg-accent focus:text-accent-foreground',
                                  'hover:bg-accent hover:text-accent-foreground',
                                  'disabled:pointer-events-none disabled:opacity-50',
                                )}
                              >
                                {subItem.title}
                                {subItem.badge && (
                                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500/10 px-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                                    {subItem.badge}
                                  </span>
                                )}
                              </span>
                            ) : (
                              <a href={subItem.url} className="group w-full">
                                <span>{subItem.title}</span>
                                {subItem.badge && (
                                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500/10 px-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                                    {subItem.badge}
                                  </span>
                                )}
                              </a>
                            )}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium">
          Features
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.slice(2, 5).map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={activeItems[item.title]}
                onOpenChange={() => toggleActive(item.title)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon className="text-sidebar-accent-foreground" />}
                      <span>{item.title}</span>
                      {item.badge && (
                        <SidebarMenuBadge className="bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                      <ChevronRight className="text-sidebar-foreground/50 ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            {subItem.disabled ? (
                              <span
                                className={cn(
                                  'w-full cursor-not-allowed opacity-50',
                                  'flex items-center rounded-md p-2 text-sm outline-none transition-colors',
                                  'focus:bg-accent focus:text-accent-foreground',
                                  'hover:bg-accent hover:text-accent-foreground',
                                  'disabled:pointer-events-none disabled:opacity-50',
                                )}
                              >
                                {subItem.title}
                                {subItem.badge && (
                                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500/10 px-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                                    {subItem.badge}
                                  </span>
                                )}
                              </span>
                            ) : (
                              <a href={subItem.url} className="group w-full">
                                <span>{subItem.title}</span>
                                {subItem.badge && (
                                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500/10 px-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                                    {subItem.badge}
                                  </span>
                                )}
                              </a>
                            )}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium">
          Account
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.slice(5).map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={activeItems[item.title]}
                onOpenChange={() => toggleActive(item.title)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon className="text-sidebar-accent-foreground" />}
                      <span>{item.title}</span>
                      {item.badge && (
                        <SidebarMenuBadge className="bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                      <ChevronRight className="text-sidebar-foreground/50 ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            {subItem.disabled ? (
                              <span
                                className={cn(
                                  'w-full cursor-not-allowed opacity-50',
                                  'flex items-center rounded-md p-2 text-sm outline-none transition-colors',
                                  'focus:bg-accent focus:text-accent-foreground',
                                  'hover:bg-accent hover:text-accent-foreground',
                                  'disabled:pointer-events-none disabled:opacity-50',
                                )}
                              >
                                {subItem.title}
                                {subItem.badge && (
                                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500/10 px-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                                    {subItem.badge}
                                  </span>
                                )}
                              </span>
                            ) : (
                              <a href={subItem.url} className="group w-full">
                                <span>{subItem.title}</span>
                                {subItem.badge && (
                                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500/10 px-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                                    {subItem.badge}
                                  </span>
                                )}
                              </a>
                            )}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
