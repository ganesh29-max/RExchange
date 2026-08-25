'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store/useStore';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { formatCurrency, formatTimeAgo } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Heart,
  Sparkles,
  CheckCircle,
  Clock,
  Trash2,
  ExternalLink,
  MessageSquare,
  PlusCircle,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function DashboardPage() {
  const { currentUser, listings, deleteListing, updateListing, claims, updateClaimStatus } = useStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'listings' | 'claims' | 'saved'>('listings');

  // Listings owned by current student
  const myListings = listings.filter(l => l.user_id === currentUser.id);

  // Claims made by current student
  const myClaims = claims.filter(c => c.claimer_id === currentUser.id);

  // Claims made on current student's listings (owner incoming claims)
  const incomingClaims = claims.filter(c => c.owner_id === currentUser.id);

  // Saved listings
  const savedListings = listings.filter(l => currentUser.saved_listing_ids.includes(l.id));

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteListing(id);
      toast("Listing Deleted", `Removed "${title}".`, "info");
    }
  };

  const handleMarkCompleted = (id: string, title: string) => {
    updateListing(id, { status: 'completed' });
    toast("Listing Completed! 🎉", `Marked "${title}" as exchanged.`, "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Student Welcome Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-campus-400 shrink-0">
            <Image
              src={currentUser.avatar_url}
              alt={currentUser.full_name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {currentUser.full_name}&apos;s Dashboard
              </h1>
              {currentUser.is_verified && (
                <span className="flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {currentUser.major} · {currentUser.college}
            </p>
          </div>
        </div>

        <Link
          href="/listings/create"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-campus-500 hover:bg-campus-600 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-warm transition transform self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Listing</span>
        </Link>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">My Active Listings</span>
            <Package className="w-4 h-4 text-campus-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {myListings.filter(l => l.status === 'available').length}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            {myListings.length} total posts
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">My Reservations</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {myClaims.length}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            Active claims & trades
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Saved Wishlist</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {savedListings.length}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            Bookmarked items
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Community Impact</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {currentUser.exchanges_completed}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            Exchanges completed
          </span>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'listings'
                ? 'bg-campus-500 text-white shadow-warm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            My Listings ({myListings.length})
          </button>

          <button
            onClick={() => setActiveTab('claims')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'claims'
                ? 'bg-campus-500 text-white shadow-warm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            My Claims & Requests ({myClaims.length + incomingClaims.length})
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'saved'
                ? 'bg-campus-500 text-white shadow-warm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Saved Items ({savedListings.length})
          </button>
        </div>

        {/* Tab 1: My Listings */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            {myListings.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
                <Package className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 dark:text-white">You haven&apos;t posted any listings yet</h3>
                <Link
                  href="/listings/create"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-campus-500 text-white text-xs font-bold shadow-warm"
                >
                  Create Listing
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-soft">
                {myListings.map(item => (
                  <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                        {item.images[0] && (
                          <Image src={item.images[0]} alt="" fill sizes="56px" className="object-cover" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {item.status.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-slate-400">{formatTimeAgo(item.created_at)}</span>
                        </div>
                        <Link href={`/listings/${item.id}`} className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-campus-600 truncate block">
                          {item.title}
                        </Link>
                        <span className="font-bold text-campus-600 dark:text-campus-400 text-xs">
                          {item.price === 0 ? 'FREE' : formatCurrency(item.price)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {item.status !== 'completed' && (
                        <button
                          onClick={() => handleMarkCompleted(item.id, item.title)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Mark Done</span>
                        </button>
                      )}
                      <Link
                        href={`/listings/${item.id}`}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 transition"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Delete listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Claims & Reservations */}
        {activeTab === 'claims' && (
          <div className="space-y-4">
            {myClaims.length === 0 && incomingClaims.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
                <Clock className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 dark:text-white">No active reservations</h3>
                <p className="text-xs text-slate-500">Reserved items and incoming requests will show here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Outgoing Claims */}
                {myClaims.map(claim => (
                  <div key={claim.id} className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase">
                        {claim.status} Reservation
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                        {claim.listing_title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">&quot;{claim.message}&quot;</p>
                    </div>

                    <Link
                      href={`/listings/${claim.listing_id}`}
                      className="px-4 py-2 rounded-xl bg-campus-500 text-white text-xs font-bold shadow-warm shrink-0"
                    >
                      View Listing
                    </Link>
                  </div>
                ))}

                {/* Incoming Claims from other students */}
                {incomingClaims.map(claim => (
                  <div key={claim.id} className="p-4 sm:p-5 rounded-2xl bg-orange-50/60 dark:bg-slate-800/60 border border-orange-200 dark:border-slate-700 shadow-soft flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                        Incoming Claim from {claim.claimer_name}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                        {claim.listing_title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">&quot;{claim.message}&quot;</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateClaimStatus(claim.id, 'completed')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm"
                      >
                        Accept & Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Items */}
        {activeTab === 'saved' && (
          <ListingGrid
            listings={savedListings}
            emptyTitle="No saved items yet"
            emptySubtitle="Click the heart icon on any listing to save it to your dashboard wishlist."
          />
        )}
      </div>
    </div>
  );
}
