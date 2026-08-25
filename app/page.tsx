'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { ListingGrid } from '@/components/listings/ListingGrid';
import {
  Sparkles,
  BookOpen,
  Laptop,
  Home,
  GraduationCap,
  FileText,
  Rocket,
  Ticket,
  FlaskConical,
  ShieldCheck,
  Leaf,
  PlusCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

const CATEGORY_ITEMS = [
  { name: 'Textbooks', icon: BookOpen, count: '140+ items', color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50 dark:bg-orange-950/40' },
  { name: 'Electronics', icon: Laptop, count: '85+ items', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-950/40' },
  { name: 'Dorm & Living', icon: Home, count: '62+ items', color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
  { name: 'Peer Tutoring', icon: GraduationCap, count: '45+ tutors', color: 'from-purple-500 to-indigo-500', bg: 'bg-purple-50 dark:bg-purple-950/40' },
  { name: 'Study Notes', icon: FileText, count: '190+ guides', color: 'from-amber-500 to-yellow-500', bg: 'bg-amber-50 dark:bg-amber-950/40' },
  { name: 'Campus Opportunities', icon: Rocket, count: '30+ open', color: 'from-rose-500 to-pink-500', bg: 'bg-rose-50 dark:bg-rose-950/40' },
  { name: 'Event Passes', icon: Ticket, count: '25+ tickets', color: 'from-violet-500 to-purple-500', bg: 'bg-violet-50 dark:bg-violet-950/40' },
  { name: 'Lab & Art Supplies', icon: FlaskConical, count: '38+ bundles', color: 'from-sky-500 to-blue-500', bg: 'bg-sky-50 dark:bg-sky-950/40' },
];

export default function HomePage() {
  const { listings } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'free' | 'notes' | 'requests'>('all');

  // Filter listings based on active homepage tab
  const displayedListings = listings.filter(l => {
    if (activeTab === 'free') return l.price === 0 || l.exchange_type === 'free';
    if (activeTab === 'notes') return l.type === 'notes';
    if (activeTab === 'requests') return l.is_request;
    return true;
  }).slice(0, 8);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 bg-gradient-to-b from-orange-50/70 via-amber-50/30 to-transparent dark:from-slate-900 dark:via-slate-950 dark:to-transparent border-b border-orange-100/60 dark:border-slate-800">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gradient-to-tr from-campus-400/20 to-amber-300/20 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Trust badge pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-orange-200/80 dark:border-slate-700 shadow-soft text-xs font-semibold text-slate-700 dark:text-slate-200 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-campus-500 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Peer-to-Peer Student Exchange</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
            Your campus has <span className="bg-gradient-to-r from-campus-600 via-campus-500 to-amber-500 bg-clip-text text-transparent">more to share.</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            <strong className="text-slate-800 dark:text-slate-100">Buy less. Waste less. Help more.</strong> Trade textbooks, share handwritten notes, find peer tutoring, and grab dorm essentials with verified college peers.
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <Link
              href="/marketplace"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-campus-500 hover:bg-campus-600 active:scale-95 text-white font-bold text-sm sm:text-base shadow-warm flex items-center justify-center gap-2 transition transform"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/listings/create"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-campus-400 text-slate-800 dark:text-white font-bold text-sm sm:text-base shadow-soft flex items-center justify-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400"/>
              <span>AI Listing Post</span>
            </Link>
          </div>

          {/* Campus Highlights Counter */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-orange-200/50 dark:border-slate-800/80">
            <div className="p-3 text-center">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">$34,200+</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Saved by Students</p>
            </div>
            <div className="p-3 text-center">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">1,480+</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Exchanges Completed</p>
            </div>
            <div className="p-3 text-center">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">840 lbs</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Campus Waste Diverted</p>
            </div>
            <div className="p-3 text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-500">4.9 / 5.0</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Student Trust Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Matches Radar Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-campus-950 p-6 sm:p-8 text-white shadow-warm-lg border border-slate-700">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold uppercase">
                <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
                AI Semantic Match Engine
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                Have something to share? Match with students seeking it now.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our pgvector semantic similarity algorithm pairs student requests with complementary offers in real time. E.g. &quot;Seeking Calculus 101 Book&quot; connects instantly with &quot;Calculus Stewart 9th Edition&quot;.
              </p>
            </div>

            <Link
              href="/matches"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-campus-500 to-amber-500 hover:from-campus-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-warm flex items-center gap-2 transition transform active:scale-95 shrink-0"
            >
              <span>View Smart Matches Radar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Explore by Category
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Find whatever you need across 8 specialized campus exchange categories.
            </p>
          </div>
          <Link href="/marketplace" className="text-xs font-bold text-campus-600 dark:text-campus-400 hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
          {CATEGORY_ITEMS.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/marketplace?category=${encodeURIComponent(cat.name)}`}
                className={`group p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 ${cat.bg} hover:shadow-warm hover:border-campus-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{cat.count}</span>
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-campus-600 dark:group-hover:text-campus-400 transition">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Live Campus Feed & Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Live Campus Feed
              </h2>
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Real-time
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Fresh listings posted by verified students around campus today.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl self-start sm:self-auto overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🔥 All Listings
            </button>
            <button
              onClick={() => setActiveTab('free')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'free'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🎁 Free Giveaways
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'notes'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              📝 Study Notes
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'requests'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🔍 Seeking Requests
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <ListingGrid listings={displayedListings} />

        {/* View All CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-campus-400 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-soft transition"
          >
            <span>Explore All {listings.length}+ Campus Listings</span>
            <ArrowRight className="w-4 h-4 text-campus-500" />
          </Link>
        </div>
      </section>

      {/* Community Honor Code / How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-orange-50/50 dark:bg-slate-900/50 border border-orange-100 dark:border-slate-800 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3">
            How RExchange Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8">
            Fast, verified, and safe exchange between university peers in 3 easy steps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-soft border border-slate-100 dark:border-slate-700/60 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-campus-600 font-black flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Post with AI Assistance</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Describe an item or request in messy text. Our local AI extracts titles, tags, and condition instantly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-soft border border-slate-100 dark:border-slate-700/60 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 font-black flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Smart Match & Chat</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Vector semantic matching pairs offers with student requests. Chat directly and reserve in 1-click.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-soft border border-slate-100 dark:border-slate-700/60 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 font-black flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Meet at Campus Quad</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Complete your exchange safely at the library or quad, confirm completion, and leave trust reviews.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
