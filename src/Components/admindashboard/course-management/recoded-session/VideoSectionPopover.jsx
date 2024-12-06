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
import { useMoveRecordedVideo } from "@/hooks/course-management/recorded-section/use-move-video";
import { useState } from "react";
import { useDeleteRecordedVideo } from "@/hooks/course-management/recorded-section/use-delete-recorded-video";
import EditModal from "../on-demand-section/EditModal";
import EditRecordedVideoForm from "./EditRecordedVideoForm";
import { useParams, useSearchParams } from "react-router-dom";

function VideoSectionPopover({ children, className, id, section, record }) {
  const [direction, setDirection] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const params = useParams();
  const [queryString] = useSearchParams();

  const courseId = params.courseId ?? localStorage.getItem("courseId");
  const cohortId =
    queryString.get("cohortId") ?? localStorage.getItem("cohortId");

  const { moveVideo, isMovingVideo } = useMoveRecordedVideo();
  const { deleteVideo, isDeleting } = useDeleteRecordedVideo();

  const handleMoveUp = (id, sect) => {
    console.log("move up", id, sect);

    const data = {
      videoId: id,
      direction: "forward",
    };

    setDirection("up");

    moveVideo(
      {
        data,
        section: sect,
        cohortId,
        courseId,
      },
      { onSuccess: () => setOpenPopover((prev) => !prev) },
    );
  };

  const handleMoveDown = (id, sect) => {
    console.log("move up", id, sect);

    setDirection("down");
    const data = {
      videoId: id,
      direction: "backward",
    };

    moveVideo(
      {
        data,
        section: sect,
        cohortId,
        courseId,
      },
      { onSuccess: () => setOpenPopover((prev) => !prev) },
    );
  };
  const handleMoveTop = (id, sect) => {
    console.log("move up", id, sect);

    setDirection("to-top");
    const data = {
      videoId: id,
      direction: "toFront",
    };

    moveVideo(
      {
        data,
        section: sect,
        cohortId,
        courseId,
      },
      { onSuccess: () => setOpenPopover((prev) => !prev) },
    );
  };

  const handleMoveBottom = (id, sect) => {
    setDirection("to-bottom");

    const data = {
      videoId: id,
      direction: "toBack",
    };

    moveVideo(
      {
        data,
        section: sect,
        cohortId,
        courseId,
      },
      { onSuccess: () => setOpenPopover((prev) => !prev) },
    );
  };

  const handleDelete = (sect, id) => {
    deleteVideo(
      { section: sect, id, cohortId, courseId },
      { onSuccess: () => setOpenPopover((prev) => !prev) },
    );
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
            open={editModal}
            setOpen={setEditModal}
            form={
              <EditRecordedVideoForm
                section={section}
                record={record}
                setModal={setEditModal}
              />
            }
            header="Edit Recorded Video"
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
            {isMovingVideo && direction === "to-top" ? (
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
            {isMovingVideo && direction === "up" ? (
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
            {isMovingVideo && direction === "to-bottom" ? (
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
            {isMovingVideo && direction === "down" ? (
              "loading..."
            ) : (
              <span className="text-sm">Move down</span>
            )}
          </button>
          <button
            className="flex w-full items-center gap-1 py-3 text-[#667185] hover:bg-accent"
            onClick={() => handleDelete(section, id)}
          >
            {isDeleting ? (
              "loading..."
            ) : (
              <>
                <span className="text-xl">
                  <TrashCan />
                </span>
                <span className="text-sm">Delete</span>
              </>
            )}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default VideoSectionPopover;
