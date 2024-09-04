import PreviewCourseVideo from "../../../assets/video/aca3d49307cab662ec1e91becdd52cb4-720p-preview.mp4";
import CourseInfo from "./publish-page/CourseInfo";
import CourseType from "./publish-page/CourseType";

function CourseInformation() {
  return (
    <section className="space-y-10">
      <div className="bg-[#23314A] p-7">
        <video
          src={PreviewCourseVideo}
          controls
          className="h-auto max-h-[551px] w-full max-w-[1065.27px] rounded-xl"
        ></video>
      </div>

      <CourseInfo editButton={true} />
      <CourseType editButton={true} />
    </section>
  );
}

export default CourseInformation;
