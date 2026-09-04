import { useRef, useState } from "react";
import UploadCourseManagement from "../../../../pages/admin-pages/UploadCourseManagement";

import { Form } from "@/Components/ui/form";
import { useParams } from "react-router-dom";

import FormInput from "@/Components/ui/form-input";
import { useEditCourseInformation } from "@/hooks/course-management/use-create-course-information";
import { useFetchAdminPathways } from "@/hooks/pathways/use-pathways";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CommonButton } from "@/Components/ui/button";
import { courseInformationSchema } from "@/lib/form-schemas/forms-schema";
import { BeatLoader } from "react-spinners";
// import MyCKEditor from '../Components/pages/CDKEditor'

const stringToArray = (str) => {
  let arr = str;
  if (arr.endsWith("\n")) {
    arr = arr.slice(0, -1);
    return arr.split("\n");
  }
  return arr.split("\n");
};

const EditCourseInformationForm = ({ courseInformation, setOnOpenChange }) => {
  const { courseId } = useParams();
  const isEdit = Boolean(courseId);
  const [image, setImage] = useState({
    file: null,
    preview: isEdit ? courseInformation.cover_image : null,
  });
  const [video, setVideo] = useState({
    file: null,
    preview: isEdit ? courseInformation.preview_video?.url : null,
  });

  const { editCourseInformation, isEditing } = useEditCourseInformation();
  const { data: pathwayData, isLoading: isLoadingPathways } = useFetchAdminPathways();
  const dynamicPathways = pathwayData?.data?.data?.pathways || [];

  const imageRef = useRef(null);
  const btnRef = useRef(null);

  const dataToEdit = courseInformation && {
    courseTitle: courseInformation.title,
    pathway: courseInformation.pathway || courseInformation.category || "",
    benefits: courseInformation.benefits ? courseInformation.benefits.join("\n") : "",
    courseIncludes: courseInformation.course_includes ? courseInformation.course_includes.join("\n") : "",
    highlight: courseInformation.program_highlights ? courseInformation.program_highlights.join("\n") : "",
    technologies: courseInformation.tools_and_technologies ? courseInformation.tools_and_technologies.join("\n") : "",
    overview: courseInformation.overview,
    url: "",
    is_private: courseInformation.is_private ?? false,
  };

  const [message, setMessage] = useState({
    error: "",
    success: "",
  });

  const form = useForm({
    resolver: zodResolver(courseInformationSchema),
    defaultValues: isEdit
      ? dataToEdit
      : {
          courseTitle: "",
          pathway: "",
          benefits: "",
          courseIncludes: "",
          highlight: "",
          technologies: "",
          overview: "",
          url: "",
          is_private: false,
        },
  });

  const editCourse = (data) => {
    const {
      courseTitle,
      pathway,
      benefits,
      courseIncludes,
      highlight,
      technologies,
      overview,
      url,
      is_private,
    } = data;

    const formData = new FormData();
    formData.append("title", courseTitle);
    formData.append("pathway", pathway || "");
    formData.append("category", pathway || "");
    formData.append("overview", overview);
    formData.append("is_private", is_private);

    // Helper to append arrays
    const appendArray = (key, stringVal) => {
      const arr = stringToArray(stringVal);
      arr.forEach((item) => formData.append(`${key}[]`, item));
    };

    appendArray("tools_and_technologies", technologies);
    appendArray("benefits", benefits);
    appendArray("program_highlights", highlight);
    appendArray("course_includes", courseIncludes);

    if (image.file) {
      formData.append("coverImage", image.file);
    }

    if (video.file) {
      formData.append("taster_video", video.file);
    } else if (url) {
      formData.append("upload_from_url", url);
    }

    editCourseInformation(
      { data: formData, courseId: courseId },
      {
        onSuccess: () => setOnOpenChange(false),
      },
    );
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          className="mx-auto grid grid-cols-12 gap-8 pt-5"
          onSubmit={form.handleSubmit(editCourse)}
        >
          <div className="col-span-8">
            {/* Course Title */}
            <div className="mb-6">
              <FormInput
                name="courseTitle"
                id="courseTitle"
                type="text"
                label={
                  <p className="mb-2 font-[500] text-[#475367]">
                    Course title: <span className="text-[#CC1747]">*</span>
                  </p>
                }
                labelClass={"text-base text-[#475367]"}
                textarea={true}
                control={form.control}
                placeholder="Enter text here..."
                className="h-[56px] w-full resize-none rounded border border-gray-300 p-2 outline-none placeholder:text-base"
              />

              <p className="text-right text-gray-500">
                {form.watch("courseTitle")
                  ? `${form.watch("courseTitle").length}`
                  : 0}
                /160
              </p>
            </div>

            {/* Career Pathway */}
            <div className="mb-6">
              <p className="mb-2 font-[500] text-[#475367]">
                Career Pathway / Category: <span className="text-[#CC1747]">*</span>
              </p>
              <select
                {...form.register("pathway")}
                className="h-[56px] w-full rounded border border-gray-300 bg-white p-2 outline-none"
              >
                <option value="">Select Career Pathway</option>
                {dynamicPathways.length > 0 ? (
                  dynamicPathways.map((p) => (
                    <option key={p._id || p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Business Analysis">Business Analysis</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Cloud Computing & DevOps">Cloud Computing & DevOps</option>
                    <option value="Agile Delivery & Scrum">Agile Delivery & Scrum</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                  </>
                )}
              </select>
            </div>

            {/* Course Visibility */}
            <div className="mb-6">
              <p className="mb-2 font-[500] text-[#475367]">
                Course Visibility: <span className="text-[#CC1747]">*</span>
              </p>
              <select
                {...form.register("is_private", {
                  setValueAs: (v) => v === "true" || v === true,
                })}
                className="h-[56px] w-full rounded border border-gray-300 bg-white p-2 outline-none"
              >
                <option value="false">Public (Appears in catalog and search)</option>
                <option value="true">Non-Public (Hidden from catalog, accessible via direct link)</option>
              </select>
            </div>

            <div className="mb-6">
              <FormInput
                name="courseIncludes"
                id="courseIncludes"
                label={
                  <p className="mb-2 font-[500] text-[#475367]">
                    Course Includes: <span className="text-[#CC1747]">*</span>{" "}
                  </p>
                }
                type="text"
                labelClass={"text-base text-[#475367]"}
                textarea={true}
                control={form.control}
                placeholder="Enter text here..."
                className="h-[117px] w-full resize-none rounded border border-gray-300 p-2 outline-none placeholder:text-base"
              />
              <p className="text-right text-gray-500">
                {form.watch("courseIncludes")
                  ? `${form.watch("courseIncludes").length}`
                  : 0}
                /600
              </p>
            </div>

            {/* Tools and Technologies */}
            <div>
              <FormInput
                name="technologies"
                id="technologies"
                label={
                  <p className="mb-2 font-[500] text-[#475367]">
                    Tools and Technologies:{" "}
                    <span className="text-[#CC1747]">*</span>{" "}
                  </p>
                }
                labelClass={"text-base text-[#475367]"}
                textarea={true}
                type="text"
                control={form.control}
                placeholder="Enter text here..."
                className="h-[203px] w-full resize-none rounded border border-gray-300 p-2 outline-none placeholder:text-base"
              />
              <p className="text-right text-gray-500">
                {form.watch("technologies")
                  ? `${form.watch("technologies").length}`
                  : 0}
                /1200
              </p>
            </div>

            {/* Benefits */}
            <div>
              <FormInput
                name="benefits"
                id="benefits"
                label={
                  <p className="mb-2 font-[500] text-[#475367]">
                    Benefits: <span className="text-[#CC1747]">*</span>{" "}
                  </p>
                }
                labelClass={"text-base text-[#475367]"}
                textarea={true}
                type="text"
                control={form.control}
                placeholder="Enter text here..."
                className="h-[203px] w-full resize-none rounded border border-gray-300 p-2 outline-none placeholder:text-base"
              />
              <p className="text-right text-gray-500">
                {form.watch("benefits")
                  ? `${form.watch("benefits").length}`
                  : 0}
                /1200
              </p>
            </div>

            {/* Programme Highlight */}
            <div>
              <FormInput
                name="highlight"
                id="highlight"
                label={
                  <p className="mb-2 font-[500] text-[#475367]">
                    Programme Highlight:{" "}
                    <span className="text-[#CC1747]">*</span>{" "}
                  </p>
                }
                type="text"
                labelClass={"text-base text-[#475367]"}
                textarea={true}
                control={form.control}
                placeholder="Enter text here..."
                className="h-[203px] w-full resize-none rounded border border-gray-300 p-2 outline-none placeholder:text-base"
              />
              <p className="text-right text-gray-500">
                {form.watch("highlight")
                  ? `${form.watch("highlight").length}`
                  : 0}
                /1200
              </p>
            </div>

            {/* Overview */}
            <div>
              <FormInput
                name="overview"
                id="overview"
                label={
                  <p className="mb-2 font-[500] text-[#475367]">
                    Overview: <span className="text-[#CC1747]">*</span>{" "}
                  </p>
                }
                type="text"
                labelClass={"text-base text-[#475367]"}
                textarea={true}
                control={form.control}
                placeholder="Enter text here..."
                className="h-[203px] w-full resize-none rounded border border-gray-300 p-2 outline-none placeholder:text-base"
              />
              <p className="text-right text-gray-500">
                {form.watch("overview")
                  ? `${form.watch("overview").length}`
                  : 0}
                /1200
              </p>
            </div>

            <div className="flex items-center justify-end pt-10">
              <CommonButton
                className="min-w-32 rounded bg-primary-color-600"
                disabled={isEditing}
                ref={btnRef}
              >
                {isEditing && <BeatLoader size={10} color={"#fff"} />}
                Edit info
              </CommonButton>
            </div>
          </div>

          <div className="col-span-4">
            <UploadCourseManagement
              image={image}
              setImage={setImage}
              message={message}
              setMessage={setMessage}
              imageRef={imageRef}
              video={video}
              setVideo={setVideo}
              form={form}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditCourseInformationForm;
