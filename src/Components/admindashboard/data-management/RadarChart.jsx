import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";
import { Skeleton } from "@/Components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { useFetchRevenue } from "@/hooks/data-management/use-fetch-total-revenue";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { MoreVertical } from "lucide-react";

const chartConfig = {
  desktop: {
    label: "revenue",
    color: "hsl(var(--chart-1))",
  },
};

export function RadarChartDot() {
  const [active, setActive] = useState("day");
  const period = [
    {
      label: "Today",
      action: "day",
    },
    {
      label: "This week",
      action: "week",
    },
    {
      label: "This month",
      action: "month",
    },
    {
      label: "This year",
      action: "year",
    },
  ];

  const handleClick = (action) => {
    setActive(action);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Total Revenue</CardTitle>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button className="rounded-md p-2 hover:bg-gray-100 transition-colors">
                <MoreVertical className="h-5 w-5 text-[#667185]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {period.map((time) => (
                <DropdownMenuItem
                  key={time.action}
                  onClick={() => handleClick(time.action)}
                  className={cn(
                    "cursor-pointer",
                    active === time.action && "bg-[#FEE2E2] text-[#CD0000]"
                  )}
                >
                  {time.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <TheBarChart period={active} />
    </Card>
  );
}

const TheBarChart = ({ period }) => {
  const { isLoading, error, data, isFetching } = useFetchRevenue(period);

  if (isLoading || isFetching)
    return <Skeleton className={"min-h-[280px] w-full"} />;
  if (error)
    return (
      <p>Error: {error?.response?.data?.message ?? "Something went wrong"}</p>
    );

  // Use dummy data if no real data is available
  let chartData;
  let isDummyData = false;
  
  if (!data?.data?.data || data.data.data.length < 1) {
    isDummyData = true;
    // Generate realistic dummy revenue data
    chartData = [
      { month: "Jan 10", desktop: 1250 },
      { month: "Jan 11", desktop: 1580 },
      { month: "Jan 12", desktop: 980 },
      { month: "Jan 13", desktop: 2100 },
      { month: "Jan 14", desktop: 1850 },
      { month: "Jan 15", desktop: 2400 },
      { month: "Jan 16", desktop: 2200 },
    ];
  } else {
    chartData = data.data.data.map((revenue) => ({
      month: revenue.date,
      desktop: revenue.total_revenue,
    }));
  }
  return (
    <CardContent>
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <RadarChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="month" />
          <PolarRadiusAxis angle={90} domain={[0, 'auto']} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent />}
          />
          <Radar
            dataKey="desktop"
            stroke="var(--color-desktop)"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ChartContainer>
      {isDummyData && (
        <p className="mt-2 text-center text-xs italic text-slate-400">
          Showing sample data - actual revenue data will appear here
        </p>
      )}
    </CardContent>
  );
};
