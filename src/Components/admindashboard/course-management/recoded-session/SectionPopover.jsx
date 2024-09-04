import { HiOutlinePencil } from "react-icons/hi";
import { IoIosArrowRoundUp } from "react-icons/io";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";
import { GoArrowDownLeft } from "react-icons/go";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

import { cn } from "@/lib/utils";
import { TrashCan } from "@/Components/Icon";

function SectionPopover({ children, className }) {
  return (
    <Popover className={cn(className)}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="mr-10 w-[259px] rounded-sm bg-white shadow-lg">
        <div className="px-3 py-[14px]">
          <button className="flex items-center gap-1 py-3 text-[#667185]">
            <span className="text-sm">
              <HiOutlinePencil />
            </span>
            <span className="text-sm">Edit</span>
          </button>
          <button className="flex items-center gap-1 py-3 text-[#667185]">
            <span className="text-2xl">
              <IoIosArrowRoundUp />
            </span>
            <span className="text-nowrap text-sm">
              Move to the top of the list
            </span>
          </button>
          <button className="flex items-center gap-1 py-3 text-[#667185]">
            <span className="text-xl">
              <GoArrowUpRight />
            </span>
            <span className="text-sm">Move up</span>
          </button>
          <button className="flex items-center gap-1 py-3 text-[#667185]">
            <span className="text-xl">
              <GoArrowDown />
            </span>
            <span className="text-sm">Move to the bottom of the list</span>
          </button>
          <button className="flex items-center gap-1 py-3 text-[#667185]">
            <span className="text-xl">
              <GoArrowDownRight />
            </span>
            <span className="text-sm">Move down</span>
          </button>
          <button className="flex items-center gap-1 py-3 text-[#667185]">
            <span className="text-xl">
              <TrashCan />
            </span>
            <span className="text-sm">Delete</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default SectionPopover;
