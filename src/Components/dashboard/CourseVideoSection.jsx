import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import { Loader2, FileText, Download } from "lucide-react";
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
import { useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import Assignment from "../../pages/dashboard/Assignment";

function CourseVideoSection({ data }) {
  const { sectionDetails, videoUrl } = useViewCourseSections();
  const [activeTab, setActiveTab] = useState("assignment");

  return (
    <section className="flex h-full flex-col">
      <div className="mb-6 text-center md:text-left">
        <p className="mb-2 text-lg text-gray-500">
          Section {sectionDetails.section} {sectionDetails.topic}
        </p>
        <h1 className="text-2xl font-bold leading-tight text-[#111827] md:text-3xl lg:text-4xl">
          {sectionDetails.videoTitle ||
            "21 Jul 2025 Introduction to Business Analysis (Taster Session Recording Plus Success Stories)"}
        </h1>
      </div>
      <div className="mb-8 w-full max-w-[1020px] overflow-hidden rounded-[10px]">
        <PreviewVideo
          videoUrl={videoUrl}
          section={sectionDetails.section}
          cohortId={data?.data?.data?.cohort_id}
        />
      </div>
    </section>
  );
}

const PreviewVideo = ({ videoUrl }) => {
  const [waiting, setWaiting] = useState(false);

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
          src={videoUrl}
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
