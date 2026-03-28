import { useStartLiveSession } from "@/hooks/course-management/live-session/use-start-live-session";
import { useParams, useSearchParams } from "react-router-dom";
import StartMeeting from "./StartMeeting";

const AdminMeeting = () => {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");
  const sessionId = queryString.get("sessionId");
  const { data, isLoading, error } = useStartLiveSession(
    courseId,
    cohortId,
    sessionId,
  );

  const baseUrl = import.meta.env.VITE_USER_BASE_URL;

  if (isLoading) return <p>Loading Meeting...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data) {
    // setMeetingDetails(data?.data?.data);
    return (
      <div>
        <StartMeeting
          meetingNumber={data?.data?.data?.meeting_id}
          userName="Admin"
          userEmail={"tobiemma200@gmail.com"}
          signature={data?.data?.data?.signature}
          apiKey={import.meta.env.VITE_ZOOM_API_KEY}
          password={data?.data?.data?.password}
          // zak={data?.data?.data?.accessToken}
          // obfToken={data?.data?.data?.obfToken}
          leaveUrl={`${baseUrl}/admin/course/management/info/${courseId}??title=${queryString.get("title")}&cohort=${queryString.get("cohort")}&cohortId=${queryString.get("cohortId")}`}
        />
      </div>
    );
  }
};

export default AdminMeeting;
