// DashSelect.jsx

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { usePreviewCourses } from "@/hooks/students/use-fetch-all-courses";
import { useParams } from "react-router-dom";

export function PreviewVideoSelect() {
  let { courseId } = useParams();
  const { previewCourse } = usePreviewCourses(courseId);
  return (
    <Select className="p-0">
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Cohort" />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        {previewCourse?.data?.data.course.cohorts.map((cohortlist, index) => (
          <SelectGroup key={index.id}>
            <SelectItem value={cohortlist.id}>{cohortlist.cohort}</SelectItem>
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="All courses" />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectGroup>
          <SelectLabel>Select Course</SelectLabel>
          <SelectItem value="ac">All courses</SelectItem>
          <SelectItem value="cc">Completed courses</SelectItem>
          <SelectItem value="ipc">In progress courses</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectScrollable;
