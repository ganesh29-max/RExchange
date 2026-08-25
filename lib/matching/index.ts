import { Listing, SmartMatch } from "@/types";

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Tokenize and extract key terms
function extractKeywords(text: string): Set<string> {
  const stopWords = new Set(['the', 'and', 'for', 'with', 'this', 'that', 'have', 'from', 'looking', 'need', 'seeking', 'selling', 'wanted', 'please', 'book', 'good']);
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w))
  );
}

export function calculateKeywordSimilarity(listingA: Listing, listingB: Listing): { score: number; reason: string } {
  // If one is request and the other is offer, that's a high affinity candidate
  const isComplementary = listingA.is_request !== listingB.is_request;
  let score = 0;
  const reasons: string[] = [];

  // Category match
  if (listingA.category === listingB.category) {
    score += 30;
    reasons.push(`Same category: ${listingA.category}`);
  }

  // Type match
  if (listingA.type === listingB.type) {
    score += 15;
  }

  // Tag overlap
  const tagsA = new Set(listingA.tags.map(t => t.toLowerCase()));
  const tagsB = new Set(listingB.tags.map(t => t.toLowerCase()));
  const sharedTags = Array.from(tagsA).filter(t => tagsB.has(t));
  if (sharedTags.length > 0) {
    score += Math.min(25, sharedTags.length * 12);
    reasons.push(`Shared tags: ${sharedTags.join(', ')}`);
  }

  // Title / description keyword overlap
  const textA = `${listingA.title} ${listingA.description}`;
  const textB = `${listingB.title} ${listingB.description}`;
  const wordsA = extractKeywords(textA);
  const wordsB = extractKeywords(textB);
  const sharedWords = Array.from(wordsA).filter(w => wordsB.has(w));

  if (sharedWords.length > 0) {
    const overlapScore = Math.min(30, sharedWords.length * 10);
    score += overlapScore;
    reasons.push(`Matching keywords: ${sharedWords.slice(0, 3).join(', ')}`);
  }

  if (isComplementary) {
    score = Math.min(98, score + 15);
  }

  const reason = reasons.length > 0 
    ? (isComplementary ? `Request & Offer match: ${reasons.join(' · ')}` : reasons.join(' · '))
    : 'Semantic campus proximity';

  return {
    score: Math.min(99, Math.max(15, score)),
    reason,
  };
}

export function findSmartMatches(targetListing: Listing, allListings: Listing[], threshold: number = 60): SmartMatch[] {
  const matches: SmartMatch[] = [];

  for (const candidate of allListings) {
    if (candidate.id === targetListing.id) continue;
    if (candidate.user_id === targetListing.user_id) continue;
    if (candidate.status === 'completed') continue;

    let score = 0;
    let reason = '';

    if (targetListing.embedding && candidate.embedding) {
      const cos = cosineSimilarity(targetListing.embedding, candidate.embedding);
      score = Math.round(cos * 100);
      reason = `Vector semantic similarity (${score}%)`;
    } else {
      const res = calculateKeywordSimilarity(targetListing, candidate);
      score = res.score;
      reason = res.reason;
    }

    if (score >= threshold) {
      matches.push({
        listing: targetListing,
        matched_listing: candidate,
        similarity_score: score,
        reason,
      });
    }
  }

  return matches.sort((a, b) => b.similarity_score - a.similarity_score);
}
