import { useStreamVideo } from "@/hooks/course-management/on-demand-section/use-stream-ondemand-video";
import { DocumentContext } from "@/pages/dashboard/ShareDocument";
import { Loader2 } from "lucide-react";
import {
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaMuteButton,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import { useContext, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useParams, useSearchParams } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import DashboardSliderNav, { MobileSlideNav } from "./DashboardSliderNav";
import { DesktopContent, MobileContent } from "./MobileContent";
function CourseVideoSection({ data }) {
  const { sectionDetails, videoId } = useContext(DocumentContext);

  return (
    <section>
      <div className="overflow-hidden rounded-[10px] lg:h-[400px] lg:w-[700px]">
        <PreviewVideo
          videoId={videoId}
          section={sectionDetails.section}
          cohortId={data?.data?.data?.cohort_id}
        />
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

  const [currentRange, setCurrentRange] = useState("bytes=0-1048575");
  const [waiting, setWaiting] = useState(false);

  const { data, isLoading, error } = useStreamVideo(
    courseId,
    section,
    videoId,
    currentRange,
    cohortId,
  );

  console.log({ data, isLoading, error, from: "videos" });

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

  return (
    <div className="relative">
      {waiting && (
        <div className="absolute left-0 top-0 z-40 flex h-full w-full items-center justify-center">
          <span>
            <Loader2 className="animate-spin text-primary-color-600" />
          </span>
        </div>
      )}
      <MediaController
        style={{
          width: "100%",
          aspectRatio: "16/9",
        }}
      >
        <ReactPlayer
          slot="media"
          src={data.data.data.videoUrl}
          controls={false}
          onSeeking={() => {
            setWaiting(true);
          }}
          onWaiting={() => {
            setWaiting(true);
          }}
          onSeeked={() => {
            setWaiting(false);
          }}
          onPlaying={() => {
            setWaiting(false);
          }}
          style={{
            width: "100%",
            height: "100%",
            "--controls": "none",
          }}
        ></ReactPlayer>
        <MediaControlBar className="z-50">
          <MediaPlayButton />
          <MediaSeekBackwardButton seekOffset={10} />
          <MediaSeekForwardButton seekOffset={10} />
          <MediaTimeRange />
          <MediaTimeDisplay showDuration />
          <MediaMuteButton />
          <MediaVolumeRange />
          <MediaPlaybackRateButton />
          <MediaFullscreenButton />
        </MediaControlBar>
      </MediaController>
    </div>
  );
};

export default CourseVideoSection;
