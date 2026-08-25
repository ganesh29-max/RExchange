import { AISuggestionResponse, ListingType, ExchangeType, ConditionType } from "@/types";

export function fallbackAISuggest(promptText: string): AISuggestionResponse {
  const text = promptText.trim();
  const lower = text.toLowerCase();

  // 1. Detect if it's a Request vs Offer
  const isRequest = /\b(looking for|need|wanted|seeking|searching|anyone have|req|buying|in search of)\b/i.test(lower);

  // 2. Detect Type
  let type: ListingType = 'item';
  if (/\b(tutor|tutoring|help with|teach|clean|move|moving|repair|fix|ride|photography|resume review)\b/i.test(lower)) {
    type = 'service';
  } else if (/\b(notes|cheat sheet|study guide|flashcards|summary|syllabus|lecture notes|past exams|midterm prep)\b/i.test(lower)) {
    type = 'notes';
  } else if (/\b(internship|research assistant|hackathon|team|teammate|lab position|club|volunteer|opportunity)\b/i.test(lower)) {
    type = 'opportunity';
  }

  // 3. Detect Category
  let category = 'General & Other';
  if (/\b(book|textbook|calculus|chemistry|physics|biology|stewart|edition|literature|novel|psychology)\b/i.test(lower)) {
    category = 'Textbooks';
  } else if (/\b(calculator|ti-84|laptop|monitor|keyboard|mouse|headphones|ipad|charger|cable|electronics|screen)\b/i.test(lower)) {
    category = 'Electronics';
  } else if (/\b(dorm|lamp|fan|fridge|microwave|chair|desk|cushion|hanger|mirror|bedding|kitchen)\b/i.test(lower)) {
    category = 'Dorm & Living';
  } else if (/\b(tutor|math|coding|python|java|physics|chemistry|essay|interview)\b/i.test(lower) && type === 'service') {
    category = 'Peer Tutoring';
  } else if (type === 'notes') {
    category = 'Study Notes';
  } else if (/\b(ticket|pass|game|concert|formal|festival|event)\b/i.test(lower)) {
    category = 'Event Passes';
  } else if (/\b(lab coat|goggles|pipette|microscope|dissection kit|calculator)\b/i.test(lower)) {
    category = 'Lab & Art Supplies';
  }

  // 4. Detect Price & Exchange Type
  let price = 0;
  let exchangeType: ExchangeType = isRequest ? 'request' : 'sell';

  if (/\b(free|giveaway|giving away|gratis|0\$)\b/i.test(lower)) {
    price = 0;
    exchangeType = 'free';
  } else if (/\b(swap|trade|exchange for)\b/i.test(lower)) {
    price = 0;
    exchangeType = 'swap';
  } else {
    // Regex for numbers with $ or dollar or price words
    const priceMatch = lower.match(/(?:\$|usd|rs\.?|inr|price:?\s*)?(\d+(?:\.\d{1,2})?)\s*(?:dollars?|bucks?|rs)?/i);
    if (priceMatch && priceMatch[1]) {
      const parsed = parseFloat(priceMatch[1]);
      if (parsed > 0 && parsed < 10000) {
        price = parsed;
      }
    }
  }

  if (type === 'service' && !isRequest && exchangeType === 'sell') {
    exchangeType = 'offer';
  }
  if (type === 'notes' && !isRequest && exchangeType === 'free') {
    exchangeType = 'share';
  }

  // 5. Detect Condition
  let condition: ConditionType | undefined = undefined;
  if (type === 'item') {
    if (/\b(brand new|sealed|unopened|never used)\b/i.test(lower)) {
      condition = 'Brand New';
    } else if (/\b(like new|mint|barely used|perfect condition)\b/i.test(lower)) {
      condition = 'Like New';
    } else if (/\b(good condition|great condition|good|decent)\b/i.test(lower)) {
      condition = 'Good';
    } else if (/\b(fair|used|worn|highlighted)\b/i.test(lower)) {
      condition = 'Fair';
    } else {
      condition = 'Good';
    }
  }

  // 6. Generate Clean Title
  let cleanedTitle = text
    .replace(/\b(i want to|i am|selling|looking for|need to|need|please|wts|wtb|sell|buy|for sale|free|good condition)\b/gi, '')
    .replace(/[$]\d+/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanedTitle || cleanedTitle.length < 3) {
    cleanedTitle = text.slice(0, 40);
  } else {
    // Capitalize first letter of each word
    cleanedTitle = cleanedTitle
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  if (isRequest && !cleanedTitle.toLowerCase().startsWith('seeking') && !cleanedTitle.toLowerCase().startsWith('looking')) {
    cleanedTitle = `Seeking: ${cleanedTitle}`;
  }

  // 7. Extract Tags
  const tags: string[] = [];
  if (category !== 'General & Other') tags.push(category);
  if (type) tags.push(type.toUpperCase());
  if (condition) tags.push(condition);

  // Subject code extractor like CS101, MATH201, CHEM102
  const subjectMatches = text.match(/\b([A-Z]{2,4}\s?\d{3,4}[A-Z]?)\b/gi);
  if (subjectMatches) {
    subjectMatches.forEach(s => tags.push(s.toUpperCase().replace(/\s+/g, '')));
  }

  if (price === 0 && exchangeType === 'free') tags.push('Free');
  if (exchangeType === 'swap') tags.push('Swap');

  return {
    title: cleanedTitle,
    type,
    category,
    tags: Array.from(new Set(tags)).slice(0, 5),
    suggested_price: price,
    exchange_type: exchangeType,
    condition,
    is_request: isRequest,
    confidence: 0.88,
    source: 'fallback',
  };
}
