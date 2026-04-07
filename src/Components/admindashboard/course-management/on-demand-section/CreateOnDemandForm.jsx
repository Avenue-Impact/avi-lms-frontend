import { ImgUploadIcon } from "@/Components/Icon";
import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { useFetchondemandCourse } from "@/hooks/course-management/on-demand-section/use-fetch-ondemand-course";
import {
  useCreateOnDemandCourse,
  useCreateEmptyOnDemandCourse,
} from "@/hooks/course-management/use-create-demand-course";
import { useGetAllVideos } from "@/hooks/course-management/use-get-all-videos";
import { onDemandSessionSchema } from "@/lib/form-schemas/forms-schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateOndemandForm = ({ courseId, initialSection }) => {
  const [videoSourceType, setVideoSourceType] = useState("upload"); // "upload" | "existing"
  const [video, setVideo] = useState({ file: null, preview: null });
  const [document, setDocument] = useState({ file: null, name: null });
  const [errorMessage, setErrorMessage] = useState("");
  const [documentError, setDocumentError] = useState("");
  const [isSectionCreated, setIsSectionCreated] = useState(
    initialSection ? true : false,
  );
  const [sectionNumber, setSectionNumber] = useState(
    initialSection ? initialSection.section : null,
  );

  const { data } = useFetchondemandCourse(courseId);
  const { data: videosData } = useGetAllVideos(1, 100);
  const videoRef = useRef();
  const documentRef = useRef();

  const { createOnDemandCourse, isCreating } = useCreateOnDemandCourse();
  const { createEmptyOnDemandCourse, isCreatingEmpty } =
    useCreateEmptyOnDemandCourse();

  const form = useForm({
    resolver: zodResolver(onDemandSessionSchema),
    defaultValues: {
      title: initialSection?.title || "",
      video_title: "",
      overview: initialSection?.overview || "",
      description: "",
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

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) {
      return setDocumentError("Document size exceeds 50MB");
    }
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];
    if (!allowedTypes.includes(file.type)) {
      return setDocumentError(
        "Invalid file type. Only PDF, Word, Excel, and PowerPoint files are allowed.",
      );
    }
    setDocument({ file, name: file.name });
    setDocumentError("");
  };

  const handleDeclareSection = async () => {
    const title = form.getValues("title");
    const overview = form.getValues("overview");

    if (!title || !overview) {
      toast.error("Please provide Section Title and Overview");
      return;
    }

    createEmptyOnDemandCourse(
      { data: { title, overview }, courseId },
      {
        onSuccess: ({ data }) => {
          setSectionNumber(data.data.section);
          setIsSectionCreated(true);
        },
      },
    );
  };

  const handleAddLesson = async (data) => {
    if (!sectionNumber) {
      return toast.error("Please declare a section first.");
    }

    let recorded = {
      section: sectionNumber,
      title: form.getValues("title"),
      overview: form.getValues("overview"),
      video_title: data.video_title,
      description: data.description,
      document: document.file,
    };

    if (videoSourceType === "existing") {
      if (!data.video_id)
        return toast.error("Please select an existing video!");
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
          toast.success("Lesson added securely.");
          form.setValue("video_title", "");
          form.setValue("description", "");
          form.setValue("video_id", "");
          form.setValue("video_from_url", "");
          setVideo({ file: null, preview: null });
          setDocument({ file: null, name: null });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form className="w-full">
        {/* Step 1: Section Metadata */}
        <div>
          <h2 className="mb-4 border-b pb-2 text-xl font-semibold">
            1. Section Information
          </h2>
          <FormInput
            name="title"
            type="text"
            id="title"
            label="Section Title"
            control={form.control}
            placeholder="E.g. Agile Project Management"
            disabled={isSectionCreated}
          />
          <p className="mb-4 mt-2 text-right text-sm text-[#667185]">
            {form.watch("title") ? `${form.watch("title").length}` : 0}/70
          </p>

          <FormInput
            name="overview"
            id="overview"
            type="text"
            label="Section Overview"
            control={form.control}
            placeholder="Enter objective and description of the section"
            textarea={true}
            disabled={isSectionCreated}
          />
          <p className="mb-4 mt-2 text-right text-sm text-[#667185]">
            {form.watch("overview") ? `${form.watch("overview").length}` : 0}
            /450
          </p>

          {!isSectionCreated && (
            <CommonButton
              className="mt-2 w-full bg-primary-color-600"
              type="button"
              disabled={isCreatingEmpty}
              onClick={handleDeclareSection}
            >
              Declare Section
            </CommonButton>
          )}

          {isSectionCreated && (
            <div className="mt-2 flex w-full items-center justify-end">
              <CommonButton
                variant="outline"
                type="button"
                onClick={() => {
                  setIsSectionCreated(false);
                  setSectionNumber(null);
                  form.reset();
                }}
              >
                Create Another New Section
              </CommonButton>
            </div>
          )}
        </div>

        {/* Step 2: Lesson Appendage */}
        {isSectionCreated && (
          <div className="mt-8 rounded-xl border border-t border-slate-200 bg-slate-50 p-4 pt-6">
            <h2 className="mb-4 text-xl font-semibold text-primary-color-600">
              2. Add Lesson to Section {sectionNumber}
            </h2>

            <FormInput
              name="video_title"
              type="text"
              id="video_title"
              label="Lesson Title"
              control={form.control}
              placeholder="Enter Lesson Title"
            />
            <p className="mb-4 mt-2 text-right text-sm text-[#667185]">
              {form.watch("video_title")
                ? `${form.watch("video_title").length}`
                : 0}
              /70
            </p>

            <FormInput
              name="description"
              type="text"
              id="description"
              label="Lesson Description"
              control={form.control}
              placeholder="Enter details about this specific lesson/video"
              textarea={true}
            />

            <div className="mb-4 mt-4 flex gap-4">
              <label className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-slate-100">
                <input
                  type="radio"
                  name="video_source"
                  checked={videoSourceType === "existing"}
                  onChange={() => setVideoSourceType("existing")}
                  className="accent-primary-color-600"
                />{" "}
                Select Existing Global Video
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-slate-100">
                <input
                  type="radio"
                  name="video_source"
                  checked={videoSourceType === "upload"}
                  onChange={() => setVideoSourceType("upload")}
                  className="accent-primary-color-600"
                />{" "}
                Upload New Video / URL
              </label>
            </div>

            {videoSourceType === "existing" ? (
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-[#101928]">
                  Select Existing Video
                </label>
                <select
                  {...form.register("video_id")}
                  className="w-full rounded-md border border-slate-300 p-2 focus:outline-primary-color-600"
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
                <div className="mb-4 space-y-4">
                  <p className="text-sm font-medium capitalize text-[#101928]">
                    Upload Video
                  </p>
                  <div
                    className={cn(
                      "min-h-52 flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[#23314A]",
                      form.watch("video_from_url")?.length >= 1 &&
                        "opacity-45 cursor-not-allowed",
                    )}
                    onClick={() => {
                      if (form.watch("video_from_url")?.length >= 1) return;
                      videoRef.current.click();
                    }}
                  >
                    {video.preview ? (
                      <video
                        src={video.preview}
                        className="h-[200px] w-full rounded-md object-cover"
                        controls
                      />
                    ) : (
                      <button
                        type="button"
                        className="flex gap-2 text-[#98A2B3]"
                      >
                        <ImgUploadIcon />
                        <span>Upload Video</span>
                      </button>
                    )}
                    <input
                      type="file"
                      hidden
                      ref={videoRef}
                      onChange={handleVideoUpload}
                      disabled={form.watch("video_from_url")?.length >= 1}
                    />
                  </div>
                  {errorMessage && (
                    <p className="text-primary-color-600">{errorMessage}</p>
                  )}
                  <p className="text-sm text-[#667185]">
                    Max 200MB files are allowed
                  </p>
                </div>

                <div className="mb-4 mt-4 flex items-center gap-2">
                  <div className="h-px w-full bg-[#E7E7E7]" />
                  <span className="text-[#6D6D6D]">OR</span>
                  <div className="h-px w-full bg-[#E7E7E7]" />
                </div>

                <FormInput
                  name="video_from_url"
                  type="text"
                  id="video_from_url"
                  label="Video from URL"
                  control={form.control}
                  placeholder="Input file URL"
                  disabled={video.file ? true : false}
                />
              </>
            )}

            <div className="mt-6 space-y-2">
              <p className="text-sm font-medium capitalize text-[#101928]">
                Upload Document (Optional)
              </p>
              <div
                className="min-h-32 flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[#23314A] transition-colors hover:border-primary-color-600"
                onClick={() => documentRef.current.click()}
              >
                {document.file ? (
                  <div className="flex flex-col items-center gap-2 p-4">
                    <p className="text-sm font-medium text-[#101928]">
                      {document.name}
                    </p>
                    <p className="text-xs text-[#667185]">
                      {(document.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <button type="button" className="flex gap-2 text-[#98A2B3]">
                    <ImgUploadIcon />
                    <span>Upload Document</span>
                  </button>
                )}
                <input
                  type="file"
                  hidden
                  ref={documentRef}
                  onChange={handleDocumentUpload}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                />
              </div>
              {documentError && (
                <p className="text-sm text-primary-color-600">
                  {documentError}
                </p>
              )}
            </div>

            <CommonButton
              className="mt-6 w-full bg-primary-color-600"
              type="button"
              disabled={isCreating}
              onClick={form.handleSubmit(handleAddLesson)}
            >
              Add Lesson to Section {sectionNumber}
            </CommonButton>
          </div>
        )}
      </form>
    </Form>
  );
};

export default CreateOndemandForm;
