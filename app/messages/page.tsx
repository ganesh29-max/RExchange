'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store/useStore';
import { ConversationList } from '@/components/chat/ConversationList';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { MessageSquare, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function MessagesPage() {
  const { conversations, messages, currentUser } = useStore();
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);

  useEffect(() => {
    if (conversations.length > 0 && !selectedConvId) {
      setSelectedConvId(conversations[0].id);
    }
  }, [conversations, selectedConvId]);

  const activeConv = conversations.find(c => c.id === selectedConvId);
  const activeMessages = selectedConvId ? messages[selectedConvId] || [] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-campus-500" />
            Campus Messages
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Coordinate pickups, question details, and exchange items safely with verified peers.
          </p>
        </div>
      </div>

      {conversations.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-slate-800 text-campus-500 flex items-center justify-center mx-auto">
            <MessageSquare className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">No Conversations Yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Browse the marketplace and click &quot;Message Student&quot; or reserve an item to start coordinating.
          </p>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-campus-500 text-white font-bold text-xs shadow-warm"
          >
            Explore Marketplace
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[calc(100vh-220px)] min-h-[500px]">
          {/* Left Sidebar: Conversations */}
          <div className="md:col-span-4 border-r border-slate-200 dark:border-slate-800 overflow-y-auto">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Conversations ({conversations.length})
            </div>
            <ConversationList
              conversations={conversations}
              selectedId={selectedConvId}
              onSelect={(id) => setSelectedConvId(id)}
            />
          </div>

          {/* Right Area: Active Thread */}
          <div className="md:col-span-8 flex flex-col h-full overflow-hidden">
            {activeConv ? (
              <ChatWindow
                conversation={activeConv}
                messages={activeMessages}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
                <p className="text-xs">Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
