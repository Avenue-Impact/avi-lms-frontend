import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { useAddOndemandStudent } from "@/hooks/course-management/on-demand-section/use-add-ondemand-student";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

const onDemandDurations = [
  { label: "One Month Access", value: "one" },
  { label: "3 Months Access", value: "three" },
  { label: "6 Months Access", value: "six" },
  { label: "Annual Subscription", value: "twelve" },
  { label: "Lifetime Access", value: "life time" }
];

const addStudentSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
});
const AddStudentOnDemandForm = ({ setOpen }) => {
  const [duration, setDuration] = useState("");
  const [durationErr, setDurationErr] = useState("");

  const { courseId } = useParams();

  const { addStudent, isPending } = useAddOndemandStudent();

  const form = useForm({
    resolver: zodResolver(addStudentSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    if (!duration) return setDurationErr("Input duration");
    addStudent(
      {
        data: { ...data, subscription_limit: duration },
        courseId,
      },
      {
        onSuccess: () => setOpen(false),
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-[464px]"
      >
        <FormInput
          label={"Email Address"}
          control={form.control}
          name="email"
          type="email"
          id="email"
        />

        <div className="mt-6">
          <p className="font-[600] text-gray-600">Course Duration</p>

          <Select onValueChange={setDuration}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a duration" />
            </SelectTrigger>
            <SelectContent className="pb-8 capitalize">
              <SelectGroup>
                <SelectLabel>select duration</SelectLabel>
                {onDemandDurations.map(
                  (duration) => (
                    <SelectItem
                      key={duration.value}
                      value={duration.value}
                      className="capitalize"
                    >
                      {`${duration.label} `}
                    </SelectItem>
                  ),
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="mt-3 text-primary-color-600">
            {!duration ? durationErr : ""}
          </p>
        </div>

        <CommonButton
          className="mt-6 w-full bg-primary-color-600"
          disabled={isPending}
        >
          Add Student
        </CommonButton>
        <CommonButton
          variant={"outline"}
          className="mt-4 w-full"
          type="button"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </CommonButton>
      </form>
    </Form>
  );
};

export default AddStudentOnDemandForm;
