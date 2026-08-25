import { NextRequest, NextResponse } from "next/server";
import { findSmartMatches } from "@/lib/matching";
import { Listing } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetListing, allListings, threshold } = body as {
      targetListing: Listing;
      allListings: Listing[];
      threshold?: number;
    };

    if (!targetListing || !allListings) {
      return NextResponse.json({ error: "Missing required listing data" }, { status: 400 });
    }

    const matches = findSmartMatches(targetListing, allListings, threshold || 50);
    return NextResponse.json({ matches });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown matching error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
