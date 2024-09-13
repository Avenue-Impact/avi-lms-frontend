import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DashButton from '@/pages/auth/ButtonDash';
import { CommonButton } from '@/Components/ui/button';

const ViewDetails = () => {
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
                                <CommonButton className="ml-6 px-9 bg-primary-color-600">
                                    Create Coupon
                                </CommonButton>
                            </div>
                        )}

                        {finance.status === 'Pending' &&(
                            <div className="ml-auto mt-6 w-max">
                                <CommonButton className="px-9" variant="outline">
                                    Reject
                                </CommonButton>
                                <CommonButton className="ml-6 px-9 bg-primary-color-600">
                                    Approve
                                </CommonButton>
                            </div>
                        )}

                        {finance.status === 'Rejected' &&(
                            <div className="ml-auto mt-6 w-max">
                                <CommonButton className="ml-6  px-9: hover:bg-[#8a94a4] bg-[#98A2B3]">
                                    Rejected
                                </CommonButton>
                            </div>
                        )}
                    </>
                )

            }
                 
                
                
            </div>
            
        </div>
    </div>
  );
};

export default ViewDetails;
