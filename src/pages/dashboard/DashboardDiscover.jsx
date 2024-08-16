import React, { useState } from 'react';
import DashButton from '../auth/ButtonDash';
import DashSelect from '../auth/components/DashSelect';
// import NoCoursesMessage from '../auth/components/NoCourses';
import Modal from '../auth/components/Modal';
import BorderCard from '@/Components/BorderCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import ModalContent from '../lms-pages/ReminderModalContent';
import joinTeam from "../../assets/images/join_team.png";
import styles from "../pages.module.css";
import CourseCard, {DashboardDiscover} from "../../Components/CourseCard";
import { Filter } from '@/Components/dashboard/Filter';



// import ReminderModal from '../auth/components/ReminderModal';

const Dashboard_Discover = () => {

  const [modal, setShowModal] = useState(false);


  return (
    <div >

      <div className=" flex ">
          <div className="flex flex-col md:flex-row  rounded-lg w-full max-w-5xl space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-1/3 lg:bg-transparent bg-[#B3123F] lg:text-black lg:p-0 p-6 rounded-lg text-[#fff] text-justify mb-4 md:mb-0">
                <h3 className="text-[xl] font-semibold mb-2">Learning Reminders</h3>
                <p className="mb-4 text-sm">Use push notifications or calendar events to stay on top of your learning goals.</p>
                <DashButton onClick={()=>setShowModal(prev=>!prev)} className="mt-2 text-sm lg:bg-[#B3123F] bg-[#fff] text-[#972848] lg:text-[#fff] font-[500]">Add a learning reminder</DashButton>
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
      <div className='border-2 border-white-300 my-6 bg-white p-6 rounded-lg'>
        <div className="flex flex-row pb-6 items-center justify-between lg:p-2 bg-white rounded-lg">
                <div className="flex-1 lg:mb-4 md:mb-0">
                    <h3 className="text-l font-semibold text-gray-800">Live Session + Mentoring</h3>
                </div>
                <div className="hidden items-center lg:flex space-x-2">
                  <p className="text-gray-600">Filter by</p>
                  <DashSelect />
              </div>

              <div className="lg:hidden items-center  space-x-2">
                  <Filter/>
              </div>

          </div>

        <div>
            {/* Preview this Course */}
            <div className={`${styles.previewCoursesFlex} overflow-visible`}>
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
      <div className='border-2 border-white-300 my-6 bg-white p-6 rounded-lg'>
        <div className="flex flex-row pb-6 items-center justify-between lg:p-2 bg-white rounded-lg">
            <div className="flex-1 lg:mb-4 md:mb-0">
                <h3 className="text-l font-semibold text-gray-800">On Demand Courses  (Pre Recorded Sessions)</h3>
            </div>
            <div className="hidden items-center lg:flex space-x-2">
              <p className="text-gray-600">Filter by</p>
              <DashSelect />
          </div>

          <div className="lg:hidden items-center  space-x-2">
              <Filter/>
          </div>

        </div>


        <div>
            {/* Preview this Course */}
            <div className={`${styles.previewCoursesFlex} overflow-visible`}>
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

export default Dashboard_Discover;
