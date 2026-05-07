import { useStartLiveSession } from "@/hooks/course-management/live-session/use-start-live-session";
import { useParams, useSearchParams } from "react-router-dom";
import StartMeeting from "./StartMeeting";
import MeetingErrorState from "../../dashboard/MeetingErrorState";
import Cookies from "js-cookie";
import { fetchUserProfile, axiosInstructor } from "@/services/api";
import { useState, useEffect } from "react";

const AdminMeeting = () => {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const [userData, setUserData] = useState(null);
  const cohortId = queryString.get("cohortId");
  const sessionId = queryString.get("sessionId");
  const isInstructor = queryString.get("isInstructor");
  const isStudent = queryString.get("isStudent");

  const { data, isLoading, error, refetch } = useStartLiveSession(
    courseId,
    cohortId,
  );

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      if (isInstructor === "true") {
        try {
          const { data } = await axiosInstructor.get("/me");
          setUserData(data?.data);
        } catch (err) {
          console.error("Failed to fetch instructor", err);
        }
      } else if (isStudent === "true") {
        try {
          const response = await fetchUserProfile();
          setUserData(response?.data?.data);
        } catch (err) {
          console.error("Failed to fetch student", err);
        }
      }
    };
    fetchUser();
  }, [isInstructor, isStudent]);

  const baseUrl = import.meta.env.VITE_USER_BASE_URL;

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F9FB]">
        <div className="flex flex-col items-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#F5F5F5] border-t-[#C8102E]"></div>
          <p className="text-sm font-semibold text-[#888]">
            Starting Live Session...
          </p>
        </div>
      </div>
    );

  if (error) {
    return <MeetingErrorState error={error} onRetry={refetch} />;
  }

  // Get dynamic user details from data or fallback
  let userName = "Admin";
  let userEmail = "admin@avi.com";

  if (userData) {
    if (userData.firstname) {
      userName = `${userData.firstname} ${userData.lastname || ""}`.trim();
    } else if (userData.username) {
      userName = userData.username;
    }

    if (userData.email) {
      userEmail = userData.email;
    }
  }

  // Set leaveUrl dynamically
  const leaveUrl =
    isInstructor === "true"
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
          apiKey={data?.data?.data?.sdkKey}
          password={data?.data?.data?.password}
          zak={data?.data?.data?.accessToken} // Used for authenticated hosts
          leaveUrl={leaveUrl}
        />
      </div>
    );
  }
};

export default AdminMeeting;
