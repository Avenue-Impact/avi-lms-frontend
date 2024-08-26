import React, { useState } from "react";
import DashButton from "../auth/ButtonDash";
import DashSelect from "../auth/components/DashSelect";
// import NoCoursesMessage from '../auth/components/NoCourses';
import Modal from "../auth/components/Modal";
import BorderCard from "@/Components/BorderCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import ModalContent from "../lms-pages/ReminderModalContent";
import joinTeam from "../../assets/images/join_team.png";
import styles from "../pages.module.css";
import { Filter } from "@/Components/dashboard/Filter";
import DashboardDiscover from "@/Components/DashboardDiscover";
import { useProfile } from "@/services/queries";
import axios from "axios";
import Cookies from "js-cookie";

// import ReminderModal from '../auth/components/ReminderModal';

const Dashboard_Discover = () => {
  const [modal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex">
        <div className="flex w-full max-w-5xl flex-col space-y-6 rounded-lg md:flex-row md:space-x-6 md:space-y-0">
          <div className="mb-4 w-full rounded-lg bg-[#B3123F] p-6 text-justify text-[#fff] md:mb-0 md:w-1/3 lg:bg-transparent lg:p-0 lg:text-black">
            <h3 className="mb-2 font-semibold text-[xl]">Learning Reminders</h3>
            <p className="mb-4 text-sm">
              Use push notifications or calendar events to stay on top of your
              learning goals.
            </p>
            <DashButton
              onClick={() => {
                setShowModal((prev) => !prev);
              }}
              className="mt-2 bg-[#fff] text-sm font-[500] text-[#972848] lg:bg-[#B3123F] lg:text-[#fff]"
            >
              Add a learning reminder
            </DashButton>
          </div>
          <div className="flex w-full justify-around gap-2 md:w-3/5">
            <div className="flex-1 rounded-lg border-2 border-gray-300 bg-white p-4 lg:mx-2">
              <p className="text-[14px] text-gray-600">Completed Courses</p>
              <h1 className="pt-4 text-6xl font-[500]">0</h1>
            </div>
            <div className="flex-1 rounded-lg border-2 border-gray-300 bg-white p-4 lg:mx-2">
              <p className="text-[14px] text-gray-600">In Progress Courses</p>
              <h1 className="pt-4 text-6xl font-[500]">0</h1>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE SESSION */}
      <div className="border-white-300 my-6 rounded-lg border-2 bg-white px-2 py-4 md:p-6">
        <div className="flex flex-row items-center justify-between rounded-lg bg-white pb-6 lg:p-2">
          <div className="flex-1 md:mb-0 lg:mb-4">
            <h3 className="text-l font-semibold text-gray-800">
              Live Session + Mentoring
            </h3>
          </div>
          <div className="hidden items-center space-x-2 lg:flex">
            <p className="text-gray-600">Filter by</p>
            <DashSelect />
          </div>

          <div className="items-center space-x-2 lg:hidden">
            <Filter />
          </div>
        </div>

        <div>
          {/* Preview this Course */}
          <div
            className={`grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4`}
          >
            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="100% completed"
              leaveRating="Leaving a rating"
            />

            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="0% in progress"
              getStarted="Get Started"
            />

            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="20% in progress"
              continueLearning="Continue"
            />

            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="0% in progress"
              getStarted="Get Started"
            />

            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              // leaavingRateStar={<FontAwesomeIcon icon={faStar} />}
              courseProgress="100% completed"
              leaveRating="Leaving a rating"
            />

            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="20% in progress"
              continueLearning="Continue"
            />

            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="20% completed"
              leaveRating="Leaving a rating"
            />

            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="20% completed"
              leaveRating="Leaving a rating"
            />
          </div>
        </div>
      </div>

      {/* ON DEMAND */}
      <div className="border-white-300 my-6 rounded-lg border-2 bg-white px-3 py-4 md:p-6">
        <div className="flex flex-row items-center justify-between rounded-lg bg-white pb-6 lg:p-2">
          <div className="flex-1 md:mb-0 lg:mb-4">
            <h3 className="text-l font-semibold text-gray-800">
              On Demand Courses (Pre Recorded Sessions)
            </h3>
          </div>
          <div className="hidden items-center space-x-2 lg:flex">
            <p className="text-gray-600">Filter by</p>
            <DashSelect />
          </div>

          <div className="items-center space-x-2 lg:hidden">
            <Filter />
          </div>
        </div>

        <div>
          {/* Preview this Course */}
          <div
            className={`grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4`}
          >
            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="100% completed"
              leaveRating="Leaving a rating"
            />

            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="20% completed"
              continueLearning="Continue"
            />

            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="100% completed"
              leaveRating="Leaving a rating"
            />

            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="20% completed"
              leaveRating="Leaving a rating"
            />

            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="20% completed"
              leaveRating="Leaving a rating"
            />

            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="20% completed"
              leaveRating="Leaving a rating"
            />

            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="20% completed"
              leaveRating="Leaving a rating"
            />

            <DashboardDiscover
              imgSrc={joinTeam}
              altText="joinTeam"
              title={
                <>
                  {" "}
                  Project Consultant <br /> Training Programme (Bundle)
                </>
              }
              rating="4.3"
              numRatings="45,345"
              courseProgress="20% completed"
              leaveRating="Leaving a rating"
            />
          </div>
        </div>
      </div>

      {modal && (
        <Modal>
          <BorderCard className="bg-white">
            <button onClick={() => setShowModal((prev) => !prev)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div>{modal && <ModalContent setShowModal={setShowModal} />}</div>
          </BorderCard>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard_Discover;
