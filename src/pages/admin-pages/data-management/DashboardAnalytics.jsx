import { PerformingCourses } from "@/Components/admindashboard/data-management/PerformingCourses";
import { PieChartComponent } from "@/Components/admindashboard/data-management/PieChart";
import { RadarChartDot } from "@/Components/admindashboard/data-management/RadarChart";
import TopStudents from "@/Components/admindashboard/data-management/TopStudents";
import { TrendChart } from "@/Components/admindashboard/data-management/TrendChart";
import {
  EnrollmentIcon,
  PaymentIcon,
  RevenueIcon,
  TotalStudentIcon,
} from "@/Components/Icon";
import { Skeleton } from "@/Components/ui/skeleton";
import { useFetchRevenueAndPurchases } from "@/hooks/data-management/use-fetch-revenue-and-purchases";
import { useFetchStudentAndEnrollment } from "@/hooks/data-management/use-fetch-student-and-enrollment";
import { ArrowUpRight } from "lucide-react";

export default function DashboardAnalytics() {
  return (
    <section className="px-[26px] py-[29px]">
      <h2 className="text-2xl font-medium text-[#344054]">
        Dashboard Analytics
      </h2>

      <div className="my-7 flex gap-8 rounded-[20px] border border-[#F0F2F5] p-5 2xl:gap-[42px]">
        <StudentAndEnrollment />
        <div className="h-full min-h-[102px] w-px bg-[#E6EDFF]" />
        <RevenueAndPurchase />
      </div>
      <div className="space-y-6">
        <TrendChart />
        <RadarChartDot />
      </div>
      <div className="mt-7 grid grid-cols-[1.3fr_2.7fr] gap-6">
        <TopStudents />
        <div className="h-min rounded-[20px] border border-[#F0F2F5] p-6">
          <p className="mb-5 font-bold text-[#1D2739]">
            Top-performing courses
          </p>
          <div className="grid grid-cols-[1.6fr_3fr] gap-8">
            <div>
              <PieChartComponent />
            </div>
            <div className="space-y-3">
              <PerformingCourses />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const StudentAndEnrollment = () => {
  const { isLoading, data, error } = useFetchStudentAndEnrollment();
  if (isLoading) {
    return (
      <>
        <Skeleton className={"min-h-[117px] w-full max-w-[198px]"} />
        <Skeleton className={"min-h-[117px] w-full max-w-[198px]"} />
      </>
    );
  }

  if (error)
    return <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;

  return (
    <>
      <div className="w-full max-w-[198px]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[28px] font-bold text-[#101928]">
              {data?.data?.data?.students.total}
            </p>
            <p className="text-sm text-[#667185]">Total Students </p>
          </div>
          <span className="rounded-[12px] bg-white p-[10px] shadow-md">
            <TotalStudentIcon />
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span>
              <ArrowUpRight className="text-[#0F973D]" />
            </span>
            <span className="text-sm text-[#98A2B3]">
              {data?.data?.data?.students.new_users_this_week}
            </span>
          </div>
          <p className="text-sm text-[#98A2B3]">+1.01% this week</p>
        </div>
      </div>
      <div className="h-full min-h-[102px] w-px bg-[#E6EDFF]" />

      <div className="w-full max-w-[198px]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[28px] font-bold text-[#101928]">
              {data?.data?.data?.enrollments.total}
            </p>
            <p className="text-sm text-[#667185]">New Enrollment </p>
          </div>
          <span className="rounded-[12px] bg-white p-[10px] shadow-md">
            <EnrollmentIcon />
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span>
              <ArrowUpRight className="text-[#0F973D]" />
            </span>
            <span className="text-sm text-[#98A2B3]">
              {data?.data?.data?.enrollments.new_enrollments_this_week}
            </span>
          </div>
          <p className="text-sm text-[#98A2B3]">+1.01% this week</p>
        </div>
      </div>
    </>
  );
};

const RevenueAndPurchase = () => {
  const { isLoading, data, error } = useFetchRevenueAndPurchases();
  if (isLoading) {
    return (
      <>
        <Skeleton className={"min-h-[117px] w-full max-w-[198px]"} />
        <Skeleton className={"min-h-[117px] w-full max-w-[198px]"} />
      </>
    );
  }

  if (error)
    return <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;

  console.log(data);
  return (
    <>
      <div className="w-full max-w-[198px]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[28px] font-bold text-[#101928]">
              £{data?.data?.data?.total_revenue}
            </p>
            <p className="text-sm text-[#667185]">Total revenue </p>
          </div>
          <div className="rounded-[12px] bg-white p-[10px] shadow-md">
            <RevenueIcon />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span>
              <ArrowUpRight className="text-[#0F973D]" />
            </span>
            <span className="text-sm text-[#98A2B3]">
              {data?.data?.data?.total_revenue_this_week}
            </span>
          </div>
          <p className="text-sm text-[#98A2B3]">+1.01% this week</p>
        </div>
      </div>
      <div className="h-full min-h-[102px] w-px bg-[#E6EDFF]" />

      <div className="w-full max-w-[198px]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[28px] font-bold text-[#101928]">
              £{data?.data?.data?.new_purchases?.total_amount}
            </p>
            <p className="text-sm text-[#667185]">New Purchase Courses </p>
          </div>
          <span className="rounded-[12px] bg-white p-[10px] shadow-md">
            <PaymentIcon />
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span>
              <ArrowUpRight className="text-[#0F973D]" />
            </span>
            <span className="text-sm text-[#98A2B3]">10.2</span>
          </div>
          <p className="text-sm text-[#98A2B3]">+1.01% this week</p>
        </div>
      </div>
    </>
  );
};
