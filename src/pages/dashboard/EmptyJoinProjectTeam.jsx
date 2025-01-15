import NoCoursesImg from "../../assets/images/no_courses.png";
// import styles from "../pages.module.css";

const EmptyJoinProjectTeam = () => {
  return (
    <div>
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

      {/* TOOLS & RESOURCES */}

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
    </div>
  );
};

export default EmptyJoinProjectTeam;
