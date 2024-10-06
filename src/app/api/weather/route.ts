// app/api/weather/route.ts
import { NextResponse } from "next/server";
import {
  Coordinates,
  WeatherData,
  WeatherResponse,
  WeatherError,
  WeatherApiResponse,
} from "@/types/weather";

const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;

async function getCoordinates(location: string): Promise<Coordinates> {
  const encodedLocation = encodeURIComponent(location);
  const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=${OPENCAGE_API_KEY}`;

  const response = await fetch(geocodingUrl);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry;
    return { lat, lon: lng };
  }

  throw new Error("Location not found");
}

export async function GET(
  request: Request
): Promise<NextResponse<WeatherApiResponse>> {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const location = searchParams.get("location");

  let coordinates: Coordinates;

  if (lat && lon) {
    coordinates = { lat: parseFloat(lat), lon: parseFloat(lon) };
  } else if (location) {
    try {
      coordinates = await getCoordinates(location);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Failed to geocode location" } as WeatherError,
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Either lat and lon, or location is required" } as WeatherError,
      { status: 400 }
    );
  }

  const weatherApiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${coordinates.lat}&lon=${coordinates.lon}`;

  try {
    const weatherResponse = await fetch(weatherApiUrl, {
      headers: {
        "User-Agent": "YourAppName/1.0 github.com/yourusername/your-repo",
      },
    });

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData: WeatherData = await weatherResponse.json();
    const response: WeatherResponse = { coordinates, weather: weatherData };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" } as WeatherError,
      { status: 500 }
    );
  }
}
