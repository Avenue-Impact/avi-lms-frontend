import AdminCoursesSection from "@/Components/admindashboard/course-management/courses/AdminCousesSection";
import liveSession from "../../../assets/images/dashboard/live-session.png";
import OnDemandAdminSection from "@/Components/admindashboard/course-management/on-demand-section/OnDemandAdminSection";
import { useFetchondemandCourse } from "@/hooks/course-management/on-demand-section/use-fetch-ondemand-course";
import { useParams, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useRef, useState } from "react";
import EditOndemandCourseSectionForm from "@/Components/admindashboard/course-management/on-demand-section/EditOndemandCourseSectionForm";
import { useStreamVideo } from "@/hooks/course-management/on-demand-section/use-stream-ondemand-video";
import { Skeleton } from "@/Components/ui/skeleton";
import ReactPlayer from "react-player";
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
import { Loader2 } from "lucide-react";
import { useStreamRecordedVideo } from "@/hooks/course-management/recorded-section/use-stream-recorded-video";
import { useStreamRecordedVideo2 } from "@/hooks/course-management/recorded-section/use-stream-recorded-video2";

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
                  <PreviewVideoCourse
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

const PreviewVideo = ({ videoId, section }) => {
  const { courseId } = useParams();
  const { data, isLoading, error } = useStreamVideo(courseId, section, videoId);

  if (isLoading)
    return (
      <div className="max-h-[690px] w-full text-white">
        <Skeleton className={"h-[400px] w-full"} />
      </div>
    );

  if (error) return <p className="text-primary-color-500"> video not found </p>;

  const blob = data && URL.createObjectURL(data?.data);

  console.log({ data, blob });

  return (
    <video
      src={blob}
      controls
      className="max-h-[699px] w-full object-cover shadow-lg lg:rounded-3xl"
    ></video>
  );
};

const PreviewVideoCourse = ({ videoId, section }) => {
  console.log("section", section);
  const { courseId } = useParams();
  const [waiting, setWaiting] = useState(false);
  const { data, isLoading, error } = useStreamRecordedVideo2(
    courseId,
    section,
    videoId,
  );

  if (isLoading)
    return (
      <div className="max-h-[690px] w-full text-white">
        <Skeleton className={"h-[400px] w-full"} />
      </div>
    );

  if (error) return <p className="text-primary-color-500"> video not found </p>;

  console.log(data?.data?.data?.videoUrl);

  return (
    <>
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
            src={data?.data?.data?.videoUrl}
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
    </>
  );
};
