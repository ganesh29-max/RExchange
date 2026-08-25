import { AISuggestionResponse } from "@/types";
import { getOllamaSuggestion, getOllamaEmbedding } from "./ollama";
import { fallbackAISuggest } from "./fallback";

export async function generateListingSuggestion(rawText: string): Promise<AISuggestionResponse> {
  const provider = process.env.AI_PROVIDER || "ollama";

  if (provider === "ollama") {
    const ollamaResult = await getOllamaSuggestion(rawText);
    if (ollamaResult) {
      return ollamaResult;
    }
  }

  // Gracefully fallback to our intelligent rule-based engine
  return fallbackAISuggest(rawText);
}

export async function generateEmbedding(text: string): Promise<number[] | null> {
  const provider = process.env.AI_PROVIDER || "ollama";
  if (provider === "ollama") {
    return await getOllamaEmbedding(text);
  }
  return null;
}
