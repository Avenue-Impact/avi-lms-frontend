import { useViewEnrolledCourse } from "@/hooks/students/use-view-enrolled-course";
import { createContext, useState, useEffect } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";

export const CourseDataContext = createContext();

export const CourseDataProvider = ({ children }) => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  const cohortId = searchParams.get('cohortId') || searchParams.get('cohort_id');
  const isLiveCohort = !!cohortId && cohortId !== 'on-demand';

  // Use a state to persist the access_type across sub-routes (e.g. /projects, /certificate, /materials)
  const [type, setType] = useState(() => {
    const explicit = searchParams.get('access_type');
    if (explicit) return explicit;
    if (location.pathname.includes('/live') || isLiveCohort) return 'live class';
    if (location.pathname.includes('/recorded') || cohortId === 'on-demand') return 'on demand';
    return isLiveCohort ? 'live class' : 'on demand';
  });

  useEffect(() => {
    const explicit = searchParams.get('access_type');
    if (explicit) {
      setType(explicit);
    } else if (location.pathname.includes('/live') || isLiveCohort) {
      setType('live class');
    } else if (location.pathname.includes('/recorded') || cohortId === 'on-demand') {
      setType('on demand');
    }
  }, [location.pathname, searchParams, isLiveCohort, cohortId]);

  const { data, isLoading, error } = useViewEnrolledCourse(courseId, type, cohortId);

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
    <CourseDataContext.Provider value={{ data: courseData, type }}>
      {error && (
        <div className="bg-red-50 text-red-600 p-2 text-center text-sm border-b border-red-200">
          Backend error: {error?.response?.data?.message || "Not Enrolled"}. Rendering mock data for UI preview.
        </div>
      )}
      {children}
    </CourseDataContext.Provider>
  );
};
