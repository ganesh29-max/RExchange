'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useStore } from '@/lib/store/useStore';
import { useToast } from '@/components/ui/Toast';
import { AIAssistantModal } from '@/components/listings/AIAssistantModal';
import { ListingType, ExchangeType, ConditionType, AISuggestionResponse } from '@/types';
import { CATEGORIES } from '@/components/listings/ListingFilter';
import {
  Sparkles,
  PlusCircle,
  Image as ImageIcon,
  Tag,
  MapPin,
  DollarSign,
  BookOpen,
  ArrowRight,
  Info,
} from 'lucide-react';

export default function CreateListingPage() {
  const router = useRouter();
  const { addListing, currentUser } = useStore();
  const { toast } = useToast();

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ListingType>('item');
  const [category, setCategory] = useState('Textbooks');
  const [exchangeType, setExchangeType] = useState<ExchangeType>('sell');
  const [price, setPrice] = useState<number>(25);
  const [isRequest, setIsRequest] = useState(false);
  const [condition, setCondition] = useState<ConditionType>('Good');
  const [location, setLocation] = useState('Science Library / Main Quad');
  const [tagsInput, setTagsInput] = useState('Textbook, MATH101');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80');

  // Dynamic extra fields
  const [subjectCode, setSubjectCode] = useState('');
  const [semester, setSemester] = useState('');
  const [professor, setProfessor] = useState('');
  const [hourlyRate, setHourlyRate] = useState<number>(20);
  const [deadline, setDeadline] = useState('');
  const [organization, setOrganization] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle applying AI generated values
  const handleApplyAISuggestion = (sugg: AISuggestionResponse) => {
    setTitle(sugg.title);
    setType(sugg.type);
    if (CATEGORIES.includes(sugg.category)) {
      setCategory(sugg.category);
    }
    setExchangeType(sugg.exchange_type);
    setPrice(sugg.suggested_price);
    setIsRequest(sugg.is_request);
    if (sugg.condition) {
      setCondition(sugg.condition);
    }
    if (sugg.tags && sugg.tags.length > 0) {
      setTagsInput(sugg.tags.join(', '));
    }
    if (sugg.location) {
      setLocation(sugg.location);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast("Please enter a title", "Every listing needs a clear descriptive title.", "info");
      return;
    }

    setIsSubmitting(true);
    try {
      const tags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      const newListing = addListing({
        title: title.trim(),
        description: description.trim() || `Available on campus from ${currentUser.full_name}. Contact to meet up!`,
        type,
        category,
        tags,
        price: exchangeType === 'free' ? 0 : Number(price) || 0,
        exchange_type: exchangeType,
        condition: type === 'item' ? condition : undefined,
        location: location.trim() || 'Campus Center',
        is_request: isRequest,
        images: imageUrl ? [imageUrl] : [],
        extra_details: {
          subject_code: subjectCode || undefined,
          semester: semester || undefined,
          professor: professor || undefined,
          hourly_rate: type === 'service' ? hourlyRate : undefined,
          deadline: deadline || undefined,
          organization: organization || undefined,
        }
      });

      toast("Listing Published! 🎉", `"${newListing.title}" is now live on the campus marketplace.`, "success");
      router.push(`/listings/${newListing.id}`);
    } catch {
      toast("Error creating listing", "Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Create Campus Listing
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Share study materials, items, services, or opportunities with students.
          </p>
        </div>

        {/* Magic AI Auto-Fill CTA */}
        <button
          type="button"
          onClick={() => setIsAIModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-campus-500 via-campus-600 to-amber-500 hover:from-campus-600 hover:to-amber-600 text-white text-xs sm:text-sm font-bold shadow-warm transition transform active:scale-95 shrink-0"
        >
          <Sparkles className="w-4 h-4 fill-amber-300 text-amber-200" />
          <span>Magic Auto-Fill with AI</span>
        </button>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
        {/* Listing Intent: Offering vs Seeking Request */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Listing Intent
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setIsRequest(false);
                setExchangeType('sell');
              }}
              className={`p-3.5 rounded-2xl border text-center transition ${
                !isRequest
                  ? 'bg-campus-50 dark:bg-campus-950/40 border-campus-500 text-campus-700 dark:text-campus-300 font-bold shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              <span className="text-sm block">🎁 I have something to Share / Sell</span>
              <span className="text-[11px] opacity-80">Make an offer to campus peers</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsRequest(true);
                setExchangeType('request');
              }}
              className={`p-3.5 rounded-2xl border text-center transition ${
                isRequest
                  ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-700 dark:text-purple-300 font-bold shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              <span className="text-sm block">🔍 I am Seeking / Requesting</span>
              <span className="text-[11px] opacity-80">Looking for textbooks, notes, tutoring</span>
            </button>
          </div>
        </div>

        {/* Listing Type & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Type of Listing
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ListingType)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-white focus:ring-2 focus:ring-campus-500/30"
            >
              <option value="item">Physical Item</option>
              <option value="service">Peer Service / Tutoring</option>
              <option value="notes">Study Notes & Cheat Sheets</option>
              <option value="opportunity">Campus Opportunity</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-white focus:ring-2 focus:ring-campus-500/30"
            >
              {CATEGORIES.filter(c => c !== 'All Categories').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Listing Title
          </label>
          <input
            type="text"
            placeholder="e.g. Calculus: Early Transcendentals 9th Ed (James Stewart)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-campus-500/30"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Detailed Description
          </label>
          <textarea
            rows={3}
            placeholder="Condition, edition, meeting spot details, what makes this helpful for peers..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-campus-500/30 resize-none"
          />
        </div>

        {/* Price & Exchange Type & Condition */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Exchange Type
            </label>
            <select
              value={exchangeType}
              onChange={(e) => setExchangeType(e.target.value as ExchangeType)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-white"
            >
              <option value="sell">For Sale ($)</option>
              <option value="free">Free Giveaway ($0)</option>
              <option value="swap">Open to Swap / Trade</option>
              <option value="offer">Service Offer</option>
              <option value="share">Share Material</option>
              <option value="request">Seeking Request</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Price ($ USD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="number"
                min="0"
                step="1"
                disabled={exchangeType === 'free' || exchangeType === 'swap'}
                value={exchangeType === 'free' || exchangeType === 'swap' ? 0 : price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white disabled:opacity-50"
              />
            </div>
          </div>

          {type === 'item' ? (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Item Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ConditionType)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-white"
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Location / Campus Meetup
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>
          )}
        </div>

        {/* Tailored Dynamic Section per Type */}
        {type === 'notes' && (
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Subject Code</label>
              <input
                type="text"
                placeholder="e.g. MATH 101, CS 201"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Semester</label>
              <input
                type="text"
                placeholder="e.g. Spring 2026"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Professor</label>
              <input
                type="text"
                placeholder="e.g. Dr. Hoffman"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>
        )}

        {type === 'service' && (
          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 text-xs">
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hourly Tutoring Rate ($/hr)</label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
              className="w-48 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>
        )}

        {type === 'opportunity' && (
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/50 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Organization / Club</label>
              <input
                type="text"
                placeholder="e.g. ACM Chapter, Bio Lab"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Application Deadline</label>
              <input
                type="text"
                placeholder="e.g. May 1, 2026"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>
        )}

        {/* Tags & Image URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Tags (comma separated)
            </label>
            <div className="relative">
              <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. MATH101, Calculus, Stewart"
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Image URL / Photo Link
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Image Preview */}
        {imageUrl && (
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0">
              <Image src={imageUrl} alt="Preview" fill sizes="64px" className="object-cover" />
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block">Listing Image Preview</span>
              <span>Loaded successfully from remote URL.</span>
            </div>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3.5 rounded-2xl bg-campus-500 hover:bg-campus-600 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-warm flex items-center gap-2 transition transform disabled:opacity-50"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish Listing Now</span>
          </button>
        </div>
      </form>

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onApply={handleApplyAISuggestion}
      />
    </div>
  );
}
