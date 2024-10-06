"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WeatherResponse } from "@/types/weather";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PrecipitationChart({
  data,
}: {
  data: WeatherResponse;
}) {
  const precipitationData = data.weather.properties.timeseries
    .slice(0, 24)
    .map((item) => ({
      time: new Date(item.time).toLocaleTimeString("en-US", {
        hour: "numeric",
      }),
      precipitation: item.data.next_1_hours?.details?.precipitation_amount || 0,
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>24-Hour Precipitation Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={precipitationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="precipitation" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
