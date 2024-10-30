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

function OnDemandVideoPopover({ children, className, id, section, video }) {
  const { moveUP, status } = useMoveUP();
  const { moveDown, moveDownStatus } = useMoveDown();
  const { moveTop, moveTopStatus } = useMoveTop();
  const { moveToBottom, moveBottomStatus } = useMoveBottom();
  const { deleteVideo, deleteStatus } = useDeleteOndemandVideo();

  console.log(video);

  const handleMoveUp = (id, sect) => {
    console.log("move up", id, sect);

    const data = {
      videoId: id,
      direction: "forward",
    };
    moveUP({
      data,
      section: sect,
    });
  };

  const handleMoveDown = (id, sect) => {
    console.log("move up", id, sect);

    const data = {
      videoId: id,
      direction: "backward",
    };
    moveDown({
      data,
      section: sect,
    });
  };
  const handleMoveTop = (id, sect) => {
    console.log("move up", id, sect);

    const data = {
      videoId: id,
      direction: "toFront",
    };
    moveTop({
      data,
      section: sect,
    });
  };

  const handleMoveBottom = (id, sect) => {
    console.log("move up", id, sect);

    const data = {
      videoId: id,
      direction: "toBack",
    };
    moveToBottom({
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
            form={
              <EditOndemandVideoForm videoToEdit={video} section={section} />
            }
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
            {moveTopStatus === "pending" ? (
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
            {status === "pending" ? (
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
            {moveBottomStatus === "pending" ? (
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
            {moveDownStatus === "pending" ? (
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

export default OnDemandVideoPopover;
