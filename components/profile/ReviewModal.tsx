'use client';

import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { useStore } from '@/lib/store/useStore';
import { useToast } from '@/components/ui/Toast';

interface ReviewModalProps {
  listingId: string;
  listingTitle: string;
  revieweeId: string;
  revieweeName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({
  listingId,
  listingTitle,
  revieweeId,
  revieweeName,
  isOpen,
  onClose,
}: ReviewModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addReview } = useStore();
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast("Please enter comments", "Share how the exchange or pickup went.", "info");
      return;
    }

    setIsSubmitting(true);
    try {
      addReview({
        listing_id: listingId,
        listing_title: listingTitle,
        reviewee_id: revieweeId,
        rating,
        comment: comment.trim(),
      });
      toast("Review Submitted ⭐", `Thank you for reviewing ${revieweeName}!`, "success");
      onClose();
    } catch {
      toast("Error submitting review", "Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-orange-100 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-campus-600 to-amber-500 p-5 text-white flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base">Leave a Review</h3>
            <p className="text-xs text-orange-100">Review {revieweeName} for &quot;{listingTitle}&quot;</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Star Rating Selector */}
          <div className="text-center py-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-2">
              Overall Campus Exchange Experience
            </span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-slate-300 hover:scale-125 transition transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoverRating || rating) >= star
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-amber-500 mt-1 block">
              {rating === 5 ? '⭐ 5.0 - Exceptional Experience!' : rating === 4 ? '⭐ 4.0 - Great Exchange' : `${rating}.0 Stars`}
            </span>
          </div>

          {/* Comment Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Review Notes
            </label>
            <textarea
              rows={3}
              placeholder={`Prompt communication, punctual meetup at the quad, item was in mint condition...`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-campus-500/30 resize-none placeholder:text-slate-400"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              className="w-1/2 py-2.5 rounded-xl bg-campus-500 hover:bg-campus-600 active:scale-95 text-white font-bold text-xs shadow-warm transition transform disabled:opacity-50"
            >
              Post Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
