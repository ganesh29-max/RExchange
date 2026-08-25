'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { UserCheck, ChevronDown, Sparkles } from 'lucide-react';
import Image from 'next/image';

export function UserPersonaSwitcher() {
  const { currentUser, allUsers, switchUser } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-slate-800 border border-orange-200/80 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-orange-100/60 dark:hover:bg-slate-700/60 transition shadow-sm"
        title="Switch active demo student persona"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <div className="w-5 h-5 rounded-full overflow-hidden border border-orange-300 relative shrink-0">
          <Image
            src={currentUser.avatar_url}
            alt={currentUser.full_name}
            fill
            sizes="20px"
            className="object-cover"
          />
        </div>
        <span className="hidden sm:inline font-semibold">{currentUser.full_name.split(' ')[0]}</span>
        <span className="text-[10px] text-orange-600 dark:text-orange-400 uppercase font-mono px-1 bg-orange-100/80 dark:bg-slate-900 rounded">Demo</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-warm-lg border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95">
            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-campus-500" /> Demo Personas
                </span>
                <span className="text-[10px] text-slate-400">1-Click Switch</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Switch accounts to test buyer, seller, and claims flows.
              </p>
            </div>

            <div className="space-y-1 max-h-64 overflow-y-auto">
              {allUsers.map(user => {
                const isSelected = user.id === currentUser.id;
                return (
                  <button
                    key={user.id}
                    onClick={() => {
                      switchUser(user.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition ${
                      isSelected
                        ? 'bg-campus-50 dark:bg-campus-950/40 text-campus-700 dark:text-campus-300 font-medium'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 relative shrink-0">
                      <Image src={user.avatar_url} alt={user.full_name} fill sizes="32px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold truncate">{user.full_name}</span>
                        {isSelected && <UserCheck className="w-3.5 h-3.5 text-campus-600" />}
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user.major} · ⭐ {user.rating}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
