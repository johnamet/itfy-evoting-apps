'use client';

import { Facebook, Twitter, Instagram, Linkedin, Youtube, Heart, Trophy, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useFooterStats, useFooterCategories } from '@/hooks/useFooterData';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Fetch real data from API
  const { data: stats, isLoading: statsLoading } = useFooterStats();
  const { data: categoriesData, isLoading: categoriesLoading } = useFooterCategories();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Events", href: "/events" },
        { label: "Nominate", href: "/nominate" },
      ]
    },
    {
      title: "Categories",
      links: categoriesLoading || !categoriesData?.data?.length
        ? [
            { label: "Best Developer", href: "/categories/developer" },
            { label: "Tech Innovator", href: "/categories/innovator" },
            { label: "Rising Star", href: "/categories/rising-star" },
            { label: "View All", href: "/categories" },
          ]
        : [
            ...categoriesData.data.slice(0, 3).map((cat) => ({
              label: cat.name,
              href: `/categories/${cat.slug || cat._id}`,
            })),
            { label: "View All", href: "/categories" },
          ]
    },
    {
      title: "Support",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Guidelines", href: "/guidelines" },
        { label: "Contact", href: "/contact" },
        { label: "Help Center", href: "/help" },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Voting Rules", href: "/voting-rules" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/itforyouthghanacollege/", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Twitter, href: "https://x.com/ITFORYOUTHGHANA", label: "Twitter", color: "hover:bg-sky-500" },
    { icon: Instagram, href: "https://www.instagram.com/itforyouthghana/", label: "Instagram", color: "hover:bg-itfy-primary" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/98944149/", label: "LinkedIn", color: "hover:bg-blue-700" },
    { icon: Youtube, href: "https://www.youtube.com/@ITforYouthGhana", label: "YouTube", color: "hover:bg-red-600" },
  ];

  return (
    <footer className="bg-black border-t border-white/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-itfy-navy/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-itfy-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-itfy-400/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-itfy-primary to-itfy-600 flex items-center justify-center shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">ITFY Ghana</h3>
                <p className="text-itfy-300 text-sm">Youth Tech Awards</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              IT for Youth Ghana empowers underserved youth with essential technology skills, building the next generation of tech leaders.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-gray-300 font-medium text-sm">Stay Updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-itfy-primary transition"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-itfy-primary to-itfy-600 hover:from-itfy-600 hover:to-itfy-700 rounded-lg text-white font-medium text-sm transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                {column.title}
                <div className="h-px flex-1 bg-gradient-to-r from-itfy-primary/50 to-transparent" />
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-itfy-300 transition flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-itfy-primary/0 group-hover:bg-itfy-primary transition" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links Section */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4 text-center md:text-left">Follow Our Journey</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:border-white/30 group`}
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 text-center">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-itfy-300 to-itfy-primary bg-clip-text text-transparent">
                  {statsLoading ? '...' : `${stats?.totalCandidates || 500}+`}
                </div>
                <div className="text-gray-400 text-sm">Nominees</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-itfy-400 to-itfy-light-blue bg-clip-text text-transparent">
                  {statsLoading ? '...' : `${Math.floor((stats?.totalVotes || 50000) / 1000)}K+`}
                </div>
                <div className="text-gray-400 text-sm">Votes</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {statsLoading ? '...' : `${stats?.totalCategories || 15}+`}
                </div>
                <div className="text-gray-400 text-sm">Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} IT For Youth Ghana. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>in Accra, Ghana</span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <Link href="/accessibility" className="text-gray-400 hover:text-itfy-300 transition">
                Accessibility
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/sitemap" className="text-gray-400 hover:text-itfy-300 transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-itfy-primary to-itfy-600 hover:from-itfy-600 hover:to-itfy-700 flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-50 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </footer>
  );
}