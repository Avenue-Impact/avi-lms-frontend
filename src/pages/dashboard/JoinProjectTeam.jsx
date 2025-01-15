import { useParams } from "react-router-dom";
import DashButton from "../auth/ButtonDash";
import { useFetchProjectArea } from "@/hooks/students/use-fetch-project-area";
import NoCoursesImg from "../../assets/images/no_courses.png";
// import styles from "../pages.module.css";

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
    <div className="my-6 rounded-lg border-2 border-gray-100 bg-white p-6 lg:h-[425px]">
      <div className="mb-4 flex-1 md:mb-0">
        <h3 className="text-[18px] font-semibold text-gray-800">
          Project Area
        </h3>
      </div>

      <div className="mt-6 flex w-full max-w-5xl flex-col space-y-6 rounded-lg md:flex-row md:space-x-6 md:space-y-0">
        <div className="mb-4 w-full text-justify md:mb-0 md:w-2/4">
          <h3 className="mb-2 text-[24px] font-semibold text-gray-800">
            Whatsapp Group
          </h3>
          <div className="px-8 py-10">
            <h3 className="text-[20px] font-[600]">No WhatsApp Group</h3>
          </div>
        </div>

        <div className="mb-4 w-full text-justify md:mb-0 md:w-2/4">
          <h3 className="mb-2 text-[24px] font-semibold text-gray-800">
            Join Project Meeting (Google Meet)
          </h3>
          <div className="px-8 py-10">
            <h3 className="text-[20px] font-[600]">
              No Project Meeting link yet
            </h3>
          </div>
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
                  className="mt-2 h-[40px] w-[177px] cursor-pointer rounded bg-[#CC1747] px-4 py-2 text-white transition duration-300 hover:bg-[#b30e3b] disabled:hover:bg-slate-200 lg:hover:bg-[#B3123F]"
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
    <div className="my-6 rounded-lg border-2 border-gray-100 bg-white p-6 lg:h-[425px]">
      <div className="mb-4 flex-1 md:mb-0">
        <h3 className="text-[18px] font-semibold text-gray-800">
          Tools & resources
        </h3>
      </div>

      <div className="mt-10 flex w-full items-center justify-center space-y-6 rounded-lg text-center md:space-x-6 md:space-y-0">
        <div className="mx-auto mb-4 text-justify md:mb-0">
          <div className="border-2 border-gray-100 p-10">
            <img
              src={NoCoursesImg}
              alt="No Courses"
              className="mb-4 h-32 w-32 rounded-full"
            />
            <h3 className="mb-2 text-2xl font-semibold text-gray-800">
              No Courses
            </h3>
          </div>
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
                  className="mt-2 h-[40px] w-[177px] cursor-pointer rounded bg-[#CC1747] px-4 py-2 text-white transition duration-300 hover:bg-[#b30e3b] disabled:hover:bg-slate-200 lg:hover:bg-[#B3123F]"
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
