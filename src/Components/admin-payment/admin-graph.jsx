"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { CardContent } from "../ui/card";
import { useFetchGraphData } from "@/hooks/admin-payment/use-fetch-graph-data";
import { Skeleton } from "../ui/skeleton";
// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

export function AdminGraph() {
  const { data, isLoading, error } = useFetchGraphData();

  if (isLoading) return <Skeleton className={"h-[760px]"} />;

  if (error) {
    return <p>{error?.response?.data?.message ?? "Something Went Wrong!!"}</p>;
  }

  console.log(data);
  if (data) {
    const chartData = data?.data?.data?.map((revenue) => {
      return {
        month: months[+revenue.month - 1],
        desktop: revenue.total,
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
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis dataKey="desktop" />
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
  }
}
