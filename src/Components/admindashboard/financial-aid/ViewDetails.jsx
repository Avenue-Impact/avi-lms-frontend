import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faCheckCircle, faQuestionCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import DashButton from '@/pages/auth/ButtonDash';
import { CommonButton } from '@/Components/ui/button';
import Modal from '@/pages/auth/components/Modal';
import ModalContent from '@/pages/lms-pages/ReminderModalContent';
import BorderCard from '@/Components/BorderCard';

const ViewDetails = () => {

  const [modal, setShowModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showSuccessModal, setshowSuccessModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the finance data from the location state
  const finance = location.state?.finance;

  return (
    <div className='pt-24'>
        <div className="flex w-full items-center justify-between gap-1 md:gap-6 lg:w-max lg:justify-normal">
            <button onClick={() => navigate(-1)} type="button" className="flex items-center gap-1">
            <span className="flex items-center justify-center rounded-sm border-[#E4E7EC] text-base text-black md:h-6 md:w-6 md:border md:text-[10px]">
                <FontAwesomeIcon icon={faArrowLeft} className="m-4" />
            </span>
            <span className="hidden text-sm capitalize text-[#667185] md:block">
                go back
            </span>
            </button>
            <p className="text-sm font-medium text-black lg:text-lg 2xl:text-2xl">
            {finance?.name}’s Document
            </p>
        </div>

        

        <div className="grid grid-cols-12 gap-14 mb-4 md:mb-0 border border-gray-300 rounded  mt-5 p-10">
            <div className='col-span-5'>
                {/* Render the finance details here */}
                {finance && (
                    <div className='text-[14px]'>
                        <p className='text-[#344054] text-[24px] font-[500]'>{finance.name} </p>
                        <p className='text-[#667185]'>
                            {finance.email} | {finance.courseTitle} | 
                            {finance.date} | {finance.time}
                        </p>

                        <button className={`
                            py-1 px-2 font-[500] bg-[#F3FFF7] border-b rounded
                            ${finance.status === 'Approved' ? 'bg-[#F3FFF7] text-[#00A92F]' : " "}
                            ${finance.status === 'Rejected' ? 'bg-[#FFECE5] text-[#AD3307]' : " "}
                            ${finance.status === 'Pending' ? 'bg-[#FFFFE5] text-[#DBC500]' : " "}
                        `}>
                        {finance.status}
                        </button>
                    </div>
                )}
            </div>

            <div className="col-span-7  mr-14">
                <div className="space-y-4 text-justify text-[14px]">

                    <div className=" space-y-2">
                        <p className="font-[500] text-[16px] text-[#475367]">Course</p>
                        <p className='text-[#667185]'>{finance.courseTitle}</p>
                    </div>

                    <div className="space-y-2">
                        <p className="font-[500] text-[16px] text-[#475367]">Reason for Applying for Aid:</p>
                        <p className="text-[#667185]">
                            I am deeply passionate about advancing my career in project consultancy, and I believe that the Project Consultant Training Programme (Bundle) offers the comprehensive knowledge and practical skills I need to excel in this field. However, due to my current financial circumstances, I am unable to afford the full cost of this program.
                            <br /> <br />
                            This training is critical for my professional growth, as it will equip me with the expertise required to manage complex projects, enhance my problem-solving abilities, and improve my leadership skills. By receiving financial aid, I can fully commit to my studies and gain the qualifications necessary to contribute significantly to my chosen industry.
                        </p>
                    </div>


                    <div className="space-y-2">
                        <p className="font-[500] text-[16px] text-[#475367]">How will your selected course help with your goals?</p>
                        <p className="text-[#667185]">
                            The Project Consultant Training Programme (Bundle) aligns perfectly with my career aspirations of becoming a leading project consultant. This course will provide me with the advanced skills and in-depth knowledge necessary to manage projects efficiently from start to finish, which is a critical component of my long-term career goals.
                            <br /> <br />
                            Through this program, I will gain expertise in project planning, risk management, resource allocation, and stakeholder communication—key areas that are essential for success in the consultancy field. The comprehensive curriculum will also allow me to refine my analytical abilities and strategic thinking, which are crucial for advising clients and leading teams effectively.
                        </p>
                    </div>

                </div>

                {/* Button */}
                { finance && (
                    <>
                        {finance.status === 'Approved' &&(
                            <div className="ml-auto mt-6 w-max">
                                <CommonButton  onClick={() => setShowModal((prev) => !prev)}  className="ml-6 px-9 bg-primary-color-600">
                                    Create Coupon
                                </CommonButton>
                            </div>
                        )}

                        {finance.status === 'Pending' &&(
                            <div className="ml-auto mt-6 w-max">
                                <CommonButton  className="px-9" variant="outline">
                                    Reject
                                </CommonButton>
                                <CommonButton  onClick={() => setShowModal((prev) => !prev)} className="ml-6 px-9 bg-primary-color-600">
                                    Approve
                                </CommonButton>
                            </div>
                        )}

                        {finance.status === 'Rejected' &&(
                            <div className="ml-auto mt-6 w-max">
                                <CommonButton  onClick={() => setShowModal((prev) => !prev)}  className="ml-6  px-9: hover:bg-[#8a94a4] bg-[#98A2B3]">
                                    Rejected
                                </CommonButton>
                            </div>
                        )}
                    </>
                )

            }
   
            </div>        
        </div>








        {/* Modal for Pending Status */}
    {finance.status === 'Pending' && modal && (
      <Modal>
        <BorderCard className="bg-white p-6 rounded-lg shadow-lg w-2/5">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none float-right"
            onClick={() => setShowModal((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <div className="text-center mt-4">
            <FontAwesomeIcon 
              icon={faQuestionCircle} 
              className="text-white text-[24px] p-2 rounded-full bg-[#F2A356]" 
            />
            <h2 className="text-[16px] text-[#23314A] font-[600] mb-4">
              Approve Financial Aid Request
            </h2>
            <p className="text-[#98A2B3] text-[14px] mb-6">
              Are you sure you want to approve this financial aid request for <span className='font-[600] text-[#566B8E]'>{finance.name} </span> ? This action will grant the requested financial aid to the student and cannot be undone.
            </p>

            <div className="flex justify-center space-x-4">
              <CommonButton className="px-9 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100" variant="outline">
                Reject
              </CommonButton>
              <CommonButton onClick={() => setshowSuccessModal((prev) => !prev)} className="ml-6 px-9 py-2 bg-primary-color-600 text-white rounded-md hover:bg-primary-color-700">
                Yes, Approve
              </CommonButton>
            </div>
          </div>
        </BorderCard>
      </Modal>
    )}

    {/* Modal for Approved Status */}
    {/* {finance.status === 'Approved' && modal && (
      <Modal>
        <BorderCard className="bg-white p-6 rounded-lg shadow-lg w-2/5">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none float-right"
            onClick={() => setShowModal((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <div className="text-center mt-4">
            <FontAwesomeIcon 
              icon={faCheck} 
              className="text-white text-[24px] p-3 rounded-3xl bg-green-500" 
            />
            <h2 className="text-[16px] text-[#23314A] font-[600] mb-4">
              Financial Aid Approved
            </h2>
            <p className="text-[#98A2B3] text-[14px] mb-6">
              The financial aid request for <span className='font-[600] text-[#566B8E]'>{finance.name} </span> has been approved successfully.
            </p>

            <div className="flex justify-center space-x-4">
              <CommonButton onClick={() => setShowCouponModal((prev) => !prev)} className="px-9 py-2 bg-primary-color-600 text-white rounded-md hover:bg-primary-color-700">
                Create Coupon
              </CommonButton>
            </div>
          </div>
        </BorderCard>
      </Modal>
    )} */}


    {/* Modal for Rejected Status */}
    {finance.status === 'Rejected' && modal && (
      <Modal>
        <BorderCard className="bg-white p-6 rounded-lg shadow-lg w-2/5">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none float-right"
            onClick={() => setShowModal((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <div className="text-center mt-4">
            <FontAwesomeIcon 
              icon={faTimes} 
              className="text-white text-[24px] py-2 px-3 rounded-3xl bg-red-500" 
            />
            <h2 className="text-[16px] text-[#23314A] font-[600] mb-4">
              Financial Aid Rejected
            </h2>
            <p className="text-[#98A2B3] text-[14px] mb-6">
              The financial aid request for <span className='font-[600] text-[#566B8E]'>{finance.name} </span>  has been rejected.
            </p>

            <div className="flex justify-center space-x-4">
              <CommonButton onClick={() => setShowModal(false)} className="px-9 py-2 bg-primary-color-600 text-white rounded-md hover:bg-primary-color-700">
                Close
              </CommonButton>
            </div>
          </div>
        </BorderCard>
      </Modal>
    )}



    {showSuccessModal && (
        <Modal>
            <BorderCard className="bg-white p-6 rounded-lg shadow-lg w-2/5">
            <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none float-right"
                onClick={() => setshowSuccessModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="text-center mt-4">
                <FontAwesomeIcon 
                icon={faCheck} 
                className="text-white text-[24px] p-3 rounded-3xl bg-green-500" 
                />
                <h2 className="text-[16px] text-[#23314A] font-[600] mb-4">
                Financial Aid Approved
                </h2>
                <p className="text-[#98A2B3] text-[14px] mb-6">
                The financial aid request for <span className='font-[600] text-[#566B8E]'>{finance.name} </span> has been approved successfully.
                </p>

                <div className="flex justify-center space-x-4">
                  <CommonButton onClick={() => setShowCouponModal((prev) => !prev)} className="px-9 py-2 bg-primary-color-600 text-white rounded-md hover:bg-primary-color-700">
                      Create Coupon
                  </CommonButton>
                </div>
            </div>
            </BorderCard>
      </Modal>
    )}


    {/* Coupon Creation Modal */}
    {showCouponModal && (
      <Modal>
        <BorderCard className="bg-white p-6 rounded-lg shadow-lg w-2/5">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none float-right"
            onClick={() => setShowCouponModal(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {/* Coupon Creation Content */}
          <div className="space-y-4 pb-8">
            <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
              Coupon Creation
            </h3>
            <p className="text-[#667185]">
              Create and issue custom coupon codes for personalized discounts and incentives.
            </p>
          </div>

          <div className="mb-4">
            <p className="font-[500]">Coupon Name</p>
            <input type="text" placeholder="e.g., Summer Discount"
              className="border border-gray-300 rounded p-4 w-full"
            />
          </div>

          <div className="mb-4">
            <p className="font-[500]">Custom Coupon Code</p>
            <div className="relative">
              <input type="text"
                placeholder="23ZX34D2TSi" className="border border-gray-300 rounded p-4 w-full"/>
              <button className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-[#CC1747] text-white font-medium px-5 py-2.5 text-sm rounded">
                Generate
              </button>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-[500]">Percentage Discount</p>
            <input type="text" placeholder="18%"
              className="border border-gray-300 rounded p-4 w-full"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <CommonButton className="ml-6 px-9 py-2 bg-primary-color-600 text-white rounded-md hover:bg-primary-color-700">
              Send
            </CommonButton>
          </div>
        </BorderCard>
      </Modal>
    )}

    </div>
  );
};

export default ViewDetails;
