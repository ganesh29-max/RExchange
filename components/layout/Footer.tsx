import React from 'react';
import Link from 'next/link';
import { Repeat, ShieldCheck, Leaf, Heart, BookOpen, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-campus-600 to-amber-500 flex items-center justify-center text-white shadow-warm">
                <Repeat className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                R<span className="text-campus-400">Exchange</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              The verified peer-to-peer campus exchange network. Buy less, waste less, and help your campus community thrive.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl w-fit">
              <Leaf className="w-3.5 h-3.5" />
              <span>840+ items kept out of campus landfills</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Marketplace</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/marketplace?type=item" className="hover:text-campus-400 transition">Physical Items & Gear</Link></li>
              <li><Link href="/marketplace?type=service" className="hover:text-campus-400 transition">Peer Tutoring & Services</Link></li>
              <li><Link href="/marketplace?type=notes" className="hover:text-campus-400 transition">Study Notes & Cheat Sheets</Link></li>
              <li><Link href="/marketplace?type=opportunity" className="hover:text-campus-400 transition">Campus Opportunities</Link></li>
              <li><Link href="/matches" className="hover:text-campus-400 transition flex items-center gap-1">Smart Matches Radar <Sparkles className="w-3 h-3 text-amber-400" /></Link></li>
            </ul>
          </div>

          {/* Campus Safety */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Campus Safety</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Verified .edu Emails Only</li>
              <li className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Library & Quad Meetup Spots</li>
              <li><span className="hover:text-campus-400 cursor-pointer">Community Honor Code</span></li>
              <li><span className="hover:text-campus-400 cursor-pointer">Reporting & Moderation</span></li>
            </ul>
          </div>

          {/* Open-Source AI & Tech */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Tech & Architecture</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Powered by Next.js 14 App Router, Supabase PostgreSQL with <code className="text-campus-400 bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px]">pgvector</code>, and local open-source Ollama AI.
            </p>
            <div className="text-[11px] text-slate-500">
              100% Vercel & Offline Deployable.
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} RExchange. Built with <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" /> for campus communities.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
