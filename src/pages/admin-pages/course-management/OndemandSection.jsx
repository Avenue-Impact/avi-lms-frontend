import AdminCoursesSection from "@/Components/admindashboard/course-management/courses/AdminCousesSection";
import liveSession from "../../../assets/images/dashboard/live-session.png";
import OnDemandAdminSection from "@/Components/admindashboard/course-management/on-demand-section/OnDemandAdminSection";
import { useFetchondemandCourse } from "@/hooks/course-management/on-demand-section/use-fetch-ondemand-course";
import { useParams, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useRef, useState } from "react";
import EditOndemandCourseSectionForm from "@/Components/admindashboard/course-management/on-demand-section/EditOndemandCourseSectionForm";

import { Skeleton } from "@/Components/ui/skeleton";
import VideoPlayer from "@/Components/VideoPlayer";

function OndemandSection() {
  const [edit, setEdit] = useState(false);
  const [editSectionData, setEditSectionData] = useState(null);
  const [videoUrl, setVideoUrl] = useState();
  const { courseId } = useParams();
  const [sectionDetails, setSectionDetails] = useState({
    section: "",
    topic: "",
    videoTitle: "",
  });

  const { data, isLoading, error } = useFetchondemandCourse(courseId);
  console.log(data);

  if (isLoading)
    return (
      <div className="mx-auto mt-6 w-min">
        <ClipLoader color=" #cc1747 " />
      </div>
    );

  if (error)
    return <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;

  if (!data) return <p>no data yet!!</p>;

  return (
    <div>
      {edit ? (
        <EditOndemandCourseSectionForm setEdit={setEdit} initialSection={editSectionData} />
      ) : (
        <div className="grid grid-cols-[3fr_1.7fr]">
          {sectionDetails.topic ? (
            <main>
              <div>
                <div>
                  <h1 className="mt-10 text-2xl font-medium text-tertiary-color-900">
                    Section {sectionDetails.section}
                  </h1>
                  <p className="mb-7 p-4 text-sm font-medium capitalize text-[#344054]">
                    {sectionDetails.topic}
                  </p>
                </div>
                <div className="w-full max-w-[600px] overflow-hidden rounded-lg">
                  <PreviewVideoCourse
                    section={sectionDetails.section}
                    videoUrl={videoUrl}
                  />
                  <p className="mt-6 capitalize">{sectionDetails.videoTitle}</p>
                </div>
              </div>
            </main>
          ) : (
            <p>select a section to watch a video</p>
          )}
          <aside>
            <OnDemandAdminSection
              data={data}
              setSectionDetails={setSectionDetails}
              setEdit={setEdit}
              setVideoUrl={setVideoUrl}
              setEditSectionData={setEditSectionData}
            />
          </aside>
        </div>
      )}
    </div>
  );
}

export default OndemandSection;

const PreviewVideoCourse = ({ videoUrl, section }) => {
  if (!videoUrl)
    return (
      <p className="text-primary-color-500">
        {" "}
        Please select a video to preview{" "}
      </p>
    );

  return (
    <div className="relative">
      <VideoPlayer videoUrl={videoUrl} />
    </div>
  );
};
