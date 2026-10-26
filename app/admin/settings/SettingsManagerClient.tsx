'use client';

import React, { useState } from 'react';
import { SiteSettings } from '@/types';
import { Save, Check, Plus, Trash2, MapPin, Phone, MessageCircle, Mail, Globe } from 'lucide-react';

interface SettingsManagerClientProps {
  initialSettings: SiteSettings;
}

export default function SettingsManagerClient({ initialSettings }: SettingsManagerClientProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [newLocation, setNewLocation] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddLocation = () => {
    if (!newLocation.trim()) return;
    setSettings((prev) => ({
      ...prev,
      pickupLocations: [...prev.pickupLocations, newLocation.trim()],
    }));
    setNewLocation('');
  };

  const handleRemoveLocation = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      pickupLocations: prev.pickupLocations.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
      } else {
        alert(data.error || 'Failed to save settings');
      }
    } catch (err: any) {
      alert('Error updating site settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Site settings successfully updated and saved to database!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 text-xs">
        {/* Contact Channels */}
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-midnight pb-2 border-b border-slate-100 flex items-center gap-2">
            <Phone className="w-4 h-4 text-midnight" />
            <span>Contact Channels & Social Media</span>
          </h3>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              Official WhatsApp Number (Country code + digits, e.g. 9779801234567)
            </label>
            <input
              type="text"
              placeholder="e.g. 9779801234567"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
            />
            <p className="text-[11px] text-slate-400">
              Used for floating WhatsApp button and prefilled booking messages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                Business Phone
              </label>
              <input
                type="text"
                placeholder="e.g. +977-1-4XXXXXX"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                Notification Email
              </label>
              <input
                type="email"
                placeholder="info@udrive.com.np"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              Facebook Page URL
            </label>
            <input
              type="url"
              value={settings.facebookUrl}
              onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight font-mono"
            />
          </div>
        </div>

        {/* Pickup & Return Locations */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-heading text-lg font-bold text-midnight pb-2 border-b border-slate-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-midnight" />
            <span>Configured Pickup & Return Locations</span>
          </h3>

          <div className="space-y-2">
            {settings.pickupLocations.map((loc, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200"
              >
                <span className="font-medium text-slate-800">{loc}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveLocation(i)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title="Remove location"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add location */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add new pickup hub (e.g. Biratnagar Airport)..."
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
            />
            <button
              type="button"
              onClick={handleAddLocation}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-midnight hover:bg-slate-800 text-white font-bold px-7 py-3 rounded-xl text-xs shadow-md transition-all flex items-center gap-2 font-heading"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Settings...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
