import { useProfile } from "@/hooks/students/use-fetch-student-profile";
import { useJoinSession } from "@/hooks/students/use-join-live-session";
import { useParams, useSearchParams } from "react-router-dom";
import StartMeeting from "../admin-pages/meeting/StartMeeting";

const UserJoinMeeting = () => {
  const userBaseUrl = import.meta.env.VITE_USER_BASE_URL;

  const { data: userProfileDetails, error: userError } = useProfile();

  const [queryString] = useSearchParams();

  const { courseId } = useParams();

  const cohortId = queryString.get("cohortId");

  const { isLoading, data, error } = useJoinSession(courseId, cohortId);


  
  if (isLoading) return <p>Loading ...</p>;

  if (error || userError)
    return (
      <p>
        {error.response.data.message ??
          userError?.response?.data?.message ??
          "Something went wrong"}
      </p>
    );
// http://localhost:5173/dashboard/68834698606589f47cdfb45b/live?title=Web%20Development%20Bootcamp:%20From%20Beginner%20to%20Pro
// http://localhost:5173/dashboard/68834698606589f47cdfb45b/live?title=Web%20Development%20Bootcamp:%20From%20Beginner%20to%20Pro
  if (data)
    return (
      <div>
        <StartMeeting
          meetingNumber={data?.data?.data?.meeting_id}
          userName={userProfileDetails?.data?.data?.username ?? "User"}
          signature={data?.data?.data?.signature}
          apiKey={`${import.meta.env.VITE_ZOOM_API_KEY}`}
          password={data?.data?.data?.password}
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
