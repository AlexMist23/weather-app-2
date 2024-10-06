"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WeatherResponse, WeatherApiResponse } from "@/types/weather";
import LocationAutocomplete from "@/components/location-autocomplite";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLocationSelect = async (
    location: string,
    lat: number,
    lon: number
  ) => {
    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      let url;
      if (lat !== 0 && lon !== 0) {
        url = `/api/weather?lat=${lat}&lon=${lon}`;
      } else {
        url = `/api/weather?location=${encodeURIComponent(location)}`;
      }

      const response = await fetch(url);
      const data: WeatherApiResponse = await response.json();

      if (response.ok && "weather" in data) {
        setWeatherData(data);
      } else {
        setError("error" in data ? data.error : "Failed to fetch weather data");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      <LocationAutocomplete onLocationSelect={handleLocationSelect} />
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {weatherData && (
        <Card>
          <CardHeader>
            <CardTitle>
              Weather for {weatherData.coordinates.lat.toFixed(4)},{" "}
              {weatherData.coordinates.lon.toFixed(4)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Latitude: {weatherData.coordinates.lat}</p>
            <p>Longitude: {weatherData.coordinates.lon}</p>
            {/* Display weather data here */}
            <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(weatherData.weather, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
