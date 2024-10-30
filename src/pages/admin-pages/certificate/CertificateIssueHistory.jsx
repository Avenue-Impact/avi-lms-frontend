import React, { useState } from 'react'
import CertificateHistory from '@/Components/admindashboard/admin-certificate/CertificateHistory';
import CertificateIssue from '@/Components/admindashboard/admin-certificate/CertificateIssue';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom'

const CertificateIssueHistory = () => {

    const [certActive, setCertActive] = useState('issueCert');
    const navigate = useNavigate();

  return (
    <div>
        <div className="mb-8 mt-16 flex items-center justify-between">
            <div className="flex w-full items-center justify-between gap-1 md:gap-6 lg:w-max lg:justify-normal">
                <button onClick={() => navigate(-1)} type="button" className="flex items-center gap-1">
                <span className="flex items-center justify-center rounded-sm border-[#E4E7EC] text-base text-black md:h-6 md:w-6 md:border md:text-[10px]">
                    <FontAwesomeIcon icon={faArrowLeft} className="m-4" />
                </span>
                <span className="hidden text-sm capitalize text-[#667185] md:block">
                    Go Back
                </span>
                </button>
                <p className="text-sm font-medium text-black lg:text-lg 2xl:text-2xl">
                    Project Consultant Training Programme (Bundle)
                </p>
            </div>


            <div>
                <button onClick={() => setCertActive("issueCert")}
                    className={` px-4 py-2 text-sm font-medium ${certActive === "issueCert" ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "border-b-2 border-[#E4E7EC] "}`}>
                    Issue Certificate
                </button>

                <button onClick={() => setCertActive("certHistory") }
                    className={`px-4 py-2 text-sm font-medium ${certActive === "certHistory" ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "border-b-2 border-[#E4E7EC] "}`}>
                    Certificate History
                </button>
            </div>
        </div>

        {certActive === "issueCert" && (
                <div>
                    <CertificateIssue/>
                </div>
            )

        }

        {certActive === "certHistory" && (
                <div>
                    <CertificateHistory/>
                </div>
            )

        }
        
    </div>
  )
}

export default CertificateIssueHistory