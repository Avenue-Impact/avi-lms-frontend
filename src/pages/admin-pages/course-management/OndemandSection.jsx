import AdminCoursesSection from "@/Components/admindashboard/course-management/courses/AdminCousesSection";
import liveSession from "../../../assets/images/dashboard/live-session.png";
import OnDemandAdminSection from "@/Components/admindashboard/course-management/on-demand-section/OnDemandAdminSection";
import { useFetchondemandCourse } from "@/hooks/course-management/on-demand-section/use-fetch-ondemand-course";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useEffect, useRef, useState } from "react";
import EditOndemandCourseSectionForm from "@/Components/admindashboard/course-management/on-demand-section/EditOndemandCourseSectionForm";
import { useStreamVideo } from "@/hooks/course-management/on-demand-section/use-stream-ondemand-video";
import { Skeleton } from "@/Components/ui/skeleton";

function OndemandSection() {
  const [edit, setEdit] = useState(false);
  const [videoId, setVideoId] = useState();
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
        <EditOndemandCourseSectionForm setEdit={setEdit} />
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
                  <PreviewVideo
                    section={sectionDetails.section}
                    videoId={videoId}
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
              setVideoId={setVideoId}
            />
          </aside>
        </div>
      )}
    </div>
  );
}

export default OndemandSection;

// const PreviewVideo = ({ videoId, section }) => {
//   const { courseId } = useParams();
//   const { data, isLoading, error } = useStreamVideo(courseId, section, videoId);

//   if (isLoading)
//     return (
//       <div className="max-h-[690px] w-full text-white">
//         <Skeleton className={"h-[400px] w-full"} />
//       </div>
//     );

//   if (error) return <p className="text-primary-color-500"> video not found </p>;

//   const blob = data && URL.createObjectURL(data?.data);

//   console.log({ data, blob });

//   return (
//     <video
//       src={blob}
//       controls
//       className="max-h-[699px] w-full object-cover shadow-lg lg:rounded-3xl"
//     ></video>
//   );
// };

const PreviewVideo = ({ videoId, section }) => {
  const { courseId } = useParams();
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [currentRange, setCurrentRange] = useState("bytes=0-1048575"); // Initial range
  const { data, isLoading, error, refetch } = useStreamVideo(
    courseId,
    section,
    videoId,
    currentRange,
  );

  // Generate and clean up Blob URL
  useEffect(() => {
    if (data?.data) {
      const blobUrl = URL.createObjectURL(data.data);
      setVideoUrl(blobUrl);

      return () => {
        URL.revokeObjectURL(blobUrl);
      };
    }
  }, [data]);

  // Update range dynamically as the video plays
  const handleRangeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const rangeStart = Math.floor(currentTime * 500000); // Estimate byte range based on time
      const rangeEnd = rangeStart + 1048575; // Fetch the next 1MB
      setCurrentRange(`bytes=${rangeStart}-${rangeEnd}`);
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="max-h-[690px] w-full text-white">
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-lg font-semibold text-primary-color-500">
          Unable to load video. Please check your connection or try again later.
        </p>
      </div>
    );
  }

  if (!videoUrl) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-lg font-semibold text-primary-color-500">
          Preparing video...
        </p>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      controls
      className="max-h-[699px] w-full object-cover shadow-lg lg:rounded-3xl"
      onTimeUpdate={handleRangeUpdate} // Trigger range update as video plays
    />
  );
};
