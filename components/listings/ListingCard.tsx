'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Listing } from '@/types';
import { useStore } from '@/lib/store/useStore';
import { formatCurrency, formatTimeAgo, getTypeBadgeDetails, getExchangeBadgeDetails, getStatusBadgeDetails } from '@/lib/utils';
import { MapPin, Star, Heart, Sparkles, BookOpen, Clock } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  showMatchBadge?: boolean;
  matchScore?: number;
}

export function ListingCard({ listing, showMatchBadge, matchScore }: ListingCardProps) {
  const { currentUser, toggleSaveListing } = useStore();
  const isSaved = currentUser.saved_listing_ids.includes(listing.id);

  const typeInfo = getTypeBadgeDetails(listing.type);
  const exchangeInfo = getExchangeBadgeDetails(listing.exchange_type, listing.is_request);
  const statusInfo = getStatusBadgeDetails(listing.status);

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-warm-lg hover:border-orange-200 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <Link href={`/listings/${listing.id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 block">
        {listing.images && listing.images.length > 0 ? (
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <BookOpen className="w-12 h-12 stroke-[1.5]" />
          </div>
        )}

        {/* Overlay Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 max-w-[80%]">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm border ${typeInfo.bgClass} ${typeInfo.textClass} ${typeInfo.borderClass}`}>
            {typeInfo.label}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm ${exchangeInfo.bgClass}`}>
            {exchangeInfo.label}
          </span>
        </div>

        {/* Status Indicator */}
        {listing.status !== 'available' && (
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-sm ${statusInfo.bgClass}`}>
              {statusInfo.label}
            </span>
          </div>
        )}

        {/* Smart Match Affinity Tag */}
        {showMatchBadge && matchScore && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-warm">
              <Sparkles className="w-3 h-3 fill-white" />
              {matchScore}% Match
            </span>
          </div>
        )}
      </Link>

      {/* Save Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleSaveListing(listing.id);
        }}
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-rose-500 hover:scale-110 active:scale-90 transition shadow-sm"
        title={isSaved ? "Remove from saved" : "Save listing"}
      >
        <Heart className={`w-4 h-4 transition ${isSaved ? "text-rose-500 fill-rose-500" : ""}`} />
      </button>

      {/* Content Body */}
      <div className="flex-1 flex flex-col p-4 justify-between">
        <div>
          {/* Category & Condition */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <span className="font-medium text-campus-600 dark:text-campus-400">{listing.category}</span>
            {listing.condition && (
              <span className="text-[11px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300 font-medium">
                {listing.condition}
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/listings/${listing.id}`} className="block group-hover:text-campus-600 dark:group-hover:text-campus-400 transition">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 leading-snug">
              {listing.title}
            </h3>
          </Link>

          {/* Location & Time */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span className="flex items-center gap-1 truncate max-w-[150px]">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{listing.location}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 shrink-0">
              <Clock className="w-3 h-3 text-slate-400" />
              {formatTimeAgo(listing.created_at)}
            </span>
          </div>
        </div>

        {/* Bottom Price & Author Info */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
              <Image
                src={listing.user_avatar}
                alt={listing.user_name}
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-300">
              <span className="truncate max-w-[90px]">{listing.user_name.split(' ')[0]}</span>
              <span className="flex items-center text-[11px] text-amber-500 font-bold">
                <Star className="w-3 h-3 fill-amber-400 inline" /> {listing.user_rating}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {listing.price === 0 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm uppercase">
                  {listing.exchange_type === 'swap' ? 'Swap' : 'Free'}
                </span>
              ) : (
                formatCurrency(listing.price)
              )}
            </span>
            {listing.extra_details?.hourly_rate && (
              <span className="text-[10px] text-slate-400 block -mt-1">/hr</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
