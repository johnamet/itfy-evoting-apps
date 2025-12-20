'use client';

import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';

export default function ContactSection() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "info@itforyouthghana.org",
      href: "mailto:info@itforyouthghana.org",
      color: "from-itfy-primary to-itfy-600"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+233 596 244 834",
      href: "tel:+233596244834",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Hno. L529, Gecko Street\nKwabenya-Musuku, Accra, Ghana",
      href: "https://maps.google.com/?q=Kwabenya-Musuku,+Accra,+Ghana",
      color: "from-green-500 to-teal-500"
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-itfy-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-itfy-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-itfy-primary/10 backdrop-blur-sm px-6 py-3 rounded-full border border-itfy-primary/20 mb-6">
            <MessageCircle className="w-5 h-5 text-itfy-300" />
            <span className="text-itfy-300 font-medium">Get in Touch</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            We'd Love to
            <span className="block mt-2 bg-gradient-to-r from-itfy-300 via-itfy-primary to-itfy-light-blue bg-clip-text text-transparent">
              Hear From You
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have questions about nominations, voting, or partnerships? Our team is here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <GlassCard 
                    key={index} 
                    className="group p-6 hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm mb-1">{method.title}</p>
                        <a 
                          href={method.href} 
                          className="text-xl text-white hover:text-itfy-300 transition font-medium break-words"
                        >
                          {method.value}
                        </a>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>

            {/* Business Hours */}
            <GlassCard className="p-8 bg-gradient-to-br from-itfy-primary/10 to-itfy-400/10 border-itfy-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-itfy-primary to-itfy-600 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Business Hours</h3>
              </div>
              <div className="space-y-4">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                    <span className="text-gray-300 font-medium">{schedule.day}</span>
                    <span className="text-white font-semibold">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden h-64 border border-white/10 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.872258775813!2d-0.224785!3d5.570833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9d4e4b9e0b0b%3A0x8e8f8e8f8e8f8e8f!2sAccra%20Digital%20Centre!5e0!3m2!1sen!2sgh!4v1630000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <GlassCard className="p-8 lg:p-10 bg-gradient-to-br from-white/5 to-white/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-itfy-primary to-itfy-600 flex items-center justify-center">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">Send us a Message</h3>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-itfy-primary focus:ring-2 focus:ring-itfy-primary/20 transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-itfy-primary focus:ring-2 focus:ring-itfy-primary/20 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-itfy-primary focus:ring-2 focus:ring-itfy-primary/20 transition"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-itfy-primary focus:ring-2 focus:ring-itfy-primary/20 transition resize-none"
                />
              </div>

              <Button 
                className="w-full py-6 text-lg bg-gradient-to-r from-itfy-primary via-itfy-600 to-itfy-primary hover:from-itfy-600 hover:via-itfy-700 hover:to-itfy-600 shadow-2xl hover:shadow-itfy-primary/50 transition-all hover:scale-[1.02] group"
              >
                <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                Send Message
              </Button>

              <p className="text-gray-400 text-sm text-center">
                We typically respond within 24 hours
              </p>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}