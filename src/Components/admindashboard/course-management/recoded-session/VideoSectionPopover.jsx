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

function VideoSectionPopover({ children, className, id, section, record }) {
  const [direction, setDirection] = useState("");
  const { moveVideo, isMovingVideo } = useMoveRecordedVideo();
  const { deleteVideo, isDeleting } = useDeleteRecordedVideo();

  const handleMoveUp = (id, sect) => {
    console.log("move up", id, sect);

    const data = {
      videoId: id,
      direction: "forward",
    };

    setDirection("up");

    moveVideo({
      data,
      section: sect,
    });
  };

  const handleMoveDown = (id, sect) => {
    console.log("move up", id, sect);

    setDirection("down");
    const data = {
      videoId: id,
      direction: "backward",
    };

    moveVideo({
      data,
      section: sect,
    });
  };
  const handleMoveTop = (id, sect) => {
    console.log("move up", id, sect);

    setDirection("to-top");
    const data = {
      videoId: id,
      direction: "toFront",
    };

    moveVideo({
      data,
      section: sect,
    });
  };

  const handleMoveBottom = (id, sect) => {
    setDirection("to-bottom");

    const data = {
      videoId: id,
      direction: "toBack",
    };

    moveVideo({
      data,
      section: sect,
    });
  };

  const handleDelete = (sect, id) => {
    deleteVideo({ section: sect, id });
  };

  return (
    <Popover className={cn(className)}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="mr-10 w-[259px] rounded-sm bg-white shadow-lg">
        <div className="px-3 py-[14px]">
          <EditModal
            form={<EditRecordedVideoForm section={section} record={record} />}
            header="Edit Recorded Video"
          >
            <span className="flex w-full items-center gap-1 py-3 text-left text-[#667185]">
              <span className="text-sm">
                <HiOutlinePencil />
              </span>
              <span className="text-sm">Edit</span>
            </span>
          </EditModal>
          <button
            className="flex items-center gap-1 py-3 text-[#667185]"
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
            className="flex items-center gap-1 py-3 text-[#667185]"
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
            className="flex items-center gap-1 py-3 text-[#667185]"
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
            className="flex items-center gap-1 py-3 text-[#667185]"
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
            className="flex items-center gap-1 py-3 text-[#667185]"
            onClick={() => handleDelete(section, id)}
          >
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

export default VideoSectionPopover;
