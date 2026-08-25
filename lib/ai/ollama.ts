import { AISuggestionResponse } from "@/types";

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_CHAT_MODEL = process.env.OLLAMA_CHAT_MODEL || "llama3.2:3b";
const OLLAMA_EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || "nomic-embed-text";

export async function getOllamaSuggestion(promptText: string): Promise<AISuggestionResponse | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const systemPrompt = `You are a campus marketplace assistant. A student enters unstructured text describing what they want to sell, swap, offer, or request. Output strictly valid JSON matching this schema:
{
  "title": "Clean, concise title",
  "type": "item" | "service" | "opportunity" | "notes",
  "category": "Textbooks" | "Electronics" | "Dorm & Living" | "Peer Tutoring" | "Study Notes" | "Campus Opportunities" | "Event Passes" | "Lab & Art Supplies" | "General & Other",
  "tags": ["tag1", "tag2"],
  "suggested_price": number (0 for free/swap),
  "exchange_type": "sell" | "swap" | "free" | "offer" | "request" | "share" | "claim",
  "condition": "Brand New" | "Like New" | "Good" | "Fair" | null,
  "is_request": boolean
}`;

    const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_CHAT_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this listing description: "${promptText}"` },
        ],
        stream: false,
        format: "json",
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const data = await res.json();
    const parsed = JSON.parse(data.message.content);

    return {
      title: parsed.title || "Campus Listing",
      type: parsed.type || "item",
      category: parsed.category || "General & Other",
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      suggested_price: typeof parsed.suggested_price === "number" ? parsed.suggested_price : 0,
      exchange_type: parsed.exchange_type || "sell",
      condition: parsed.condition || undefined,
      is_request: Boolean(parsed.is_request),
      confidence: 0.95,
      source: "ollama",
    };
  } catch {
    return null;
  }
}

export async function getOllamaEmbedding(text: string): Promise<number[] | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${OLLAMA_BASE_URL}/api/embeddings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_EMBED_MODEL,
        prompt: text,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    if (!res.ok) return null;
    const data = await res.json();
    return data.embedding || null;
  } catch {
    return null;
  }
}
