import React, { useState } from "react";
import DashButton from "../auth/ButtonDash";
import ReferralImg from "../../assets/images/image_111.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Modal from "../auth/components/Modal";
import BorderCard from "@/Components/BorderCard";
import ReferralModalForm from "../lms-pages/ReferralFormModal";
import DashSelect from "../auth/components/DashSelect";

const Referral = () => {
  const [selectedOption, setSelectedOption] = useState("referral");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Referral link copied to clipboard");
  };

  const [modal, setShowModal] = useState(false);

  const [reason, setReason] = useState("");
  const [goal, setGoal] = useState("");
  const [accurateInfo, setAccurateInfo] = useState(false);
  const [commitment, setCommitment] = useState(false);

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
            <div>
              <div className="flex flex-wrap justify-around text-sm md:flex-nowrap lg:gap-2">
                <div className="mb-4 w-full rounded-lg border-gray-300 bg-[#CC1747] px-6 py-12 text-white shadow-sm md:mb-0 md:flex-1 md:bg-transparent md:text-black lg:flex lg:flex-col lg:justify-between lg:border lg:p-4">
                  <p className="text-[14px] font-[400] lg:text-sm lg:text-gray-600">
                    Available balance
                  </p>
                  <h1 className="mt-10 text-[75px] font-[600] lg:mt-2 lg:text-4xl">
                    £100k
                  </h1>
                </div>

                <div className="mb-4 flex flex-1 flex-col justify-between rounded-lg border border-gray-300 p-2 shadow-sm md:mb-0 lg:p-4">
                  <p className="text-[12px] font-[400] text-gray-600 lg:text-[14px] lg:text-sm">
                    Total number of referrals
                  </p>
                  <h1 className="mt-2 text-[24px] font-[600] lg:text-4xl">
                    09
                  </h1>
                </div>

                <div className="mx-2 mb-4 flex flex-1 flex-col justify-between rounded-lg border border-gray-300 p-2 shadow-sm md:mb-0 lg:p-4">
                  <p className="text-[12px] font-[400] text-gray-600 lg:text-[14px]">
                    Total amount
                  </p>
                  <h1 className="mt-2 text-[24px] font-[600] lg:text-4xl">
                    £129k
                  </h1>
                </div>

                <div className="mx-2 mb-4 flex flex-1 flex-col justify-between rounded-lg border border-gray-300 p-2 shadow-sm md:mb-0 lg:p-4">
                  <p className="text-[12px] font-[400] text-gray-600 lg:text-[14px]">
                    Total amount withdrawn
                  </p>
                  <h1 className="mt-2 text-[24px] font-[600] lg:text-4xl">
                    £129k
                  </h1>
                </div>

                <div className="flex w-full items-start md:w-auto md:flex-1">
                  <DashButton
                    onClick={() => setShowModal((prev) => !prev)}
                    className="w-full rounded bg-[#CC1747] px-4 py-3 text-white shadow-md md:w-auto lg:py-2"
                  >
                    Request to withdraw
                  </DashButton>
                </div>
              </div>

              {/*  */}
              <div className="lg:border-white-300 my-6 rounded-lg text-center lg:border-2 lg:bg-white lg:p-6">
                <div className="flex flex-col items-center justify-center rounded-lg lg:p-6">
                  <img
                    src={ReferralImg}
                    alt="No Courses"
                    className="h-70 mb-4 w-80 rounded-full"
                  />
                  <h3 className="mb-2 text-2xl font-semibold text-gray-800">
                    Refer a Friend and Earn Promo Code!
                  </h3>
                  <p className="mb-4 text-center text-sm text-gray-600">
                    Invite friends to join Avenue Impact and get amazing rewards
                    for every successful referral.
                  </p>

                  <div className="my-6 mt-4 flex items-center rounded-lg bg-gray-100 p-4 pr-10 lg:my-0">
                    <div className="mr-2 flex flex-col">
                      <p className="text-sm text-gray-600">
                        Your referral link
                      </p>
                      <p className="text-lg font-semibold">AVIWOCXZ11</p>
                    </div>
                    <button
                      className="ml-2 text-[#40B869] hover:text-[#48c674]"
                      onClick={() => copyToClipboard("AVIWOCXZ11")}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                  </div>

                  <DashButton className="mt-2 w-full bg-[#CC1747] px-32 text-white hover:bg-[#b30e3b] lg:w-2/5">
                    Share link
                  </DashButton>
                </div>
              </div>
            </div>
          )}

          {selectedOption === "financialAid" && (
            <div>
              <div className="border-white-300 my-6 rounded-lg lg:border-2 lg:bg-white lg:p-6 lg:px-24">
                <div className="justify-center rounded-lg lg:flex lg:flex-col lg:p-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">
                    Make sure the information you provide is correct.
                  </h3>

                  <div>
                    <p className="py-1 text-[14px] font-medium lg:text-[16px]">
                      Select Course
                    </p>
                    <DashSelect />
                  </div>

                  <div className="space-y-4 pt-4 text-[14px]">
                    <div>
                      <p className="text-gray-700 lg:font-medium">
                        Reason you applied for aid
                      </p>
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full rounded border border-gray-300 p-2"
                        rows="10"
                      ></textarea>
                    </div>

                    <div>
                      <p className="font-medium text-gray-700">
                        How will your selected course help with your goals?
                      </p>
                      <textarea
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full rounded border border-gray-300 p-2"
                        rows="10"
                      ></textarea>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-medium">
                        Terms and conditions
                      </h2>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={accurateInfo}
                          onChange={(e) => setAccurateInfo(e.target.checked)}
                          className="mr-2"
                        />
                        <label className="text-gray-600">
                          I'm sharing accurate information on my application
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={commitment}
                          onChange={(e) => setCommitment(e.target.checked)}
                          className="mr-2"
                        />
                        <label className="text-gray-600">
                          I commit to finishing my Avenue course
                        </label>
                      </div>
                    </div>
                    <DashButton className="mt-2 w-full bg-[#CC1747] px-32 text-white hover:bg-[#b30e3b] lg:w-2/4">
                      Submit
                    </DashButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {modal && (
          <Modal>
            <ReferralModalForm setModal={setShowModal} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Referral;
