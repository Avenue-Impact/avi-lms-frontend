// import React, { useState } from "react";

import BorderCard from "@/Components/BorderCard";

import FinancialStudentAidPage from "../lms-pages/FinancialStudentAidPage";
import ReferralPage from "../lms-pages/ReferralPage";
import { useState } from "react";

const Referral = () => {

  

  const [selectedOption, setSelectedOption] = useState("referral");

  

  return (
    <div>
      {/* Dashboard Balance */}
      <div className="flex flex-col justify-center">
        <div className="flex space-x-4">
          <button
            className={`border-b-2 px-4 py-2 text-[14px] font-[500] lg:text-[16px] ${selectedOption === "referral" ? "border-[#CC1747]" : "border-transparent text-gray-500"}`}
            onClick={() => setSelectedOption("referral")}
          >
            Referral
          </button>
          <button
            className={`border-b-2 px-4 py-2 text-[14px] font-[500] lg:text-[16px] ${selectedOption === "financialAid" ? "border-[#CC1747]" : "border-transparent text-gray-500"}`}
            onClick={() => setSelectedOption("financialAid")}
          >
            Financial Aid
          </button>
        </div>

        <div className="w-full rounded py-6">
          {selectedOption === "referral" && (
            <ReferralPage/>
          )}

          {selectedOption === "financialAid" && (
            <div>
                <FinancialStudentAidPage/>
            </div>
          )}
        </div>

       
      </div>
    </div>
  );
};

export default Referral;
