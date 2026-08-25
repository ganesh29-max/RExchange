'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store/useStore';
import { findSmartMatches } from '@/lib/matching';
import { formatCurrency, formatTimeAgo } from '@/lib/utils';
import { ClaimModal } from '@/components/listings/ClaimModal';
import { Listing, SmartMatch } from '@/types';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  Repeat,
  Sliders,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SmartMatchesPage() {
  const router = useRouter();
  const { listings, currentUser, startConversation } = useStore();
  const [minThreshold, setMinThreshold] = useState<number>(50);
  const [selectedListingForClaim, setSelectedListingForClaim] = useState<Listing | null>(null);

  // Compute all matching pairs across listings
  const allMatches: SmartMatch[] = useMemo(() => {
    const pairMap = new Map<string, SmartMatch>();

    for (const listing of listings) {
      const matches = findSmartMatches(listing, listings, minThreshold);
      for (const m of matches) {
        // Create canonical key to avoid duplicate reverse pairs
        const key = [m.listing.id, m.matched_listing.id].sort().join(':::');
        if (!pairMap.has(key)) {
          pairMap.set(key, m);
        }
      }
    }

    return Array.from(pairMap.values()).sort((a, b) => b.similarity_score - a.similarity_score);
  }, [listings, minThreshold]);

  const handleChat = (listing: Listing) => {
    startConversation(listing, `Hi ${listing.user_name.split(' ')[0]}! Our listings matched on Smart Matches Radar for "${listing.title}". Are you interested in coordinating an exchange?`);
    router.push('/messages');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-campus-950 p-6 sm:p-8 text-white border border-slate-800 shadow-warm-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
              AI Semantic Matching Radar
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Smart Matches Feed
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Powered by pgvector embeddings and semantic NLP heuristics. Connects campus students looking for specific textbooks, notes, and gear with peers actively offering them.
            </p>
          </div>

          {/* Threshold Slider Filter */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2 shrink-0 w-full md:w-64">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
              <span className="flex items-center gap-1"><Sliders className="w-3.5 h-3.5 text-amber-400" /> Min Match Affinity:</span>
              <span className="text-amber-400">{minThreshold}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="95"
              step="5"
              value={minThreshold}
              onChange={(e) => setMinThreshold(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Broad (30%)</span>
              <span>Strict (95%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Match Cards List */}
      {allMatches.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <Sparkles className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">No matches found at {minThreshold}% threshold</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try lowering the affinity threshold slider or post a new request listing to trigger more semantic pairings.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>Surfaced <strong className="text-slate-800 dark:text-slate-200">{allMatches.length}</strong> complementary campus matches</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">● pgvector Active</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {allMatches.map((match, idx) => {
              const reqListing = match.listing.is_request ? match.listing : match.matched_listing;
              const offerListing = !match.listing.is_request ? match.listing : match.matched_listing;

              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-warm-lg transition-all duration-300 space-y-5"
                >
                  {/* Top Match Score Pill */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black shadow-warm">
                        <Sparkles className="w-3.5 h-3.5 fill-white" />
                        <span>{match.similarity_score}% Match Strength</span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                        {match.reason}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-campus-600 dark:text-campus-400 bg-orange-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      {offerListing.category}
                    </span>
                  </div>

                  {/* Dual Card Comparison Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                    {/* Center Exchange Icon for Desktop */}
                    <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 items-center justify-center shadow-warm z-10">
                      <Repeat className="w-4 h-4" />
                    </div>

                    {/* Left: Student Request / Need */}
                    <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
                            🔍 Student Request
                          </span>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Budget: {reqListing.price === 0 ? 'Free/Trade' : formatCurrency(reqListing.price)}
                          </span>
                        </div>

                        <Link href={`/listings/${reqListing.id}`} className="hover:text-purple-600 dark:hover:text-purple-400 font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                          {reqListing.title}
                        </Link>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {reqListing.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-purple-100 dark:border-purple-900/30 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="relative w-5 h-5 rounded-full overflow-hidden">
                            <Image src={reqListing.user_avatar} alt="" fill sizes="20px" className="object-cover" />
                          </div>
                          <span className="font-medium text-slate-700 dark:text-slate-300">{reqListing.user_name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{formatTimeAgo(reqListing.created_at)}</span>
                      </div>
                    </div>

                    {/* Right: Available Peer Offer */}
                    <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                            🎁 Available Offer
                          </span>
                          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                            {offerListing.price === 0 ? 'FREE' : formatCurrency(offerListing.price)}
                          </span>
                        </div>

                        <Link href={`/listings/${offerListing.id}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                          {offerListing.title}
                        </Link>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {offerListing.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-emerald-100 dark:border-emerald-900/30 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="relative w-5 h-5 rounded-full overflow-hidden">
                            <Image src={offerListing.user_avatar} alt="" fill sizes="20px" className="object-cover" />
                          </div>
                          <span className="font-medium text-slate-700 dark:text-slate-300">{offerListing.user_name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{formatTimeAgo(offerListing.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
                    <button
                      onClick={() => handleChat(offerListing)}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-campus-500" />
                      <span>Start Chat</span>
                    </button>

                    <button
                      onClick={() => setSelectedListingForClaim(offerListing)}
                      className="px-5 py-2 rounded-xl bg-campus-500 hover:bg-campus-600 text-white text-xs font-bold shadow-warm transition flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Reserve Matched Offer</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Claim Modal for radar quick reserve */}
      {selectedListingForClaim && (
        <ClaimModal
          listing={selectedListingForClaim}
          isOpen={Boolean(selectedListingForClaim)}
          onClose={() => setSelectedListingForClaim(null)}
        />
      )}
    </div>
  );
}
