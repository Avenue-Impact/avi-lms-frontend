import { TrashCan } from "@/Components/Icon";
import { CommonButton } from "@/Components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { useDeleteLiveStudent } from "@/hooks/course-management/live-session/use-delete-student";
import { useParams, useSearchParams } from "react-router-dom";

const LiveSessionStudentDeletePopover = ({ children, id }) => {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();

  const { deleteStudent, isPending } = useDeleteLiveStudent();

  const handleDelete = (id) => {
    deleteStudent({
      cohortId: queryString.get("cohortId"),
      courseId,
      data: {
        student_id: id,
      },
    });
  };

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="rounded border">
        <CommonButton
          variant={"ghost"}
          className="flex gap-1 text-sm text-primary-color-600"
          disabled={isPending}
          onClick={() => {
            handleDelete(id);
          }}
        >
          <span>
            <TrashCan className={"h-4 w-4 text-primary-color-600"} />
          </span>
          <span>Delete</span>
        </CommonButton>
      </PopoverContent>
    </Popover>
  );
};

export default LiveSessionStudentDeletePopover;
