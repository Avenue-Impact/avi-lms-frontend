import { useStartLiveSession } from "@/hooks/course-management/live-session/use-start-live-session";
import { useParams, useSearchParams } from "react-router-dom";
import StartMeeting from "./StartMeeting";
import MeetingErrorState from "../../dashboard/MeetingErrorState";
import Cookies from "js-cookie";

const AdminMeeting = () => {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");
  const sessionId = queryString.get("sessionId");
  const isInstructor = queryString.get("isInstructor");
  
  const { data, isLoading, error, refetch } = useStartLiveSession(
    courseId,
    cohortId,
  );

  const baseUrl = import.meta.env.VITE_USER_BASE_URL;

  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FB]">
      <div className="flex flex-col items-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#F5F5F5] border-t-[#C8102E]"></div>
        <p className="text-sm font-semibold text-[#888]">Starting Live Session...</p>
      </div>
    </div>
  );

  if (error) {
    return (
      <MeetingErrorState
        error={error}
        onRetry={refetch}
      />
    );
  }

  // Get dynamic user details from token
  let userName = "Admin";
  let userEmail = "admin@avi.com";
  
  try {
    const token = Cookies.get("adminToken");
    if (token) {
      // Decode JWT payload without importing external libraries
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const payload = JSON.parse(jsonPayload);
      if (payload.firstname) {
        userName = `${payload.firstname} ${payload.lastname || ''}`.trim();
      } else if (payload.username) {
        userName = payload.username;
      }
      
      if (payload.email) {
        userEmail = payload.email;
      }
    }
  } catch (err) {
    console.error("Failed to parse token for meeting details", err);
  }

  // Set leaveUrl dynamically
  const leaveUrl = isInstructor === "true" 
    ? `${baseUrl}/instructor/dashboard`
    : `${baseUrl}/admin/course/management/info/${courseId}?title=${queryString.get("title")}&cohort=${queryString.get("cohort")}&cohortId=${queryString.get("cohortId")}`;

  if (data) {
    return (
      <div>
        <StartMeeting
          meetingNumber={data?.data?.data?.meeting_id}
          userName={userName}
          userEmail={userEmail}
          signature={data?.data?.data?.signature}
          apiKey={import.meta.env.VITE_ZOOM_API_KEY}
          password={data?.data?.data?.password}
          zak={data?.data?.data?.accessToken} // Used for authenticated hosts
          leaveUrl={leaveUrl}
        />
      </div>
    );
  }
};

export default AdminMeeting;
