import DashButton from "../auth/ButtonDash";
// import styles from "../pages.module.css";

const JoinProjectTeam = () => {
  return (
    <div>
      <div className="rounded-lg pb-6 pt-0 lg:my-6 lg:h-[425px] lg:border-2 lg:border-gray-100 lg:bg-white lg:p-6">
        <div className="mb-4 hidden md:mb-0 lg:block">
          <h3 className="text-[18px] font-semibold text-gray-800">
            Project Area
          </h3>
        </div>

        <div className="mt-6 flex w-full max-w-5xl flex-col space-y-6 rounded-lg md:flex-row md:space-x-6 md:space-y-0">
          <div className="mb-4 w-full text-justify md:mb-0 md:w-2/4">
            <h3 className="mb-2 font-semibold text-gray-800 lg:text-[24px]">
              Whatsapp Group
            </h3>
            <div className="rounded-lg border-2 border-gray-100 px-8 py-10">
              <h3 className="text-[20px] font-[600]">Join Team A</h3>
              <p className="py-2 font-[12px] text-[#667185]">
                Join Team A group by click the WhatsApp Group button below
              </p>
              <DashButton className="mt-2 h-[40px] w-[177px] bg-[#CC1747] text-white hover:bg-[#b30e3b]">
                WhatsApp Group
              </DashButton>
            </div>
          </div>

          <div className="mb-4 w-full text-justify md:mb-0 md:w-2/4">
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
          </div>
        </div>
      </div>

      {/* TOOLS & RESOURCES */}

      <div className="my-6 rounded-lg p-6 lg:h-[425px] lg:border-2 lg:border-gray-100 lg:bg-white">
        <div className="mb-4 flex-1 md:mb-0">
          <h3 className="text-[18px] font-semibold text-gray-800">
            Tools & resources
          </h3>
        </div>

        <div className="mt-6 flex w-full max-w-5xl flex-col space-y-6 rounded-lg md:flex-row md:space-x-6 md:space-y-0">
          <div className="mb-4 flex w-full text-justify md:mb-0 md:w-2/4">
            <div className="flex w-full flex-col justify-between rounded-lg border-2 border-gray-100 px-8 py-10">
              <h3 className="text-[20px] font-[600]">Team A Google Drive</h3>
              <p className="py-2 font-[12px] text-[#667185]">
                Join Team A group by clicking the WhatsApp Group button below
              </p>
              <DashButton className="mt-2 h-[40px] w-[177px] bg-[#CC1747] text-white hover:bg-[#b30e3b]">
                Google Drive Link
              </DashButton>
            </div>
          </div>

          <div className="mb-4 flex w-full text-justify md:mb-0 md:w-2/4">
            <div className="flex w-full flex-col justify-between rounded-lg border-2 border-gray-100 px-8 py-10">
              <h3 className="text-[20px] font-[600]">Balsamiq Wireframe</h3>
              <p className="py-2 font-[12px] text-[#667185]">
                Join Team A google meet by clicking the Google Meet button below
              </p>
              <DashButton className="mt-2 h-[40px] w-[177px] bg-[#CC1747] text-white hover:bg-[#b30e3b]">
                Balsamiq Link
              </DashButton>
            </div>
          </div>

          <div className="mb-4 flex w-full text-justify md:mb-0 md:w-2/4">
            <div className="flex w-full flex-col justify-between rounded-lg border-2 border-gray-100 px-8 py-10">
              <h3 className="text-[20px] font-[600]">DevOps Jira</h3>
              <p className="py-2 font-[12px] text-[#667185]">
                Join Team A group by clicking the Google Meet button below
              </p>
              <DashButton className="mt-2 h-[40px] w-[177px] bg-[#CC1747] text-white hover:bg-[#b30e3b]">
                DevOps Link
              </DashButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinProjectTeam;
