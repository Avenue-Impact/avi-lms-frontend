import CourseInfo from "@/Components/admindashboard/course-management/publish-page/CourseInfo";
import CourseType from "@/Components/admindashboard/course-management/publish-page/CourseType";
import PublishCourseSection from "@/Components/admindashboard/course-management/publish-page/PublishCourseSection";
import { CommonButton } from "@/Components/ui/button";

function PublishPage() {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">Publish</h2>
      <div className="space-y-14">
        <CourseInfo />
        <CourseType />
        <PublishCourseSection />
      </div>
      <CommonButton className="ml-auto mt-14 block w-full max-w-[182px] bg-primary-color-600">
        Publish
      </CommonButton>
    </div>
  );
}

export default PublishPage;
