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

  // Use dummy data if no real data is available
  let chartData;
  let isDummyData = false;

  if (!data?.data?.data || data.data.data.length < 1) {
    isDummyData = true;
    // Generate dummy course data
    chartData = [
      { course: "Data Analytics", numberOfStudent: 45, fill: colors[0] },
      { course: "Cloud Computing", numberOfStudent: 38, fill: colors[1] },
      { course: "Business Analysis", numberOfStudent: 32, fill: colors[2] },
      { course: "Project Management", numberOfStudent: 28, fill: colors[3] },
      { course: "Cybersecurity", numberOfStudent: 22, fill: colors[4] },
    ];
  } else {
    chartData = data.data.data.map((course, index) => ({
      course: course.course_title,
      numberOfStudent: course.number_of_students,
      fill: colors[index % colors.length],
    }));
  }

  return (
    <div className="flex items-start gap-8">
      {/* Pie Chart - larger fixed size */}
      <div className="flex-shrink-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square min-h-[320px] min-w-[320px]"
        >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={chartData} dataKey="numberOfStudent" nameKey="course" />
        </PieChart>
      </ChartContainer>
      </div>
      
      {/* Course list with student counts */}
      <div className="flex-1 space-y-3 pt-4">
        {chartData.map((item, index) => (
          <div key={index} className="grid grid-cols-[3fr_1fr] gap-2">
            <div className="flex items-center gap-2">
              <div 
                className="h-2 w-2 flex-shrink-0 rounded-full" 
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-lg text-[#667185]">{item.course}</span>
            </div>
            <p className="text-sm font-medium text-[#101928]">
              <span>{item.numberOfStudent} </span>
              <span>Students</span>
            </p>
          </div>
        ))}
        
        {isDummyData && (
          <p className="mt-4 text-xs italic text-slate-400">
            Showing sample data
          </p>
        )}
      </div>
    </div>
  );
}
