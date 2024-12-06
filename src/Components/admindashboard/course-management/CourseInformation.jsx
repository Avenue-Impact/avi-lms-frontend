import { useParams } from "react-router-dom";
import PreviewCourseVideo from "../../../assets/video/aca3d49307cab662ec1e91becdd52cb4-720p-preview.mp4";
import CourseInfo from "./publish-page/CourseInfo";
import { useFetchVideo } from "@/hooks/course-management/use-fetch-taster-video";
import CourseType from "./publish-page/CourseType";

function CourseInformation() {
  const { courseId } = useParams();

  // const { data, isLoading } = useFetchVideo(courseId);
  // console.log({ data, isLoading });

  return (
    <section className="space-y-10">
      <div className="bg-[#23314A] p-7">
        <video
          src={PreviewCourseVideo}
          controls
          className="h-auto max-h-[551px] w-full max-w-[1065.27px] rounded-xl"
        ></video>
      </div>

      <CourseInfo editButton={true} courseId={courseId} />
      <CourseType editButton={true} courseId={courseId} />
    </section>
  );
}

export default CourseInformation;
