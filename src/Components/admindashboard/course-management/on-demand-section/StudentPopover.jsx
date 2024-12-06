import { TrashCan } from "@/Components/Icon";
import { CommonButton } from "@/Components/ui/button";
import { Popover, PopoverTrigger } from "@/Components/ui/popover";
import { useDeleteOndemandStudent } from "@/hooks/course-management/on-demand-section/use-delete-ondemand-student";
import { PopoverContent } from "@radix-ui/react-popover";
import { useParams } from "react-router-dom";

const StudentPopover = ({ children, studentId }) => {
  const { courseId } = useParams();

  const { deleteOndemandStudent, isPending } = useDeleteOndemandStudent();

  const handleDelete = (id) => {
    deleteOndemandStudent({
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
          onClick={() => handleDelete(studentId)}
          disabled={isPending}
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

export default StudentPopover;
