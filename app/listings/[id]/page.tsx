'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store/useStore';
import { formatCurrency, formatTimeAgo, getTypeBadgeDetails, getExchangeBadgeDetails, getStatusBadgeDetails } from '@/lib/utils';
import { ClaimModal } from '@/components/listings/ClaimModal';
import { ListingCard } from '@/components/listings/ListingCard';
import { findSmartMatches } from '@/lib/matching';
import {
  MapPin,
  Clock,
  Star,
  ShieldCheck,
  Heart,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  Share2,
  AlertCircle,
  GraduationCap,
  Calendar,
  Building,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function ListingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { listings, currentUser, toggleSaveListing, startConversation, reviews } = useStore();
  const { toast } = useToast();

  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const listing = listings.find(l => l.id === id);

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-campus-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Listing not found</h2>
        <p className="text-xs text-slate-500">This listing may have been removed or completed.</p>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-campus-500 text-white text-xs font-bold shadow-warm"
        >
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const isSaved = currentUser.saved_listing_ids.includes(listing.id);
  const isOwner = currentUser.id === listing.user_id;
  const typeInfo = getTypeBadgeDetails(listing.type);
  const exchangeInfo = getExchangeBadgeDetails(listing.exchange_type, listing.is_request);
  const statusInfo = getStatusBadgeDetails(listing.status);

  // Find Smart Matches
  const matches = findSmartMatches(listing, listings, 50).slice(0, 3);

  // Reviews for this seller
  const sellerReviews = reviews.filter(r => r.reviewee_id === listing.user_id);

  const handleStartChat = () => {
    if (isOwner) {
      toast("This is your listing", "You can manage inquiries from your Messages tab.", "info");
      return;
    }
    startConversation(listing, `Hi ${listing.user_name.split(' ')[0]}! I saw your listing for "${listing.title}". Is this still available to meet up?`);
    router.push('/messages');
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast("Link Copied 📋", "Listing URL copied to clipboard.", "success");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/marketplace"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-campus-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-campus-300 transition shadow-sm"
            title="Share listing link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          <button
            onClick={() => toggleSaveListing(listing.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-campus-300 transition shadow-sm"
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? "text-rose-500 fill-rose-500" : ""}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Main Listing Layout: Image Left, Details Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Media Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-soft">
            {listing.images && listing.images.length > 0 ? (
              <Image
                src={listing.images[activeImageIndex] || listing.images[0]}
                alt={listing.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            ) : null}

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-sm border ${typeInfo.bgClass} ${typeInfo.textClass} ${typeInfo.borderClass}`}>
                {typeInfo.label}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-sm ${exchangeInfo.bgClass}`}>
                {exchangeInfo.label}
              </span>
            </div>

            {listing.status !== 'available' && (
              <div className="absolute bottom-4 left-4 z-10">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${statusInfo.bgClass}`}>
                  {statusInfo.label}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails if multiple */}
          {listing.images && listing.images.length > 1 && (
            <div className="flex items-center gap-3">
              {listing.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition ${
                    activeImageIndex === i
                      ? 'border-campus-500 ring-2 ring-campus-500/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Description & Details
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>

            {/* Extra Dynamic Type Details */}
            {listing.extra_details && (
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                {listing.extra_details.subject_code && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Subject Code</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{listing.extra_details.subject_code}</span>
                  </div>
                )}
                {listing.extra_details.professor && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Professor</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{listing.extra_details.professor}</span>
                  </div>
                )}
                {listing.extra_details.hourly_rate && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Hourly Rate</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">${listing.extra_details.hourly_rate} / hour</span>
                  </div>
                )}
                {listing.extra_details.deadline && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Application Deadline</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{listing.extra_details.deadline}</span>
                  </div>
                )}
                {listing.extra_details.organization && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Campus Organization</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{listing.extra_details.organization}</span>
                  </div>
                )}
              </div>
            )}

            {/* Tags list */}
            {listing.tags && listing.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                {listing.tags.map((t, i) => (
                  <span key={i} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium px-2.5 py-1 rounded-lg">
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pricing, Primary Actions & Seller Box */}
        <div className="lg:col-span-5 space-y-6">
          {/* Price & Action Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-warm space-y-6">
            <div>
              <span className="text-xs text-campus-600 dark:text-campus-400 font-bold uppercase tracking-wider block mb-1">
                {listing.category}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug mb-3">
                {listing.title}
              </h1>

              {/* Price Display */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {listing.price === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {listing.exchange_type === 'swap' ? 'Open to Swap' : 'Free Giveaway'}
                    </span>
                  ) : (
                    formatCurrency(listing.price)
                  )}
                </span>
                {listing.condition && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Condition: {listing.condition}
                  </span>
                )}
              </div>
            </div>

            {/* Location & Time Info */}
            <div className="space-y-2 py-3 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-campus-500 shrink-0" />
                <span className="font-medium text-slate-700 dark:text-slate-200">{listing.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Posted {formatTimeAgo(listing.created_at)}</span>
              </div>
            </div>

            {/* Main Action CTAs */}
            <div className="space-y-3">
              {listing.status === 'available' ? (
                <button
                  onClick={() => setIsClaimModalOpen(true)}
                  disabled={isOwner}
                  className="w-full py-4 rounded-2xl bg-campus-500 hover:bg-campus-600 active:scale-98 text-white font-bold text-sm shadow-warm flex items-center justify-center gap-2 transition transform disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{listing.price === 0 ? 'Claim for Free' : 'Reserve & Claim Item'}</span>
                </button>
              ) : (
                <div className="w-full py-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-amber-800 dark:text-amber-300 font-bold text-xs text-center">
                  This item is currently {listing.status.toUpperCase()}
                </div>
              )}

              <button
                onClick={handleStartChat}
                className="w-full py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-campus-400 text-slate-800 dark:text-white font-bold text-sm shadow-soft flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4 text-campus-500" />
                <span>Message Student ({listing.user_name.split(' ')[0]})</span>
              </button>
            </div>
          </div>

          {/* Seller / Requester Profile Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {listing.is_request ? 'Requested By' : 'Posted By'}
              </span>
              <Link
                href={`/profile/${listing.user_id}`}
                className="text-xs font-bold text-campus-600 dark:text-campus-400 hover:underline"
              >
                View Profile
              </Link>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-campus-400 shrink-0">
                <Image
                  src={listing.user_avatar}
                  alt={listing.user_name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  {listing.user_name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {listing.user_college}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center text-xs font-black text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 inline mr-0.5" />
                    {listing.user_rating}
                  </span>
                  <span className="text-[11px] text-slate-400">· Verified Peer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Matches Recommendation Section */}
      {matches.length > 0 && (
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Smart Matches for this Listing
              </h3>
            </div>
            <Link href="/matches" className="text-xs font-bold text-campus-600 dark:text-campus-400 hover:underline">
              Open Radar Feed
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {matches.map(m => (
              <ListingCard
                key={m.matched_listing.id}
                listing={m.matched_listing}
                showMatchBadge={true}
                matchScore={m.similarity_score}
              />
            ))}
          </div>
        </section>
      )}

      {/* Reservation Modal */}
      <ClaimModal
        listing={listing}
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
      />
    </div>
  );
}
