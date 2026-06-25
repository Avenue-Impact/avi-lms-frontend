import { TrashCan } from "@/Components/Icon";
import { CommonButton } from "@/Components/ui/button";
import { Clock } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { useDeleteLiveStudent } from "@/hooks/course-management/live-session/use-delete-student";
import { useUpdateDuration } from "@/hooks/course-management/live-session/useUpdateDuration";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import SetDurationModal from "./SetDurationModal";

const LiveSessionStudentDeletePopover = ({ children, id }) => {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { deleteStudent, isPending: isDeleting } = useDeleteLiveStudent();
  const { updateDuration, isPending: isUpdating } = useUpdateDuration();

  const cohortId = queryString.get("cohortId");

  const handleDelete = (id) => {
    deleteStudent({
      cohortId,
      courseId,
      data: {
        student_id: id,
      },
    });
  };

  const handleSetDuration = (months) => {
    updateDuration({
      cohortId,
      courseId,
      studentId: id,
      months,
    }, {
      onSuccess: () => setIsModalOpen(false)
    });
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent className="rounded border flex flex-col items-start w-48 p-2">
          <CommonButton
            variant={"ghost"}
            className="flex w-full justify-start gap-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsModalOpen(true)}
          >
            <Clock className={"h-4 w-4"} />
            <span>Set Duration Access</span>
          </CommonButton>
          <CommonButton
            variant={"ghost"}
            className="flex w-full justify-start gap-2 text-sm text-primary-color-600 hover:bg-red-50"
            disabled={isDeleting}
            onClick={() => {
              handleDelete(id);
            }}
          >
            <TrashCan className={"h-4 w-4 text-primary-color-600"} />
            <span>Unenroll Student</span>
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

export default LiveSessionStudentDeletePopover;
