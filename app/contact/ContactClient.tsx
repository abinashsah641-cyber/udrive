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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#28618F]/10 text-[#28618F] text-xs font-bold uppercase tracking-wider mb-3">
          <span>Get in Touch</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 font-semibold">Every Ride A New Story</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#080A0D] tracking-tight mt-1">
          Contact U Drive
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
          Have questions regarding vehicle availability, long-term rentals, or airport pickup in Kathmandu? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Channels Card */}
        <div className="md:col-span-5 bg-[#080A0D] text-white rounded-3xl p-8 space-y-6 border border-[#242933]">
          <h3 className="font-heading text-xl font-bold tracking-tight">Direct Channels</h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#FFD83D] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Direct Phone Line</strong>
                <a
                  href={`tel:${(settings.phone || '+977-9800899505').replace(/\s+/g, '')}`}
                  className="text-slate-300 hover:text-[#FFD83D] transition-colors font-medium text-sm"
                >
                  {settings.phone || '+977-9800899505'}
                </a>
                <span className="block text-slate-500 text-[11px] mt-0.5">Direct reservations & inquiry desk</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">WhatsApp Desk</strong>
                <a
                  href={`https://wa.me/9779800899505?text=${encodeURIComponent('Hello U Drive! I would like to inquire about vehicle rental availability in Nepal.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium text-sm"
                >
                  +977 9800899505
                </a>
                <span className="block text-slate-500 text-[11px] mt-0.5">Instant response via WhatsApp</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Official Email</strong>
                <a
                  href={`mailto:${settings.email || 'udriverentalcarservice@gmail.com'}`}
                  className="text-slate-300 hover:text-[#FFD83D] transition-colors font-medium text-xs break-all"
                >
                  {settings.email || 'udriverentalcarservice@gmail.com'}
                </a>
                <span className="block text-slate-500 text-[11px] mt-0.5">Corporate & advance inquiries</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#FFD83D] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Timezone & Operating Hours</strong>
                <span className="text-slate-300 font-medium">Asia/Kathmandu (NPT, UTC +05:45)</span>
                <span className="block text-slate-500 text-[11px] mt-0.5">7 Days a Week • 8:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Facebook Link */}
          <div className="pt-4 border-t border-[#242933]">
            <span className="text-[11px] uppercase font-bold text-slate-400 block mb-2">
              Official Social Profile
            </span>
            <a
              href={settings.facebookUrl || 'https://www.facebook.com/profile.php?id=61584871988112'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#28618F]/20 hover:bg-[#28618F]/30 text-[#60A5FA] border border-[#28618F]/40 text-xs font-semibold transition-all group"
            >
              <span>Follow U Drive on Facebook</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Pickup locations */}
          <div className="pt-4 border-t border-[#242933] space-y-2">
            <span className="text-[11px] uppercase font-bold text-slate-400 block">
              Configured Pickup Hubs
            </span>
            <ul className="space-y-1 text-xs text-slate-300">
              {settings.pickupLocations.map((loc, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD83D]" />
                  <span>{loc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-[#E4E5E2] p-8 shadow-sm space-y-6">
          <h3 className="font-heading text-xl font-bold text-[#080A0D]">Send an Online Inquiry</h3>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-base">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>Message Received</span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Thank you for contacting U Drive. A representative will review your message and connect via phone or WhatsApp shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 uppercase tracking-wider">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Thapa"
                    className="w-full bg-[#F7F7F4] border border-[#E4E5E2] rounded-xl px-3.5 py-3 text-sm text-[#080A0D] focus:outline-none focus:ring-2 focus:ring-[#080A0D]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 uppercase tracking-wider">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+977 98XXXXXXXX"
                    className="w-full bg-[#F7F7F4] border border-[#E4E5E2] rounded-xl px-3.5 py-3 text-sm text-[#080A0D] focus:outline-none focus:ring-2 focus:ring-[#080A0D]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@example.com"
                  className="w-full bg-[#F7F7F4] border border-[#E4E5E2] rounded-xl px-3.5 py-3 text-sm text-[#080A0D] focus:outline-none focus:ring-2 focus:ring-[#080A0D]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider">Message / Inquiry Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please specify vehicle preferences, rental dates, or pickup inquiries..."
                  className="w-full bg-[#F7F7F4] border border-[#E4E5E2] rounded-xl px-3.5 py-3 text-sm text-[#080A0D] focus:outline-none focus:ring-2 focus:ring-[#080A0D]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#080A0D] hover:bg-[#12161F] text-[#FFD83D] font-bold text-sm py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 font-heading"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
