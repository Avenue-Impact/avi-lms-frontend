import CourseManagementProvider from "@/providers/CourseManagementProvider";
import CourseCreationPage from "@/pages/admin-pages/course-management/CourseCreationPage";

const CourseCreation = () => {
  return (
    <CourseManagementProvider>
      <CourseCreationPage />
    </CourseManagementProvider>
  );
};

export default CourseCreation;
