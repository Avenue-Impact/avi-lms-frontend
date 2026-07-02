import { useParams } from "react-router-dom";
import DashButton from "../auth/ButtonDash";
import { useFetchProjectArea } from "@/hooks/students/use-fetch-project-area";
import NoCoursesImg from "../../assets/images/no_courses.png";
import { HiOutlineUserGroup, HiOutlineVideoCamera, HiOutlineWrenchScrewdriver } from "react-icons/hi2";

const JoinProjectTeam = () => {
  const { courseId } = useParams();

  const { isLoading, data, error } = useFetchProjectArea(courseId);

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return <p>{error?.response?.data?.message ?? "Something went wrong"} </p>;

  return (
    <div>
      {/* PROJECT AREA */}
      {data?.data?.data?.project_area.length < 1 ? (
        <NoProject />
      ) : (
        <ProjectWithGroup data={data} />
      )}
      {/* TOOLS & RESOURCES */}

      {data?.data?.data?.tools_and_resources.length < 1 ? (
        <EmptyToolsAndResources />
      ) : (
        <ToolsAndResources data={data} />
      )}
    </div>
  );
};

function NoProject() {
  return (
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
  );
}

function ProjectWithGroup({ data }) {
  return (
    <div className="rounded-lg pb-6 pt-0 lg:my-6 lg:h-[425px] lg:border-2 lg:border-gray-100 lg:bg-white lg:p-6">
      <div className="mb-4 hidden md:mb-0 lg:block">
        <h3 className="text-[18px] font-semibold text-gray-800">
          Project Area
        </h3>
      </div>

      <div className="mt-6 flex w-full max-w-5xl flex-col space-y-6 rounded-lg md:flex-row md:space-x-6 md:space-y-0">
        {data?.data?.data?.project_area.map((project) => {
          return (
            <div
              className="mb-4 w-full text-justify md:mb-0 md:w-2/4"
              key={project.id}
            >
              <h3 className="mb-2 font-semibold text-gray-800 lg:text-[24px]">
                {project.title}
              </h3>
              <div className="rounded-lg border-2 border-gray-100 px-8 py-10">
                <h3 className="text-[20px] font-[600]">{project.subtitle}</h3>
                <p className="pb-3 pt-[6px] font-[12px] text-[#667185] md:pb-4">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  className="mt-2 inline-flex h-[40px] w-[177px] items-center justify-center cursor-pointer rounded bg-[#CC1747] px-4 py-2 text-white transition duration-300 hover:bg-[#b30e3b] disabled:hover:bg-slate-200 lg:hover:bg-[#B3123F]"
                >
                  {project.button_text}
                </a>
              </div>
            </div>
          );
        })}

        {/* <div className="mb-4 w-full text-justify md:mb-0 md:w-2/4">
          <h3 className="mb-2 font-semibold text-gray-800 lg:text-[24px]">
            Join Project Meeting (Google Meet)
          </h3>
          <div className="rounded-lg border-2 border-gray-100 px-8 py-10">
            <h3 className="text-[20px] font-[600]">Team A Google Meet</h3>
            <p className="py-2 font-[12px] text-[#667185]">
              Join Team A group by click the Google Meet button below
            </p>
            <DashButton className="mt-2 h-[40px] w-[177px] bg-[#CC1747] text-white hover:bg-[#b30e3b]">
              Google Meet
            </DashButton>
          </div>
        </div> */}
      </div>
    </div>
  );
}

function EmptyToolsAndResources() {
  return (
    <div className="my-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
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
  );
}

function ToolsAndResources({ data }) {
  return (
    <div className="my-6 rounded-lg p-6 lg:h-[425px] lg:border-2 lg:border-gray-100 lg:bg-white">
      <div className="mb-4 flex-1 md:mb-0">
        <h3 className="text-[18px] font-semibold text-gray-800">
          Tools & resources
        </h3>
      </div>

      <div className="mt-6 grid w-full gap-6 rounded-lg md:grid-cols-2 lg:grid-cols-3">
        {data?.data?.data?.tools_and_resources.map((tools) => {
          return (
            <div className="mb-4 w-full text-justify md:mb-0" key={tools.id}>
              <div className="w-full flex-col justify-between rounded-lg border-2 border-gray-100 px-8 py-10">
                <h3 className="text-[20px] font-[600]">{tools.title}</h3>
                <p className="pb-3 pt-[6px] font-[12px] text-[#667185] md:pb-4">
                  {tools.subtitle}
                </p>
                <a
                  href={tools.link}
                  target="_blank"
                  className="mt-2 inline-flex h-[40px] w-[177px] items-center justify-center cursor-pointer rounded bg-[#CC1747] px-4 py-2 text-white transition duration-300 hover:bg-[#b30e3b] disabled:hover:bg-slate-200 lg:hover:bg-[#B3123F]"
                >
                  {tools.button_text}
                </a>
              </div>
            </div>
          );
        })}

        {/* <div className="mb-4 flex w-full text-justify md:mb-0 md:w-2/4">
          <div className="flex w-full flex-col justify-between rounded-lg border-2 border-gray-100 px-8 py-10">
            <h3 className="text-[20px] font-[600]">Balsamiq Wireframe</h3>
            <p className="py-2 font-[12px] text-[#667185]">
              Join Team A google meet by clicking the Google Meet button below
            </p>
            <DashButton className="mt-2 h-[40px] w-[177px] bg-[#CC1747] text-white hover:bg-[#b30e3b]">
              Balsamiq Link
            </DashButton>
          </div>
        </div> */}

        {/* <div className="mb-4 flex w-full text-justify md:mb-0 md:w-2/4">
          <div className="flex w-full flex-col justify-between rounded-lg border-2 border-gray-100 px-8 py-10">
            <h3 className="text-[20px] font-[600]">DevOps Jira</h3>
            <p className="py-2 font-[12px] text-[#667185]">
              Join Team A group by clicking the Google Meet button below
            </p>
            <DashButton className="mt-2 h-[40px] w-[177px] bg-[#CC1747] text-white hover:bg-[#b30e3b]">
              DevOps Link
            </DashButton>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default JoinProjectTeam;
