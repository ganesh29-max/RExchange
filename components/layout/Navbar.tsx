'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { UserPersonaSwitcher } from './UserPersonaSwitcher';
import {
  Sparkles,
  PlusCircle,
  MessageSquare,
  LayoutDashboard,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Compass,
  Repeat,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';

export function Navbar() {
  const pathname = usePathname();
  const { currentUser, conversations, isDarkMode, toggleDarkMode } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = conversations.filter(c => c.unread).length;

  const navLinks = [
    { href: '/marketplace', label: 'Marketplace', icon: Compass },
    { href: '/matches', label: 'Smart Matches', icon: Sparkles, badge: 'AI' },
    { href: '/messages', label: 'Messages', icon: MessageSquare, count: unreadCount },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-orange-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-campus-600 via-campus-500 to-amber-500 flex items-center justify-center shadow-warm text-white group-hover:scale-105 transition transform">
                <Repeat className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  R<span className="text-campus-600 dark:text-campus-400">Exchange</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase flex items-center gap-0.5">
                  Campus Marketplace <ShieldCheck className="w-3 h-3 text-emerald-600 inline" />
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-campus-50 dark:bg-campus-950/40 text-campus-700 dark:text-campus-300 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-campus-600 dark:text-campus-400' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white leading-none">
                        {link.badge}
                      </span>
                    )}
                    {typeof link.count === 'number' && link.count > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-campus-600 text-white leading-none">
                        {link.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Search shortcut button */}
            <Link
              href="/marketplace"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search textbooks, notes, gear...</span>
              <kbd className="text-[10px] bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-mono text-slate-400">
                /
              </kbd>
            </Link>

            {/* Post Listing CTA */}
            <Link
              href="/listings/create"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-campus-500 hover:bg-campus-600 active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-warm transition transform"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Listing</span>
            </Link>

            {/* Quick Demo Persona Switcher */}
            <UserPersonaSwitcher />

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile Avatar Link */}
            <Link
              href={`/profile/${currentUser.id}`}
              className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-campus-400 hover:ring-2 hover:ring-campus-400/50 transition shrink-0"
              title={`View ${currentUser.full_name}'s Profile`}
            >
              <Image
                src={currentUser.avatar_url}
                alt={currentUser.full_name}
                fill
                sizes="36px"
                className="object-cover"
              />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-2">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-campus-50 dark:bg-campus-950/40 text-campus-700 dark:text-campus-300'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-campus-500" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                    {link.badge}
                  </span>
                )}
                {typeof link.count === 'number' && link.count > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-campus-600 text-white">
                    {link.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
