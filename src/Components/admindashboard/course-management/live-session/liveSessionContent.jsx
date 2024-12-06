import { useGetSingleCohort } from "@/hooks/course-management/use-get-singleCohorts";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";

const LiveSessionContent = () => {
  const params = useParams();
  const [queryString] = useSearchParams();

  const courseId = params.courseId ?? localStorage.getItem("courseId");
  const cohortId =
    queryString.get("cohortId") ?? localStorage.getItem("cohortId");

  const {
    data: cohortData,
    isLoading,
    isError,
  } = useGetSingleCohort(courseId, cohortId);
  if (isLoading) return <p>Loading....</p>;

  if (isError) return <p>something went wrong!!</p>;

  return (
    <div className="col-span-4">
      <div className="text-16px font-500 text-[#667185]">
        <div>
          <p>Section 1</p>
        </div>
        <p className="pt-4 capitalize">
          {cohortData.data.data.live_session.title}
        </p>
        <p className="py-4 capitalize">
          {cohortData.data.data.live_session.subtitle}
        </p>
      </div>

      <div>
        <button
          className={`relative w-full rounded px-4 py-2 ${
            cohortData.data.data.live_session.lecture_link
              ? "lg:bg-primary-color-600 lg:text-white lg:hover:bg-[#727988] lg:hover:text-[#313335]"
              : "pointer-events-none cursor-not-allowed bg-gray-300 text-gray-500"
          }`}
          disabled={!cohortData.data.data.live_session.lecture_link}
        >
          <span className="block w-[200px] truncate">
            {cohortData.data.data.live_session.lecture_link ||
              "Link not available"}
          </span>

          <span
            className={`absolute right-2 top-2 ${
              !navigator.clipboard ||
              !cohortData.data.data.live_session.lecture_link
                ? "pointer-events-none cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={() =>
              !navigator.clipboard ||
              !cohortData.data.data.live_session.lecture_link
                ? toast.error("Clipboard access not available.")
                : (navigator.clipboard.writeText(
                    cohortData.data.data.live_session.lecture_link,
                  ),
                  toast.success("Copied"))
            }
          >
            <Copy />
          </span>
        </button>
      </div>
    </div>
  );
};

export default LiveSessionContent;
