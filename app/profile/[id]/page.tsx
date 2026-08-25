'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useStore } from '@/lib/store/useStore';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { ReviewModal } from '@/components/profile/ReviewModal';
import { formatTimeAgo } from '@/lib/utils';
import { Star, MessageSquare, PlusCircle, AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  const { id } = useParams();
  const { allUsers, listings, reviews, currentUser } = useStore();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const user = allUsers.find(u => u.id === id) || (currentUser.id === id ? currentUser : null);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-campus-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Student Profile Not Found</h2>
      </div>
    );
  }

  // Listings by this user
  const userListings = listings.filter(l => l.user_id === user.id);

  // Reviews for this user
  const userReviews = reviews.filter(r => r.reviewee_id === user.id);

  const isMe = currentUser.id === user.id;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Profile Card Component */}
      <ProfileCard user={user} />

      {/* Peer Reviews Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              Peer Trust & Exchange Reviews ({userReviews.length})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verified feedback left by campus peers following item pickups and exchanges.
            </p>
          </div>

          {!isMe && (
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-campus-500 hover:bg-campus-600 text-white font-bold text-xs shadow-warm flex items-center gap-1.5 self-start sm:self-auto transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Leave a Review</span>
            </button>
          )}
        </div>

        {/* Reviews Stream */}
        {userReviews.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500">No peer reviews yet for this student.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userReviews.map(rev => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                      <Image src={rev.reviewer_avatar} alt={rev.reviewer_name} fill sizes="32px" className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{rev.reviewer_name}</h4>
                      <span className="text-[10px] text-slate-400 block">{formatTimeAgo(rev.created_at)}</span>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  &quot;{rev.comment}&quot;
                </p>

                <div className="text-[10px] text-campus-600 dark:text-campus-400 font-medium">
                  Exchange: {rev.listing_title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Student's Active Listings */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Listings by {user.full_name.split(' ')[0]} ({userListings.length})
        </h3>
        <ListingGrid
          listings={userListings}
          emptyTitle="No active listings posted"
          emptySubtitle="This student has no active campus listings right now."
        />
      </div>

      {/* Review Modal */}
      <ReviewModal
        listingId={userListings[0]?.id || 'general'}
        listingTitle={userListings[0]?.title || 'Campus Item Exchange'}
        revieweeId={user.id}
        revieweeName={user.full_name}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
}
