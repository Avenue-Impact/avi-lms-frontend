import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { useEditOnDemandSection } from "@/hooks/course-management/on-demand-section/use-edit-ondamand";
import { editOnDemandSectionSchema } from "@/lib/form-schemas/forms-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const EditRecordedSectionForm = ({ sectionToEdit = {}, setEditModal }) => {
  const { editOnDemandCourse, isEditing } = useEditOnDemandSection();
  const params = useParams();
  const courseId = params.courseId ?? localStorage.getItem("courseId");
  const { title, overview, section } = sectionToEdit;

  const form = useForm({
    resolver: zodResolver(editOnDemandSectionSchema),
    defaultValues: {
      title,
      overview,
    },
  });

  const onSubmit = (data) => {
    editOnDemandCourse(
      { data, section, courseId },
      {
        onSuccess: () => {
          setEditModal((prev) => !prev);
          form.reset();
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div>
          <FormInput
            name="title"
            type="text"
            id="title"
            label="Section Title recorded"
            control={form.control}
            placeholder="Business Analysis Agile Project Management Software Testing "
          />
          <p className="mb-1 mt-2 text-right text-sm text-[#667185]">
            {form.watch("title") ? `${form.watch("title").length}` : 0}
            /70
          </p>
        </div>
        <div>
          <FormInput
            name="overview"
            id="overview"
            type="text"
            label="Section overview"
            control={form.control}
            placeholder="Enter text here "
            textarea={true}
          />
          <p className="mb-1 mt-2 text-right text-sm text-[#667185]">
            {form.watch("overview") ? `${form.watch("overview").length}` : 0}
            /450
          </p>
        </div>
        <CommonButton
          className="ml-auto mt-6 block w-max bg-primary-color-600"
          type="submit"
          disabled={isEditing}
        >
          Add Content
        </CommonButton>
      </form>
    </Form>
  );
};

export default EditRecordedSectionForm;
