import { HiOutlinePencil } from "react-icons/hi";
import { IoIosArrowRoundUp } from "react-icons/io";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

import { cn } from "@/lib/utils";
import { TrashCan } from "@/Components/Icon";
import {
  useMoveRecordedSectionDown,
  useMoveRecordedSectionToBottom,
  useMoveRecordedSectionToTop,
  useMoveRecordedSectionUp,
} from "@/hooks/course-management/recorded-section/use-move-recorded-section";

import { useDeleteRecordedSection } from "@/hooks/course-management/recorded-section/use-delete-recorded-section";

import EditModal from "../on-demand-section/EditModal";
import EditRecordedSectionForm from "./EditRecordedSectionForm";
import { Video } from "lucide-react";
import AddRecordedVideoForm from "./AddRecordedVideoForm";

function SectionPopover({ children, className, section, course }) {
  const { moveSectionUp, isMovingUp } = useMoveRecordedSectionUp();
  const { moveSectionDown, isMovingDown } = useMoveRecordedSectionDown();
  const { moveSectionToTop, isMovingToTop } = useMoveRecordedSectionToTop();
  const { moveSectionToBottom, isMovingToBottom } =
    useMoveRecordedSectionToBottom();

  const { deleteRecordedSection, isDeleting } = useDeleteRecordedSection();

  const handleMoveUp = (sect) => {
    console.log("section====", sect);

    const data = {
      section: sect,
      direction: "forward",
    };

    moveSectionUp(data);
  };

  const handleMoveDown = (sect) => {
    console.log("move up", sect);

    const data = {
      section: sect,
      direction: "backward",
    };
    moveSectionDown(data);
  };
  const handleMoveTop = (sect) => {
    console.log("move up", sect);

    const data = {
      section: sect,
      direction: "toFront",
    };
    moveSectionToTop(data);
  };

  const handleMoveBottom = (sect) => {
    console.log("move up", sect);

    const data = {
      section: sect,
      direction: "toBack",
    };
    moveSectionToBottom(data);
  };

  const handleDelete = (sect) => {
    deleteRecordedSection(sect);
  };

  return (
    <Popover className={cn(className)}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="mr-10 w-[259px] rounded-sm bg-white shadow-lg">
        <div className="px-3 py-[14px]">
          <EditModal
            form={<AddRecordedVideoForm sectionToAddVideo={course} />}
            header="Add More video"
          >
            <span
              className="flex w-full items-center gap-1 py-3 text-[#667185] hover:bg-accent disabled:cursor-not-allowed"
              disabled={isDeleting}
            >
              <span className="text-sm">
                <Video />
              </span>
              <span className="text-sm font-[400]">Add Content</span>
            </span>
          </EditModal>
          <EditModal
            header="Edit Recorded Section"
            form={<EditRecordedSectionForm sectionToEdit={course} />}
          >
            <span className="flex w-full items-center gap-3 py-3 text-left text-[#667185]">
              <span className="text-sm">
                <HiOutlinePencil />
              </span>
              <span className="text-sm font-[400]">Edit</span>
            </span>
          </EditModal>
          <button
            className="flex w-full items-center gap-1 py-3 text-[#667185] hover:bg-accent disabled:cursor-not-allowed"
            onClick={() => handleMoveTop(section)}
            disabled={isMovingToTop}
          >
            <span className="text-2xl">
              <IoIosArrowRoundUp />
            </span>
            <span className="text-nowrap text-sm">
              {isMovingToTop ? "Loading..." : "Move to the top of the list"}
            </span>
          </button>
          <button
            className="flex w-full items-center gap-1 py-3 text-[#667185] hover:bg-accent disabled:cursor-not-allowed"
            onClick={() => handleMoveUp(section)}
            disabled={isMovingUp}
          >
            <span className="text-xl">
              <GoArrowUpRight />
            </span>

            <span className="text-sm">
              {isMovingUp ? "Loading..." : "Move up"}
            </span>
          </button>
          <button
            className="flex w-full items-center gap-1 py-3 text-[#667185] hover:bg-accent disabled:cursor-not-allowed"
            onClick={() => handleMoveBottom(section)}
            disabled={isMovingToBottom}
          >
            <span className="text-xl">
              <GoArrowDown />
            </span>
            <span className="text-sm">
              {isMovingToBottom
                ? "Loading..."
                : " Move to the bottom of the list"}
            </span>
          </button>
          <button
            className="flex w-full items-center gap-1 py-3 text-[#667185] hover:bg-accent disabled:cursor-not-allowed"
            onClick={() => handleMoveDown(section)}
            disabled={isMovingDown}
          >
            <span className="text-xl">
              <GoArrowDownRight />
            </span>
            <span className="text-sm">
              {isMovingDown ? "Loading..." : "Move Down"}
            </span>
          </button>
          <button
            className="flex w-full items-center gap-1 py-3 text-[#667185] hover:bg-accent disabled:cursor-not-allowed"
            disabled={isDeleting}
          >
            <span className="text-xl">
              <TrashCan />
            </span>
            <span className="text-sm" onClick={() => handleDelete(section)}>
              {isDeleting ? "Loading..." : " Delete"}
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default SectionPopover;
