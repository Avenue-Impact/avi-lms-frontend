import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";
import { useFetchTopCourses } from "@/hooks/data-management/use-fetch-top-courses";
import { Pie, PieChart } from "recharts";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "blue",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

export function PieChartComponent() {
  const { isLoading, data, error } = useFetchTopCourses();
  const colors = ["#FFC6D5", "#FF5A85", "#A3032D", "#CC1747", "#F53366"];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;
  }

  const chartData = data?.data?.data?.map((course, index) => {
    return {
      course: course.course_title,
      numberOfStudent: course.number_of_students,
      fill: colors[index % colors.length],
    };
  });

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie data={chartData} dataKey="numberOfStudent" nameKey="course" />
      </PieChart>
    </ChartContainer>
  );
}
