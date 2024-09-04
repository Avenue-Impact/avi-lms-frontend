import { useState } from "react";

import NoCourses from "@/Components/admindashboard/course-management/courses/NoCourses";
import CreatedCourse from "./course-management/CreatedCourse";

const CourseManagement = () => {
  const [course, setCourses] = useState(null);
  if (!course) return <NoCourses />;
  return <CreatedCourse />;
};

export default CourseManagement;
