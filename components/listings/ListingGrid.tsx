import React from 'react';
import Link from 'next/link';
import { Listing } from '@/types';
import { ListingCard } from './ListingCard';
import { Sparkles, PlusCircle } from 'lucide-react';

interface ListingGridProps {
  listings: Listing[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptySubtitle?: string;
}

export function ListingGrid({
  listings,
  isLoading,
  emptyTitle = "No listings found",
  emptySubtitle = "Try adjusting your filters or search terms to discover more campus resources."
}: ListingGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 animate-pulse">
            <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
              <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="h-6 w-14 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 my-4 max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-3xl bg-orange-50 dark:bg-slate-800 text-campus-500 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-2">
          {emptyTitle}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
          {emptySubtitle}
        </p>
        <Link
          href="/listings/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-campus-500 hover:bg-campus-600 active:scale-95 text-white text-sm font-semibold shadow-warm transition transform"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post First Listing</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map(listing => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
