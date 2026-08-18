import { useGetPayment } from "@/hooks/admin-payment/use-get-all-payment";
import Table from "../Table";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import { IoSearch } from "react-icons/io5";
import { CommonButton } from "../ui/button";
import PaymentPopover from "./payment-popover";
import { useState } from "react";
import { useExportCSV } from "@/hooks/admin-payment/use-export-data";

const PaymentTable = ({ data }) => {
  const defaultData = data?.data?.data ?? [];
  const [paymentData, setPaymentData] = useState(defaultData);
  const { mutate, isPending } = useExportCSV();

  // Pagination setup
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(paymentData.length / itemsPerPage);

  console.log("Info", data)

  const paginatedData = paymentData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <header className="mt-7 flex items-center justify-between px-4 py-5">
        <p className="flex-grow text-xl text-[#475367]">Payments</p>
        <div className="w-max flex-grow items-center justify-self-end">
          <div className="ml-auto flex w-full gap-x-4 self-end">
            <div className="flex w-full max-w-[528px] flex-1 items-center rounded-md border border-[#D0D5DD] px-4 py-2">
              <label htmlFor="search">
                <IoSearch className="text-xl text-[#667185]" />
              </label>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search here..."
                className="w-full placeholder:text-[#667185]"
              />
            </div>
            <PaymentPopover setData={setPaymentData} data={defaultData} />
            <CommonButton
              className="flex items-center gap-1 bg-primary-color-600 text-sm font-semibold"
              onClick={() => mutate()}
              disabled={isPending}
            >
              <span>
                <DownloadIcon />
              </span>
              <span>Export Csv</span>
            </CommonButton>
          </div>
        </div>
      </header>

      <Table cols="60px 1.5fr 1.4fr 0.3fr 0.9fr 1fr 0.6fr 1fr">
        <Table.Header className="*:text-left text-sm *:font-medium *:capitalize gap-3">
          <span>S/N</span>
          <span>Name</span>
          <span>Course Title</span>
          <span>Amount</span>
          <span>Course Type</span>
          <span>Date</span>
          <span>Status</span>
          <span>Duration</span>
        </Table.Header>

        {paginatedData.map((course, i) => (
          <Table.Row key={course.id} className="text-[14px] gap-3">
            <span>
              {(currentPage - 1) * itemsPerPage + i + 1 < 10
                ? `0${(currentPage - 1) * itemsPerPage + i + 1}`
                : (currentPage - 1) * itemsPerPage + i + 1}
            </span>

            <span className="flex flex-col truncate">
              <span className="font-medium text-[#101928]">
                {course.name.first_name} {course.name.last_name}
              </span>
              <span className="text-[#475367] truncate">{course.name.email}</span>
            </span>

            <span className="truncate">{course.course_title}</span>
            <span>{course.amount}</span>

            <span>
              <Badge className="bg-[#FFECE5] font-medium capitalize text-[#AD3307]">
                {course.course_type ?? "--"}
              </Badge>
            </span>

            <span>{course.date}</span>

            <span>
              <Badge
                className={cn(
                  course.payment_status === "failed" &&
                    "bg-[#FFECE5] text-[#AD3307]",
                  course.payment_status === "success" &&
                    "bg-[#F3FFF7] text-[#00A92F]",
                  course.payment_status === "pending" &&
                    "bg-[#f0b53563] text-[#f0b535]",
                  course.payment_status === "partially_paid" &&
                    "bg-[#EBF8FF] text-[#0070F3]"
                ) }
              >
                {/* payment_status: "pending" */}
                <span className="capitalize">{course.payment_status}</span>
              </Badge>
            </span>

            <span>{course.course_duration ?? "--"}</span>
          </Table.Row>
        ))}
      </Table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between px-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-[#475367]">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaymentTable;
