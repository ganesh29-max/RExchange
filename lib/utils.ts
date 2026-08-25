import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ListingType, ExchangeType, ListingStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount === 0) return "Free";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}mo ago`;
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function getTypeBadgeDetails(type: ListingType): { label: string; bgClass: string; textClass: string; borderClass: string } {
  switch (type) {
    case 'item':
      return { label: 'Physical Item', bgClass: 'bg-orange-50 dark:bg-orange-950/40', textClass: 'text-orange-700 dark:text-orange-300', borderClass: 'border-orange-200 dark:border-orange-800' };
    case 'service':
      return { label: 'Peer Service', bgClass: 'bg-emerald-50 dark:bg-emerald-950/40', textClass: 'text-emerald-700 dark:text-emerald-300', borderClass: 'border-emerald-200 dark:border-emerald-800' };
    case 'opportunity':
      return { label: 'Campus Opportunity', bgClass: 'bg-indigo-50 dark:bg-indigo-950/40', textClass: 'text-indigo-700 dark:text-indigo-300', borderClass: 'border-indigo-200 dark:border-indigo-800' };
    case 'notes':
      return { label: 'Study Material', bgClass: 'bg-amber-50 dark:bg-amber-950/40', textClass: 'text-amber-700 dark:text-amber-300', borderClass: 'border-amber-200 dark:border-amber-800' };
    default:
      return { label: type, bgClass: 'bg-slate-100 dark:bg-slate-800', textClass: 'text-slate-700 dark:text-slate-300', borderClass: 'border-slate-200 dark:border-slate-700' };
  }
}

export function getExchangeBadgeDetails(exchangeType: ExchangeType, isRequest: boolean): { label: string; bgClass: string; textClass: string } {
  if (isRequest) {
    return { label: 'Seeking / Request', bgClass: 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300', textClass: 'text-purple-800 dark:text-purple-300' };
  }
  switch (exchangeType) {
    case 'free':
      return { label: 'Free Giveaway', bgClass: 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300', textClass: 'text-green-800 dark:text-green-300' };
    case 'swap':
      return { label: 'Open to Swap', bgClass: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300', textClass: 'text-blue-800 dark:text-blue-300' };
    case 'sell':
      return { label: 'For Sale', bgClass: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300', textClass: 'text-amber-800 dark:text-amber-300' };
    case 'offer':
      return { label: 'Service Offer', bgClass: 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300', textClass: 'text-teal-800 dark:text-teal-300' };
    case 'share':
      return { label: 'Shared Notes', bgClass: 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300', textClass: 'text-sky-800 dark:text-sky-300' };
    default:
      return { label: exchangeType, bgClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300', textClass: 'text-slate-700 dark:text-slate-300' };
  }
}

export function getStatusBadgeDetails(status: ListingStatus): { label: string; bgClass: string } {
  switch (status) {
    case 'available':
      return { label: 'Available', bgClass: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-200' };
    case 'reserved':
      return { label: 'Reserved', bgClass: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-200' };
    case 'completed':
      return { label: 'Exchanged / Done', bgClass: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200' };
  }
}
