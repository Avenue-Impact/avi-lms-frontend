import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";
import { Skeleton } from "@/Components/ui/skeleton";
import { useFetchEnrollment } from "@/hooks/data-management/use-fetch-enrollment-trends";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "enrollment count",
    color: "hsl(var(--chart-1))",
  },
};

export function TrendChart() {
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

  // const { refetch } = useFetchEnrollment(active);

  const handleClick = (label) => {
    setActive(label);
    // refetch();
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Enrollment Trends</CardTitle>
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
  const { isLoading, error, data, isFetching } = useFetchEnrollment(period);

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
    // Generate realistic dummy data
    chartData = [
      { month: "Jan 10", desktop: 45 },
      { month: "Jan 11", desktop: 52 },
      { month: "Jan 12", desktop: 38 },
      { month: "Jan 13", desktop: 65 },
      { month: "Jan 14", desktop: 58 },
      { month: "Jan 15", desktop: 72 },
      { month: "Jan 16", desktop: 68 },
    ];
  } else {
    chartData = data.data.data.map((enrollment) => ({
      month: enrollment.date,
      desktop: enrollment.enrollmentCount,
    }));
  }
  return (
    <CardContent>
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
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
      {isDummyData && (
        <p className="mt-2 text-center text-xs italic text-slate-400">
          Showing sample data - actual enrollment data will appear here
        </p>
      )}
    </CardContent>
  );
};
