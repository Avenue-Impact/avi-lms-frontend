import { formatDate } from "@/lib/format-date";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CommonButton } from "../ui/button";
import { MobileSlideNav } from "./DashboardSliderNav";
import { MobileContent } from "./MobileContent";

function LiveSession({ data }) {
  const [queryString] = useSearchParams();
  const { courseId } = useParams();
  const navigate = useNavigate();

  const {
    title,
    overview,
    course_content,
    subtitle,
    password,
    meeting_id,
    started_from,
    end_date,
    time,
  } = data?.data?.data?.live_session ?? {};

  return (
    <div className="mb-6">
      <div className="border-b border-b-[#E4E7EC] pb-4">
        <p className="mb-10 font-poppins text-lg font-medium capitalize text-tertiary-color-900 lg:text-xl">
          Section 1
        </p>
        <p className="text-sm font-medium text-[#344054]">Join Live Session</p>
      </div>
      <section className="mt-7 px-5 md:mt-10 md:px-10 lg:mt-16">
        <h2 className="text-xl font-medium capitalize text-black md:text-2xl">
          {title}
        </h2>
        <p className="my-5 text-lg font-[275] leading-[38.4px] text-tertiary-color-700 md:text-[2rem] lg:my-8">
          {subtitle}
        </p>
        <div className="space-y-3">
          <p className="text-sm font-light text-tertiary-color-900 lg:text-xl">
            Started from: {formatDate(started_from)}
          </p>
          <p className="text-sm font-light text-tertiary-color-900 lg:text-xl">
            Meeting date: {formatDate(end_date)}
          </p>
          <p className="text-sm font-light text-tertiary-color-900 lg:text-xl">
            Add to: iCal Expor, Google Calendar
          </p>
          <p className="text-sm font-light text-tertiary-color-900 lg:text-xl">
            Password: {password}
          </p>
        </div>
        <button className="mt-5 rounded-md bg-tertiary-color-700 px-4 py-2 text-sm text-[#C7D7F4] hover:bg-[#C7D7F4] hover:text-tertiary-color-700 md:text-base lg:mt-8">
          Meeting hasn’t started yet
        </button>
        <CommonButton
          onClick={() =>
            navigate(
              `/user/meeting/${courseId}?title=${queryString.get("title")}`,
            )
          }
        >
          join Meeting
        </CommonButton>
      </section>
      <div className="lg:hidden">
        <MobileSlideNav />
      </div>
      <div className="lg:hidden">
        <MobileContent data={data} />
      </div>
    </div>
  );
}

export default LiveSession;
