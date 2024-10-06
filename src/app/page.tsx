"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    // TODO: use a geocoding service to convert location to lat/lon
    const lat = 59.9139; // Oslo latitude
    const lon = 10.7522; // Oslo longitude

    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
    const data = await response.json();
    setWeatherData(data);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {weatherData && (
        <Card>
          <CardHeader>
            <CardTitle>Weather for {location}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Display weather data here */}
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
