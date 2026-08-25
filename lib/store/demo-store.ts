import { Listing, UserProfile, Claim, Conversation, Message, Review } from "@/types";

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'user-alex-1',
    email: 'alex.chen@campus.edu',
    full_name: 'Alex Chen',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexChen',
    college: 'School of Engineering & Applied Science',
    major: 'Computer Science',
    graduation_year: '2026',
    bio: 'Junior CS student passionate about distributed systems and hardware hacking. Always down to help underclassmen with debugging or math!',
    rating: 4.95,
    review_count: 14,
    exchanges_completed: 18,
    is_verified: true,
    saved_listing_ids: ['listing-102', 'listing-105'],
    created_at: '2024-09-01T10:00:00Z',
  },
  {
    id: 'user-sarah-2',
    email: 'sarah.j@campus.edu',
    full_name: 'Sarah Jenkins',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ',
    college: 'College of Arts & Sciences',
    major: 'Bioengineering & Pre-Med',
    graduation_year: '2025',
    bio: 'Senior pre-med. Selling lab gear, MCAT review notes, and dorm essentials before graduation.',
    rating: 4.88,
    review_count: 11,
    exchanges_completed: 15,
    is_verified: true,
    saved_listing_ids: ['listing-101'],
    created_at: '2024-08-15T12:00:00Z',
  },
  {
    id: 'user-marcus-3',
    email: 'marcus.b@campus.edu',
    full_name: 'Marcus Brody',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusB',
    college: 'School of Management',
    major: 'Finance & Economics',
    graduation_year: '2026',
    bio: 'Sophomore in business school. Sharing event passes, case prep materials, and dorm furniture.',
    rating: 5.0,
    review_count: 8,
    exchanges_completed: 10,
    is_verified: true,
    saved_listing_ids: [],
    created_at: '2024-09-10T14:30:00Z',
  },
  {
    id: 'user-maya-4',
    email: 'maya.patel@campus.edu',
    full_name: 'Maya Patel',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MayaP',
    college: 'Department of Mathematics',
    major: 'Applied Mathematics',
    graduation_year: '2025',
    bio: 'Math TA & senior student. Selling graphing calculators and calculus solutions guides.',
    rating: 4.92,
    review_count: 16,
    exchanges_completed: 21,
    is_verified: true,
    saved_listing_ids: [],
    created_at: '2024-08-01T09:00:00Z',
  },
  {
    id: 'user-david-5',
    email: 'david.kim@campus.edu',
    full_name: 'David Kim',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidK',
    college: 'School of Architecture & Design',
    major: 'Architecture',
    graduation_year: '2027',
    bio: 'Sophomore design student. Trading drafting tools, monitors, and art supplies.',
    rating: 4.75,
    review_count: 6,
    exchanges_completed: 8,
    is_verified: true,
    saved_listing_ids: [],
    created_at: '2024-10-01T16:00:00Z',
  }
];

export const INITIAL_LISTINGS: Listing[] = [
  // 1. Textbooks - Offer
  {
    id: 'listing-101',
    user_id: 'user-alex-1',
    user_name: 'Alex Chen',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexChen',
    user_college: 'School of Engineering',
    user_rating: 4.95,
    title: 'Calculus: Early Transcendentals 9th Ed (James Stewart)',
    description: 'Hardcover in pristine condition. No highlighting or markings. Essential for MATH 101/102. Includes unused WebAssign code.',
    type: 'item',
    category: 'Textbooks',
    tags: ['MATH101', 'Calculus', 'Stewart', 'Hardcover', 'Engineering'],
    price: 35,
    exchange_type: 'sell',
    status: 'available',
    condition: 'Like New',
    location: 'Engineering Quad / Science Library',
    is_request: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },

  // 2. Textbooks - Matching Request (Matches listing-101!)
  {
    id: 'listing-102',
    user_id: 'user-sarah-2',
    user_name: 'Sarah Jenkins',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ',
    user_college: 'College of Arts & Sciences',
    user_rating: 4.88,
    title: 'Seeking: Stewart Calculus 9th Edition for First Year Math',
    description: 'Looking to buy or borrow James Stewart Early Transcendentals 9th Edition for my MATH 101 semester. Willing to pay up to $40 or swap for Organic Chem notes!',
    type: 'item',
    category: 'Textbooks',
    tags: ['MATH101', 'Calculus', 'Stewart', 'Textbook', 'Urgent'],
    price: 40,
    exchange_type: 'request',
    status: 'available',
    condition: 'Good',
    location: 'North Campus Quad',
    is_request: true,
    images: [
      'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },

  // 3. Electronics - Offer
  {
    id: 'listing-103',
    user_id: 'user-maya-4',
    user_name: 'Maya Patel',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MayaP',
    user_college: 'Department of Mathematics',
    user_rating: 4.92,
    title: 'Texas Instruments TI-84 Plus CE Color Graphing Calculator',
    description: 'Rose gold edition TI-84 Plus CE with rechargeable battery, charging cable, and protective slide case. Tested and allowed on SAT/ACT/AP exams.',
    type: 'item',
    category: 'Electronics',
    tags: ['Calculator', 'TI84', 'Math', 'ColorScreen', 'Exams'],
    price: 65,
    exchange_type: 'sell',
    status: 'available',
    condition: 'Like New',
    location: 'Student Union Room 204',
    is_request: false,
    images: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 36).toISOString(),
  },

  // 4. Electronics - Matching Request (Matches listing-103!)
  {
    id: 'listing-104',
    user_id: 'user-david-5',
    user_name: 'David Kim',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidK',
    user_college: 'School of Architecture',
    user_rating: 4.75,
    title: 'Seeking: TI-84 Plus or Color Graphing Calculator for Physics',
    description: 'Urgent request: Need a working TI-84 Plus CE or standard graphing calculator for my mechanics midterm next Tuesday. Can buy or trade.',
    type: 'item',
    category: 'Electronics',
    tags: ['Calculator', 'TI84', 'Physics', 'Exams', 'Wanted'],
    price: 60,
    exchange_type: 'request',
    status: 'available',
    condition: 'Good',
    location: 'Architecture Hall A',
    is_request: true,
    images: [
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 8).toISOString(),
  },

  // 5. Peer Service - Offer
  {
    id: 'listing-105',
    user_id: 'user-alex-1',
    user_name: 'Alex Chen',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexChen',
    user_college: 'School of Engineering',
    user_rating: 4.95,
    title: 'CS 101 & Python Data Structures 1-on-1 Peer Tutoring',
    description: 'Offering friendly peer tutoring for introductory Python, algorithm complexity, recursion, and object-oriented programming. Got an A+ in CS101/102 and previous TA experience.',
    type: 'service',
    category: 'Peer Tutoring',
    tags: ['Python', 'CS101', 'Tutoring', 'Algorithms', 'DataStructures'],
    price: 20,
    exchange_type: 'offer',
    status: 'available',
    location: 'Engineering Commons or Zoom',
    is_request: false,
    extra_details: {
      hourly_rate: 20,
    },
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },

  // 6. Peer Service - Matching Request (Matches listing-105!)
  {
    id: 'listing-106',
    user_id: 'user-marcus-3',
    user_name: 'Marcus Brody',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusB',
    user_college: 'School of Management',
    user_rating: 5.0,
    title: 'Seeking: Python & Coding Tutor for Business Analytics Class',
    description: 'Looking for a patient computer science student to help me understand basic Python loops, pandas dataframes, and assignments for 2 hours a week.',
    type: 'service',
    category: 'Peer Tutoring',
    tags: ['Python', 'Tutoring', 'Coding', 'CS101', 'Analytics'],
    price: 25,
    exchange_type: 'request',
    status: 'available',
    location: 'Campus Coffeehouse or Library',
    is_request: true,
    extra_details: {
      hourly_rate: 25,
    },
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },

  // 7. Study Notes - Share
  {
    id: 'listing-107',
    user_id: 'user-sarah-2',
    user_name: 'Sarah Jenkins',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ',
    user_college: 'College of Arts & Sciences',
    user_rating: 4.88,
    title: 'Organic Chemistry I & II Comprehensive Reaction Cheat Sheets',
    description: 'Full semester handwritten and vectorized PDF summary sheets of all alkene/alkyne reactions, SN1/SN2/E1/E2 mechanisms, and synthesis roadmaps.',
    type: 'notes',
    category: 'Study Notes',
    tags: ['CHEM201', 'Orgo', 'StudyGuide', 'ReactionMechanisms', 'PDF'],
    price: 0,
    exchange_type: 'free',
    status: 'available',
    location: 'Digital PDF Share via RExchange',
    is_request: false,
    extra_details: {
      subject_code: 'CHEM 201',
      semester: 'Fall 2025',
      professor: 'Dr. Evans',
    },
    images: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 60).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 60).toISOString(),
  },

  // 8. Dorm & Living - Free Giveaway
  {
    id: 'listing-108',
    user_id: 'user-sarah-2',
    user_name: 'Sarah Jenkins',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ',
    user_college: 'College of Arts & Sciences',
    user_rating: 4.88,
    title: 'Desk Lamp with USB Charging Port & 3 Color Modes',
    description: 'Black LED adjustable architect desk lamp. Has built-in phone charging USB slot. Fully working, moving out of dorm.',
    type: 'item',
    category: 'Dorm & Living',
    tags: ['Dorm', 'Lamp', 'LED', 'Free', 'Giveaway'],
    price: 0,
    exchange_type: 'free',
    status: 'available',
    condition: 'Good',
    location: 'East Tower Dorm Lounge',
    is_request: false,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 18).toISOString(),
  },

  // 9. Campus Opportunities
  {
    id: 'listing-109',
    user_id: 'user-alex-1',
    user_name: 'Alex Chen',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexChen',
    user_college: 'School of Engineering',
    user_rating: 4.95,
    title: 'Spring Hackathon Team: Seeking Frontend / UI Designer Teammate',
    description: 'Our 3-person team (2 backend/ML, 1 fullstack) is looking for a creative UI/UX designer or frontend developer for the upcoming 36-hour Spring Campus Hackathon. Free food & prizes!',
    type: 'opportunity',
    category: 'Campus Opportunities',
    tags: ['Hackathon', 'Design', 'Figma', 'Team', 'Project'],
    price: 0,
    exchange_type: 'claim',
    status: 'available',
    location: 'Innovation Hub',
    is_request: false,
    extra_details: {
      deadline: 'April 15, 2026',
      organization: 'ACM Student Chapter',
    },
    images: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 72).toISOString(),
  },

  // 10. Event Passes
  {
    id: 'listing-110',
    user_id: 'user-marcus-3',
    user_name: 'Marcus Brody',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusB',
    user_college: 'School of Management',
    user_rating: 5.0,
    title: 'Campus Homecoming Basketball Game Student Section Pass',
    description: 'Extra student section ticket for Saturday night rivalry game vs State. Can transfer instantly via Student Ticket Portal.',
    type: 'item',
    category: 'Event Passes',
    tags: ['Basketball', 'Game', 'Tickets', 'Homecoming', 'Sports'],
    price: 15,
    exchange_type: 'sell',
    status: 'available',
    condition: 'Brand New',
    location: 'Athletics Center Box Office',
    is_request: false,
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 14).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 14).toISOString(),
  },

  // 11. Lab Gear
  {
    id: 'listing-111',
    user_id: 'user-sarah-2',
    user_name: 'Sarah Jenkins',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ',
    user_college: 'College of Arts & Sciences',
    user_rating: 4.88,
    title: 'Chemistry Lab Coat (Size M) + Splash Goggles Bundle',
    description: '100% cotton flame-resistant lab coat and UV protective eye goggles. Cleaned and meeting all safety standards for General & Organic Chem labs.',
    type: 'item',
    category: 'Lab & Art Supplies',
    tags: ['LabCoat', 'Goggles', 'Chemistry', 'Safety', 'Bundle'],
    price: 18,
    exchange_type: 'sell',
    status: 'available',
    condition: 'Good',
    location: 'Chemistry Building Room 101',
    is_request: false,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 90).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 90).toISOString(),
  },

  // 12. Electronics - Swap
  {
    id: 'listing-112',
    user_id: 'user-david-5',
    user_name: 'David Kim',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidK',
    user_college: 'School of Architecture',
    user_rating: 4.75,
    title: 'Dell 24" UltraSharp IPS Monitor (1080p, HDMI/DP)',
    description: 'Great secondary display for studying and coding. Looking to swap for a mechanical keyboard (Cherry MX Brown/Red) or sell for $45.',
    type: 'item',
    category: 'Electronics',
    tags: ['Monitor', 'Display', 'Dell', 'IPS', 'Swap'],
    price: 45,
    exchange_type: 'swap',
    status: 'available',
    condition: 'Good',
    location: 'South Campus Quad',
    is_request: false,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 100).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 100).toISOString(),
  },

  // 13. Study Notes - Data Structures
  {
    id: 'listing-113',
    user_id: 'user-alex-1',
    user_name: 'Alex Chen',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexChen',
    user_college: 'School of Engineering',
    user_rating: 4.95,
    title: 'CS 201 Data Structures & Algorithms Midterm Review Packet',
    description: 'Concise 12-page summary covering AVL trees, HashMaps collision resolution, Graph traversals (BFS/DFS, Dijkstra), and asymptotic runtime proofs.',
    type: 'notes',
    category: 'Study Notes',
    tags: ['CS201', 'DataStructures', 'Algorithms', 'CheatSheet', 'PDF'],
    price: 0,
    exchange_type: 'share',
    status: 'available',
    location: 'Instant Online Download',
    is_request: false,
    extra_details: {
      subject_code: 'CS 201',
      semester: 'Spring 2025',
      professor: 'Prof. Hoffman',
    },
    images: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 110).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 110).toISOString(),
  },

  // 14. Peer Service - Moving Help
  {
    id: 'listing-114',
    user_id: 'user-marcus-3',
    user_name: 'Marcus Brody',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusB',
    user_college: 'School of Management',
    user_rating: 5.0,
    title: 'Weekend Dorm Moving & Heavy Furniture Lifting Assistance',
    description: 'Have a compact pickup truck and a folding hand dolly. Available on Friday afternoons and Saturdays to help move mini-fridges, couches, and boxes between dorms.',
    type: 'service',
    category: 'Peer Services',
    tags: ['Moving', 'Truck', 'HeavyLifting', 'Dorm', 'Help'],
    price: 25,
    exchange_type: 'offer',
    status: 'available',
    location: 'Any Campus Residence Hall',
    is_request: false,
    extra_details: {
      hourly_rate: 25,
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 120).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 120).toISOString(),
  },

  // 15. Opportunities - Research Lab
  {
    id: 'listing-115',
    user_id: 'user-sarah-2',
    user_name: 'Sarah Jenkins',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ',
    user_college: 'College of Arts & Sciences',
    user_rating: 4.88,
    title: 'Undergraduate Research Assistant for Cellular Dynamics Lab',
    description: 'Our lab is seeking a sophomore/junior with biology coursework for 8-10 hrs/week. Training in cell culturing and confocal microscopy provided. Can earn course credit.',
    type: 'opportunity',
    category: 'Campus Opportunities',
    tags: ['Research', 'Biology', 'Lab', 'CourseCredit', 'PreMed'],
    price: 0,
    exchange_type: 'claim',
    status: 'available',
    location: 'Biomedical Research Center Wing B',
    is_request: false,
    extra_details: {
      organization: 'Department of Bioengineering',
      deadline: 'May 1, 2026',
    },
    images: [
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'
    ],
    created_at: new Date(Date.now() - 3600000 * 130).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 130).toISOString(),
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    listing_id: 'listing-101',
    listing_title: 'Calculus: Early Transcendentals 9th Ed',
    reviewer_id: 'user-sarah-2',
    reviewer_name: 'Sarah Jenkins',
    reviewer_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ',
    reviewee_id: 'user-alex-1',
    rating: 5,
    comment: 'Super easy pickup right at the library quad. Book was in mint condition just as described! A+ campus seller.',
    created_at: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
  },
  {
    id: 'rev-2',
    listing_id: 'listing-105',
    listing_title: 'CS 101 & Python 1-on-1 Peer Tutoring',
    reviewer_id: 'user-marcus-3',
    reviewer_name: 'Marcus Brody',
    reviewer_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusB',
    reviewee_id: 'user-alex-1',
    rating: 5,
    comment: 'Alex helped me understand recursion in one session when my professor could not. Invaluable peer tutor!',
    created_at: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    listing_id: 'listing-101',
    listing_title: 'Calculus: Early Transcendentals 9th Ed (James Stewart)',
    listing_price: 35,
    listing_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    participant_ids: ['user-alex-1', 'user-sarah-2'],
    other_user: {
      id: 'user-sarah-2',
      name: 'Sarah Jenkins',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ',
      college: 'College of Arts & Sciences',
    },
    last_message: 'Hi Alex! Is the Stewart calculus textbook still available? Can meet at the library quad today at 3pm.',
    last_message_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    unread: true,
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    conversation_id: 'conv-1',
    sender_id: 'user-sarah-2',
    sender_name: 'Sarah Jenkins',
    content: 'Hi Alex! Is the Stewart calculus textbook still available? Can meet at the library quad today at 3pm.',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'msg-2',
    conversation_id: 'conv-1',
    sender_id: 'user-alex-1',
    sender_name: 'Alex Chen',
    content: 'Hey Sarah! Yes, it is available. 3pm at the Science Library quad sounds great. See you by the fountain!',
    created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  }
];
