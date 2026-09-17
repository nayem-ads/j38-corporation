'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { GrowthAudit } from '@/lib/db';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const [audits, setAudits] = useState<GrowthAudit[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    newCount: 0,
    reviewingCount: 0,
    sentCount: 0,
    closedCount: 0,
    conversionRate: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAudit, setSelectedAudit] = useState<GrowthAudit | null>(null);
  const [notesInput, setNotesInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Check stored auth state
  useEffect(() => {
    const session = localStorage.getItem('j38_admin_authenticated');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      const json = await res.json();
      if (json.success) {
        setAudits(json.data);
        if (json.stats) setStats(json.stats);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated, fetchLeads]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('j38_admin_authenticated', 'true');
      } else {
        setAuthError('Incorrect password. Try "mind@123" or check your ADMIN_PASSWORD setting.');
      }
    } catch {
      setAuthError('Authentication server error. Please try again.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' }).catch(() => {});
    localStorage.removeItem('j38_admin_authenticated');
    setIsAuthenticated(false);
  };

  const handleStatusChange = async (id: string, newStatus: GrowthAudit['status']) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setAudits((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
        );
        fetchLeads();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedAudit) return;
    setIsUpdating(true);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedAudit.id,
          status: selectedAudit.status,
          notes: notesInput,
        }),
      });
      if (res.ok) {
        setSelectedAudit((prev) => (prev ? { ...prev, notes: notesInput } : null));
        setAudits((prev) =>
          prev.map((a) => (a.id === selectedAudit.id ? { ...a, notes: notesInput } : a))
        );
      }
    } catch (err) {
      console.error('Failed to save notes:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead record?')) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAudits((prev) => prev.filter((a) => a.id !== id));
        if (selectedAudit?.id === id) setSelectedAudit(null);
        fetchLeads();
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const exportCSV = () => {
    if (audits.length === 0) return;
    const headers = [
      'ID',
      'Name',
      'Company',
      'Email',
      'Website',
      'Phone',
      'Service',
      'Budget',
      'Timeline',
      'Market',
      'Goal',
      'Status',
      'Created At',
      'Notes',
    ];
    const rows = audits.map((a) => [
      a.id,
      `"${a.name.replace(/"/g, '""')}"`,
      `"${(a.company || '').replace(/"/g, '""')}"`,
      a.email,
      `"${(a.website || '').replace(/"/g, '""')}"`,
      `"${(a.phone || '').replace(/"/g, '""')}"`,
      `"${a.service}"`,
      `"${a.budget || 'N/A'}"`,
      `"${a.timeline}"`,
      `"${a.market}"`,
      `"${(a.goal || '').replace(/"/g, '""')}"`,
      a.status,
      a.createdAt,
      `"${(a.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `j38_growth_audits_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered list
  const filteredAudits = audits.filter((a) => {
    const matchesTab = activeTab === 'ALL' || a.status === activeTab;
    const matchesSearch =
      !searchQuery ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.website || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.market.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const statusBadge = (status: GrowthAudit['status']) => {
    const styles: Record<GrowthAudit['status'], string> = {
      NEW: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      REVIEWING: 'bg-blue-100 text-blue-800 border-blue-300',
      AUDIT_SENT: 'bg-purple-100 text-purple-800 border-purple-300',
      ONBOARDING: 'bg-amber-100 text-amber-800 border-amber-300',
      ARCHIVED: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return (
      <span
        className={`px-2.5 py-1 text-[11px] font-bold tracking-wider rounded-lg border uppercase ${
          styles[status] || styles.NEW
        }`}
      >
        {status.replace('_', ' ')}
      </span>
    );
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F5F2] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-black/10 rounded-3xl shadow-xl p-8 flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-3xl font-black">∞</span>
            <h1 className="text-xl font-black tracking-tight uppercase m-0">
              J38 Inquiries Portal
            </h1>
            <p className="text-xs text-[#55575A]">
              Restricted management area for growth audit inquiries.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest uppercase text-[#55575A]">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="font-sans text-sm bg-white border border-black/15 rounded-xl px-4 py-3 focus:outline-none focus:border-black"
              />
            </div>
            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full bg-[#0A0A0A] hover:bg-[#06D6A0] text-[#F5F5F2] hover:text-[#0A0A0A] py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors"
            >
              {isAuthLoading ? 'Verifying...' : 'Access Dashboard ↗'}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-black/10">
            <Link
              href="/"
              className="text-xs font-semibold text-[#55575A] hover:text-black transition-colors"
            >
              ← Back to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#0A0A0A]">
      {/* Top Bar */}
      <header className="bg-white border-b border-black/10 sticky top-0 z-30 px-6 sm:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black group-hover:text-[#06D6A0] transition-colors">
              ∞
            </span>
            <span className="text-sm font-black tracking-widest uppercase">J38 Inquiries</span>
          </Link>
          <span className="hidden sm:inline-block text-xs bg-[#06D6A0]/15 text-[#0C4137] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase">
            Live Engine
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs font-bold tracking-wider uppercase text-[#55575A] hover:text-black transition-colors px-3 py-1.5"
          >
            Live Site ↗
          </Link>
          <button
            onClick={exportCSV}
            className="bg-white border border-black/15 hover:border-black/40 text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-xl transition-colors shadow-sm"
          >
            Export CSV
          </button>
          <button
            onClick={handleLogout}
            className="bg-[#0A0A0A] hover:bg-red-600 text-[#F5F5F2] text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-xl transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-8 flex flex-col gap-8">
        {/* KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white border border-black/10 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-bold tracking-widest uppercase text-[#55575A]">
              Total Inquiries
            </span>
            <span className="text-3xl sm:text-4xl font-black tracking-tight">{stats.total}</span>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-700">
              New Leads
            </span>
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-emerald-600">
              {stats.newCount}
            </span>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-700">
              In Review
            </span>
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-blue-600">
              {stats.reviewingCount + stats.sentCount}
            </span>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-bold tracking-widest uppercase text-[#55575A]">
              Pipeline Conversion
            </span>
            <span className="text-3xl sm:text-4xl font-black tracking-tight">
              {stats.conversionRate}%
            </span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white border border-black/10 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['ALL', 'NEW', 'REVIEWING', 'AUDIT_SENT', 'ONBOARDING', 'ARCHIVED'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors ${
                  activeTab === t
                    ? 'bg-[#0A0A0A] text-[#F5F5F2]'
                    : 'text-[#55575A] hover:bg-[#F0F0EA]'
                }`}
              >
                {t.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, company, email, service..."
              className="w-full sm:w-72 font-sans text-xs bg-[#F5F5F2] border border-black/10 rounded-xl px-3.5 py-2 focus:outline-none focus:border-black"
            />
            <button
              onClick={fetchLeads}
              disabled={isLoading}
              className="text-xs font-bold uppercase tracking-wider text-[#55575A] hover:text-black transition-colors px-2 py-1"
            >
              {isLoading ? '...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white border border-black/10 rounded-2xl shadow-sm overflow-hidden">
          {filteredAudits.length === 0 ? (
            <div className="py-16 text-center text-[#55575A] text-sm">
              No audit requests found matching your filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-black/10 bg-[#FAFAF7] text-[#55575A] font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Prospect</th>
                    <th className="py-3.5 px-4">Service</th>
                    <th className="py-3.5 px-4">Budget</th>
                    <th className="py-3.5 px-4">Market</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredAudits.map((a) => (
                    <tr
                      key={a.id}
                      className="hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedAudit(a);
                        setNotesInput(a.notes || '');
                      }}
                    >
                      <td className="py-3.5 px-4 whitespace-nowrap text-[#55575A]">
                        {new Date(a.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0A0A0A]">{a.name}</div>
                        <div className="text-[#55575A] text-[11px]">
                          {a.website ? `${a.website} • ` : a.company ? `${a.company} • ` : ''}
                          {a.email}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-[#0A0A0A]">{a.service}</td>

                      <td className="py-3.5 px-4 whitespace-nowrap font-medium text-[#55575A]">
                        {a.budget}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-[#55575A]">{a.market}</td>

                      <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={a.status}
                          onChange={(e) =>
                            handleStatusChange(a.id, e.target.value as GrowthAudit['status'])
                          }
                          className="text-[11px] font-bold tracking-wider bg-transparent border border-black/15 rounded-lg px-2 py-1 uppercase focus:outline-none"
                        >
                          <option value="NEW">New</option>
                          <option value="REVIEWING">Reviewing</option>
                          <option value="AUDIT_SENT">Audit Sent</option>
                          <option value="ONBOARDING">Onboarding</option>
                          <option value="ARCHIVED">Archived</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setSelectedAudit(a);
                            setNotesInput(a.notes || '');
                          }}
                          className="text-[11px] font-bold uppercase tracking-wider text-[#0C4137] hover:underline mr-3"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="text-[11px] font-bold uppercase tracking-wider text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Inquiry Detail Drawer / Modal */}
      {selectedAudit && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-black/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 flex flex-col gap-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight m-0">
                    {selectedAudit.name}
                  </h2>
                  {statusBadge(selectedAudit.status)}
                </div>
                <div className="text-xs text-[#55575A] mt-1">
                  {selectedAudit.company ? `${selectedAudit.company} • ` : ''}
                  Submitted on {new Date(selectedAudit.createdAt).toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => setSelectedAudit(null)}
                className="text-[#55575A] hover:text-black font-black text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* Grid of details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#FAFAF7] p-3.5 rounded-xl border border-black/5 flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-[#55575A]">Email</span>
                <a
                  href={`mailto:${selectedAudit.email}`}
                  className="font-medium text-[#0C4137] hover:underline"
                >
                  {selectedAudit.email}
                </a>
              </div>

              <div className="bg-[#FAFAF7] p-3.5 rounded-xl border border-black/5 flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-[#55575A]">Website</span>
                {selectedAudit.website ? (
                  <a
                    href={selectedAudit.website.startsWith('http') ? selectedAudit.website : `https://${selectedAudit.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#0C4137] hover:underline"
                  >
                    {selectedAudit.website} ↗
                  </a>
                ) : (
                  <span className="font-medium text-[#55575A]">Not provided</span>
                )}
              </div>

              <div className="bg-[#FAFAF7] p-3.5 rounded-xl border border-black/5 flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-[#55575A]">Phone</span>
                <span className="font-medium">{selectedAudit.phone || 'Not provided'}</span>
              </div>

              <div className="bg-[#FAFAF7] p-3.5 rounded-xl border border-black/5 flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-[#55575A]">Service</span>
                <span className="font-bold text-[#0A0A0A]">{selectedAudit.service}</span>
              </div>

              <div className="bg-[#FAFAF7] p-3.5 rounded-xl border border-black/5 flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-[#55575A]">Budget</span>
                <span className="font-bold text-[#0A0A0A]">{selectedAudit.budget}</span>
              </div>

              <div className="bg-[#FAFAF7] p-3.5 rounded-xl border border-black/5 flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-[#55575A]">Timeline</span>
                <span className="font-medium">{selectedAudit.timeline}</span>
              </div>

              <div className="bg-[#FAFAF7] p-3.5 rounded-xl border border-black/5 flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-[#55575A]">Market</span>
                <span className="font-medium">{selectedAudit.market}</span>
              </div>
            </div>

            {/* Primary Goal */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#55575A]">
                Target Objective / Goal
              </span>
              <div className="bg-[#FAFAF7] p-4 rounded-xl border border-black/10 text-xs sm:text-sm leading-relaxed text-[#1A1A1A]">
                {selectedAudit.goal}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#55575A]">
                Internal Strategy Notes
              </span>
              <textarea
                rows={3}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Add audit recommendations, meeting notes, account owner..."
                className="w-full font-sans text-xs bg-white border border-black/15 rounded-xl p-3 focus:outline-none focus:border-black"
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={isUpdating}
                  className="bg-[#0A0A0A] hover:bg-[#06D6A0] text-[#F5F5F2] hover:text-[#0A0A0A] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-colors"
                >
                  {isUpdating ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
