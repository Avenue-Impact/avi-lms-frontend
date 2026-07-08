import { ImgUploadIcon } from "@/Components/Icon";
import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { useCreateOnDemandCourse } from "@/hooks/course-management/use-create-demand-course";
import { useGetAllVideos } from "@/hooks/course-management/use-get-all-videos";
import { onDemandSessionSchema } from "@/lib/form-schemas/forms-schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const AddVideoForm = ({ sectionToAddVideo, setModal }) => {
  const { title, overview, section } = sectionToAddVideo;
  const params = useParams();
  const courseId = params.courseId ?? localStorage.getItem("courseId");

  const [videoSourceType, setVideoSourceType] = useState("upload");
  const [video, setVideo] = useState({ file: null, preview: null });
  const [errorMessage, setErrorMessage] = useState("");

  const videoRef = useRef();
  const { createOnDemandCourse, isCreating } = useCreateOnDemandCourse();
  const { data: videosData } = useGetAllVideos(1, 100, "", courseId);

  const form = useForm({
    resolver: zodResolver(onDemandSessionSchema),
    defaultValues: {
      title,
      video_title: "",
      overview,
      video_from_url: "",
      video_id: "",
    },
  });

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

  const handleCreateSection = async (data) => {
    const { title, video_title, overview } = data;

    let recorded = {
      title,
      video_title,
      overview,
      section,
    };

    if (videoSourceType === "existing") {
      if (!data.video_id) {
        return toast.error("Please select an existing video!");
      }
      recorded.video_id = data.video_id;
    } else {
      if (!video.file && form.watch("video_from_url").length < 1) {
        return toast.error("Please insert a video or video url");
      }
      if (video.file) {
        recorded.video = video.file;
      } else {
        recorded.video_from_url = data.video_from_url;
      }
    }

    createOnDemandCourse(
      { data: recorded, courseId },
      {
        onSuccess: () => {
          form.reset();
          setVideo({ file: null, preview: null });
          setModal(false);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateSection)} className="w-full space-y-4">
        <div>
          <FormInput
            name="video_title"
            type="text"
            id="video_title"
            label="Video Title"
            control={form.control}
            placeholder="Introduction to Project Consulting Recordings"
          />
          <p className="mb-1 mt-2 text-right text-sm text-[#667185]">
            {form.watch("video_title") ? `${form.watch("video_title").length}` : 0}/70
          </p>
        </div>

        <div className="flex gap-4 border-b pb-4 mt-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-slate-50 font-medium text-xs text-[#101928]">
            <input
              type="radio"
              name="video_source_add"
              checked={videoSourceType === "upload"}
              onChange={() => setVideoSourceType("upload")}
              className="accent-primary-color-600 font-semibold"
            />
            Upload New Video / URL
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-slate-50 font-medium text-xs text-[#101928]">
            <input
              type="radio"
              name="video_source_add"
              checked={videoSourceType === "existing"}
              onChange={() => setVideoSourceType("existing")}
              className="accent-primary-color-600 font-semibold"
            />
            Select Existing Global Video
          </label>
        </div>

        {videoSourceType === "existing" ? (
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-[#101928]">
              Select Existing Video
            </label>
            <select
              {...form.register("video_id")}
              className="w-full rounded-md border border-slate-350 p-2.5 text-sm focus:outline-primary-color-600 bg-white"
            >
              <option value="">-- Choose a video --</option>
              {videosData?.data?.data?.map((vid) => (
                <option key={vid.id} value={vid.id}>
                  {vid.title} {vid.size ? `(${vid.size})` : ""}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <p className="text-sm font-medium capitalize text-[#101928]">
                upload video
              </p>
              <div
                className={cn(
                  "flex min-h-52 w-full items-center justify-center rounded-lg border-2 border-dashed border-[#23314A] cursor-pointer",
                  form.watch("video_from_url").length >= 1 && "cursor-not-allowed opacity-45",
                )}
                onClick={() => {
                  if (form.watch("video_from_url").length >= 1) return;
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
                  <button className="flex gap-2 text-[#98A2B3]" type="button">
                    <ImgUploadIcon />
                    <span>upload</span>
                  </button>
                )}
                <input
                  type="file"
                  name=""
                  id=""
                  hidden
                  ref={videoRef}
                  onChange={handleVideoUpload}
                  disabled={form.watch("video_from_url").length >= 1}
                />
              </div>
              {errorMessage && <p className="text-primary-color-600">{errorMessage}</p>}
              <p className="mb-1 mt-2 text-sm text-[#667185]">Max 200MB files are allowed</p>
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
                placeholder="Input file URL"
                disabled={video.file ? true : false}
              />
            </div>
          </>
        )}

        <div className="ml-auto mt-6 w-max">
          <CommonButton
            className="ml-auto w-max bg-primary-color-600"
            type="submit"
            disabled={isCreating}
          >
            Add Video
          </CommonButton>
        </div>
      </form>
    </Form>
  );
};

export default AddVideoForm;
