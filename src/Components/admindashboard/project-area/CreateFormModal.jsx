import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { useCreateCard } from "@/hooks/project-area/use-create-course-card";
import { useEditCard } from "@/hooks/project-area/use-edit-project-card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import { z } from "zod";

const u = {
  title: "Whatsapp Group",
  description:
    "This is a general whatsapp group for students enrolled in this course",
  subtitle: "Join Team A",
  link: "https://api.whatsapp.com",
  button_text: "Join Whatsappp",
};
export const sessionSchema = z.object({
  title: z
    .string()
    .min(1, { message: "This field is required" })
    .max(70, { message: "you've reach the max character length" }),
  subtitle: z
    .string()
    .min(1, { message: "This field is required" })
    .max(70, { message: "you've reach the max character length" }),
  description: z
    .string()
    .min(1, { message: "This field is required" })
    .max(450, { message: "you've reach the max character length" }),
  link: z.string().url(),
  button_text: z
    .string()
    .min(1, { message: "This field is required" })
    .max(70, { message: "you've reach the max character length" }),
});

export default function CreateFormModal({ setModal, edit, setEdit }) {
  const { create, isPending } = useCreateCard();
  const { editCard, isPending: isEditing } = useEditCard();
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");
  const isEdit = Boolean(edit?.id);
  console.log(isEdit);
  console.log(edit);
  const form = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: isEdit
      ? {
          title: edit.title,
          subtitle: edit.subtitle,
          description: edit.description,
          link: edit.link,
          button_text: edit.button_text,
        }
      : {
          title: "",
          subtitle: "",
          description: "",
          link: "",
          button_text: "",
        },
  });

  const handleEditCard = (data) => {
    editCard(
      {
        data,
        courseId,
        cohortId,
        cardId: edit?.id,
      },
      {
        onSuccess: () => {
          setEdit(null);
          setModal((prev) => !prev);
        },
      },
    );
  };

  const handleSubmit = (data) => {
    create(
      {
        data,
        courseId,
        cohortId,
      },
      {
        onSuccess: () => {
          setModal((prev) => !prev);
          form.reset();
        },
      },
    );
  };

  return (
    <BorderCard className="grid h-screen max-h-[90vh] w-full max-w-[1126px] grid-cols-[1fr_2fr] gap-x-24 overflow-y-auto rounded-md bg-white p-12">
      <div>
        <h3 className="text-2xl font-medium text-[#344054]">
          Course Project Area
        </h3>
        <p className="my-2 max-w-[297px] text-[#667185]">
          Create cards for the Course Project area that will be used by students
          enrolled in the course.
        </p>
        <CommonButton
          className="b font-normal"
          onClick={() => {
            setModal((prev) => !prev);
            setEdit(null);
          }}
          variant="outline"
        >
          Cancel
        </CommonButton>
      </div>
      <div className="w-full max-w-[503px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(isEdit ? handleEditCard : handleSubmit)}
          >
            <div>
              <FormInput
                name="title"
                id="title"
                label="Title:"
                control={form.control}
                placeholder="WhatsApp Group "
              />
              <p className="mb-1 mt-2 text-right text-sm text-[#667185]">
                {form.watch("title") ? `${form.watch("title").length}` : 0}/70
              </p>
            </div>
            <div>
              <FormInput
                name="subtitle"
                id="subtitle"
                label="Subtitle :"
                control={form.control}
                placeholder="Join Team A"
              />
              <p className="mb-1 mt-2 text-right text-sm text-[#667185]">
                {form.watch("subtitle")
                  ? `${form.watch("subtitle").length}`
                  : 0}
                /70
              </p>
            </div>
            <div>
              <FormInput
                name="description"
                id="description"
                label="Description"
                control={form.control}
                placeholder="Enter text here..."
                textarea={true}
              />
              <p className="mb-1 mt-2 text-right text-sm text-[#667185]">
                {form.watch("description")
                  ? `${form.watch("description").length}`
                  : 0}
                /450
              </p>
            </div>
            <div>
              <FormInput
                name="link"
                id="link"
                label="link :"
                control={form.control}
                placeholder="https://meet.google.com/rmz-wrmk-hhy"
              />
              <p className="mb-1 mt-2 text-right text-sm text-[#667185]">
                {form.watch("link") ? `${form.watch("link").length}` : 0}
                /70
              </p>
            </div>
            <div>
              <FormInput
                name="button_text"
                id="button_text"
                label="Button text :"
                control={form.control}
                placeholder="WhatsApp Group"
              />
              <p className="mb-1 mt-2 text-right text-sm text-[#667185]">
                {form.watch("button_text")
                  ? `${form.watch("button_text").length}`
                  : 0}
                /70
              </p>
            </div>
            <CommonButton
              className="ml-auto mt-7 block bg-primary-color-600"
              disabled={isPending || isEditing}
            >
              {isEdit ? "Edit Content" : "Create Card"}
            </CommonButton>
          </form>
        </Form>
      </div>
    </BorderCard>
  );
}
