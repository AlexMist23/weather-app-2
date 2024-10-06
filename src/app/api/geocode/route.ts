// app/api/geocode/route.ts
import { NextResponse } from "next/server";
import { OpenCageResponse, OpenCageResult } from "@/types/weather";

const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    query
  )}&key=${OPENCAGE_API_KEY}&limit=5`;

  try {
    const response = await fetch(url);
    const data: OpenCageResponse = await response.json();

    const results = data.results.map((result: OpenCageResult) => ({
      place_name: result.formatted,
      lat: result.geometry.lat,
      lng: result.geometry.lng,
      timezone: result.annotations.timezone.name,
      currency: result.annotations.currency.name,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    return NextResponse.json(
      { error: "Failed to fetch geocoding data" },
      { status: 500 }
    );
  }
}
