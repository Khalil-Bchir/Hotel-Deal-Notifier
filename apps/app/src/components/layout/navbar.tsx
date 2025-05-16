'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Hotel, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  targetId: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#', targetId: 'hero' },
  { label: 'How It Works', href: '#how-it-works', targetId: 'how-it-works' },
  { label: 'Search', href: '#search-section', targetId: 'search-section' },
  { label: 'Top Picks', href: '#top-picks', targetId: 'top-picks' },
  //   { label: "Process", href: "#post-search-process", targetId: "post-search-process" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (targetId: string) => {
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        isScrolled ? 'shadow-sm backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="#"
              className="text-primary flex items-center space-x-2"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
              }}
            >
              <Hotel className="h-6 w-6" />
              <span className="text-lg font-bold md:text-xl">Hotel Deal Notifier</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-primary dark:hover:text-primary text-sm font-medium text-gray-700 transition-colors dark:text-gray-300"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.targetId);
                }}
              >
                {item.label}
              </Link>
            ))}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="bg-background shadow-lg md:hidden">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-primary dark:hover:text-primary py-2 text-sm font-medium text-gray-700 transition-colors dark:text-gray-300"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.targetId);
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
