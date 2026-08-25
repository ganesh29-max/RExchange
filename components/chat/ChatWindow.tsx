'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Conversation, Message } from '@/types';
import { useStore } from '@/lib/store/useStore';
import { formatCurrency, formatTimeAgo } from '@/lib/utils';
import { Send, ExternalLink, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface ChatWindowProps {
  conversation: Conversation;
  messages: Message[];
}

const QUICK_REPLIES = [
  "Can meet at Science Quad!",
  "Is 3pm good for you?",
  "I'm at the Library lobby now.",
  "Item condition looks great!",
];

export function ChatWindow({ conversation, messages }: ChatWindowProps) {
  const { currentUser, sendMessage } = useStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(conversation.id, inputText.trim());
    setInputText('');
  };

  const handleQuickReply = (text: string) => {
    sendMessage(conversation.id, text);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 overflow-hidden">
      {/* Listing Summary Top Header Bar */}
      <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0">
            {conversation.listing_image ? (
              <Image
                src={conversation.listing_image}
                alt={conversation.listing_title}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
              {conversation.listing_title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold text-campus-600 dark:text-campus-400">
                {conversation.listing_price === 0 ? 'FREE' : formatCurrency(conversation.listing_price)}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 inline" /> {conversation.other_user.name}
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/listings/${conversation.listing_id}`}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-campus-400 transition shrink-0 shadow-sm"
        >
          <span>View Listing</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Safety Banner */}
      <div className="px-4 py-1.5 bg-orange-50/70 dark:bg-slate-800/40 text-[11px] text-slate-500 dark:text-slate-400 border-b border-orange-100/60 dark:border-slate-800 flex items-center justify-center gap-1.5">
        <MapPin className="w-3 h-3 text-campus-500" />
        <span>Campus Safety: Meet in public campus areas like the Student Union, Library, or Quad.</span>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isMe = msg.sender_id === currentUser.id;
          return (
            <div
              key={msg.id || index}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] sm:max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  isMe
                    ? 'bg-campus-500 text-white rounded-br-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none border border-slate-200/60 dark:border-slate-700'
                }`}
              >
                {msg.content}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {formatTimeAgo(msg.created_at)}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies Carousel */}
      <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mr-1" />
        {QUICK_REPLIES.map((qr, i) => (
          <button
            key={i}
            onClick={() => handleQuickReply(qr)}
            className="text-[11px] font-medium whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-campus-400 hover:text-campus-600 transition shadow-sm"
          >
            {qr}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <input
          type="text"
          placeholder={`Message ${conversation.other_user.name.split(' ')[0]}...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-campus-500/30 text-slate-900 dark:text-white placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-2xl bg-campus-500 hover:bg-campus-600 text-white shadow-warm transition disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
