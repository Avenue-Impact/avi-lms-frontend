import AdminCoursesSection from "@/Components/admindashboard/course-management/courses/AdminCousesSection";
import liveSession from "../../../assets/images/dashboard/live-session.png";

function OndemandSection() {
  return (
    <div className="grid grid-cols-[3fr_1.7fr]">
      <main>
        <div>
          <div>
            <h1 className="mt-10 text-2xl font-medium text-tertiary-color-900">
              Section 2
            </h1>
            <p className="mb-7 p-4 text-sm font-medium text-[#344054]">
              Introduction to Project Consulting Recordings
            </p>
          </div>
          <div className="w-full max-w-[600px] overflow-hidden rounded-lg">
            <img
              src={liveSession}
              alt="live session"
              width={897}
              height={532}
              className="w-full max-w-[651px] object-cover"
            />
          </div>
        </div>
      </main>
      <aside>
        <AdminCoursesSection />
      </aside>
    </div>
  );
}

export default OndemandSection;
