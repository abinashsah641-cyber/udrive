'use client';

import React, { useState } from 'react';
import { Vehicle } from '@/types';
import { formatNPR } from '@/lib/pricing';
import {
  Edit,
  Plus,
  Check,
  X,
  Eye,
  EyeOff,
  Wrench,
  Sparkles,
  Search,
  ShieldCheck,
  ShieldAlert,
  Car,
} from 'lucide-react';

interface VehiclesManagerClientProps {
  initialVehicles: Vehicle[];
}

export default function VehiclesManagerClient({ initialVehicles }: VehiclesManagerClientProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [search, setSearch] = useState('');
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const filtered = vehicles.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.color.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (v: Vehicle) => {
    setEditingVehicle({ ...v });
    setSaveMessage(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;

    setIsSaving(true);
    setSaveMessage(null);

    try {
      const res = await fetch(`/api/vehicles/${editingVehicle.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingVehicle),
      });

      const data = await res.json();
      if (data.success && data.vehicle) {
        setVehicles((prev) =>
          prev.map((item) => (item.id === data.vehicle.id ? data.vehicle : item))
        );
        setSaveMessage('Vehicle updated successfully!');
        setTimeout(() => {
          setEditingVehicle(null);
          setSaveMessage(null);
        }, 1200);
      } else {
        alert(data.error || 'Failed to update vehicle');
      }
    } catch (err: any) {
      alert('Error saving vehicle changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuickTogglePublish = async (vehicle: Vehicle) => {
    const updated = !vehicle.isPublished;
    try {
      const res = await fetch(`/api/vehicles/${vehicle.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: updated }),
      });
      const data = await res.json();
      if (data.success) {
        setVehicles((prev) =>
          prev.map((item) => (item.id === vehicle.id ? { ...item, isPublished: updated } : item))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuickToggleFeatured = async (vehicle: Vehicle) => {
    const updated = !vehicle.isFeatured;
    try {
      const res = await fetch(`/api/vehicles/${vehicle.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: updated }),
      });
      const data = await res.json();
      if (data.success) {
        setVehicles((prev) =>
          prev.map((item) => (item.id === vehicle.id ? { ...item, isFeatured: updated } : item))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search fleet by model, color, year..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
          />
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="font-semibold text-slate-500">
            Total Fleet: <strong className="text-midnight">{vehicles.length}</strong>
          </span>
        </div>
      </div>

      {/* Fleet Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800 font-heading">
                <th className="py-3.5 px-4 font-bold">Vehicle</th>
                <th className="py-3.5 px-3 font-bold">Category</th>
                <th className="py-3.5 px-3 font-bold">Daily Rate</th>
                <th className="py-3.5 px-3 font-bold">7d / 15d / 30d Packages</th>
                <th className="py-3.5 px-3 font-bold">Status</th>
                <th className="py-3.5 px-3 font-bold text-center">Featured</th>
                <th className="py-3.5 px-3 font-bold text-center">Published</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-7 bg-midnight rounded p-0.5 shrink-0 flex items-center justify-center">
                        <img
                          src={v.image || '/images/vehicles/fallback-car.svg'}
                          alt={v.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="font-bold block text-midnight">{v.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {v.color} ({v.year})
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                        v.category === 'electric'
                          ? 'bg-electric/20 text-midnight'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {v.category} • {v.bodyStyle}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-midnight">
                    {formatNPR(v.dailyRate)}
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                    <div>7d: {formatNPR(v.weeklyRate)}</div>
                    <div>15d: {formatNPR(v.fifteenDayRate)}</div>
                    <div className="text-emerald-700 font-bold">30d: {formatNPR(v.monthlyRate)}</div>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        v.maintenanceStatus === 'operational'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {v.maintenanceStatus}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => handleQuickToggleFeatured(v)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        v.isFeatured
                          ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                          : 'text-slate-300 hover:text-slate-500'
                      }`}
                      title={v.isFeatured ? 'Featured on homepage' : 'Not featured'}
                    >
                      <Sparkles className="w-4 h-4 fill-current" />
                    </button>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => handleQuickTogglePublish(v)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        v.isPublished
                          ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                          : 'text-slate-300 hover:text-slate-500'
                      }`}
                      title={v.isPublished ? 'Publicly visible' : 'Hidden from catalog'}
                    >
                      {v.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleEdit(v)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Vehicle Modal */}
      {editingVehicle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-heading text-xl font-bold text-midnight">
                  Edit Vehicle: {editingVehicle.name}
                </h3>
                <p className="text-xs text-slate-500">Update rates, specifications, and visibility.</p>
              </div>
              <button
                onClick={() => setEditingVehicle(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{saveMessage}</span>
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Model Display Name</label>
                  <input
                    type="text"
                    required
                    value={editingVehicle.name}
                    onChange={(e) =>
                      setEditingVehicle({ ...editingVehicle, name: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Color</label>
                  <input
                    type="text"
                    required
                    value={editingVehicle.color}
                    onChange={(e) =>
                      setEditingVehicle({ ...editingVehicle, color: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Model Year</label>
                  <input
                    type="number"
                    required
                    value={editingVehicle.year}
                    onChange={(e) =>
                      setEditingVehicle({ ...editingVehicle, year: Number(e.target.value) })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Ground Clearance</label>
                  <input
                    type="text"
                    required
                    value={editingVehicle.groundClearance}
                    onChange={(e) =>
                      setEditingVehicle({ ...editingVehicle, groundClearance: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Range / Mileage Specification</label>
                  <input
                    type="text"
                    required
                    value={editingVehicle.rangeOrMileage}
                    onChange={(e) =>
                      setEditingVehicle({ ...editingVehicle, rangeOrMileage: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Maintenance Status</label>
                  <select
                    value={editingVehicle.maintenanceStatus}
                    onChange={(e) =>
                      setEditingVehicle({
                        ...editingVehicle,
                        maintenanceStatus: e.target.value as any,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-midnight"
                  >
                    <option value="operational">Operational & Ready</option>
                    <option value="maintenance">Under Maintenance</option>
                    <option value="unavailable">Temporarily Unavailable</option>
                  </select>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="pt-3 border-t border-slate-100">
                <span className="font-bold text-slate-800 block mb-2">
                  Official Rates & Package Pricing (NPR)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-600 font-semibold">Daily Rate</label>
                    <input
                      type="number"
                      required
                      value={editingVehicle.dailyRate}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          dailyRate: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-600 font-semibold">7 Days (Weekly)</label>
                    <input
                      type="number"
                      required
                      value={editingVehicle.weeklyRate}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          weeklyRate: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-600 font-semibold">15 Days</label>
                    <input
                      type="number"
                      required
                      value={editingVehicle.fifteenDayRate}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          fifteenDayRate: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-600 font-semibold">30 Days (Monthly)</label>
                    <input
                      type="number"
                      required
                      value={editingVehicle.monthlyRate}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          monthlyRate: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Verification & Notes */}
              <div className="space-y-1 pt-2">
                <label className="font-bold text-slate-700">Verification Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Range specification confirmed by owner..."
                  value={editingVehicle.verificationNote || ''}
                  onChange={(e) =>
                    setEditingVehicle({ ...editingVehicle, verificationNote: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingVehicle.rangeVerified}
                    onChange={(e) =>
                      setEditingVehicle({ ...editingVehicle, rangeVerified: e.target.checked })
                    }
                    className="rounded border-slate-300 accent-midnight"
                  />
                  <span>Range Verified & Confirmed</span>
                </label>

                <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingVehicle.isFeatured}
                    onChange={(e) =>
                      setEditingVehicle({ ...editingVehicle, isFeatured: e.target.checked })
                    }
                    className="rounded border-slate-300 accent-midnight"
                  />
                  <span>Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingVehicle.isPublished}
                    onChange={(e) =>
                      setEditingVehicle({ ...editingVehicle, isPublished: e.target.checked })
                    }
                    className="rounded border-slate-300 accent-midnight"
                  />
                  <span>Published in Catalog</span>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingVehicle(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-midnight text-white font-bold hover:bg-slate-800 transition-colors"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
