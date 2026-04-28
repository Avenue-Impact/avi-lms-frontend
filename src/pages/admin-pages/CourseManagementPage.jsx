import { useRef, useState } from "react";
import UploadCourseManagement from "./UploadCourseManagement";
import { useCourseManagementInfo } from "@/hooks/useCourseManagementInfo";

import { ScrollRestoration } from "react-router-dom";
import { Form } from "@/Components/ui/form";

import FormInput from "@/Components/ui/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateCourseInformation,
  useEditCourseInformation,
} from "@/hooks/course-management/use-create-course-information";
import toast from "react-hot-toast";

import { ClipLoader } from "react-spinners";
import { CommonButton } from "@/Components/ui/button";
import { courseInformationSchema } from "@/lib/form-schemas/forms-schema";
// import MyCKEditor from '../Components/pages/CDKEditor'

const stringToArray = (str) => {
  let arr = str;
  if (arr.endsWith("\n")) {
    arr = arr.slice(0, -1);
    return arr.split("\n");
  }
  return arr.split("\n");
};

const CourseManagementPage = () => {
  const [image, setImage] = useState({ file: null, preview: null });
  const [video, setVideo] = useState({ file: null, preview: null });

  const { createCourseInformation, isCreating } = useCreateCourseInformation();
  const { editCourseInformation, isEditing } = useEditCourseInformation();

  const imageRef = useRef(null);
  const btnRef = useRef(null);

  const { setActiveTab } = useCourseManagementInfo();
  const courseInformation = localStorage.getItem("course-information")
    ? JSON.parse(localStorage.getItem("course-information"))
    : {};
  const courseId =
    localStorage.getItem("course-information") && courseInformation.id;

  const dataToEdit = localStorage.getItem("course-information") && {
    courseTitle: courseInformation.title,
    benefits: courseInformation.benefits.join("\n"),
    courseIncludes: courseInformation.course_includes.join("\n"),
    highlight: courseInformation.program_highlights.join("\n"),
    technologies: courseInformation.tools_and_technologies.join("\n"),
    overview: courseInformation.overview,
    url: "",
    is_private: courseInformation.is_private ?? false,
  };

  const isEdit = Boolean(courseId);

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
      benefits,
      courseIncludes,
      highlight,
      technologies,
      overview,
      url,
      is_private,
    } = data;

    const courses = {
      title: courseTitle,
      tools_and_technologies: stringToArray(technologies),
      benefits: stringToArray(benefits),
      program_highlights: stringToArray(highlight),
      course_includes: stringToArray(courseIncludes),
      overview: overview,
      coverImage: image.file,
      is_private,
    };

    let courseToUpload;

    if (video.file) {
      courseToUpload = {
        ...courses,
        taster_video: video.file,
      };
    } else if (url) {
      courseToUpload = {
        ...courses,
        upload_from_url: url,
      };
    } else {
      courseToUpload = {
        ...courses,
      };
    }

    editCourseInformation(
      {
        data: courseToUpload,
        courseId: courseId,
      },
      {
        onSuccess: (data) => {
          setActiveTab((prev) => prev + 1);
          localStorage.setItem("course-information", JSON.stringify(data.data));
        },
      },
    );
  };

  const CreateCourse = async (data) => {
    const {
      courseTitle,
      benefits,
      courseIncludes,
      highlight,
      technologies,
      overview,
      url,
      is_private,
    } = data;

    if (!image.file) {
      toast.error("Please insert an image");

      return setMessage((prev) => {
        return {
          ...prev,
          error: "Please insert image",
          success: "",
        };
      });
    }

    if (!video.file && form.watch("url").length < 1)
      return toast.error("Please insert an taster video or video url");

    const courses = {
      title: courseTitle,
      tools_and_technologies: stringToArray(technologies),
      benefits: stringToArray(benefits),
      program_highlights: stringToArray(highlight),
      course_includes: stringToArray(courseIncludes),
      overview: overview,
      coverImage: image.file,
      is_private,
    };

    let courseToUpload;

    if (video.file) {
      courseToUpload = {
        ...courses,
        taster_video: video.file,
      };
    } else {
      courseToUpload = {
        ...courses,
        upload_from_url: url,
      };
    }

    createCourseInformation(courseToUpload, {
      onSuccess: () => setActiveTab((prev) => prev + 1),
    });
  };

  return (
    <>
      <ScrollRestoration />

      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-2 mt-5 text-[24px] font-[500] text-[#344054]">
          Course Information
        </h2>

        <CommonButton
          variant={"outline"}
          className="font-normal text-[#667185]"
          ref={btnRef}
          onClick={() => console.log("btnRef.current")}
        >
          Save and Continue
        </CommonButton>
      </div>
      <Form {...form}>
        <form
          className="mx-auto grid max-w-6xl grid-cols-12 gap-8 pt-5"
          onSubmit={form.handleSubmit(isEdit ? editCourse : CreateCourse)}
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
                /60
              </p>
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
                /100
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
                /405
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
                /405
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
                /405
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
                /405
              </p>
            </div>

            <div className="flex items-center justify-end pt-10">
              <CommonButton
                className="min-w-32 rounded bg-primary-color-600"
                disabled={isCreating || isEditing}
                ref={btnRef}
              >
                {isCreating || isEditing ? (
                  <ClipLoader size={20} color={"#fff"} />
                ) : isEdit ? (
                  "Edit info"
                ) : (
                  "Save & Continue"
                )}
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
    </>
  );
};

export default CourseManagementPage;
