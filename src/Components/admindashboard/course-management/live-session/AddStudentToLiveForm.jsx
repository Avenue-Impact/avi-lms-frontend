import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { useAddStudentToLive } from "@/hooks/course-management/live-session/use-add-student";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { z } from "zod";

const addStudentSchema = z.object({
  email: z.string().email(),
});
const AddStudentToLiveForm = ({ setOpen }) => {
  const { addStudent, isPending } = useAddStudentToLive();
  const [queryString] = useSearchParams();
  const { courseId } = useParams();

  const form = useForm({
    resolver: zodResolver(addStudentSchema),
    defaultValues: {
      email: "",
    },
  });
  const handleSubmit = (data) => {
    addStudent(
      {
        data,
        courseId,
        cohortId: queryString.get("cohortId"),
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
      },
    );
  };
  return (
    <Form {...form}>
      <form
        action=""
        className="mx-auto w-full max-w-[464px]"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormInput
          name="email"
          type="email"
          id="email"
          label={"Student mail"}
          control={form.control}
        />

        <CommonButton
          className="mt-6 w-full bg-primary-color-600"
          disabled={isPending}
        >
          {isPending ? (
            <ClipLoader color="#fff" className="h-3 w-3" />
          ) : (
            "  Add Student"
          )}
        </CommonButton>
        <CommonButton
          onClick={() => setOpen((prev) => !prev)}
          type="button"
          variant={"outline"}
          className="mt-3 w-full"
        >
          Cancel
        </CommonButton>
      </form>
    </Form>
  );
};

export default AddStudentToLiveForm;
