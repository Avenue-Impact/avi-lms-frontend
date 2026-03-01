import { useNavigate, useParams } from "react-router-dom";
import PreviewCourseVideo from "../../../assets/video/aca3d49307cab662ec1e91becdd52cb4-720p-preview.mp4";
import CourseInfo from "./publish-page/CourseInfo";
import { useFetchCourseInfo } from "@/hooks/course-management/use-fetch-course-information";
import CourseType from "./publish-page/CourseType";
import { Skeleton } from "@/Components/ui/skeleton";
import { CommonButton } from "@/Components/ui/button";
import { HiArrowLeft } from "react-icons/hi2";
import { useUnpublishCourse } from "@/hooks/course-management/use-unpublish-course";
import { useDeleteCourse } from "@/hooks/course-management/use-delete-course";

function CourseInformation() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useFetchCourseInfo(courseId);
  const { unPublish, isUnPublishing } = useUnpublishCourse();
  const { deleted, isDeleting } = useDeleteCourse();

  //  if (isLoading) {
  //    return (
  //      <div className="max-h-[690px] w-full text-white">
  //        <Skeleton className="h-[690px] w-full" />
  //      </div>
  //    );
  //  }

  const previewUrl = data?.data?.data?.course?.preview_video?.url;
  const courseTitle = data?.data?.data?.course?.title;

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this course?")) {
        deleted({ courseId });
        navigate("/admin/course/management"); // Redirect after delete?
    }
  };

  const handleUnpublish = () => {
    if (confirm("Are you sure you want to unpublish this course?")) {
        unPublish({ courseId });
    }
  };

  return (
    <section className="space-y-6">

      <div className="bg-[#23314A] p-7 rounded-xl overflow-hidden relative group">
        <video
          src={previewUrl}
          controls
          autoPlay
          preload="auto"
          className="h-auto max-h-[551px] w-full mx-auto rounded-xl shadow-lg"
        ></video>
      </div>

      <CourseInfo editButton={true} courseId={courseId} />
      <CourseType editButton={true} courseId={courseId} />
    </section>
  );
}

export default CourseInformation;
