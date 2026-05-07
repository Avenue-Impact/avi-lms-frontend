import { useProfile } from "@/hooks/students/use-fetch-student-profile";
import { useJoinSession } from "@/hooks/students/use-join-live-session";
import { useParams, useSearchParams } from "react-router-dom";
import StartMeeting from "../admin-pages/meeting/StartMeeting";
import MeetingErrorState from "./MeetingErrorState";

const UserJoinMeeting = () => {
  const userBaseUrl = import.meta.env.VITE_USER_BASE_URL;

  const { data: userProfileDetails, error: userError, refetch: refetchUser } = useProfile();

  const [queryString] = useSearchParams();

  const { courseId } = useParams();

  const cohortId = queryString.get("cohortId");
  const sessionId = queryString.get("sessionId");

  const { isLoading, data, error, refetch: refetchSession } = useJoinSession(courseId, cohortId, sessionId);

  
  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FB]">
      <div className="flex flex-col items-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#F5F5F5] border-t-[#C8102E]"></div>
        <p className="text-sm font-semibold text-[#888]">Joining Live Session...</p>
      </div>
    </div>
  );

  if (error || userError) {
    const activeError = error || userError;
    return (
      <MeetingErrorState
        error={activeError}
        onRetry={() => {
          if (error) refetchSession();
          if (userError) refetchUser();
        }}
      />
    );
  }
// http://localhost:5173/dashboard/68834698606589f47cdfb45b/live?title=Web%20Development%20Bootcamp:%20From%20Beginner%20to%20Pro
// http://localhost:5173/dashboard/68834698606589f47cdfb45b/live?title=Web%20Development%20Bootcamp:%20From%20Beginner%20to%20Pro
  if (data)
    return (
      <div>
        <StartMeeting
          meetingNumber={data?.data?.data?.meeting_id}
          userName={userProfileDetails?.data?.data?.username ?? "User"}
          signature={data?.data?.data?.signature}
          apiKey={data?.data?.data?.sdkKey}
          password={data?.data?.data?.password}
          zak={data?.data?.data?.accessToken}
          obfToken={data?.data?.data?.obfToken} 
          leaveUrl={`${userBaseUrl}/dashboard/${courseId}/live?title=${queryString.get("title")}`}
          userEmail={
            userProfileDetails?.data?.data?.email ?? "tobiemma200@gmail.com"
          }
        />
      </div>
    );

  return null;
};

export default UserJoinMeeting;
