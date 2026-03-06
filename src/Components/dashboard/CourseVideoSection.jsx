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
        <p className="mb-2 text-sm text-gray-500">
          Business Analyst Recordings
        </p>
        <h1 className="text-2xl font-bold leading-tight text-[#111827] md:text-3xl lg:text-4xl">
          {sectionDetails.topic ||
            "21 Jul 2025 Introduction to Business Analysis (Taster Session Recording Plus Success Stories)"}
        </h1>
      </div>
      <div className="mb-8 w-full max-w-[800px] overflow-hidden rounded-[10px]">
        <PreviewVideo
          videoUrl={videoUrl}
          section={sectionDetails.section}
          cohortId={data?.data?.data?.cohort_id}
        />
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 flex border-b border-gray-200">
        {["Assignment", "Overview"].map((tab) => {
          const tabKey = tab.toLowerCase().replace(" ", "_");
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tabKey)}
              className={cn(
                "relative mr-8 px-1 pb-3 text-sm font-medium transition-colors",
                activeTab === tabKey
                  ? "text-primary-color-600"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              {tab}
              {activeTab === tabKey && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-t-full bg-primary-color-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tabs Content */}
      <div className="min-h-[200px]">
        {/* {activeTab === "shared_documents" && (
          <div className="">
            <h3 className="mb-4 text-lg font-semibold">Shared Documents</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="flex flex-col gap-2">
                  <div className="group relative flex h-40 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm transition-shadow hover:shadow-md">
                   
                    <div
                      className={`flex h-20 w-16 items-center justify-center rounded shadow-sm ${item % 2 === 0 ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"}`}
                    >
                      <FileText size={32} />
                      {item % 2 === 0 ? (
                        <span className="absolute mt-1 text-[10px] font-bold">
                          DOCX
                        </span>
                      ) : (
                        <span className="absolute mt-1 text-[10px] font-bold">
                          PDF
                        </span>
                      )}
                    </div>

                    <a
                      href="#"
                      className="absolute bottom-2 right-2 rounded-full bg-white p-2 text-gray-600 shadow-sm hover:bg-gray-50"
                    >
                      <Download size={16} />
                    </a>
                  </div>
                  <p className="line-clamp-2 text-xs text-gray-600">
                    Materials for Project Consultant Training Programme
                  </p>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {activeTab === "assignment" && (
          <div className="py-6">
            <Assignment
              data={data?.data?.data}
              assignmentDetails={sectionDetails.assignment}
            />
          </div>
        )}

        {activeTab === "overview" && (
          <div className="space-y-4 text-gray-600">
            <p className="leading-relaxed">
              {data?.data?.data?.overview ||
                "In this section, we dive deep into the core concepts of Project Consulting. You will learn about the roles and responsibilities, key skills required for success, and the latest industry trends. This foundational knowledge is crucial for your journey as a successful Project Consultant."}
            </p>
          </div>
        )}
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
