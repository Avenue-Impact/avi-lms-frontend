import { useGetPayment } from "@/hooks/admin-payment/use-get-all-payment";
import Table from "../Table";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { DownloadIcon, Search } from "lucide-react";
import { IoSearch } from "react-icons/io5";
import { CommonButton } from "../ui/button";
import PaymentPopover from "./payment-popover";
import { useState } from "react";
import { useExportCSV } from "@/hooks/admin-payment/use-export-data";

const PaymentTable = ({ data }) => {
  const defaultData = data?.data?.data ?? [];

  const [paymentData, setPaymentData] = useState(defaultData);
  const { mutate, isPending } = useExportCSV();

  //   console.log(paymentData.filter((item) => item.payment_status === "success"));
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

      <Table cols={"65px 1fr 0.8fr 0.5fr 0.6fr 121px 0.47fr 0.9fr "}>
        <Table.Header
          className={"gap-1 *:text-left *:text-sm *:font-medium *:capitalize"}
        >
          <span>S/N</span>
          <span>Name</span>
          <span>Course Title</span>
          <span>Amount</span>
          <span>Course Type</span>
          <span>Date</span>
          <span>status</span>
          <span>Course Duration</span>
        </Table.Header>
        {paymentData.map((course, i) => (
          <Table.Row key={course.id} className={"*:text-[14px]"}>
            <span className="text-[14px] text-[#344054]">
              {i < 9 ? `0${i + 1}` : i + 1}
            </span>
            <span className="i flex flex-col text-[14px] *:truncate">
              <span className="font-medium text-[#101928]">
                {course.name.first_name} {course.name.last_name}
              </span>
              <span className="text-[#475367]">{course.name.email}</span>
            </span>
            <span className="text-[#344054]">{course.course_title}</span>
            <span className="text-[#344054]">{course.amount}</span>
            <span className="flex w-min items-center justify-center whitespace-nowrap rounded-full px-2 py-[2px]">
              <Badge className="bg-[#FFECE5] font-medium text-[#AD3307]">
                {course.course_type ?? "--"}
              </Badge>
            </span>
            <span className="text-[#344054]">{course.date}</span>
            <span className="flex w-min items-center justify-center whitespace-nowrap rounded-2xl py-0">
              <Badge
                className={cn(
                  course.payment_status === "failed" &&
                    "bg-[#FFECE5] text-[#AD3307]",
                  course.payment_status === "success" &&
                    "bg-[#F3FFF7] text-[#00A92F]",
                  course.payment_status === "pending" &&
                    "bg-[#f0b53563] text-[#f0b535]",
                )}
              >
                {course.payment_status}
              </Badge>
            </span>
            <span className="text-[#344054]">
              {course.course_duration ?? "--"}
            </span>
          </Table.Row>
        ))}
      </Table>
    </div>
  );
};

export default PaymentTable;
