import { TrashCan } from "@/Components/Icon";
import { CommonButton } from "@/Components/ui/button";
import { Clock } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { useDeleteOndemandStudent } from "@/hooks/course-management/on-demand-section/use-delete-ondemand-student";
import { useUpdateOndemandDuration } from "@/hooks/course-management/on-demand-section/use-update-ondemand-duration";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SetDurationModal from "../live-session/SetDurationModal";

const StudentPopover = ({ children, studentId }) => {
  const { courseId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { deleteOndemandStudent, isPending: isDeleting } = useDeleteOndemandStudent();
  const { updateDuration, isPending: isUpdating } = useUpdateOndemandDuration();

  const handleDelete = () => {
    deleteOndemandStudent({
      courseId,
      data: {
        student_id: studentId,
      },
    });
  };

  const handleSetDuration = (subscription_expires) => {
    updateDuration(
      {
        courseId,
        studentId,
        subscription_expires,
      },
      {
        onSuccess: () => setIsModalOpen(false),
      }
    );
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent
          alignOffset={-13}
          className="rounded border flex flex-col items-start w-48 p-2 bg-white -translate-x-[13px]"
        >
          <CommonButton
            variant={"ghost"}
            className="flex w-full !justify-start gap-2 text-sm text-[#475367] hover:bg-gray-100 px-2 py-1.5 font-normal"
            onClick={() => setIsModalOpen(true)}
          >
            <Clock className={"h-4 w-4"} />
            <span>Set Duration</span>
          </CommonButton>
          <CommonButton
            variant={"ghost"}
            className="flex w-full !justify-start gap-2 text-sm text-primary-color-600 hover:bg-red-50 px-2 py-1.5 font-normal"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            <TrashCan className={"h-4 w-4 text-primary-color-600"} />
            <span>Unenroll</span>
          </CommonButton>
        </PopoverContent>
      </Popover>

      <SetDurationModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onSetDuration={handleSetDuration}
        isPending={isUpdating}
      />
    </>
  );
};

export default StudentPopover;
