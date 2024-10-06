import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WeatherResponse, TimeseriesEntryWithAllData } from "@/types/weather";
import Image from "next/image";
import { ChartContainer } from "@/components/ui/chart";

export default function CurrentWeather({ data }: { data: WeatherResponse }) {
  const currentWeather = data.weather.properties
    .timeseries[0] as TimeseriesEntryWithAllData;
  const symbolCode = currentWeather.data.next_1_hours.summary.symbol_code;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            temperature: {
              label: "Temperature",
              color: "hsl(var(--chart-1))",
            },
            humidity: {
              label: "Humidity",
              color: "hsl(var(--chart-2))",
            },
            windSpeed: {
              label: "Wind Speed",
              color: "hsl(var(--chart-3))",
            },
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold">
                {currentWeather.data.instant.details.air_temperature}°C
              </p>
              <p>
                Humidity:{" "}
                {currentWeather.data.instant.details.relative_humidity}%
              </p>
              <p>Wind: {currentWeather.data.instant.details.wind_speed} m/s</p>
              <p>
                Pressure:{" "}
                {currentWeather.data.instant.details.air_pressure_at_sea_level}{" "}
                hPa
              </p>
            </div>
            <div className="text-center">
              <Image
                src={`https://raw.githubusercontent.com/metno/weathericons/main/weather/png/${symbolCode}.png`}
                alt={symbolCode}
                width={100}
                height={100}
              />
              <p>{symbolCode.replace(/_/g, " ")}</p>
            </div>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
