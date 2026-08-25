import { NextRequest, NextResponse } from "next/server";
import { generateListingSuggestion } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const promptText = body.prompt;

    if (!promptText || typeof promptText !== "string" || promptText.trim().length < 3) {
      return NextResponse.json(
        { error: "Please provide a valid prompt or description (at least 3 characters)" },
        { status: 400 }
      );
    }

    const suggestion = await generateListingSuggestion(promptText);
    return NextResponse.json(suggestion);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown AI error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
