import React, { useState } from 'react'
import certificate from "../../../assets/images/certificate.png";
import AVIbg from "../../../assets/images/live_coaching.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { CertificateCohort } from './CertificateCohort';
import DashButton from '@/pages/auth/ButtonDash';
import Modal from '@/pages/auth/components/Modal';
import BorderCard from '@/Components/BorderCard';
import { CommonButton } from '@/Components/ui/button';
// import DashButton from "../../../auth/ButtonDash";
// import { cn } from '@/lib/utils';
// import DashButton from '@/pages/auth/ButtonDash';

const CertificateIssue = () => {
    const navigate = useNavigate();
    const [modal, setModal]= useState();

  return (
    <div className="gap-10 mb-4 md:mb-0 border border-gray-300 rounded  mt-5 p-10">
        <div className="w-full gap-6 rounded-lg lg:grid lg:grid-cols-12">
            {/* Certificate Image */}
            <div className="col-span-5 mb-4 text-justify md:mb-0">
                <div className="relative">
                    <img
                    src={certificate}
                    alt="certificate"
                    className="w-full"
                    />
                </div>

                {/* Certificate Recipient Content */}
                <div className="col-span-7 mb-4 text-justify md:mb-0 ">
                    <div className="relative lg:p-6">
                        <h3 className="text-[24px] font-[500]">Certificate Recipient</h3>
                        <p className="py-4 text-[15px] italic">
                            This certificate certifies that{" "}
                            <span className="text-[#F53366]">Maxwell Samantha</span>{" "}
                            successfully completed the course 
                            <span className="text-[#F53366]">
                                "Project Consultant Training Programme (Bundle)"
                            </span>
                        </p>
                    </div>
                </div>
            </div>



            <div className=" col-span-7 px-16 mb-4">
                <div className="flex items-start justify-between gap-3 lg:justify-normal">
                    <button onClick={() => navigate(-1)} type="button" className="flex items-center gap-1">
                    <span className="flex items-center justify-center rounded-sm border-[#E4E7EC] text-base text-black md:h-6 md:w-6 md:border md:text-[10px]">
                        <FontAwesomeIcon icon={faArrowLeft} className="m-4" />
                    </span>
                    </button>
                    <p className="font-[700] text-[#101928] lg:text-[20px] 2xl:text-[28px]">
                        Project Consultant Training Programme (Bundle)
                    </p>
                </div>

                <div className="py-4">
                    <p className="font-[400] text-[#667185] text-[16px] ">
                        Issue certificates for the live session to all students 
                        <span className='2xl:block'>enrolled in the Project Consultant Training</span>  
                        <span className='2xl:block'>Programme (Bundle).</span> 
                    </p>
                </div>

                {/* Input for cohort  */}
                <div className='space-y-5'>
                    <div className="">
                        <p className="font-[600] text-gray-600">Select cohort to issue certificate</p>
                        <CertificateCohort />
                    </div>

                    <div className="col-span-3">
                        <p className="font-[500]">Course Title</p>
                        <input  type="text" 
                        placeholder="Project Consultant Training Programme (Bundle)" className="border border-gray-300 rounded p-4 w-full"/>
                    </div>

                    <div className="flex-1 ">
                        <p className="font-[500] text-[#475367] ">Issue Date</p>
                        <input 
                            type="date" 
                            defaultValue="2024-09-09" 
                            className="border border-gray-300 rounded p-4 w-full"/>
                    </div>


                    <div className='flex justify-end'>
                        <DashButton onClick={() => setModal(true)} className="rounded py-4 text-white">
                             Issue Certificate
                        </DashButton>
                    </div>

                </div>

            </div>
      </div>


      {modal && (
            <Modal>
                <BorderCard className="bg-white  space-x-4 p-6 rounded-lg shadow-lg w-2/5">
                    <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none float-right"
                        onClick={() => setModal(false)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                    <div className="text-center mt-4">
                        <FontAwesomeIcon icon={faCheck} className="text-white text-[24px] p-4  mb-4  rounded-3xl bg-green-500" />
                        <h2 className="text-[20px] text-[#23314A] font-[600] mb-4">Certificate Issued Successfully</h2>
                        <p className="text-[#98A2B3] text-[14px] mb-6">
                            You have successfully issued a new certificate 
                        </p>

                        <div className="flex justify-center">
                            <CommonButton className="px-9 py-2 bg-primary-color-600 text-white rounded-md hover:bg-primary-color-700">
                                Ok
                            </CommonButton>
                        </div>
                        
                    </div>
                </BorderCard>
            </Modal>
        )

      }
    </div>
  )
}

export default CertificateIssue