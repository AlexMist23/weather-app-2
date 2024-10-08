"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WeatherResponse } from "@/types/weather";
import LocationAutocomplete from "@/components/weather/location-autocomplete";
import CurrentWeather from "@/components/weather/current-weather";
import DailyForecast from "@/components/weather/daily-forecast";
import WeatherChart from "@/components/weather/weather-chart";
import AirQuality from "@/components/weather/air-quality";
import SunriseSunset from "@/components/weather/sunrise-sunset";
import WeatherAlerts from "@/components/weather/weather-alerts";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");

  const handleLocationSelect = async (
    selectedLocation: string,
    lat: number,
    lon: number
  ) => {
    setLoading(true);
    setError("");
    setWeatherData(null);
    setLocation(selectedLocation);

    try {
      let url;
      if (lat !== 0 && lon !== 0) {
        url = `/api/weather?lat=${lat}&lon=${lon}`;
      } else {
        url = `/api/weather?location=${encodeURIComponent(selectedLocation)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

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
      <LocationAutocomplete onLocationSelect={handleLocationSelect} />
      {error && (
        <Alert variant="destructive" className="my-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading && <p className="text-center my-4">Loading weather data...</p>}
      {weatherData && (
        <>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Weather for {location}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CurrentWeather data={weatherData} />
            <DailyForecast data={weatherData} />
            <AirQuality data={weatherData} />
            <SunriseSunset data={weatherData} />
            <WeatherAlerts data={weatherData} />
            <WeatherChart data={weatherData} />
          </div>
        </>
      )}
    </main>
  );
}
