'use client';

import React from 'react';
import Image from 'next/image';
import { UserProfile } from '@/types';
import { ShieldCheck, Star, Award, Calendar, GraduationCap, Sparkles } from 'lucide-react';

interface ProfileCardProps {
  user: UserProfile;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
      {/* Top Banner & Avatar */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-warm shrink-0">
          <Image
            src={user.avatar_url}
            alt={user.full_name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {user.full_name}
            </h2>
            {user.is_verified && (
              <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Student
              </span>
            )}
          </div>

          <p className="text-xs text-campus-600 dark:text-campus-400 font-semibold mb-2">
            {user.college}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <GraduationCap className="w-4 h-4 text-slate-400" />
              {user.major} (Class of {user.graduation_year})
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Joined 2024
            </span>
          </div>
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
          &quot;{user.bio}&quot;
        </p>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-amber-50/70 dark:bg-slate-800/60 rounded-2xl border border-amber-200/60 dark:border-slate-700 text-center">
          <div className="flex items-center justify-center gap-1 text-amber-500 font-black text-lg">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{user.rating}</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            {user.review_count} Peer Reviews
          </span>
        </div>

        <div className="p-3 bg-emerald-50/70 dark:bg-slate-800/60 rounded-2xl border border-emerald-200/60 dark:border-slate-700 text-center">
          <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 font-black text-lg">
            <Award className="w-4 h-4" />
            <span>{user.exchanges_completed}</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            Completed Swaps
          </span>
        </div>

        <div className="p-3 bg-orange-50/70 dark:bg-slate-800/60 rounded-2xl border border-orange-200/60 dark:border-slate-700 text-center">
          <div className="flex items-center justify-center gap-1 text-campus-600 dark:text-campus-400 font-black text-lg">
            <Sparkles className="w-4 h-4" />
            <span>100%</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            Campus Trust Score
          </span>
        </div>
      </div>
    </div>
  );
}
