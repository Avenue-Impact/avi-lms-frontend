import { useParams, useSearchParams } from "react-router-dom";
import AdminCoursesSection from "./AdminCousesSection";
import { useGetSingleCohort } from "@/hooks/course-management/use-get-singleCohorts";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format-date";
import { useState, useEffect } from "react";
import { useToggleCohortLive } from "@/hooks/course-management/use-toggle-cohort-live";
import { useToggleCohortMentorship } from "@/hooks/course-management/use-toggle-cohort-mentorship";
import { Loader2, AlertTriangle, RotateCcw, Users } from "lucide-react";
import liveSession from "../../../../assets/images/dashboard/live-session.png";
import EditLiveSessionForm from "../live-session/EditLiveSession";
import EditLiveSession from "../live-session/EditLiveSession";
import { Skeleton } from "@/Components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { regenerateMeeting } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import ReactPlayer from "react-player";
import { useFetchAdmin } from "@/hooks/account-management/use-fetch-admin";
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
  const [meeting, setMeeting] = useState(false);

  const [queryString] = useSearchParams();
  const { courseId } = useParams();
  const navigate = useNavigate();

  const cohortId = queryString.get("cohortId");
  const queryClient = useQueryClient();
  const { toggleLive, isToggling } = useToggleCohortLive(courseId, cohortId);
  const { toggleMentorship, isTogglingMentorship } = useToggleCohortMentorship(courseId, cohortId);

  // 1. Clean Destructuring
  const {
    title = "",
    subtitle = "",
    class_date = "",
  } = data?.data?.session ?? {};
  const {instructor = null, is_live = false, mentorship_enabled = false} = data?.data?.data ?? {};

  // 2. Derive Instructor Name
  const instructorName = instructor
    ? `${instructor.first_name || ""} ${instructor.last_name || ""}`.trim()
    : "No instructor assigned";

  // 3. Navigation Helper
  const handleJoin = () => {
    const params = new URLSearchParams({
      title: queryString.get("title") || "",
      cohort: queryString.get("cohort") || "",
      cohortId: cohortId || "",
    });
    navigate(`/meeting/${courseId}?${params.toString()}`);
  };

  // 4. Generate new meeting link
  const [isGenerating, setIsGenerating] = useState(false);
  const handleGenerateLink = async () => {
    setIsGenerating(true);
    try {
      await regenerateMeeting({ courseId, cohortId });
      toast.success("Meeting link regenerated successfully");
      queryClient.invalidateQueries(["get-single-cohort", courseId, cohortId]);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to regenerate meeting link",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {meeting ? (
        <StartMeeting setMeeting={setMeeting} />
      ) : (
        <div className="duration-500 animate-in fade-in">
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
              {title}
            </h2>
            <p className="my-5 text-lg font-[275] leading-[38.4px] text-tertiary-color-700 md:text-[2rem] lg:my-8">
              {subtitle}
            </p>

            <div className="mb-4 space-y-2">
              <p className="text-sm font-light text-tertiary-color-900 lg:text-xl">
                <strong>Class day:</strong> {data?.data?.data?.class_days}
              </p>
              <p className="text-sm font-light text-tertiary-color-900 lg:text-xl">
                <strong>Meeting date:</strong> {class_date ? `${formatDate(class_date)} (Local Time)` : 'N/A'}
              </p>
              <span className="text-xs text-gray-500 italic mt-1 block">
                * Note: Cohort schedules are anchored to UK Time, but times shown above are automatically converted to your local timezone.
              </span>
              <p className="text-base font-light text-tertiary-color-900 lg:text-xl">
                <strong>Assigned Instructor:</strong>{" "}
                {instructorName || "No instructor assigned"}
              </p>
            </div>

            <div className="flex items-center justify-start gap-5">
              <CommonButton onClick={handleJoin}>Join Meeting</CommonButton>
              <button
                onClick={handleGenerateLink}
                disabled={isGenerating}
                className="hover:text-primary-color-800 flex items-center gap-2 text-sm font-medium text-primary-color-600 transition-colors disabled:opacity-50"
                title="Generate new meeting link"
              >
                <RotateCcw
                  className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
                />
                Generate new link
              </button>
            </div>

            {/* Toggle Live Session Card */}
            <div className="mt-10 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="max-w-[70%]">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-yellow-800">
                    <AlertTriangle className="h-5 w-5" />
                    Toggle Live Session Status
                  </h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    If toggled off, automatic Zoom meeting creation and
                    reminders will be ended for this cohort.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      is_live ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {is_live ? "LIVE ON" : "LIVE OFF"}
                  </span>
                  <button
                    onClick={() => toggleLive(!is_live)}
                    disabled={isToggling}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                      is_live ? "bg-primary-color-600" : "bg-gray-300",
                      isToggling && "cursor-not-allowed opacity-50",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200",
                        is_live ? "translate-x-6" : "translate-x-1",
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Toggle Mentorship Access Card */}
            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="max-w-[70%]">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-800">
                    <Users className="h-5 w-5" />
                    Mentorship Access
                  </h3>
                  <p className="mt-1 text-sm text-blue-700">
                    Enable or disable mentorship access for students enrolled in this cohort.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      mentorship_enabled ? "text-green-600" : "text-gray-600",
                    )}
                  >
                    {mentorship_enabled ? "ENABLED" : "DISABLED"}
                  </span>
                  <button
                    onClick={() => toggleMentorship(!mentorship_enabled)}
                    disabled={isTogglingMentorship}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                      mentorship_enabled ? "bg-primary-color-600" : "bg-gray-300",
                      isTogglingMentorship && "cursor-not-allowed opacity-50",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200",
                        mentorship_enabled ? "translate-x-6" : "translate-x-1",
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
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
