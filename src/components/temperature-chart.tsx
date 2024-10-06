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

export default function TemperatureChart({ data }: { data: WeatherResponse }) {
  const temperatureData = data.weather.properties.timeseries
    .slice(0, 24)
    .map((item) => ({
      time: new Date(item.time).toLocaleTimeString("en-US", {
        hour: "numeric",
      }),
      temperature: item.data.instant.details.air_temperature,
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>24-Hour Temperature Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
