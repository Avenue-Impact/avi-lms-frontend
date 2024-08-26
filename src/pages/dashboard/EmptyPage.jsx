import React, { useState } from "react";
import DashButton from "../auth/ButtonDash";
import DashSelect from "../auth/components/DashSelect";
import NoCoursesMessage from "../auth/components/NoCourses";
import Modal from "../auth/components/Modal";
import BorderCard from "@/Components/BorderCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalContent from "../lms-pages/ReminderModalContent";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Filter } from "@/Components/dashboard/Filter";
import Cookies from "js-cookie";
import { useProfile } from "@/services/queries";

// import ReminderModal from '../auth/components/ReminderModal';

const EmptyPage = () => {
  const [modal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex">
        <div className="flex w-full max-w-5xl flex-col space-y-6 rounded-lg md:flex-row md:space-x-6 md:space-y-0">
          <div className="mb-4 w-full rounded-lg bg-[#B3123F] p-6 text-justify text-[#fff] md:mb-0 md:w-1/3 lg:bg-transparent lg:p-0 lg:text-black">
            <h3 className="mb-2 text-xl font-semibold">Learning Reminders</h3>
            <p className="mb-4 text-sm">
              Use push notifications or calendar events to stay on top of your
              learning goals.
            </p>

            <DashButton
              onClick={() => setShowModal((prev) => !prev)}
              className="mt-2 bg-white text-sm font-[500] text-primary-color-600 lg:bg-[#B3123F] lg:text-[#fff]"
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
      <div className="lg:border-white-300 my-6 rounded-lg bg-white p-6 lg:border-2">
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
          <NoCoursesMessage />
        </div>
      </div>

      {/* ON DEMAND */}
      <div className="border-white-300 my-6 rounded-lg border-2 bg-white p-6">
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
          <NoCoursesMessage />
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

export default EmptyPage;
