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

      <div className="my-7 flex gap-8 rounded-[20px] border border-[#F0F2F5] p-5 shadow-md 2xl:gap-[42px]">
        <StudentAndEnrollment />
        <div className="h-full min-h-[102px] w-px bg-[#E6EDFF]" />
        <RevenueAndPurchase />
      </div>
      <div className="grid grid-cols-3 gap-8 w-full items-start">
        <div className="col-span-2 shadow-md rounded-[20px] border border-[#F0F2F5]">
        <TrendChart />
        </div>
        <div className="col-span-1 shadow-md rounded-[20px] border border-[#F0F2F5]">
          <RadarChartDot />
        </div>
      </div>
      <div className="mt-7 grid grid-cols-3 gap-6">
        <TopStudents />
        <div className="col-span-2 h-min rounded-[20px] shadow-md border border-[#F0F2F5] p-6">
          <p className="mb-5 font-bold text-[#1D2739]">
            Top-performing courses
          </p>
          <PieChartComponent />
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
        <Skeleton className={"min-h-[117px] w-full flex-1"} />
        <Skeleton className={"min-h-[117px] w-full flex-1"} />
      </>
    );
  }

  if (error)
    return <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;

  return (
    <>
      <div className="w-full flex-1">
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
      </div>
      <div className="h-full min-h-[102px] w-px bg-[#E6EDFF]" />

      <div className="w-full flex-1">
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
      </div>
    </>
  );
};

const RevenueAndPurchase = () => {
  const { isLoading, data, error } = useFetchRevenueAndPurchases();
  if (isLoading) {
    return (
      <>
        <Skeleton className={"min-h-[117px] w-full flex-1"} />
        <Skeleton className={"min-h-[117px] w-full flex-1"} />
      </>
    );
  }

  if (error)
    return <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;

  return (
    <>
      <div className="w-full flex-1">
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
      </div>
      <div className="h-full min-h-[102px] w-px bg-[#E6EDFF]" />

      <div className="w-full flex-1">
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
      </div>
    </>
  );
};
