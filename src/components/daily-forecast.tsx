import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  WeatherResponse,
  TimeseriesEntryWithAllData,
  TimeseriesEntry,
} from "@/types/weather";
import Image from "next/image";
import { ChartContainer } from "@/components/ui/chart";

export default function DailyForecast({ data }: { data: WeatherResponse }) {
  const dailyForecast = data.weather.properties.timeseries.slice(0, 5) as [
    TimeseriesEntryWithAllData,
    ...TimeseriesEntry[]
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            temperature: {
              label: "Temperature",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <div className="flex justify-between">
            {dailyForecast.map((forecast, index) => (
              <div key={index} className="text-center">
                <p>
                  {new Date(forecast.time).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <Image
                  src={`https://raw.githubusercontent.com/metno/weathericons/main/weather/png/${
                    forecast.data.next_6_hours?.summary.symbol_code || "unknown"
                  }.png`}
                  alt={
                    forecast.data.next_6_hours?.summary.symbol_code || "unknown"
                  }
                  width={50}
                  height={50}
                />
                <p>{forecast.data.instant.details.air_temperature}°C</p>
              </div>
            ))}
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
