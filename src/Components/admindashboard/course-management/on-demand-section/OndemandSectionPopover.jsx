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
  useMoveSectionDown,
  useMoveSectionToBotton,
  useMoveSectionToTop,
  useMoveSectionUP,
} from "@/hooks/course-management/on-demand-section/use-move-onDemand-section";
import { useDeleteOndemandSection } from "@/hooks/course-management/on-demand-section/use-mutate-ondemand-section";
import EditModal from "./EditModal";
import EditOnDemandSectionForm from "./EditOnDemandSectionForm";
import { Video } from "lucide-react";
import AddVideoForm from "./AddVideoForm";
import { useState } from "react";

function OndemandSectionPopover({ children, className, section, course }) {
  const [addVideoModal, setAddVideoModal] = useState(false);
  const [editVideoModal, setEditVideoModal] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const { moveUP, isMovingUP } = useMoveSectionUP();

  const { moveDown, isMovingDown } = useMoveSectionDown();
  const { moveToTop, isMovingToTop } = useMoveSectionToTop();

  const { moveToBottom, isMovingToBottom } = useMoveSectionToBotton();
  const { deleteSection, isDeleting } = useDeleteOndemandSection();

  const handleMoveUp = (sect) => {
    const data = {
      section: sect,
      direction: "forward",
    };
    moveUP(data, {
      onSuccess: () => {
        setOpenPopover(false);
      },
    });
  };

  const handleMoveDown = (sect) => {
    const data = {
      section: sect,
      direction: "backward",
    };
    moveDown(data, {
      onSuccess: () => {
        setOpenPopover(false);
      },
    });
  };
  const handleMoveTop = (sect) => {
    const data = {
      section: sect,
      direction: "toFront",
    };
    moveToTop(data, {
      onSuccess: () => {
        setOpenPopover(false);
      },
    });
  };

  const handleMoveBottom = (sect) => {
    const data = {
      section: sect,
      direction: "toBack",
    };
    moveToBottom(data, {
      onSuccess: () => {
        setOpenPopover(false);
      },
    });
  };

  const handleDelete = (sect) => {
    console.log("delete", sect);
    deleteSection(sect, {
      onSuccess: () => {
        setOpenPopover(false);
      },
    });
  };

  return (
    <Popover
      className={cn(className)}
      open={openPopover}
      onOpenChange={setOpenPopover}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="mr-10 w-[259px] rounded-sm bg-white shadow-lg">
        <div className="px-3 py-[14px]">
          <EditModal
            open={addVideoModal}
            setOpen={setAddVideoModal}
            header="Add video"
            form={
              <AddVideoForm
                sectionToAddVideo={course}
                setModal={setAddVideoModal}
              />
            }
          >
            <span className="flex w-full items-center gap-1 py-3 text-[#667185] hover:bg-accent disabled:cursor-not-allowed">
              <span className="text-lg">
                <Video />
              </span>
              <span className="text-nowrap text-sm font-[400]">
                Add video to section
              </span>
            </span>
          </EditModal>

          <EditModal
            open={editVideoModal}
            setOpen={setEditVideoModal}
            form={
              <EditOnDemandSectionForm
                sectionToEdit={course}
                setModal={setEditVideoModal}
              />
            }
          >
            <span className="flex w-full items-center gap-3 py-3 text-left text-[#667185] hover:bg-accent">
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
            disabled={isMovingUP}
          >
            <span className="text-xl">
              <GoArrowUpRight />
            </span>

            <span className="text-sm">
              {" "}
              {isMovingUP ? "Loading..." : "Move up"}
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
                : "Move to the bottom of the list"}
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
              {isMovingDown ? "Loading..." : "Move down"}
            </span>
          </button>
          <button
            className="flex w-full items-center gap-1 py-3 text-[#667185] hover:bg-accent disabled:cursor-not-allowed"
            onClick={() => handleDelete(section)}
            disabled={isDeleting}
          >
            <span className="text-xl">
              <TrashCan />
            </span>
            <span className="text-sm">
              {isDeleting ? "Loading..." : "Delete"}{" "}
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default OndemandSectionPopover;
