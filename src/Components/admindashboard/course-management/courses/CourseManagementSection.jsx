import { useParams, useSearchParams } from "react-router-dom";
import AdminCoursesSection from "./AdminCousesSection";
import { useGetSingleCohort } from "@/hooks/course-management/use-get-singleCohorts";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format-date";
import { useState } from "react";
import liveSession from "../../../../assets/images/dashboard/live-session.png";
import EditLiveSessionForm from "../live-session/EditLiveSession";
import EditLiveSession from "../live-session/EditLiveSession";
import { Skeleton } from "@/Components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
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
import CommonButton from "@/Components/ui/button";
// import StartMeeting from "./StartMeeting";

const amOrPm = (timeString) => {
  const hour = timeString.split(":")[0];

  const amOrPm = hour >= 12 ? "PM" : "AM";

  return amOrPm;
};
function CourseManagementSection() {
  const [sectionDetails, setSectionDetails] = useState({
    section: "",
    topic: "",
    videoTitle: "",
  });
  const [videoUrl, setVideoUrl] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [queryString] = useSearchParams();

  const [showLive, setShowLive] = useState("live");

  const { courseId } = useParams();

  const cohortId = queryString.get("cohortId");

  const { data, isLoading, error } = useGetSingleCohort(courseId, cohortId);

  // console.log({ data, isLoading, error });
  // console.log(data.data.data.recorded_sessions);

  if (isLoading) return <p>loading...</p>;

  if (error)
    return <p>{error.response?.data?.message ?? "Something went wrong"}</p>;

  if (!data?.data?.data) return <p>No course cohort data found.</p>;

  return (
    <div>
      {isEdit ? (
        <EditLiveSession setIsEdit={setIsEdit} />
      ) : (
        <div className="mt-6 grid grid-cols-[3fr_1.7fr]">
          {showLive === "live" && <LiveContent data={data} />}
          {showLive === "contents" && (
            <VideoContents
              sectionDetails={sectionDetails}
              videoUrl={videoUrl}
            />
          )}
          {/* {showLive === "" && <>click to show content</>} */}

          <AdminCoursesSection
            data={data}
            setShowLive={setShowLive}
            setSectionDetails={setSectionDetails}
            setIsEdit={setIsEdit}
            setVideoUrl={setVideoUrl}
          />
        </div>
      )}
    </div>
  );
}

const LiveContent = ({ data }) => {
  console.log(data?.data?.sessions);
  const [meeting, setMeeting] = useState(false);
  const [queryString] = useSearchParams();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const cohortId = queryString.get("cohortId");

  const {
    title,
    live: isLive,
    password,
    start_time,
    subtitle,
  } = data?.data?.sessions[0] ?? {};
  return (
    <>
      {meeting ? (
        "<StartMeeting setMeeting={setMeeting} />"
      ) : (
        <div>
          <div className="border-b border-b-[#E4E7EC] pb-4">
            <p className="mb-10 font-poppins text-lg font-medium capitalize text-tertiary-color-900 lg:text-xl">
              Live Session
            </p>
            <p className="text-sm font-medium text-[#344054]">
              Join Live Session
            </p>
          </div>
          <section className="mt-7 px-5 md:mt-10 md:px-10 lg:mt-16">
            <h2 className="text-xl font-medium text-black md:text-2xl">
              {title ?? ""}
            </h2>
            <p className="my-5 text-lg font-[275] leading-[38.4px] text-tertiary-color-700 md:text-[2rem] lg:my-8">
              {subtitle ?? ""}
            </p>
            <div className="space-y-3">
              {/* <p className="text-sm font-light text-tertiary-color-900 lg:text-xl">
                Started from: {started_from && formatDate(started_from, false)}
              </p> */}
              <p className="text-sm font-light text-tertiary-color-900 lg:text-xl">
                Meeting date: {start_time} UTC
              </p>
              {/* <p className="text-sm font-light text-tertiary-color-900 lg:text-xl">
                Add to: iCal Expor, Google Calendar
              </p>
              <p className="text-sm font-light text-tertiary-color-900 lg:text-xl">
                Password: {password ?? ""}
              </p> */}
            </div>
            {/* <button
              className={cn(
                "mt-5 rounded-md px-4 py-2 text-sm md:text-base lg:mt-8",
                isLive
                  ? "bg-primary-color-600 text-white hover:bg-primary-color-600"
                  : "bg-tertiary-color-700 text-[#C7D7F4] hover:bg-[#C7D7F4] hover:text-tertiary-color-700",
              )}
            >
              {isLive ? "Join meeting" : "Meeting hasn’t started yet"}
            </button> */}
            <CommonButton
              onClick={() => {
                navigate(
                  `/meeting/${courseId}?title=${queryString.get("title")}&cohort=${queryString.get("cohort")}&cohortId=${cohortId}`,
                );
              }}
            >
              Join Meeting
            </CommonButton>
          </section>
        </div>
      )}
    </>
  );
};

const VideoContents = ({ sectionDetails, videoUrl }) => {
  return (
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
  );
};

const PreviewVideoCourse = ({ videoUrl, section }) => {
  const [waiting, setWaiting] = useState(false);

  if (!videoUrl)
    return (
      <p className="text-primary-color-500">
        {" "}
        Please select a video to preview{" "}
      </p>
    );

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
    </>
  );
};

export default CourseManagementSection;
