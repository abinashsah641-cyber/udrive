'use client';

import React, { useState } from 'react';
import { MessageCircle, X, ShieldAlert } from 'lucide-react';

interface WhatsAppFloatProps {
  customMessage?: string;
  phoneNumber?: string;
}

export default function WhatsAppFloat({ customMessage, phoneNumber }: WhatsAppFloatProps) {
  const [showConfigNotice, setShowConfigNotice] = useState(false);

  // Read configured business WhatsApp number
  const configuredNumber = phoneNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  const message = encodeURIComponent(
    customMessage ||
      'Hello U Drive! Every Ride A New Story. I am interested in renting a vehicle in Nepal. Could you please share availability and rates?'
  );

  const handleClick = (e: React.MouseEvent) => {
    if (!configuredNumber) {
      e.preventDefault();
      setShowConfigNotice(true);
    }
  };

  const whatsappUrl = configuredNumber
    ? `https://wa.me/${configuredNumber.replace(/[^0-9]/g, '')}?text=${message}`
    : '#';

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {showConfigNotice && (
          <div className="max-w-xs bg-[#12161F] border border-[#FFD83D]/30 p-4 rounded-2xl shadow-2xl text-slate-200 text-xs animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="font-semibold text-[#FFD83D] flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                WhatsApp Direct Link
              </span>
              <button
                onClick={() => setShowConfigNotice(false)}
                className="text-slate-400 hover:text-white"
                aria-label="Close Notice"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="leading-relaxed text-slate-300">
              The official business WhatsApp number can be configured by the owner in the environment variables (<code className="text-[#FFD83D]">NEXT_PUBLIC_WHATSAPP_NUMBER</code>) or in the{' '}
              <a href="/admin" className="text-[#FFD83D] underline font-medium">
                Admin Dashboard
              </a>.
            </p>
          </div>
        )}

        <a
          href={whatsappUrl}
          target={configuredNumber ? '_blank' : '_self'}
          rel={configuredNumber ? 'noopener noreferrer' : undefined}
          onClick={handleClick}
          className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-3 rounded-full shadow-xl shadow-[#25D366]/25 hover:scale-105 active:scale-95 transition-all font-medium text-sm group"
          aria-label="Chat with U Drive on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline font-semibold">WhatsApp Assistance</span>
          <span className="sm:hidden font-semibold">Chat</span>
        </a>
      </div>
    </>
  );
}
