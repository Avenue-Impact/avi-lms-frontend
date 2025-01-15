import { useContext, useEffect, useRef, useState } from "react";
import DashboardSliderNav, { MobileSlideNav } from "./DashboardSliderNav";
import { DesktopContent, MobileContent } from "./MobileContent";
import liveSession from "../../assets/images/dashboard/live-session.png";
import { DocumentContext } from "@/pages/dashboard/ShareDocument";
import { Skeleton } from "../ui/skeleton";
import { useParams } from "react-router-dom";
import { useStreamVideo } from "@/hooks/course-management/on-demand-section/use-stream-ondemand-video";

function CourseVideoSection({ data }) {
  const { sectionDetails, videoId } = useContext(DocumentContext);
  return (
    <section>
      <div className="overflow-hidden rounded-[10px] lg:h-[400px] lg:w-[700px]">
        {/* <img
          src={liveSession}
          alt="live session"
          width={897}
          height={532}
          className="object-cover"
        /> */}
        {videoId}
        <PreviewVideo videoId={videoId} section={sectionDetails.section} />
      </div>
      <h1 className="my-6 text-2xl font-semibold leading-[28px] text-black *:block *:capitalize">
        <span>Section {sectionDetails.section}</span>
        <span> {sectionDetails.topic} </span>
      </h1>
      <div className="hidden lg:block">
        <DashboardSliderNav />
      </div>
      <div className="lg:hidden">
        <MobileSlideNav />
      </div>
      <div className="hidden lg:block">
        <DesktopContent data={data} />
      </div>
      <div className="lg:hidden">
        <MobileContent data={data} />
      </div>
    </section>
  );
}

const PreviewVideo = ({ videoId, section, cohortId }) => {
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

export default CourseVideoSection;
