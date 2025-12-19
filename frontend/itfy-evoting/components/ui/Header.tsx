'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Trophy, LogIn } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // We'll create this helper

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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/categories', label: 'Categories' },
    { href: '/nominees', label: 'Nominees' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ITFY Ghana</h1>
              <p className="text-xs text-gray-300 -mt-1">Youth Tech Awards</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-lg font-medium transition-colors relative',
                  pathname === link.href
                    ? 'text-purple-400'
                    : 'text-white hover:text-purple-300'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400" />
                )}
              </Link>
            ))}

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 ml-8">
              <Link href="/nominate">
                <Button className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 shadow-lg px-6 py-3 text-lg">
                  Nominate Now
                </Button>
              </Link>

              <Link href="/login">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 px-6 py-3 text-lg">
                  <LogIn className="w-5 h-5 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white"
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-black/90 border-b border-white/20 shadow-2xl">
          <nav className="container mx-auto px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'text-2xl font-medium transition-colors',
                  pathname === link.href ? 'text-purple-400' : 'text-white'
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-6 border-t border-white/20 flex flex-col gap-4">
              <Link href="/nominate" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full py-6 text-xl bg-gradient-to-r from-pink-500 to-yellow-500">
                  Nominate Now
                </Button>
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full py-6 text-xl border-white/40">
                  <LogIn className="w-6 h-6 mr-3" />
                  Login
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}