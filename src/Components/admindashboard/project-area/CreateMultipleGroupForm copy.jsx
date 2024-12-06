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
  group_name: z
    .string()
    .min(1, { message: "This field is required" })
    .max(7, { message: "you've reach the max character length" }),

  number_of_students_per_group: z
    .string()
    .regex(/^\d+$/, { message: "Must be a number" }) // Validate as a number (optional)
    .optional(),

  number_of_groups: z
    .string()
    .regex(/^\d+$/, { message: "Must be a number" }) // Validate as a number (optional)
    .optional(),
});

function CreateMultipleGroupForm() {

    const { courseId } = useParams();
    const [queryString] = useSearchParams();
    const cohortId = queryString.get("cohortId");

  const { create, isPending: isCreating } = useMultipleProjectGroup();
  // console.log("Create Multiple Project", create);
  // console.log("Create Multiple Project", isCreating);


  const form = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      group_name: "Team",
      number_of_students_per_group: "",
      number_of_groups: "",
    },
  });

  const generateUniqueSlug = (groupName) => {
    // Normalize and slugify the group name, adding a unique identifier to prevent conflicts
    const baseSlug = groupName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""); // Remove trailing dashes
    return `${baseSlug}-${nanoid(6)}`; // Append a unique ID
  };

  const handleSubmit = (data) => {
    const slug = generateUniqueSlug(data.group_name);
  create({ data: { ...data, slug }, courseId, cohortId });
}


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormInput
          name="group_name"
          id="group_name"
          label="Group Name:"
          control={form.control}
          placeholder="Team A"
          className="mb-[18px]"
          
        />
        <div className="flex items-center gap-5">
          <FormInput
            name="number_of_students_per_group"
            id="number_of_students_per_group"
            label="Number of groups:"
            control={form.control}
            placeholder="8"
          />
          <FormInput
            name="number_of_groups"
            id="number_of_groups"
            label="student per group:"
            control={form.control}
            placeholder="20"
          />
        </div>
        <p className="text-sm italic text-primary-color-600">
          200 students across 8 groups
        </p>

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
