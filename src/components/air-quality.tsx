import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WeatherResponse } from "@/types/weather";
import { ChartContainer } from "@/components/ui/chart";

export default function AirQuality({ data }: { data: WeatherResponse }) {
  // Note: This is mock data as the MET API doesn't provide air quality information
  const airQualityIndex = 35; // Example value
  const airQualityLevel = "Good";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Air Quality</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            airQuality: {
              label: "Air Quality Index",
              color: "hsl(var(--chart-4))",
            },
          }}
        >
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold">{airQualityIndex}</div>
            <div className="text-xl">{airQualityLevel}</div>
            <div className="mt-4 text-sm text-muted-foreground">
              Air quality is considered satisfactory, and air pollution poses
              little or no risk.
            </div>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
