import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { CommonButton } from "@/Components/ui/button";

const sessionSchema = z.object({
  groupName: z
    .string()
    .min(1, { message: "This field is required" })
    .max(70, { message: "you've reach the max character length" }),
});

function CreateGroupForm() {
  const form = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      groupName: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => console.log(values))}>
        <FormInput
          name="groupName"
          id="groupName"
          label="Group Name:"
          control={form.control}
          placeholder="Team A"
          className="mb-[18px]"
        />
        <FormInput
          name="numberOfStudent"
          id="numberOfStudent"
          label="Number of Student:"
          control={form.control}
          placeholder="342"
        />

        <CommonButton className="ml-auto mt-6 block bg-primary-color-600">
          Create Group
        </CommonButton>
      </form>
    </Form>
  );
}

export default CreateGroupForm;
