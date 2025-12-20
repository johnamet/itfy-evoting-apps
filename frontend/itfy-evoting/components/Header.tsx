'use client';

import { useState, useEffect } from 'react';
import { Menu, X, LogIn, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/categories', label: 'Categories' },
    { href: '/nominees', label: 'Nominees' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'backdrop-blur-xl bg-black/90 border-b border-white/20 shadow-2xl'
            : 'backdrop-blur-md bg-gradient-to-b from-black/70 via-black/50 to-transparent'
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3 group z-50">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-itfy-primary via-itfy-500 to-itfy-300 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform overflow-hidden">
                  <Image
                    src="/Asset-1.png"
                    alt="ITFY Ghana Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-itfy-primary to-itfy-600 blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-itfy-300 via-itfy-primary to-itfy-light-blue bg-clip-text text-transparent">
                  ITFY Ghana
                </h1>
                <p className="text-xs text-gray-400 -mt-1 font-medium">Youth Tech Awards</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-all relative group rounded-lg',
                    pathname === link.href
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-itfy-primary via-itfy-400 to-itfy-light-blue rounded-full" />
                  )}
                </Link>
              ))}

              {/* CTA Buttons */}
              <div className="flex items-center gap-3 ml-6 pl-6 border-l border-white/20">
                <Link href="/nominate">
                  <Button className="bg-gradient-to-r from-itfy-primary via-itfy-500 to-itfy-600 hover:from-itfy-600 hover:via-itfy-primary hover:to-itfy-500 shadow-lg hover:shadow-itfy-primary/50 transition-all hover:scale-105 group">
                    <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Nominate
                  </Button>
                </Link>

                <Link href="/login">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition z-50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="fixed top-20 left-0 right-0 bottom-0 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="container mx-auto px-6 py-8">
              {/* Navigation Links */}
              <div className="space-y-2 mb-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'block px-6 py-4 text-lg font-medium transition-all rounded-xl',
                      pathname === link.href
                        ? 'text-white bg-gradient-to-r from-itfy-primary/20 to-itfy-600/20 border border-itfy-primary/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      {link.label}
                      {pathname === link.href && (
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-itfy-primary to-itfy-600" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="space-y-4 pt-6 border-t border-white/20">
                <Link href="/nominate" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full py-6 text-lg bg-gradient-to-r from-itfy-primary via-itfy-500 to-itfy-600 hover:from-itfy-600 hover:via-itfy-primary hover:to-itfy-500 shadow-xl group">
                    <Sparkles className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                    Nominate Someone
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full py-6 text-lg border-white/30 text-white hover:bg-white/10">
                    <LogIn className="w-5 h-5 mr-3" />
                    Login to Vote
                  </Button>
                </Link>
              </div>

              {/* Mobile Footer Info */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-itfy-300 to-itfy-primary bg-clip-text text-transparent">500+</div>
                    <div className="text-gray-400 text-xs mt-1">Nominees</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-itfy-400 to-itfy-light-blue bg-clip-text text-transparent">50K+</div>
                    <div className="text-gray-400 text-xs mt-1">Votes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">15+</div>
                    <div className="text-gray-400 text-xs mt-1">Categories</div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}