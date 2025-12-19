'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Trophy, LogIn, Sparkles } from 'lucide-react';
import Link from 'next/link';
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
            ? 'backdrop-blur-xl bg-black/80 border-b border-white/20 shadow-2xl'
            : 'bg-gradient-to-b from-black/50 to-transparent'
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3 group z-50">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
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
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-full" />
                  )}
                </Link>
              ))}

              {/* CTA Buttons */}
              <div className="flex items-center gap-3 ml-6 pl-6 border-l border-white/20">
                <Link href="/nominate">
                  <Button className="bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 hover:from-yellow-600 hover:via-pink-600 hover:to-purple-600 shadow-lg hover:shadow-pink-500/50 transition-all hover:scale-105 group">
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
                        ? 'text-white bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      {link.label}
                      {pathname === link.href && (
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="space-y-4 pt-6 border-t border-white/20">
                <Link href="/nominate" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full py-6 text-lg bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 hover:from-yellow-600 hover:via-pink-600 hover:to-purple-600 shadow-xl group">
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
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">500+</div>
                    <div className="text-gray-400 text-xs mt-1">Nominees</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">50K+</div>
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