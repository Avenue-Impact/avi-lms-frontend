import { ImgUploadIcon } from "@/Components/Icon";
import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { useCreateOnDemandCourse } from "@/hooks/course-management/use-create-demand-course";
import { onDemandSessionSchema } from "@/lib/form-schemas/forms-schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

let section = localStorage.getItem("demandSectionNumber")
  ? localStorage.getItem("demandSectionNumber")
  : 2;

const CreateOndemandForm = () => {
  const [video, setVideo] = useState({ file: null, preview: null });
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [disableInput, setDisableInput] = useState(false);

  const videoRef = useRef();
  const { createOnDemandCourse, isCreating } = useCreateOnDemandCourse();

  const handleCreateNewSection = () => {
    section = Number(section) + 1;
    localStorage.setItem("demandSectionNumber", +section);
    toast.success(`section ${section} is created`);
    setDisabled(true);
    setDisableInput(false);
    form.setValue("title", "");
    form.setValue("overview", "");
  };

  const form = useForm({
    resolver: zodResolver(onDemandSessionSchema),
    defaultValues: {
      title: "",
      video_title: "",
      overview: "",
      video_from_url: "",
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

    if (!video.file && form.watch("video_from_url").length < 1)
      return toast.error("Please insert a video or video url");

    let recorded;

    if (video.file) {
      recorded = {
        title,
        video_title,
        overview,
        section,
        video: video.file,
      };
    } else {
      recorded = {
        ...data,
        section,
      };
    }

    createOnDemandCourse(recorded, {
      onSuccess: ({ data }) => {
        form.reset();

        form.setValue("title", data.data.title);
        form.setValue("overview", data.data.overview);
        setDisableInput((prev) => !prev);

        setDisabled(false);
        setVideo((prev) => {
          return { ...prev, file: null, preview: null };
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateSection)}
        className="w-full"
      >
        <div>
          <FormInput
            name="title"
            type="text"
            id="title"
            label="Section Title"
            control={form.control}
            placeholder="Business Analysis Agile Project Management Software Testing "
            disabled={disableInput}
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
            disabled={disableInput}
          />
          <p className="mb-1 mt-2 text-right text-sm text-[#667185]">
            {form.watch("overview") ? `${form.watch("overview").length}` : 0}
            /450
          </p>
        </div>
        {
          <div>
            <FormInput
              name="video_title"
              type="text"
              id="video_title"
              label="Video Title"
              control={form.control}
              placeholder="Enter Video Title"
            />
            <p className="mb-1 mt-2 text-right text-sm text-[#667185]">
              {form.watch("video_title")
                ? `${form.watch("video_title").length}`
                : 0}
              /70
            </p>
          </div>
        }

        {
          <div className="space-y-2">
            <p className="text-sm font-medium capitalize text-[#101928]">
              upload video
            </p>
            <div
              className={cn(
                "flex min-h-52 w-full items-center justify-center rounded-lg border-2 border-dashed border-[#23314A]",
                form.watch("video_from_url").length >= 1 &&
                  "cursor-not-allowed opacity-45",
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
                id=""
                hidden
                ref={videoRef}
                onChange={handleVideoUpload}
                disabled={form.watch("video_from_url").length >= 1}
              />
            </div>
            {errorMessage && (
              <p className="text-primary-color-600">{errorMessage}</p>
            )}

            <p className="mb-1 mt-2 text-sm text-[#667185]">
              Max 200MB files are allowed
            </p>
          </div>
        }
        {
          <div className="mt-4 flex items-center gap-2">
            <div className="h-px w-full bg-[#E7E7E7]" />

            <span className="text-[#6D6D6D]">OR</span>
            <div className="h-px w-full bg-[#E7E7E7]" />
          </div>
        }

        {
          <div className="flex flex-col gap-y-4">
            <FormInput
              name="video_from_url"
              type="text"
              id="video_from_url"
              label="Video from URL"
              control={form.control}
              placeholder="Input file URL "
              disabled={video.file ? true : false}
            />
          </div>
        }

        <div>
          <div className="ml-auto mt-6 w-max">
            {
              <CommonButton
                variant="outline"
                type="button"
                disabled={disabled}
                className="disabled:cursor-not-allowed"
                onClick={handleCreateNewSection}
              >
                Create New Section
              </CommonButton>
            }
            <CommonButton
              className="ml-6 bg-primary-color-600"
              type="submit"
              disabled={isCreating}
            >
              Add Content
            </CommonButton>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateOndemandForm;
