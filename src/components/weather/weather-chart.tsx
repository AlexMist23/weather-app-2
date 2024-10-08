"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WeatherResponse } from "@/types/weather";
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function WeatherChart({ data }: { data: WeatherResponse }) {
  const chartData = data.weather.properties.timeseries
    .slice(0, 24)
    .map((item) => ({
      time: new Date(item.time).toLocaleTimeString("en-US", {
        hour: "numeric",
      }),
      temperature: item.data.instant.details.air_temperature,
      windSpeed: item.data.instant.details.wind_speed,
      precipitation: item.data.next_1_hours?.details?.precipitation_amount || 0,
    }));

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>24-Hour Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            temperature: {
              label: "Temperature (°C)",
              color: "hsl(var(--chart-1))",
            },
            windSpeed: {
              label: "Wind Speed (m/s)",
              color: "hsl(var(--chart-2))",
            },
            precipitation: {
              label: "Precipitation (mm)",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[400px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temperature"
                stroke="var(--color-temperature)"
                name="Temperature"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="windSpeed"
                stroke="var(--color-windSpeed)"
                name="Wind Speed"
              />
              <Bar
                yAxisId="right"
                dataKey="precipitation"
                fill="var(--color-precipitation)"
                name="Precipitation"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
