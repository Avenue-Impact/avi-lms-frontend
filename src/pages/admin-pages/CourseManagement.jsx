import { useState } from "react";

import CreatedCourse from "./course-management/CreatedCourse";
import { useFetchAllAdminCourses } from "@/hooks/course-management/use-fetch-all-courses";
import NoCourses from "@/Components/admindashboard/course-management/courses/NoCourses";

const CourseManagement = () => {
  const { data } = useFetchAllAdminCourses(1, 10);

  if (data?.data?.data?.courses.length === 0) return <NoCourses />;
  return <CreatedCourse />;
};

export default CourseManagement;
