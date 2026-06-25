import { TrashCan } from "@/Components/Icon";
import { CommonButton } from "@/Components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { useDeleteLiveStudent } from "@/hooks/course-management/live-session/use-delete-student";
import { useParams, useSearchParams } from "react-router-dom";

const LiveSessionStudentDeletePopover = ({ children, studentId }) => {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();

  const { deleteStudent, isPending } = useDeleteLiveStudent();

  const handleDelete = () => {
    deleteStudent({
      cohortId: queryString.get("cohortId"),
      courseId,
      data: {
        student_id: studentId,
      },
    });
  };

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="rounded border flex flex-col items-start w-48 p-2">
        <CommonButton
          variant={"ghost"}
          className="flex w-full justify-start gap-2 text-sm text-primary-color-600 hover:bg-red-50"
          disabled={isPending}
          onClick={handleDelete}
        >
          <TrashCan className={"h-4 w-4 text-primary-color-600"} />
          <span>Unenroll Student</span>
        </CommonButton>
      </PopoverContent>
    </Popover>
  );
};

export default LiveSessionStudentDeletePopover;
