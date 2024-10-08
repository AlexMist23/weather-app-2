import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WeatherResponse } from "@/types/weather";
import { ChartContainer } from "@/components/ui/chart";
import { Sun, Moon } from "lucide-react";

export default function SunriseSunset({ data }: { data: WeatherResponse }) {
  // Note: This is mock data as the MET API doesn't provide sunrise/sunset information
  const sunrise = "06:30";
  const sunset = "20:15";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sunrise & Sunset</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            daylight: {
              label: "Daylight Hours",
              color: "hsl(var(--chart-5))",
            },
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <Sun className="h-8 w-8 text-yellow-500" />
              <div className="mt-2 text-lg font-semibold">{sunrise}</div>
              <div className="text-sm text-muted-foreground">Sunrise</div>
            </div>
            <div className="flex flex-col items-center">
              <Moon className="h-8 w-8 text-blue-500" />
              <div className="mt-2 text-lg font-semibold">{sunset}</div>
              <div className="text-sm text-muted-foreground">Sunset</div>
            </div>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
