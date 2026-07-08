import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { CommonButton } from "@/Components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useFetchAllAdminCourses } from "@/hooks/course-management/use-fetch-all-courses";
import { X } from "lucide-react";

const schema = z.object({
  title: z.string().min(1, { message: "Video title is required" }),
  video_url: z
    .string()
    .url({ message: "A valid S3 URL is required" })
    .or(z.literal("")),
  extension: z.string().optional(),
  issue_date: z.date().optional(),
});

export default function VideoForm({
  open,
  onOpenChange,
  isEdit,
  initialData,
  onSubmit,
  isPending,
}) {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const { data: coursesData } = useFetchAllAdminCourses(1, 100, true);

  const suggestedTags =
    coursesData?.data?.data?.courses?.map((c) => c.title) || [];
  // console.log(coursesData?.data);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      video_url: "",
      extension: "",
      issue_date: new Date(),
    },
  });

  useEffect(() => {
    if (open) {
      if (initialData && isEdit) {
        reset({
          title: initialData.title || initialData.videoTitle || "",
          video_url: initialData.video_url || initialData.s3Url || "",
          extension: initialData.extension || initialData.fileExtension || "",
          issue_date: initialData.issue_date
            ? new Date(initialData.issue_date)
            : new Date(),
        });
        setTags(initialData.tags || []);
      } else {
        reset({
          title: "",
          video_url: "",
          extension: "",
          issue_date: new Date(),
        });
        setTags([]);
      }
      setTagInput("");
    }
  }, [open, initialData, isEdit, reset]);

  const onFormSubmit = (data) => {
    onSubmit({ ...data, tags });
  };

  const handleAddTag = (tag) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
    }
    setTagInput("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[840px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Rename Video" : "New Video"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex flex-col gap-4 py-4"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Video name</label>
            <Input
              {...register("title")}
              placeholder="Introduction to Project Consulting Recordings"
            />
            {errors.title && (
              <span className="text-xs text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Course (Optional)</label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type a course name and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag(tagInput);
                    }
                  }}
                />
                <CommonButton
                  type="button"
                  onClick={() => handleAddTag(tagInput)}
                >
                  Add
                </CommonButton>
              </div>

              {/* Suggested Tags based on Course Titles */}
              <div className="mt-1 flex items-center gap-2">
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => {
                    if (e.target.value) handleAddTag(e.target.value);
                    e.target.value = "";
                  }}
                >
                  <option value="">
                    Select a course title...
                  </option>
                  {suggestedTags.map((st, i) => (
                    <option key={i} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tag Pills */}
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <div
                    key={t}
                    className="bg-primary-color-50 border-primary-color-200 flex items-center gap-1 rounded-full border px-3 py-1 text-sm text-primary-color-600"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => setTags(tags.filter((x) => x !== t))}
                      className="text-primary-color-600 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!isEdit && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">S3 URL</label>
              <Input {...register("video_url")} placeholder="https://..." />
              {errors.video_url && (
                <span className="text-xs text-red-500">
                  {errors.video_url.message}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Issue Date</label>
            <Controller
              control={control}
              name="issue_date"
              render={({ field }) => (
                <DatePicker
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
            {errors.issue_date && (
              <span className="text-xs text-red-500">
                {errors.issue_date.message}
              </span>
            )}
          </div>

          {!isEdit && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Extension</label>
              <select
                {...register("extension")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select Extension (Optional)</option>
                <option value="mp4">mp4</option>
                <option value="avi">avi</option>
                <option value="mov">mov</option>
                <option value="mkv">mkv</option>
              </select>
            </div>
          )}

          <div className="mt-4 flex justify-between gap-3">
            <CommonButton
              type="submit"
              disabled={isPending}
              className="hover:bg-primary-color-700 w-full bg-primary-color-600 text-white"
            >
              {isPending ? "Saving..." : isEdit ? "Rename" : "Confirm"}
            </CommonButton>
            <CommonButton
              type="button"
              variant="outline"
              className="hover:bg-primary-color-50 w-full border-primary-color-600 text-primary-color-600"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </CommonButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
