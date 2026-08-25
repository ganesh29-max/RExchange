'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Listing, UserProfile, Claim, Conversation, Message, Review } from '@/types';
import { DEMO_USERS, INITIAL_LISTINGS, INITIAL_REVIEWS, INITIAL_CONVERSATIONS, INITIAL_MESSAGES } from './demo-store';

interface StoreContextType {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  switchUser: (userId: string) => void;
  listings: Listing[];
  addListing: (data: Partial<Listing>) => Listing;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
  toggleSaveListing: (id: string) => void;
  claims: Claim[];
  createClaim: (listingId: string, message?: string) => Claim;
  updateClaimStatus: (claimId: string, status: 'accepted' | 'rejected' | 'completed') => void;
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  sendMessage: (conversationId: string, content: string) => Message;
  startConversation: (listing: Listing, initialMessage: string) => string;
  reviews: Review[];
  addReview: (reviewData: { listing_id: string; listing_title: string; reviewee_id: string; rating: number; comment: string }) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [allUsers, setAllUsers] = useState<UserProfile[]>(DEMO_USERS);
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USERS[0]);
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    'conv-1': INITIAL_MESSAGES
  });
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedListings = localStorage.getItem('rexchange_listings');
      if (savedListings) {
        setListings(JSON.parse(savedListings));
      }
      const savedClaims = localStorage.getItem('rexchange_claims');
      if (savedClaims) {
        setClaims(JSON.parse(savedClaims));
      }
      const savedUserId = localStorage.getItem('rexchange_current_user_id');
      if (savedUserId) {
        const found = DEMO_USERS.find(u => u.id === savedUserId);
        if (found) setCurrentUser(found);
      }
      const savedTheme = localStorage.getItem('rexchange_dark_mode');
      if (savedTheme === 'true') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    } catch {
      // LocalStorage not available, use in-memory state
    }
  }, []);

  const switchUser = (userId: string) => {
    const user = allUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      try {
        localStorage.setItem('rexchange_current_user_id', user.id);
      } catch {}
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      try {
        localStorage.setItem('rexchange_dark_mode', String(next));
      } catch {}
      return next;
    });
  };

  const addListing = (data: Partial<Listing>): Listing => {
    const newListing: Listing = {
      id: `listing-${Date.now()}`,
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      user_avatar: currentUser.avatar_url,
      user_college: currentUser.college,
      user_rating: currentUser.rating,
      title: data.title || 'Untitled Campus Listing',
      description: data.description || '',
      type: data.type || 'item',
      category: data.category || 'General & Other',
      tags: data.tags || [],
      price: typeof data.price === 'number' ? data.price : 0,
      exchange_type: data.exchange_type || 'sell',
      status: 'available',
      condition: data.condition,
      location: data.location || 'Main Campus Quad',
      is_request: Boolean(data.is_request),
      images: data.images && data.images.length > 0 ? data.images : [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
      ],
      extra_details: data.extra_details,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setListings(prev => {
      const updated = [newListing, ...prev];
      try {
        localStorage.setItem('rexchange_listings', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    return newListing;
  };

  const updateListing = (id: string, updates: Partial<Listing>) => {
    setListings(prev => {
      const updated = prev.map(item => (item.id === id ? { ...item, ...updates, updated_at: new Date().toISOString() } : item));
      try {
        localStorage.setItem('rexchange_listings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const deleteListing = (id: string) => {
    setListings(prev => {
      const updated = prev.filter(item => item.id !== id);
      try {
        localStorage.setItem('rexchange_listings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleSaveListing = (id: string) => {
    setCurrentUser(prev => {
      const saved = prev.saved_listing_ids.includes(id)
        ? prev.saved_listing_ids.filter(savedId => savedId !== id)
        : [...prev.saved_listing_ids, id];
      return { ...prev, saved_listing_ids: saved };
    });
  };

  const createClaim = (listingId: string, message?: string): Claim => {
    const listing = listings.find(l => l.id === listingId);
    const newClaim: Claim = {
      id: `claim-${Date.now()}`,
      listing_id: listingId,
      listing_title: listing?.title || 'Campus Item',
      claimer_id: currentUser.id,
      claimer_name: currentUser.full_name,
      claimer_avatar: currentUser.avatar_url,
      owner_id: listing?.user_id || '',
      status: 'pending',
      message: message || `Hi! I would like to reserve/claim this. Can we meet up?`,
      created_at: new Date().toISOString(),
    };

    // Update listing status to reserved
    updateListing(listingId, { status: 'reserved' });

    setClaims(prev => {
      const updated = [newClaim, ...prev];
      try {
        localStorage.setItem('rexchange_claims', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Also initiate a chat message automatically
    if (listing) {
      startConversation(listing, `[Reservation Request]: ${message || "I'd like to reserve this listing!"}`);
    }

    return newClaim;
  };

  const updateClaimStatus = (claimId: string, status: 'accepted' | 'rejected' | 'completed') => {
    setClaims(prev => prev.map(c => c.id === claimId ? { ...c, status } : c));
    const claim = claims.find(c => c.id === claimId);
    if (claim) {
      if (status === 'completed') {
        updateListing(claim.listing_id, { status: 'completed' });
      } else if (status === 'rejected') {
        updateListing(claim.listing_id, { status: 'available' });
      }
    }
  };

  const startConversation = (listing: Listing, initialMessage: string): string => {
    // Check if conversation already exists
    const existing = conversations.find(
      c => c.listing_id === listing.id && c.participant_ids.includes(currentUser.id)
    );

    if (existing) {
      sendMessage(existing.id, initialMessage);
      return existing.id;
    }

    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      listing_id: listing.id,
      listing_title: listing.title,
      listing_price: listing.price,
      listing_image: listing.images[0] || '',
      participant_ids: [currentUser.id, listing.user_id],
      other_user: {
        id: listing.user_id,
        name: listing.user_name,
        avatar: listing.user_avatar,
        college: listing.user_college,
      },
      last_message: initialMessage,
      last_message_at: new Date().toISOString(),
      unread: false,
    };

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversation_id: newConvId,
      sender_id: currentUser.id,
      sender_name: currentUser.full_name,
      content: initialMessage,
      created_at: new Date().toISOString(),
    };

    setConversations(prev => [newConv, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newConvId]: [newMsg],
    }));

    return newConvId;
  };

  const sendMessage = (conversationId: string, content: string): Message => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversation_id: conversationId,
      sender_id: currentUser.id,
      sender_name: currentUser.full_name,
      content,
      created_at: new Date().toISOString(),
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId
          ? { ...c, last_message: content, last_message_at: new Date().toISOString() }
          : c
      )
    );

    // Auto-respond simulation if chatting with another demo user
    setTimeout(() => {
      const conv = conversations.find(c => c.id === conversationId);
      if (conv && conv.other_user.id !== currentUser.id) {
        const replyMsg: Message = {
          id: `msg-${Date.now() + 1}`,
          conversation_id: conversationId,
          sender_id: conv.other_user.id,
          sender_name: conv.other_user.name,
          content: `Sounds good! Let's meet up at the Campus Student Center or Science Library. I will bring it with me!`,
          created_at: new Date().toISOString(),
        };
        setMessages(inner => ({
          ...inner,
          [conversationId]: [...(inner[conversationId] || []), replyMsg],
        }));
        setConversations(inner =>
          inner.map(c =>
            c.id === conversationId
              ? { ...c, last_message: replyMsg.content, last_message_at: replyMsg.created_at, unread: true }
              : c
          )
        );
      }
    }, 1500);

    return newMsg;
  };

  const addReview = (reviewData: { listing_id: string; listing_title: string; reviewee_id: string; rating: number; comment: string }) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      listing_id: reviewData.listing_id,
      listing_title: reviewData.listing_title,
      reviewer_id: currentUser.id,
      reviewer_name: currentUser.full_name,
      reviewer_avatar: currentUser.avatar_url,
      reviewee_id: reviewData.reviewee_id,
      rating: reviewData.rating,
      comment: reviewData.comment,
      created_at: new Date().toISOString(),
    };

    setReviews(prev => [newReview, ...prev]);

    // Update reviewee stats
    setAllUsers(prev =>
      prev.map(u => {
        if (u.id === reviewData.reviewee_id) {
          const newCount = u.review_count + 1;
          const newRating = Number(((u.rating * u.review_count + reviewData.rating) / newCount).toFixed(2));
          return {
            ...u,
            review_count: newCount,
            rating: newRating,
            exchanges_completed: u.exchanges_completed + 1,
          };
        }
        return u;
      })
    );
  };

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        allUsers,
        switchUser,
        listings,
        addListing,
        updateListing,
        deleteListing,
        toggleSaveListing,
        claims,
        createClaim,
        updateClaimStatus,
        conversations,
        messages,
        sendMessage,
        startConversation,
        reviews,
        addReview,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
