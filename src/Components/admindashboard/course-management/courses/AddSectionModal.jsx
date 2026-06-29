import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { CommonButton } from "@/Components/ui/button";
import { useAddRecordedSessionEmpty } from "@/hooks/course-management/use-add-recorded-session-empty";

export function AddSectionModal({ children, courseId, cohortId }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const { mutate: addSection, isCreating } = useAddRecordedSessionEmpty(
    courseId,
    cohortId,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !overview) return;
    addSection(
      { data: { title, overview }, courseId, cohortId },
      {
        onSuccess: () => {
          setOpen(false);
          setTitle("");
          setOverview("");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[850px]">
        <DialogHeader>
          <DialogTitle>Add a new section</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6 py-6 px-4">
          <div className="grid gap-3">
            <label htmlFor="title" className="text-base font-medium">
              Section Title
            </label>
            <Input
              id="title"
              placeholder="e.g. Introduction to React"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="py-6 text-base"
              required
            />
          </div>
          <div className="grid gap-3">
            <label htmlFor="overview" className="text-base font-medium">
              Section Overview
            </label>
            <Textarea
              id="overview"
              placeholder="Brief description of this section"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              rows={6}
              className="text-base"
              required
            />
          </div>
          <DialogFooter>
            <CommonButton
              type="submit"
              className="bg-[#cc1747] text-white hover:bg-[#a6133a]"
              disabled={isCreating}
            >
              Add Section
            </CommonButton>
            <CommonButton
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </CommonButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
