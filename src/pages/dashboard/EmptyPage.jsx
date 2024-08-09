import React, { useState } from 'react';
import DashButton from '../auth/ButtonDash';
import DashSelect from '../auth/components/DashSelect';
import NoCoursesMessage from '../auth/components/NoCourses';
import Modal from '../auth/components/Modal';
import BorderCard from '@/Components/BorderCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalContent from '../lms-pages/ReminderModalContent';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// import ReminderModal from '../auth/components/ReminderModal';

const EmptyPage = () => {

  const [modal, setShowModal] = useState(false);


  return (
    <div>

        <div className=" flex ">
          <div className="flex flex-col md:flex-row  rounded-lg w-full max-w-5xl space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-1/3 lg:bg-transparent bg-[#B3123F] lg:text-black lg:p-0 p-6 rounded-lg text-[#fff] text-justify mb-4 md:mb-0">
                <h3 className="text-xl font-semibold mb-2">Learning Reminders</h3>
                <p className="mb-4 text-sm">Use push notifications or calendar events to stay on top of your learning goals.</p>
                <DashButton onClick={()=>setShowModal(prev=>!prev)} className="mt-2 text-sm lg:bg-[#B3123F] bg-[#fff] text-[#854154] lg:text-[#fff] font-[500]">Add a learning reminder</DashButton>
            </div>
            <div className="flex gap-2 w-full md:w-3/5 justify-around">
              <div className="flex-1 border-2 bg-white border-gray-300 p-4 rounded-lg lg:mx-2">
                <p className="text-gray-600 text-[14px] ">Completed Courses</p>
                <h1 className="text-6xl pt-4 font-[500] ">0</h1>
              </div>
              <div className="flex-1 border-2 bg-white border-gray-300 p-4 rounded-lg lg:mx-2">
                <p className="text-gray-600 text-[14px]">In Progress Courses</p>
                <h1 className="text-6xl pt-4 font-[500]">0</h1>
              </div>
            </div>
            
          </div>
      </div>

      {/* LIVE SESSION */}
      <div className='lg:border-2 lg:border-white-300 my-6 bg-white p-6 rounded-lg'>
          <div className="flex flex-row  items-center justify-between lg:p-2 bg-white rounded-lg">
              <div className="flex-1 lg:mb-4 md:mb-0">
                  <h3 className="text-l font-semibold text-gray-800">Live Session + Mentoring</h3>
              </div>
              <div className="hidden lg:flex items-center space-x-2">
                <p className="text-gray-600">Filter by</p>
                <DashSelect />
            </div>
        </div>

        <div>
            <NoCoursesMessage/>
        </div>


      </div>


      {/* ON DEMAND */}
      <div className='border-2 border-white-300 my-6 bg-white p-6 rounded-lg'>
      <div className="flex flex-row  items-center justify-between lg:p-2 bg-white rounded-lg">
              <div className="flex-1 lg:mb-4 md:mb-0">
                  <h3 className="text-l font-semibold text-gray-800">On Demand Courses (Pre Recorded Sessions)</h3>
              </div>
              <div className="hidden lg:flex items-center space-x-2">
                <p className="text-gray-600">Filter by</p>
                <DashSelect />
            </div>
        </div>

        <div>
            <NoCoursesMessage/>
        </div>

        
      </div>

    { modal && 
      <Modal>
        <BorderCard className='bg-white'>
          <button onClick={()=>setShowModal(prev=>!prev)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          
          
          <div>
            {modal && <ModalContent setShowModal={setShowModal} />}
          </div>
        </BorderCard>
    </Modal>
    }

    </div>
  );
};

export default EmptyPage;
