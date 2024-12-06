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
  useMoveBottom,
  useMoveDown,
  useMoveTop,
  useMoveUP,
} from "@/hooks/course-management/on-demand-section/use-move-demand-video";
import { useDeleteOndemandVideo } from "@/hooks/course-management/on-demand-section/use-mutate-ondemand-video";
import EditModal from "./EditModal";
import EditOndemandVideoForm from "./EditOndemandVideoForm";
import { useState } from "react";
import { useParams } from "react-router-dom";

function OnDemandVideoPopover({ children, className, id, section, video }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPopver, setOpenPopover] = useState(false);

  const params = useParams();
  const courseId = params.courseId ?? localStorage.getItem("courseId");

  const { moveUP, status } = useMoveUP();
  const { moveDown, moveDownStatus } = useMoveDown();
  const { moveTop, moveTopStatus } = useMoveTop();
  const { moveToBottom, moveBottomStatus } = useMoveBottom();
  const { deleteVideo, isDeleting } = useDeleteOndemandVideo();

  const handleMoveUp = (id, sect) => {
    const data = {
      videoId: id,
      direction: "forward",
    };
    moveUP(
      {
        data,
        section: sect,
        courseId,
      },
      {
        onSuccess: () => {
          setOpenPopover(false);
        },
      },
    );
  };

  const handleMoveDown = (id, sect) => {
    const data = {
      videoId: id,
      direction: "backward",
    };
    moveDown(
      {
        data,
        section: sect,
        courseId,
      },
      {
        onSuccess: () => {
          setOpenPopover(false);
        },
      },
    );
  };
  /**
   * Handles the action of moving an on-demand video to the top of the list.
   *
   * @param {string} id - The unique identifier of the video to be moved.
   * @param {string} sect - The section where the video belongs.
   *
   * @returns {void}
   */

  // Perform the move operation using the provided id and section
  // The moveTop function is assumed to be a custom hook or a function that interacts with the backend API
  // The onSuccess callback is called after the move operation
  const handleMoveTop = (id, sect) => {
    const data = {
      videoId: id,
      direction: "toFront",
    };
    moveTop(
      {
        data,
        section: sect,
        courseId,
      },
      {
        onSuccess: () => {
          setOpenPopover(false);
        },
      },
    );
  };

  const handleMoveBottom = (id, sect) => {
    const data = {
      videoId: id,
      direction: "toBack",
    };
    moveToBottom(
      {
        data,
        section: sect,
        courseId,
      },
      {
        onSuccess: () => {
          setOpenPopover(false);
        },
      },
    );
  };

  const handleDelete = (sect, id) => {
    deleteVideo(
      { section: sect, id, courseId },
      {
        onSuccess: () => {
          setOpenPopover(false);
        },
      },
    );
  };

  return (
    <Popover
      className={cn(className)}
      open={openPopver}
      onOpenChange={setOpenPopover}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="mr-10 w-[259px] rounded-sm bg-white shadow-lg">
        <div className="px-3 py-[14px]">
          <EditModal
            open={openEditModal}
            setOpen={setOpenEditModal}
            form={
              <EditOndemandVideoForm
                videoToEdit={video}
                section={section}
                setModal={setOpenEditModal}
              />
            }
          >
            <span className="flex w-full items-center gap-1 py-3 text-left text-[#667185] hover:bg-accent">
              <span className="text-sm">
                <HiOutlinePencil />
              </span>
              <span className="text-sm">Edit</span>
            </span>
          </EditModal>
          <button
            className="flex w-full items-center gap-1 py-3 text-[#667185] hover:bg-accent"
            onClick={() => handleMoveTop(id, section)}
          >
            <span className="text-2xl">
              <IoIosArrowRoundUp />
            </span>
            {moveTopStatus === "pending" ? (
              "loading..."
            ) : (
              <span className="text-nowrap text-sm">
                Move to the top of the list
              </span>
            )}
          </button>
          <button
            className="flex w-full items-center gap-1 py-3 text-[#667185] hover:bg-accent"
            onClick={() => handleMoveUp(id, section)}
          >
            <span className="text-xl">
              <GoArrowUpRight />
            </span>
            {status === "pending" ? (
              "loading"
            ) : (
              <span className="text-sm">Move up</span>
            )}
          </button>
          <button
            className="flex w-full items-center gap-1 py-3 text-[#667185] hover:bg-accent"
            onClick={() => handleMoveBottom(id, section)}
          >
            <span className="text-xl">
              <GoArrowDown />
            </span>
            {moveBottomStatus === "pending" ? (
              "loading..."
            ) : (
              <span className="text-sm">Move to the bottom of the list</span>
            )}
          </button>
          <button
            className="flex w-full items-center gap-1 py-3 text-[#667185] hover:bg-accent"
            onClick={() => handleMoveDown(id, section)}
          >
            <span className="text-xl">
              <GoArrowDownRight />
            </span>
            {moveDownStatus === "pending" ? (
              "loading..."
            ) : (
              <span className="text-sm">Move down</span>
            )}
          </button>
          <button
            className="flex w-full items-center gap-1 py-3 text-[#667185] hover:bg-accent"
            onClick={() => handleDelete(section, id)}
            disabled={isDeleting}
          >
            <span className="text-xl">
              <TrashCan />
            </span>
            <span className="text-sm">
              {isDeleting ? "loading..." : "Delete"}
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default OnDemandVideoPopover;
