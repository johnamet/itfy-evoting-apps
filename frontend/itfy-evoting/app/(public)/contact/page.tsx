'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  Clock,
  CheckCircle2,
  Loader2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  HelpCircle,
  Users,
  Sparkles,
  Building2,
  Headphones
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "info@itforyouthghana.org",
      href: "mailto:info@itforyouthghana.org",
      description: "Send us an email anytime",
      color: "from-[#0152be] to-sky-500"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+233 596 244 834",
      href: "tel:+233596244834",
      description: "Mon-Fri from 9am to 6pm",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Hno. L529, Gecko Street",
      secondValue: "Kwabenya-Musuku, Accra",
      href: "https://maps.google.com/?q=Kwabenya-Musuku,+Accra,+Ghana",
      description: "Visit our headquarters",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM", isOpen: true },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM", isOpen: true },
    { day: "Sunday", hours: "Closed", isOpen: false }
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry", icon: HelpCircle },
    { value: "voting", label: "Voting & Nominations", icon: Sparkles },
    { value: "partnership", label: "Partnership Opportunities", icon: Users },
    { value: "sponsorship", label: "Sponsorship", icon: Building2 },
    { value: "support", label: "Technical Support", icon: Headphones },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/itforyouthghana", label: "Facebook", color: "hover:text-blue-500" },
    { icon: Twitter, href: "https://twitter.com/itforyouthghana", label: "Twitter", color: "hover:text-sky-400" },
    { icon: Instagram, href: "https://instagram.com/itforyouthghana", label: "Instagram", color: "hover:text-pink-500" },
    { icon: Linkedin, href: "https://linkedin.com/company/itforyouthghana", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: Youtube, href: "https://youtube.com/itforyouthghana", label: "YouTube", color: "hover:text-red-500" },
  ];

  const faqs = [
    {
      question: "How do I nominate someone for the Youth Tech Awards?",
      answer: "You can nominate someone by visiting our Nominations page and filling out the nomination form. Make sure to provide detailed information about the nominee's achievements."
    },
    {
      question: "How does the voting process work?",
      answer: "Voting is done through our secure e-voting platform. You need to purchase a vote code bundle and use the code to cast your votes for your favorite nominees."
    },
    {
      question: "Can I volunteer with IT for Youth Ghana?",
      answer: "Yes! We welcome volunteers who are passionate about technology and youth empowerment. Contact us through this form or email us directly."
    },
    {
      question: "How can my organization become a partner?",
      answer: "We're always looking for partners who share our vision. Select 'Partnership Opportunities' in the form above and tell us about your organization."
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      category: '',
      message: '',
    });
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <AnnouncementBar />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0152be]/20 via-black to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#0152be]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#0152be]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#0152be]/20 mb-8">
              <MessageCircle className="w-5 h-5 text-sky-400" />
              <span className="text-sky-300 font-medium">Get in Touch</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              We&apos;d Love to
              <span className="block mt-2 bg-gradient-to-r from-sky-300 via-[#0152be] to-sky-500 bg-clip-text text-transparent">
                Hear From You
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Have questions about nominations, voting, or partnerships? Our team is here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Cards */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={index}
                  href={method.href}
                  target={method.icon === MapPin ? "_blank" : undefined}
                  rel={method.icon === MapPin ? "noopener noreferrer" : undefined}
                  className="group"
                >
                  <GlassCard className="p-6 h-full hover:scale-[1.02] transition-all duration-300 hover:border-[#0152be]/50">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{method.title}</h3>
                    <p className="text-white font-medium mb-1">{method.value}</p>
                    {method.secondValue && (
                      <p className="text-white font-medium mb-1">{method.secondValue}</p>
                    )}
                    <p className="text-gray-400 text-sm">{method.description}</p>
                  </GlassCard>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content - Form and Info */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
            {/* Contact Form - Takes 3 columns */}
            <div className="lg:col-span-3">
              <GlassCard className="p-8 lg:p-10">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                    <p className="text-gray-300 mb-8 max-w-md mx-auto">
                      Thank you for reaching out. We&apos;ve received your message and will get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-[#0152be] hover:bg-[#0152be]/90"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0152be] to-sky-500 flex items-center justify-center">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
                        <p className="text-gray-400 text-sm">Fill out the form below and we&apos;ll get back to you</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={`bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#0152be] focus:ring-[#0152be]/50 ${errors.name ? 'border-red-500' : ''}`}
                          />
                          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#0152be] focus:ring-[#0152be]/50 ${errors.email ? 'border-red-500' : ''}`}
                          />
                          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+233 XXX XXX XXX"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#0152be] focus:ring-[#0152be]/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-300">Inquiry Type</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => handleInputChange('category', value)}
                          >
                            <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white focus:ring-[#0152be]/50">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              {inquiryTypes.map((type) => {
                                const TypeIcon = type.icon;
                                return (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                    className="text-white focus:bg-gray-700 focus:text-white"
                                  >
                                    <div className="flex items-center gap-2">
                                      <TypeIcon className="w-4 h-4 text-gray-400" />
                                      {type.label}
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-gray-300">Subject *</Label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder="How can we help you?"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          className={`bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#0152be] focus:ring-[#0152be]/50 ${errors.subject ? 'border-red-500' : ''}`}
                        />
                        {errors.subject && <p className="text-red-400 text-sm">{errors.subject}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-300">Message *</Label>
                        <Textarea
                          id="message"
                          rows={6}
                          placeholder="Tell us more about your inquiry..."
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className={`bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#0152be] focus:ring-[#0152be]/50 resize-none ${errors.message ? 'border-red-500' : ''}`}
                        />
                        {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}
                        <p className="text-gray-500 text-sm text-right">{formData.message.length} / 1000 characters</p>
                      </div>

                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 text-lg bg-gradient-to-r from-[#0152be] via-sky-600 to-[#0152be] hover:from-sky-600 hover:via-[#0152be] hover:to-sky-600 shadow-2xl hover:shadow-[#0152be]/50 transition-all hover:scale-[1.02] group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                            Send Message
                          </>
                        )}
                      </Button>

                      <p className="text-gray-400 text-sm text-center">
                        We typically respond within 24 hours
                      </p>
                    </form>
                  </>
                )}
              </GlassCard>
            </div>

            {/* Sidebar Info - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Business Hours */}
              <GlassCard className="p-6 bg-gradient-to-br from-[#0152be]/10 to-sky-500/10 border-[#0152be]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0152be] to-sky-500 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                      <span className="text-gray-300">{schedule.day}</span>
                      <span className={`font-medium ${schedule.isOpen ? 'text-white' : 'text-gray-500'}`}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Social Links */}
              <GlassCard className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Stay connected with us on social media for the latest updates and announcements.
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-11 h-11 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 transition-all hover:scale-110 ${social.color}`}
                        aria-label={social.label}
                      >
                        <SocialIcon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </GlassCard>

              {/* Map */}
              <GlassCard className="p-2 overflow-hidden">
                <div className="rounded-lg overflow-hidden h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.872258775813!2d-0.224785!3d5.570833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9d4e4b9e0b0b%3A0x8e8f8e8f8e8f8e8f!2sAccra%20Digital%20Centre!5e0!3m2!1sen!2sgh!4v1630000000000"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    title="IT for Youth Ghana Office Location"
                    className="border-0 grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0152be]/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find quick answers to common questions about our platform and services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <GlassCard key={index} className="p-6 hover:border-[#0152be]/30 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#0152be] flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-400 ml-8">{faq.answer}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0152be]/20 via-sky-600/20 to-[#0152be]/20" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <GlassCard className="p-12 text-center max-w-4xl mx-auto bg-gradient-to-br from-[#0152be]/20 to-sky-500/20 border-[#0152be]/30">
            <Sparkles className="w-12 h-12 text-[#0152be] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join us in empowering the next generation of tech leaders in Ghana. 
              Nominate someone today or explore partnership opportunities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                className="px-8 py-6 text-lg bg-white text-[#0152be] hover:bg-gray-100 shadow-xl"
              >
                <Link href="/nominees">Browse Nominees</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-8 py-6 text-lg border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/events">View Events</Link>
              </Button>
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
