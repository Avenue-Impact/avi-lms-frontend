import React from 'react'
// import DashButton from '../auth/ButtonDash';
import certificate from "../../assets/images/certificate.png";
import AVIbg from "../../assets/images/live_coaching.png";
import DashButton from '../auth/ButtonDash';

export const EmptyGetCertificate = () => {
  return (
    <div>

        <div className="grid grid-cols-12 gap-6 rounded-lg w-full ">
            <div className="col-span-7 text-justify mb-4 md:mb-0 ">
                <div className='relative'>
                    <img src={certificate} alt="certificate" className="w-full blur-sm" />
                    <div className="absolute mx-auto inset-0 flex items-center justify-center p-4">
                        <div className="bg-[#FFEBF0] text-[#CC1747] text-center  lg:px-10 lg:py-14 rounded-lg">
                            <p>Certificate not ready yet. Complete <br /> course to get certificate.</p>
                        </div>
                    </div>
                </div>

                <div className='relative p-6'>
                    <h3 className='text-[24px] font-[500]'>Certificate Recipient</h3>
                    <p className='italic text-[15px] py-4'>This certificate certifies that <span className='text-[#F53366]'>Maxwell Samantha</span> successfully completed the course 
                        <span className='text-[#F53366]'>"Project Consultant Training Programme (Bundle)"</span> on 12/06/2024, taught by Avenue Impact Academy. 
                        It confirms that the student completed the entire course. The course duration 
                        reflects at the time of completion.
                    </p>
                </div>
            </div>



            <div className="col-span-5 mb-4 md:mb-0 border-2 h-[480.95px] bg-white border-gray-100 px-8 py-4 rounded-lg">
                <h3 className="text-[18px] text-gray-800 font-[400] mb-2">Live session + Mentoring 
                    (May Cohorts - 3.5 Months Programme)</h3>
                
                <div className="py-4 ">
                    <img src={AVIbg} alt="" className="rounded-xl" />
                </div>

                <div>
                    <div className="flex items-center space-x-4">
                        <h3 className="text-[25px] font-[600] text-gray-800">Price £2,200</h3>
                        <p className="text-[20px] font-[400] line-through">£39,900</p>
                        <p className="text-[13.42px] text-gray-500 font-[bold]">85% off</p>
                    </div>
                    <p className="mt-2 text-gray-600">Every Monday to Friday 7PM</p>
                </div>

                <div>
                    <DashButton className="mt-4 bg-[#91a6ca] h-[40px] w-[100%] text-white hover:bg-[#a0b2d2] ">Download Certificate</DashButton>
                </div>

            </div>
        </div>

    </div>
  )
}

export default EmptyGetCertificate;