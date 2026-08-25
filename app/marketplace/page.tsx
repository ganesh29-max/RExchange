'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { ListingFilter } from '@/components/listings/ListingFilter';
import { Compass, Sparkles } from 'lucide-react';

function MarketplaceContent() {
  const { listings } = useStore();
  const searchParams = useSearchParams();

  const query = (searchParams.get('q') || '').toLowerCase();
  const category = searchParams.get('category') || 'All Categories';
  const type = searchParams.get('type') || 'all';
  const exchange = searchParams.get('exchange') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const onlyRequests = searchParams.get('requests') === 'true';

  // Apply filters
  let filtered = listings.filter(item => {
    // Search query filter
    if (query) {
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(query));
      const matchCat = item.category.toLowerCase().includes(query);
      if (!matchTitle && !matchDesc && !matchTags && !matchCat) return false;
    }

    // Category filter
    if (category && category !== 'All Categories' && item.category !== category) {
      return false;
    }

    // Type filter
    if (type && type !== 'all' && item.type !== type) {
      return false;
    }

    // Exchange filter
    if (exchange === 'free' && item.price !== 0 && item.exchange_type !== 'free') {
      return false;
    }
    if (exchange === 'swap' && item.exchange_type !== 'swap') {
      return false;
    }

    // Requests filter
    if (onlyRequests && !item.is_request) {
      return false;
    }

    return true;
  });

  // Apply sorting
  if (sort === 'price_low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_high') {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    // newest first
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return (
    <div>
      <ListingFilter />
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4 px-1">
        <span>Showing <strong className="text-slate-800 dark:text-slate-200">{filtered.length}</strong> listings</span>
        {category !== 'All Categories' && (
          <span className="bg-orange-100 dark:bg-slate-800 text-campus-700 dark:text-campus-300 font-semibold px-2 py-0.5 rounded-md">
            {category}
          </span>
        )}
      </div>
      <ListingGrid listings={filtered} />
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-6 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-slate-800 text-campus-600 dark:text-campus-400 text-xs font-bold mb-1">
          <Compass className="w-3.5 h-3.5" />
          <span>Campus Exchange Feed</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Marketplace
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Browse textbooks, dorm gear, tutoring, study guides, and campus opportunities.
        </p>
      </div>

      {/* Suspense boundary required for useSearchParams() on Vercel build */}
      <Suspense fallback={
        <div className="p-12 text-center text-slate-400 animate-pulse space-y-4">
          <div className="w-8 h-8 rounded-full bg-orange-200 mx-auto" />
          <p className="text-xs">Loading marketplace listings...</p>
        </div>
      }>
        <MarketplaceContent />
      </Suspense>
    </div>
  );
}
