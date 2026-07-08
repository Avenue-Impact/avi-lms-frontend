import OnDemandRecordedSection from "@/Components/admindashboard/course-management/on-demand-section/OnDemandRecordedSection";
import { useFetchondemandCourse } from "@/hooks/course-management/on-demand-section/use-fetch-ondemand-course";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react";

import VideoPlayer from "@/Components/VideoPlayer";

function OndemandSection() {
  const [videoUrl, setVideoUrl] = useState();
  const { courseId } = useParams();
  const [sectionDetails, setSectionDetails] = useState({
    section: "",
    topic: "",
    videoTitle: "",
  });

  const { data, isLoading, error } = useFetchondemandCourse(courseId);

  useEffect(() => {
    const sections = data?.data?.data || [];
    if (sections.length > 0 && !sectionDetails.topic) {
      const firstSection = sections[0];
      const firstLesson = firstSection?.lessons?.[0];
      if (firstSection && firstLesson) {
        setSectionDetails({
          section: firstSection.section,
          topic: firstSection.title,
          videoTitle: firstLesson.video_title,
        });
        setVideoUrl(firstLesson.video_url?.link || firstLesson.video_url);
      }
    }
  }, [data, sectionDetails.topic]);

  if (isLoading)
    return (
      <div className="mx-auto mt-6 w-min">
        <ClipLoader color=" #cc1747 " />
      </div>
    );

  if (error)
    return <p className="p-4 text-red-500">{error?.response?.data?.message ?? "Something went wrong"}</p>;

  if (!data) return <p className="p-4 text-slate-400">No data yet!!</p>;

  return (
    <div className="grid grid-cols-[3fr_1.7fr] gap-6">
      {sectionDetails.topic ? (
        <main>
          <div>
            <div>
              <h1 className="mt-10 text-2xl font-semibold text-tertiary-color-900">
                Section {sectionDetails.section}
              </h1>
              <p className="mb-7 p-4 text-sm font-medium capitalize text-[#344054]">
                {sectionDetails.topic}
              </p>
            </div>
            <div className="w-full max-w-[600px] overflow-hidden rounded-lg shadow-sm border border-slate-100">
              <PreviewVideoCourse
                section={sectionDetails.section}
                videoUrl={videoUrl}
              />
              <h2 className="mt-6 text-lg font-semibold capitalize px-2 pb-2 text-gray-800">
                {sectionDetails.videoTitle}
              </h2>
            </div>
          </div>
        </main>
      ) : (
        <div className="flex items-center justify-center min-h-[400px] bg-slate-50 rounded-lg p-10 text-slate-400 border border-dashed border-slate-200">
          <p>Please select a video to preview</p>
        </div>
      )}
      <aside>
        <OnDemandRecordedSection
          courseId={courseId}
          setSectionDetails={setSectionDetails}
          setVideoUrl={setVideoUrl}
        />
      </aside>
    </div>
  );
}

export default OndemandSection;

const PreviewVideoCourse = ({ videoUrl }) => {
  if (!videoUrl)
    return (
      <p className="text-primary-color-500 p-4 text-sm">
        Please select a video to preview
      </p>
    );

  return (
    <div className="relative">
      <VideoPlayer videoUrl={videoUrl} />
    </div>
  );
};
