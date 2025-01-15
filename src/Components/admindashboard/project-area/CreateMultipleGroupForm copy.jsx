import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { nanoid } from "nanoid";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { CommonButton } from "@/Components/ui/button";
import { useMultipleProjectGroup } from "@/hooks/project-area-groups/use-create-multiple-project-groups";
import { useParams, useSearchParams } from "react-router-dom";

const sessionSchema = z.object({

  number_of_students_per_group: z
    .string()
    .regex(/^\d+$/, { message: "Must be a number" }) // Validate as a number (optional)
    .min(1, { message: "This field is required" })
    .max(5, { message: "not more than five digit" }),
});

function CreateMultipleGroupForm({ setMultipleModal }) {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");

  const { create, isPending: isCreating } = useMultipleProjectGroup();

  const form = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: {

      number_of_students_per_group: "",
    },
  });

  const handleSubmit = (data) => {
    create(
      { data, courseId, cohortId },
      {
        onSuccess: () => {
          form.reset();
          setMultipleModal((prev) => !prev);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {/* <FormInput
          name="group_name"
          id="group_name"
          label="Group Name:"
          control={form.control}
          placeholder="Team A"
          className="mb-[18px]"

        /> */}
        {/* <div className="flex items-center gap-5"> */}
        {/* <FormInput

            name="number_of_students_per_group"
            id="number_of_students_per_group"
            label="Number of groups:"
            control={form.control}
            placeholder="8"
          /> */}
        <FormInput
          name="number_of_students_per_group"
          id="number_of_students_per_groups"
          label="student per group:"
          control={form.control}
          placeholder="20"
          type="number"
        />
        {/* </div> */}
        {/* <p className="text-sm italic text-primary-color-600">
          200 students across 8 groups
        </p> */}

        <CommonButton
          disabled={isCreating}
          className={`ml-auto mt-6 block bg-primary-color-600 ${isCreating ? "bg-primary-color-300" : ""} `}
        >
          {isCreating ? "creating..." : "Create Group"}
        </CommonButton>
      </form>
    </Form>
  );
}

export default CreateMultipleGroupForm;
