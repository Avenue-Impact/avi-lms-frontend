import {
  ArrowDownLeft,
  ArrowUpRightIcon,
  File,
  Filter,
  VideoIcon,
} from "lucide-react";
import { CommonButton } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";

const PaymentPopover = ({ setData, data }) => {
  const filterStatus = (str) => {
    const newData = data.filter((item) => item.payment_status === str);
    setData(newData);
  };
  const filterType = (str) => {
    const newData = data.filter((item) => item.course_type === str);
    setData(newData);
  };
  return (
    <Popover>
      <PopoverTrigger className="">
        <CommonButton
          variant="outline"
          className="gap text-[#667185]-2 flex w-full items-center"
        >
          <span>
            <Filter className="h-4 w-4" />
          </span>
          <span className="font-semibold">filter</span>
        </CommonButton>
      </PopoverTrigger>
      <PopoverContent>
        <div className="max-w-[200px] bg-white px-4 py-3 shadow-sm">
          <CommonButton
            variant={"ghost"}
            className="flex w-full items-center justify-start gap-2 text-[#667185]"
            onClick={() => filterType("on demand")}
          >
            <span>
              <File />
            </span>
            <span>On demand</span>
          </CommonButton>
          <CommonButton
            variant={"ghost"}
            className="flex w-full items-center justify-start gap-2 text-[#667185]"
            onClick={() => filterType("live class")}
          >
            <span>
              <VideoIcon />
            </span>
            <span>Live Session</span>
          </CommonButton>
          <CommonButton
            variant={"ghost"}
            className="flex w-full items-center justify-start gap-2 text-[#667185]"
            onClick={() => filterStatus("success")}
          >
            <span>
              <ArrowUpRightIcon />
            </span>
            <span>Success</span>
          </CommonButton>
          <CommonButton
            variant={"ghost"}
            className="flex w-full items-center justify-start gap-2 text-[#667185]"
            onClick={() => filterStatus("pending")}
          >
            <span>
              <ArrowDownLeft />
            </span>
            <span>Failed</span>
          </CommonButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PaymentPopover;
