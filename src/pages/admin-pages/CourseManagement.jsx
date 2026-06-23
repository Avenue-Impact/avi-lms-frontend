import { useState, useEffect } from "react";

import CreatedCourse from "./course-management/CreatedCourse";
import { useFetchAllAdminCourses } from "@/hooks/course-management/use-fetch-all-courses";
import NoCourses from "@/Components/admindashboard/course-management/courses/NoCourses";

const CourseManagement = () => {
  const { data } = useFetchAllAdminCourses(1, 40);

  useEffect(() => {
    localStorage.removeItem("course-information");
    localStorage.removeItem("active");
    localStorage.removeItem("courseId");
    localStorage.removeItem("liveSessionForm");
    localStorage.removeItem("section");
    localStorage.removeItem("cohorts");
    localStorage.removeItem("cohortId");
    localStorage.removeItem("recordedSection");
  }, []);

  if (data?.data?.data?.courses.length === 0) return <NoCourses />;
  return <CreatedCourse />;
};

export default CourseManagement;
