'use client';

import React from 'react';
import Image from 'next/image';
import { Conversation } from '@/types';
import { formatTimeAgo, formatCurrency } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
          <MessageSquare className="w-6 h-6" />
        </div>
        <p className="text-xs">No active conversations yet.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      {conversations.map(conv => {
        const isSelected = conv.id === selectedId;
        return (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`w-full p-4 flex items-start gap-3.5 text-left transition relative ${
              isSelected
                ? 'bg-campus-50/70 dark:bg-campus-950/40'
                : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            {/* Avatar */}
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
              <Image
                src={conv.other_user.avatar}
                alt={conv.other_user.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>

            {/* Main Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                  {conv.other_user.name}
                </h4>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {formatTimeAgo(conv.last_message_at)}
                </span>
              </div>

              {/* Listing Title pill */}
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-campus-600 dark:text-campus-400 truncate mb-1">
                <span className="truncate">{conv.listing_title}</span>
                <span className="shrink-0 text-slate-400">({formatCurrency(conv.listing_price)})</span>
              </div>

              {/* Last message preview */}
              <p className={`text-xs truncate ${conv.unread ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                {conv.last_message}
              </p>
            </div>

            {/* Unread indicator dot */}
            {conv.unread && (
              <span className="w-2 h-2 rounded-full bg-campus-500 absolute top-4 right-4" />
            )}
          </button>
        );
      })}
    </div>
  );
}
