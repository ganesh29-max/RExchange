'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, CheckCircle2, ArrowRight, X, Lightbulb } from 'lucide-react';
import { AISuggestionResponse } from '@/types';
import { useToast } from '@/components/ui/Toast';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (suggestion: AISuggestionResponse) => void;
}

const QUICK_EXAMPLES = [
  "engineering maths book first year good condition sell 35",
  "ti 84 plus color graphing calculator barely used 60 dollars",
  "looking for python programming tutor for business student 20/hr",
  "chemistry 201 handwritten reaction mechanism cheat sheets free",
  "mini fridge for dorm room works great free giveaway moving out",
  "seeking calculus early transcendentals stewart 9th edition urgent"
];

export function AIAssistantModal({ isOpen, onClose, onApply }: AIAssistantModalProps) {
  const [promptText, setPromptText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<AISuggestionResponse | null>(null);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleGenerate = async (textToUse?: string) => {
    const text = textToUse || promptText;
    if (!text || text.trim().length < 3) {
      toast("Please enter details", "Write a few words describing what you want to sell, share, or request.", "info");
      return;
    }

    setIsLoading(true);
    setSuggestion(null);

    try {
      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });

      if (!res.ok) {
        throw new Error('AI suggestion failed');
      }

      const data: AISuggestionResponse = await res.json();
      setSuggestion(data);
      toast("AI Magic Complete!", `Generated structured fields for "${data.title}"`, "success");
    } catch {
      toast("Error generating suggestion", "Using rule-based parser.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (suggestion) {
      onApply(suggestion);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-orange-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-campus-500 via-campus-600 to-amber-500 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-200 fill-amber-200" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">AI Listing Assistant</h3>
              <p className="text-xs text-orange-100">Describe what you have or need in plain text</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Quick Raw Prompt or Description
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Stewart calculus 9th edition book good condition sell for 30 bucks at science quad..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-campus-500/30 focus:border-campus-500 transition text-slate-900 dark:text-white placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Quick Clickable Examples */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Try an example:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_EXAMPLES.map((eg, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPromptText(eg);
                    handleGenerate(eg);
                  }}
                  className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-slate-800 text-campus-700 dark:text-campus-300 hover:bg-orange-100 dark:hover:bg-slate-700 transition border border-orange-200/60 dark:border-slate-700 truncate max-w-full"
                >
                  &quot;{eg.slice(0, 38)}...&quot;
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={() => handleGenerate()}
            disabled={isLoading || !promptText.trim()}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-campus-500 to-amber-500 hover:from-campus-600 hover:to-amber-600 text-white font-bold text-sm shadow-warm flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Extracting Fields with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Auto-Generate Listing Details</span>
              </>
            )}
          </button>

          {/* AI Result Card */}
          {suggestion && (
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-3 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  AI Suggested Parameters
                </span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full font-mono">
                  {suggestion.source === 'ollama' ? 'Local Ollama' : 'Heuristic Engine'} ({Math.round(suggestion.confidence * 100)}%)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Title</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">{suggestion.title}</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Category & Type</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">
                    {suggestion.category} · {suggestion.type}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Suggested Price</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {suggestion.suggested_price === 0 ? 'Free / Swap' : `$${suggestion.suggested_price}`}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Intent</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {suggestion.is_request ? '🔍 Seeking Request' : '🎁 Offering / Selling'}
                  </span>
                </div>
              </div>

              {suggestion.tags && suggestion.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {suggestion.tags.map((t, i) => (
                    <span key={i} className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-md">
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={handleApply}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition"
              >
                <span>Apply to Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
