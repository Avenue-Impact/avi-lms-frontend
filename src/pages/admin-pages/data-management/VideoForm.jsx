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
import { useEffect } from "react";

const schema = z.object({
  videoTitle: z.string().min(1, { message: "Video title is required" }),
  s3Url: z
    .string()
    .url({ message: "A valid S3 URL is required" })
    .or(z.literal("")),
  fileExtension: z.string().optional(),
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      videoTitle: "",
      s3Url: "",
      fileExtension: "",
      issue_date: new Date(),
    },
  });

  useEffect(() => {
    if (open) {
      if (initialData && isEdit) {
        reset({
          videoTitle: initialData.videoTitle || initialData.title || "",
          s3Url: initialData.s3Url || "https://example.com/s3.mp4", // placeholder to pass validation if missing since we don't edit it
          fileExtension: initialData.fileExtension || "",
          issue_date: initialData.issue_date
            ? new Date(initialData.issue_date)
            : new Date(),
        });
      } else {
        reset({
          videoTitle: "",
          s3Url: "",
          fileExtension: "",
          issue_date: new Date(),
        });
      }
    }
  }, [open, initialData, isEdit, reset]);

  const onFormSubmit = (data) => {
    // If it's edit, we don't actually send s3Url if we don't want to change it.
    // The backend route for edit is PATCH /videoTitle or issue_date.
    onSubmit(data);
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
              {...register("videoTitle")}
              placeholder="Introduction to Project Consulting Recordings"
            />
            {errors.videoTitle && (
              <span className="text-xs text-red-500">
                {errors.videoTitle.message}
              </span>
            )}
          </div>

          {!isEdit && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">S3 URL</label>
              <Input {...register("s3Url")} placeholder="https://..." />
              {errors.s3Url && (
                <span className="text-xs text-red-500">
                  {errors.s3Url.message}
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
                {...register("fileExtension")}
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
