'use client';

import React, { useState } from 'react';
import { SiteSettings } from '@/types';
import { Phone, Mail, Clock, ExternalLink, MessageCircle, Send, Check } from 'lucide-react';

interface ContactClientProps {
  settings: SiteSettings;
}

export default function ContactClient({ settings }: ContactClientProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
          Get in Touch
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-midnight tracking-tight mt-1">
          Contact UDrive Rental Service
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
          Have questions regarding vehicle availability, long-term rentals, or airport pickup in Kathmandu? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Channels Card */}
        <div className="md:col-span-5 bg-midnight text-white rounded-3xl p-8 space-y-6">
          <h3 className="font-heading text-xl font-bold tracking-tight">Direct Channels</h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-electric shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Phone & Support</strong>
                <span className="text-slate-400">
                  {settings.phone || 'Phone number available upon booking inquiry confirmation'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">WhatsApp Desk</strong>
                <span className="text-slate-400">
                  {settings.whatsappNumber || 'Configure in Admin Settings'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-electric shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Timezone & Operating Hours</strong>
                <span className="text-slate-400">Asia/Kathmandu (NPT, UTC +05:45)</span>
              </div>
            </div>
          </div>

          {/* Facebook Link */}
          <div className="pt-4 border-t border-slate-800">
            <span className="text-[11px] uppercase font-bold text-slate-400 block mb-2">
              Official Social Profile
            </span>
            <a
              href={settings.facebookUrl || 'https://www.facebook.com/profile.php?id=61584871988112'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all group"
            >
              <span>Follow UDrive on Facebook</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Pickup locations */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[11px] uppercase font-bold text-slate-400 block">
              Configured Pickup Hubs
            </span>
            <ul className="space-y-1 text-xs text-slate-300">
              {settings.pickupLocations.map((loc, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric" />
                  <span>{loc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-5">
          <h3 className="font-heading text-xl font-bold text-midnight">Send an Inquiry</h3>
          <p className="text-xs text-slate-500">
            Have a custom fleet inquiry or corporate leasing question? Leave a message below.
          </p>

          {submitted && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Your inquiry has been received. Our team will contact you.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Your full name"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="Your phone number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Your Message</label>
              <textarea
                rows={4}
                required
                placeholder="Tell us about your rental requirements, travel dates, or questions..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
              />
            </div>

            <button
              type="submit"
              className="bg-midnight hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center gap-2 font-heading shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Inquiry</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
