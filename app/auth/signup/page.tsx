'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import { useToast } from '@/components/ui/Toast';
import { ShieldCheck, Mail, Lock, User, GraduationCap, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { allUsers, switchUser } = useStore();
  const { toast } = useToast();

  const [fullName, setFullName] = useState('Jordan Lee');
  const [email, setEmail] = useState('jordan.lee@campus.edu');
  const [major, setMajor] = useState('Computer Science');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN || '@campus.edu';
    if (!email.toLowerCase().endsWith(allowedDomain.toLowerCase()) && !email.toLowerCase().endsWith('.edu')) {
      toast("Campus Domain Restricted", `Registration requires a verified university email (${allowedDomain} or .edu).`, "error");
      setIsLoading(false);
      return;
    }

    // Sign in as primary user
    switchUser(allUsers[0].id);
    toast("Welcome to RExchange! 🎉", `Account created for ${fullName}.`, "success");
    router.push('/marketplace');
    setIsLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-campus-600 to-amber-500 text-white flex items-center justify-center mx-auto shadow-warm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Join RExchange
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Join your verified campus student marketplace.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Alex Chen"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-campus-500/30"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Campus Email (.edu)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="name@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-campus-500/30"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Major / Department
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Computer Science / Pre-Med"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
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
            <span>Create Campus Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-bold text-campus-600 dark:text-campus-400 hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
