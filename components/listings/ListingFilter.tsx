'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { ListingType } from '@/types';

export const CATEGORIES = [
  'All Categories',
  'Textbooks',
  'Electronics',
  'Dorm & Living',
  'Peer Tutoring',
  'Study Notes',
  'Campus Opportunities',
  'Event Passes',
  'Lab & Art Supplies',
  'General & Other',
];

export const TYPES: { id: ListingType | 'all'; label: string }[] = [
  { id: 'all', label: 'All Types' },
  { id: 'item', label: 'Physical Items' },
  { id: 'service', label: 'Peer Services' },
  { id: 'notes', label: 'Study Notes' },
  { id: 'opportunity', label: 'Opportunities' },
];

export function ListingFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('q') || '';
  const currentCategory = searchParams.get('category') || 'All Categories';
  const currentType = searchParams.get('type') || 'all';
  const currentExchange = searchParams.get('exchange') || 'all';
  const currentSort = searchParams.get('sort') || 'newest';
  const onlyRequests = searchParams.get('requests') === 'true';

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === '' || value === 'all' || value === 'All Categories') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/marketplace?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push('/marketplace');
  };

  const hasActiveFilters = Boolean(
    currentSearch || 
    (currentCategory && currentCategory !== 'All Categories') || 
    (currentType && currentType !== 'all') || 
    (currentExchange && currentExchange !== 'all') || 
    onlyRequests
  );

  return (
    <div className="space-y-4 mb-8">
      {/* Top Search & Main Controls Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search keywords, courses (MATH101, CS201), books..."
            value={currentSearch}
            onChange={(e) => updateParam('q', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-campus-500/30 focus:border-campus-500 transition shadow-soft placeholder:text-slate-400"
          />
          {currentSearch && (
            <button
              onClick={() => updateParam('q', null)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort & Mode Toggles */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap">
          {/* Requests Only Toggle */}
          <button
            onClick={() => updateParam('requests', onlyRequests ? null : 'true')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
              onlyRequests
                ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-purple-300'
            }`}
          >
            🔍 Seeking / Requests Only
          </button>

          {/* Free / Swap Toggle */}
          <button
            onClick={() => updateParam('exchange', currentExchange === 'free' ? null : 'free')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
              currentExchange === 'free'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
            }`}
          >
            🎁 Free Only
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <ArrowUpDown className="absolute left-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <select
              value={currentSort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="pl-8 pr-8 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-campus-500/20 appearance-none cursor-pointer shadow-soft"
            >
              <option value="newest">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 transition"
              title="Clear all filters"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Type Pill Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {TYPES.map(t => {
          const isSelected = currentType === t.id;
          return (
            <button
              key={t.id}
              onClick={() => updateParam('type', t.id === 'all' ? null : t.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                isSelected
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-700'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Category Chips Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
        {CATEGORIES.map(cat => {
          const isSelected = currentCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => updateParam('category', cat === 'All Categories' ? null : cat)}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap border transition ${
                isSelected
                  ? 'bg-campus-500 text-white border-campus-500 shadow-warm font-semibold'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:border-campus-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
