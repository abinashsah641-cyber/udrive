'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Shield, ArrowRight, AlertCircle, Car } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid credentials');
        setLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError('Network error, please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-midnight text-electric flex items-center justify-center mx-auto shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-midnight tracking-tight">
            UDrive Admin Portal
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to manage fleet inventory, pricing packages, and booking requests.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-midnight" />
              Administrator Passkey
            </label>
            <input
              type="password"
              required
              placeholder="Enter admin password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
            <span>Default local development password: </span>
            <code className="font-mono text-midnight font-bold bg-slate-200 px-1 py-0.5 rounded">
              udrive2026
            </code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-midnight hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 font-heading"
          >
            <span>{loading ? 'Authenticating...' : 'Access Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
