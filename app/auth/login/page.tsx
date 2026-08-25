'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { useToast } from '@/components/ui/Toast';
import { ShieldCheck, Mail, Lock, Sparkles, ArrowRight, UserCheck } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { allUsers, switchUser } = useStore();
  const { toast } = useToast();

  const [email, setEmail] = useState('alex.chen@campus.edu');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN || '@campus.edu';
    if (!email.toLowerCase().endsWith(allowedDomain.toLowerCase()) && !email.toLowerCase().endsWith('.edu')) {
      toast("Invalid Campus Email", `Signup and login are restricted to verified university emails (${allowedDomain} or .edu).`, "error");
      setIsLoading(false);
      return;
    }

    const matched = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      switchUser(matched.id);
      toast("Welcome back!", `Logged in as ${matched.full_name}`, "success");
      router.push('/dashboard');
    } else {
      // Allow login as demo user
      switchUser(allUsers[0].id);
      toast("Logged In", `Signed in with campus credentials.`, "success");
      router.push('/dashboard');
    }
    setIsLoading(false);
  };

  const handleQuickDemoSelect = (userId: string, name: string) => {
    switchUser(userId);
    toast("Demo Switch Active", `Now logged in as ${name}`, "success");
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-campus-600 to-amber-500 text-white flex items-center justify-center mx-auto shadow-warm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Campus Sign In
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in with your verified university email to access RExchange.
          </p>
        </div>

        {/* 1-Click Demo Personas Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50/90 to-amber-50/50 dark:from-slate-900 dark:to-slate-800 border border-orange-200/80 dark:border-slate-700 shadow-soft space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-campus-500 fill-campus-400" />
              1-Click Demo Student Sign In
            </span>
            <span className="text-[10px] text-campus-600 font-mono">Evaluation Mode</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Click any student persona to instantly sign in without typing:
          </p>

          <div className="grid grid-cols-1 gap-2 pt-1">
            {allUsers.slice(0, 3).map(user => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleQuickDemoSelect(user.id, user.full_name)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-campus-400 transition text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0">
                    <Image src={user.avatar_url} alt="" fill sizes="28px" className="object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block leading-tight">{user.full_name}</span>
                    <span className="text-[10px] text-slate-400">{user.major}</span>
                  </div>
                </div>
                <UserCheck className="w-4 h-4 text-campus-500" />
              </button>
            ))}
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Campus Email (.edu)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="yourname@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-campus-500/30"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-campus-500/30"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-campus-500 hover:bg-campus-600 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-warm flex items-center justify-center gap-2 transition"
          >
            <span>Sign In to RExchange</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          New on campus?{' '}
          <Link href="/auth/signup" className="font-bold text-campus-600 dark:text-campus-400 hover:underline">
            Create verified student account
          </Link>
        </div>
      </div>
    </div>
  );
}
