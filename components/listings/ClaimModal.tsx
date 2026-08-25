'use client';

import React, { useState } from 'react';
import { Listing } from '@/types';
import { useStore } from '@/lib/store/useStore';
import { useToast } from '@/components/ui/Toast';
import { triggerConfetti } from '@/components/ui/Confetti';
import { CheckCircle, ShieldCheck, MapPin, X, PartyPopper } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface ClaimModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ClaimModal({ listing, isOpen, onClose, onSuccess }: ClaimModalProps) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const { createClaim, currentUser } = useStore();
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsSubmitting(true);
    try {
      createClaim(listing.id, message);
      setIsClaimed(true);
      triggerConfetti();
      toast("Reservation Confirmed! 🎉", `Reserved "${listing.title}". A message was sent to ${listing.user_name}.`, "success");
      if (onSuccess) onSuccess();
    } catch {
      toast("Reservation failed", "Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-orange-100 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-campus-600 to-amber-500 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PartyPopper className="w-5 h-5 text-amber-200" />
            <h3 className="font-extrabold text-base">
              {listing.price === 0 ? 'Claim Free Item' : 'Reserve Listing'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {isClaimed ? (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white">You Reserved It!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                  {listing.user_name} has been notified. You can coordinate pickup in your Messages tab.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-campus-500 hover:bg-campus-600 text-white font-bold text-sm shadow-warm transition"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Item Brief Summary */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2">
                    {listing.title}
                  </h4>
                  <span className="font-black text-campus-600 dark:text-campus-400 text-sm shrink-0">
                    {listing.price === 0 ? 'FREE' : formatCurrency(listing.price)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{listing.location}</span>
                </div>
              </div>

              {/* Campus Protection Note */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  Safe Exchange: Reserving locks this listing for you. Agree on a public campus pickup spot (Library, Quad, Student Center).
                </p>
              </div>

              {/* Message to Owner Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Message for {listing.user_name} (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder={`Hi ${listing.user_name.split(' ')[0]}, I'm interested in this! Are you free to meet up today?`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-campus-500/30 resize-none"
                />
              </div>

              {/* Confirm Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isSubmitting || listing.user_id === currentUser.id}
                  className="w-1/2 py-2.5 rounded-xl bg-campus-500 hover:bg-campus-600 active:scale-95 text-white font-bold text-xs shadow-warm transition transform disabled:opacity-50"
                >
                  {listing.user_id === currentUser.id ? 'Your Own Listing' : 'Confirm Reserve'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
