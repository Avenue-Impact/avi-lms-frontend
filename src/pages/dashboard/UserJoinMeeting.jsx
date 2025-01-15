import { useState } from "react";

import { useJoinSession } from "@/hooks/students/use-join-live-session";
import { useSearchParams } from "react-router-dom";
import StartMeeting from "../admin-pages/meeting/StartMeeting";

const UserJoinMeeting = () => {
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [courseId, setCourseId] = useState("672f600db2f3905e23f914e6");
  const [cohortId, setCohortId] = useState("6732f2f47a0ce8a492cc36e1");
  const [queryString] = useSearchParams();

  const { isLoading, data, error } = useJoinSession(courseId, cohortId);

  if (isLoading) return <p>Loading ...</p>;

  if (error) return <p>error ...</p>;

  // const [errorMessage, setErrorMessage] = useState("");
  // const handleJoinSession = async () => {
  //   try {
  //     const response = await axios({
  //       method: "GET",
  //       url: `https://avi-lms-backend.onrender.com/api/v1/courses/enrolled/${courseId}/cohorts/${cohortId}/live-session/join`,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzVkNThmNTQxZjUyYjdhMzljOTI3NiIsImVtYWlsIjoidG9iaWVtbWEyMDBAZ21haWwuY29tIiwiaWF0IjoxNzM0OTYwOTU4LCJleHAiOjE3MzUxMzM3NTh9.599SM--V4mnY-18OBbdMR37GgXr6isANhMtbOji4bk8",
  //       },
  //     });
  //     console.log(response.data.data);
  //     setMeetingDetails(response.data.data);
  //     return;
  //   } catch (error) {
  //     console.log("Error fetching meeting details:", error);
  //     setErrorMessage(error.response.message);
  //     return;
  //   }
  // };
  if (data)
    return (
      <div>
        <StartMeeting
          meetingNumber={data?.data?.data?.meeting_id}
          userName="User "
          signature={data?.data?.data?.signature}
          apiKey={`${import.meta.env.VITE_ZOOM_API_KEY}`}
          password={data?.data?.data?.password}
          leaveUrl={`http://localhost:5173/dashboard/${courseId}/share-documents?title=${queryString.get("title")}`}
        />
      </div>
    );
};

export default UserJoinMeeting;
