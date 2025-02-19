import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";
import { Skeleton } from "@/Components/ui/skeleton";
import { useFetchRevenue } from "@/hooks/data-management/use-fetch-total-revenue";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
    // {
    //   label: "This year",
    //   action: "year",
    // },
  ];

  // const { refetch } = useFetchRevenue(active);

  const handleClick = (label) => {
    setActive(label);
    // refetch();
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Total Revenue</CardTitle>
          <div className="flex items-center gap-5">
            {period.map((time) => {
              return (
                <button
                  className={cn(
                    "block rounded-[8.39px] px-[8.39px] py-[4.14px] text-xs capitalize text-[#1D2739] shadow-md hover:bg-[#CD0000] hover:text-white",
                    active === time.action && "bg-[#CD0000] text-white",
                  )}
                  key={time.action}
                  onClick={() => handleClick(time.action)}
                >
                  {time.label}
                </button>
              );
            })}
          </div>
        </div>
      </CardHeader>
      <TheBarChart period={active} />
    </Card>
  );
}

const TheBarChart = ({ period }) => {
  const { isLoading, error, data, isFetching } = useFetchRevenue(period);

  if (isLoading || isFetching)
    return <Skeleton className={"min-h-[382px] w-full"} />;
  if (error)
    return (
      <p>Error: {error?.response?.data?.message ?? "Something went wrong"}</p>
    );

  if (data?.data?.data.length < 1)
    return (
      <div className="flex min-h-[382px] w-full items-center justify-center">
        <p className="text-xl italic text-slate-400">
          No data available for the selected period. Please select a different
          period.
        </p>
      </div>
    );

  const chartData = data?.data?.data?.map((revenue) => {
    return {
      month: revenue.date,
      desktop: revenue.total_revenue,
    };
  });
  return (
    <CardContent>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={true}
            axisLine={true}
            tickMargin={8}
            // tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            dataKey="desktop"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            // tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="linear"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
  );
};
