import { useViewEnrolledCourse } from "@/hooks/students/use-view-enrolled-course";
import { createContext } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";

export const CourseDataContext = createContext();

export const CourseDataProvider = ({ children }) => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const type = location.pathname.includes('/live') ? 'live class' : 'on demand';
  const { data, isLoading, error } = useViewEnrolledCourse(courseId, type);

  if (isLoading) return <p className="p-4 text-gray-500">Loading...</p>;

  // Provide mock data so the UI layout can still be reviewed even if enrollment/auth fails (400/401)
  const courseData = data || {
    data: {
      data: {
        cohort_id: "demo_cohort",
        live_session: {
          time: new Date().toISOString(),
          title: searchParams.get("title") || "Truth be told",
          subtitle: "Become a Business Analyst/Agile Consultant (Live Session)",
          started_from: "2025-11-12T19:30:00.000Z",
          end_date: "2026-01-15T19:30:00.000Z",
          password: "demoPassword123"
        },
        recorded_sessions: [
          {
            _id: "sec1",
            section: 1,
            title: "Introduction to Project Consulting Recordings",
            videos: [
              { _id: "vid1", video_title: "Overview of Project Consulting Recordings" },
              { _id: "vid2", video_title: "Roles and Responsibilities of a Project Consultant" }
            ]
          },
          {
            _id: "sec2",
            section: 2,
            title: "Agile Project Management Recordings",
            videos: [
              { _id: "vid3", video_title: "Scrum Basics" }
            ]
          }
        ]
      }
    }
  };

  return (
    <CourseDataContext.Provider value={{ data: courseData }}>
      {error && (
        <div className="bg-red-50 text-red-600 p-2 text-center text-sm border-b border-red-200">
          Backend error: {error?.response?.data?.message || "Not Enrolled"}. Rendering mock data for UI preview.
        </div>
      )}
      {children}
    </CourseDataContext.Provider>
  );
};
