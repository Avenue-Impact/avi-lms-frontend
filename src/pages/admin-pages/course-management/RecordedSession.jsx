import { useRef, useState } from "react";

import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { CommonButton } from "@/Components/ui/button";

import { ImgUploadIcon } from "@/Components/Icon";

// import { useCourseManagementInfo } from "@/hooks/useCourseManagementInfo";
import { ScrollRestoration } from "react-router-dom";

import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useCreateRecordedSession } from "@/hooks/course-management/recorded-section/use-create-recorded-session";
import { ClipLoader } from "react-spinners";
import CoursesRecordedLiveSession from "@/Components/admindashboard/course-management/recoded-session/CoursesRecordedLiveSession";
import { useCourseManagementInfo } from "@/hooks/useCourseManagementInfo";
import { useQuery } from "@tanstack/react-query";
import { useGetSingleCohort } from "@/hooks/course-management/use-get-singleCohorts";

function RecordedSession() {
  const [video, setVideo] = useState({ file: null, preview: null });
  const [errorMessage, setErrorMessage] = useState("");
  const videoRef = useRef();
  const [disabled, setDisabled] = useState(true);

  const courseId = localStorage.getItem("courseId");
  const cohortId = localStorage.getItem("cohortId");
  const { data } = useGetSingleCohort(courseId, cohortId);

  const { createRecordedSession, isCreating, form } =
    useCreateRecordedSession();
  const { setActiveTab } = useCourseManagementInfo();

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 200 * 1024 * 1024) {
      return setErrorMessage("file has exceed 200MB");
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setVideo((prev) => {
        return { ...prev, file: file, preview: reader.result };
      });
      setErrorMessage("");
    };
    reader.readAsDataURL(file);
  };

  const handleCreateNewSection = () => {
    let section = localStorage.getItem("recordedSection")
      ? localStorage.getItem("recordedSection")
      : 2;

    section = Number(section) + 1;

    localStorage.setItem("recordedSection", +section);

    toast.success(`section ${section} is created`);
    setDisabled(true);
  };

  const onSubmit = async (data) => {
    const { title, video_title, overview } = data;
    const cohort = localStorage.getItem("cohorts");
    let section = localStorage.getItem("recordedSection")
      ? localStorage.getItem("recordedSection")
      : 2;

    if (!video.file && form.watch("video_from_url").length < 1)
      return toast.error("Please insert a video or video url");

    let recorded;

    if (video.file) {
      recorded = {
        title,
        video_title,
        overview,
        cohort,
        video: video.file,
      };
    } else {
      recorded = {
        ...data,
        cohort,
      };
    }

    createRecordedSession(
      { data: recorded, courseId, section },
      {
        onSuccess: () => {
          setDisabled(false);
          form.reset();
          setVideo((prev) => {
            return { ...prev, file: null, preview: null };
          });
        },
      },
    );
  };

  return (
    <>
      <ScrollRestoration />

      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-2 mt-5 text-[24px] font-[500] text-[#344054]">
          Recorded Course Sections
        </h2>

        <button className="flex items-center rounded border border-[#667185] bg-transparent px-4 py-2 text-[#667185] hover:bg-[#f0f0f0]">
          Preview
        </button>
      </div>
      <main className="grid grid-cols-[3fr_1fr] gap-10 rounded-[10px] border-2 border-[#F0F2F5] p-12 pr-6">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormInput
                  name="title"
                  type="text"
                  id="title"
                  label="Section Title"
                  control={form.control}
                  placeholder="Business Analysis Agile Project Management Software Testing "
                  disabled={!data?.data?.data.cohort}
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
                  disabled={!data?.data?.data.cohort}
                />
                <p className="mb-1 mt-2 text-right text-sm text-[#667185]">
                  {form.watch("overview")
                    ? `${form.watch("overview").length}`
                    : 0}
                  /450
                </p>
              </div>
              <div>
                <FormInput
                  name="video_title"
                  type="text"
                  id="video_title"
                  label="Video Title"
                  control={form.control}
                  placeholder="Enter Video Title"
                  disabled={!data?.data?.data.cohort}
                />
                <p className="mb-1 mt-2 text-right text-sm text-[#667185]">
                  {form.watch("video_title")
                    ? `${form.watch("video_title").length}`
                    : 0}
                  /70
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium capitalize text-[#101928]">
                  upload video
                </p>
                <div
                  className={cn(
                    "min-h-52 flex w-full items-center justify-center rounded-lg border-2 border-dashed border-[#23314A]",
                    form.watch("video_from_url").length >= 1 &&
                      "opacity-45 cursor-not-allowed",
                  )}
                  onClick={() => {
                    videoRef.current.click();
                  }}
                >
                  {video.preview ? (
                    <video
                      src={video.preview}
                      alt="Cover Video"
                      className="h-[200px] w-full rounded-md object-cover"
                      controls
                    />
                  ) : (
                    <button className="flex gap-2 text-[#98A2B3]">
                      <ImgUploadIcon />
                      <span>upload</span>
                    </button>
                  )}
                  <input
                    type="file"
                    name=""
                    accept="video/*"
                    id=""
                    hidden
                    ref={videoRef}
                    onChange={handleVideoUpload}
                    disabled={
                      !data?.data?.data.cohort ||
                      form.watch("video_from_url").length >= 1
                    }
                  />
                </div>
                {errorMessage && (
                  <p className="text-primary-color-600">{errorMessage}</p>
                )}

                <p className="mb-1 mt-2 text-sm text-[#667185]">
                  Max 200MB files are allowed
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-px w-full bg-[#E7E7E7]" />

                <span className="text-[#6D6D6D]">OR</span>
                <div className="h-px w-full bg-[#E7E7E7]" />
              </div>

              <div className="flex flex-col gap-y-4">
                <FormInput
                  name="video_from_url"
                  type="text"
                  id="video_from_url"
                  label="Video from URL"
                  control={form.control}
                  placeholder="Input file URL "
                  disabled={
                    !data?.data?.data.cohort || video.file ? true : false
                  }
                />
              </div>

              <div>
                <div className="ml-auto mt-6 w-max">
                  <CommonButton
                    variant="outline"
                    type="button"
                    className="disabled:cursor-not-allowed"
                    onClick={handleCreateNewSection}
                    disabled={disabled}
                  >
                    {" "}
                    Create New Section
                  </CommonButton>
                  <CommonButton
                    className="ml-6 bg-primary-color-600"
                    type="submit"
                    disabled={!data?.data?.data.cohort || isCreating}
                  >
                    {isCreating ? (
                      <span className="min-w-[89.3px]">
                        <ClipLoader size={20} color={"#fff"} />
                      </span>
                    ) : (
                      <span>Add Content</span>
                    )}
                  </CommonButton>
                </div>
              </div>
            </form>
          </Form>
        </div>
        <div className="overflow-y-hidden">
          <CoursesRecordedLiveSession />
        </div>
      </main>

      <div className="my-6 flex justify-between gap-6">
        <CommonButton
          onClick={() => setActiveTab((prev) => prev - 1)}
          className="ml-auto bg-gray-500 text-white hover:bg-gray-700"
        >
          Back
        </CommonButton>

        <CommonButton
          className="bg-primary-color-600 font-normal"
          onClick={() => setActiveTab((prev) => prev + 1)}
        >
          Save
        </CommonButton>
      </div>
    </>
  );
}

export default RecordedSession;
