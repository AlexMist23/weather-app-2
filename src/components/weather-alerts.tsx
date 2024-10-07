import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WeatherResponse } from "@/types/weather";
import { ChartContainer } from "@/components/ui/chart";
import { AlertTriangle } from "lucide-react";

export default function WeatherAlerts({ data }: { data: WeatherResponse }) {
  // Note: This is mock data as the MET API doesn't provide weather alerts
  const alerts = [
    { type: "Wind", description: "Strong winds expected in the afternoon" },
    { type: "Rain", description: "Heavy rainfall possible in the evening" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            alerts: {
              label: "Weather Alerts",
              color: "hsl(var(--chart-6))",
            },
          }}
        >
          {alerts.length > 0 ? (
            <ul className="space-y-2">
              {alerts.map((alert, index) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">{alert.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {alert.description}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted-foreground">
              No current weather alerts
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
