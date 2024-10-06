"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WeatherResponse } from "@/types/weather";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WindChart({ data }: { data: WeatherResponse }) {
  const windData = data.weather.properties.timeseries
    .slice(0, 24)
    .map((item) => ({
      time: new Date(item.time).toLocaleTimeString("en-US", {
        hour: "numeric",
      }),
      windSpeed: item.data.instant.details.wind_speed,
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>24-Hour Wind Speed Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={windData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="windSpeed" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
