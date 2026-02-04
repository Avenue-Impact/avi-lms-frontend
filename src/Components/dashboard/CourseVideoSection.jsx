import { useStreamVideo } from "@/hooks/course-management/on-demand-section/use-stream-ondemand-video";
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
  const { sectionDetails, videoId } = useViewCourseSections();
  const [activeTab, setActiveTab] = useState("shared_documents");

  return (
    <section>
      <div className="overflow-hidden rounded-[10px] lg:h-[400px] lg:w-[700px]">
        <PreviewVideo
          videoId={videoId}
          section={sectionDetails.section}
          cohortId={data?.data?.data?.cohort_id}
        />
      </div>
      <h1 className="*:block *:capitalize my-6 text-xl lg:text-2xl font-semibold leading-[28px] text-black">
        <span>Section {sectionDetails.section}</span>
        <span> {sectionDetails.topic} </span>
      </h1>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        {["Shared documents", "Assignment", "Overview"].map((tab) => {
          const tabKey = tab.toLowerCase().replace(" ", "_");
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tabKey)}
              className={cn(
                "pb-3 px-1 mr-8 text-sm font-medium transition-colors relative",
                activeTab === tabKey
                  ? "text-primary-color-600"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab}
              {activeTab === tabKey && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-color-600 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tabs Content */}
      <div className="min-h-[200px]">
        {activeTab === "shared_documents" && (
          <div className="">
            <h3 className="text-lg font-semibold mb-4">Shared Documents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Mock Documents - In real app, map from data */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="flex flex-col gap-2">
                   {/* Document Card */}
                   <div className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-40 bg-gray-50 flex items-center justify-center border border-gray-100">
                      {/* Document Icon Placeholder */}
                      <div className={`w-16 h-20 rounded shadow-sm flex items-center justify-center ${item % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                         <FileText size={32} />
                         {item % 2 === 0 ? <span className="absolute font-bold text-[10px] mt-1">DOCX</span> : <span className="absolute font-bold text-[10px] mt-1">PDF</span>}
                      </div>

                      {/* Download Button Overlay */}
                      <a href="#" className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-600">
                        <Download size={16} />
                      </a>
                   </div>
                   <p className="text-xs text-gray-600 line-clamp-2">Materials for Project Consultant Training Programme</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "assignment" && (
          <div className="py-6">
            <Assignment
              data={data?.data?.data}
              assignmentDetails={sectionDetails.assignment}
            />
          </div>
        )}

        {activeTab === "overview" && (
          <div className="text-gray-600 space-y-4">
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

const PreviewVideo = ({ videoId, section, cohortId }) => {
  const { courseId } = useParams();

  const [currentRange, setCurrentRange] = useState("bytes=0-1048575"); // Initial range
  const [waiting, setWaiting] = useState(false);

  const { data, isLoading, error } = useStreamVideo(
    courseId,
    section,
    videoId,
    currentRange,
    cohortId,
  );

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
  );
};

export default CourseVideoSection;
