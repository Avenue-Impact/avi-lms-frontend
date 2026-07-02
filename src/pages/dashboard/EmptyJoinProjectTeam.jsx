import NoCoursesImg from "../../assets/images/no_courses.png";
import { HiOutlineUserGroup, HiOutlineVideoCamera, HiOutlineWrenchScrewdriver } from "react-icons/hi2";

const EmptyJoinProjectTeam = () => {
  return (
    <div className="w-full space-y-8">
      {/* PROJECT AREA */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 border-b border-gray-100 pb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Project Area
          </h3>
          <p className="mt-1 text-sm text-gray-500">Collaborate with your team and join project meetings.</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {/* WhatsApp Group Empty State */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center transition-colors hover:bg-gray-100/50">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <HiOutlineUserGroup className="h-8 w-8" />
            </div>
            <h4 className="mb-2 text-lg font-medium text-gray-800">Whatsapp Group</h4>
            <p className="text-sm text-gray-500">No WhatsApp group has been assigned yet.</p>
          </div>

          {/* Google Meet Empty State */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center transition-colors hover:bg-gray-100/50">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <HiOutlineVideoCamera className="h-8 w-8" />
            </div>
            <h4 className="mb-2 text-lg font-medium text-gray-800">Project Meeting</h4>
            <p className="text-sm text-gray-500">No Google Meet link has been created yet.</p>
          </div>
        </div>
      </div>

      {/* TOOLS & RESOURCES */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 border-b border-gray-100 pb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Tools & Resources
          </h3>
          <p className="mt-1 text-sm text-gray-500">Essential tools and resources for your project.</p>
        </div>

        <div className="flex w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 py-16 px-4 transition-colors hover:bg-gray-100/50">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <HiOutlineWrenchScrewdriver className="h-10 w-10" />
            </div>
            <h3 className="mb-2 text-xl font-medium text-gray-800">
              No Tools Available
            </h3>
            <p className="max-w-sm text-sm text-gray-500">
              There are currently no tools or resources added to this project area.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyJoinProjectTeam;
