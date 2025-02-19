import React, { useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faCheckCircle,
  faQuestionCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import DashButton from "@/pages/auth/ButtonDash";
import { CommonButton } from "@/Components/ui/button";
import Modal from "@/pages/auth/components/Modal";
import ModalContent from "@/pages/lms-pages/ReminderModalContent";
import BorderCard from "@/Components/BorderCard";
import { useSingleFinancialAid } from "@/hooks/financial-aid/use-fetch-financial-aid";
import { formatDateString } from "@/lib/formatdatestring";
import { useFinancialStatus } from "@/hooks/financial-aid/use-update-approve-reject-financial-aid";

const ViewDetails = () => {
  const [modal, setShowModal] = useState(false);
  // const [showCouponModal, setShowCouponModal] = useState(false);
  const [showSuccessModal, setshowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const { id, firstname, lastname, title, email } = useParams();

  const { data, isLoading, isError } = useSingleFinancialAid(id);
  const { isUpdating, isPending } = useFinancialStatus(id);

  const handleFinancialStatus = (status) => {
    // console.log("Sending status:", status);

    isUpdating({
      id,
      data: { status },
    });
  };

  // console.log("Get the single FinancialAid", data);
  // console.log("Get the single isLoading", isLoading);
  // console.log("Get the single isError", isError);

  return (
    <div>
      {isError ? (
        "Network error"
      ) : isLoading ? (
        "Loading..."
      ) : (
        <div className="pt-24">
          <div className="flex w-full items-center justify-between gap-1 md:gap-6 lg:w-max lg:justify-normal">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="flex items-center gap-1"
            >
              <span className="flex items-center justify-center rounded-sm border-[#E4E7EC] text-base text-black md:h-6 md:w-6 md:border md:text-[10px]">
                <FontAwesomeIcon icon={faArrowLeft} className="m-4" />
              </span>
              <span className="hidden text-sm capitalize text-[#667185] md:block">
                go back
              </span>
            </button>
            <p className="text-sm font-medium text-black lg:text-lg 2xl:text-2xl">
              {firstname} {lastname}’s Document
            </p>
          </div>

          <div className="mb-4 mt-5 grid grid-cols-12 gap-14 rounded border border-gray-300 p-10 md:mb-0">
            <div className="col-span-5">
              {/* Render the finance details here */}
              <div className="text-[14px]">
                <p className="text-[24px] font-[500] text-[#344054]">
                  {firstname} {lastname}{" "}
                </p>
                <p className="text-[#667185]">
                  {email} | {title} |{" "}
                  {formatDateString(data?.data?.data.createdAt)}
                </p>

                <button
                  className={`rounded border-b bg-[#F3FFF7] px-2 py-1 font-[500] capitalize ${data?.data?.data?.status === "approved" ? "bg-[#F3FFF7] text-[#00A92F]" : " "} ${data?.data?.data?.status === "rejected" ? "bg-[#FFECE5] text-[#AD3307]" : " "} ${data?.data?.data?.status === "pending" ? "bg-[#FFFFE5] text-[#DBC500]" : " "} `}
                >
                  {data?.data?.data.status}
                </button>
              </div>
            </div>

            <div className="col-span-7 mr-14">
              <div className="space-y-4 text-justify text-[14px]">
                <div className="space-y-2">
                  <p className="text-[16px] font-[500] text-[#475367]">
                    Course
                  </p>
                  <p className="text-[#667185]">{title}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-[16px] font-[500] text-[#475367]">
                    Reason for Applying for Aid:
                  </p>
                  <p className="text-[#667185]">
                    {data?.data?.data?.reason_for_application}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-[16px] font-[500] text-[#475367]">
                    How will your selected course help with your goals?
                  </p>
                  <p className="text-[#667185]">
                    {data?.data?.data?.how_will_it_help}
                  </p>
                </div>
              </div>

              {/* Button */}
              {data?.data?.data && (
                <>
                  {data?.data?.data.status === "approved" && (
                    <div className="ml-auto mt-6 w-max">
                      <CommonButton
                        onClick={() => setShowModal((prev) => !prev)}
                        className="ml-6 bg-primary-color-600 px-9"
                      >
                        {/* Create Coupon */} Approved
                      </CommonButton>
                    </div>
                  )}

                  {data?.data?.data?.status === "pending" && (
                    <div className="ml-auto mt-6 w-max">
                      <CommonButton
                        // onClick={() => setShowModal((prev) => !prev)}
                        onClick={() => handleFinancialStatus("rejected")}
                        disabled={isPending}
                        className="px-9"
                        variant="outline"
                      >
                        {isPending ? "Rejecting..." : "Reject"}
                      </CommonButton>
                      <CommonButton
                        onClick={() => setShowModal((prev) => !prev)}
                        className="ml-6 bg-primary-color-600 px-9"
                      >
                        Approve
                      </CommonButton>
                    </div>
                  )}

                  {data?.data?.data?.status === "rejected" && (
                    <div className="ml-auto mt-6 w-max">
                      <CommonButton
                        onClick={() => setShowModal((prev) => !prev)}
                        className="px-9: ml-6 bg-[#98A2B3] hover:bg-[#8a94a4]"
                      >
                        Rejected
                      </CommonButton>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Modal for Pending Status */}
          {data?.data?.data?.status === "pending" && modal && (
            <Modal>
              <BorderCard className="w-2/5 rounded-lg bg-white p-6 shadow-lg">
                <button
                  className="float-right text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowModal((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>

                <div className="mt-4 text-center">
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    className="rounded-full bg-[#F2A356] p-2 text-[24px] text-white"
                  />
                  <h2 className="mb-4 text-[16px] font-[600] text-[#23314A]">
                    Approve Financial Aid Request
                  </h2>
                  <p className="mb-6 text-[14px] text-[#98A2B3]">
                    Are you sure you want to approve this financial aid request
                    for{" "}
                    <span className="font-[600] text-[#566B8E]">
                      {firstname}{" "}
                    </span>{" "}
                    ? This action will grant the requested financial aid to the
                    student and cannot be undone.
                  </p>

                  <div className="flex justify-center space-x-4">
                    <CommonButton
                      className="rounded-md border border-gray-400 px-9 py-2 text-gray-600 hover:bg-gray-100"
                      variant="outline"
                      onClick={() => setShowModal((prev) => !prev)}
                    >
                      Cancel
                    </CommonButton>
                    <CommonButton
                      onClick={() => {
                        setshowSuccessModal((prev) => !prev);
                        handleFinancialStatus("approved");
                      }}
                      className="hover:bg-primary-color-700 ml-6 rounded-md bg-primary-color-600 px-9 py-2 text-white"
                      disabled={isPending}
                    >
                      {isPending ? "Accepting..." : "Yes, Approve"}
                    </CommonButton>
                  </div>
                </div>
              </BorderCard>
            </Modal>
          )}

          {showSuccessModal && (
            <Modal>
              <BorderCard className="w-2/5 rounded-lg bg-white p-6 shadow-lg">
                <button
                  className="float-right text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setshowSuccessModal(false)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>

                <div className="mt-4 text-center">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="rounded-3xl bg-green-500 p-3 text-[24px] text-white"
                  />
                  <h2 className="mb-4 text-[16px] font-[600] text-[#23314A]">
                    Financial Aid Approved
                  </h2>
                  <p className="mb-6 text-[14px] text-[#98A2B3]">
                    The financial aid request for{" "}
                    <span className="font-[600] text-[#566B8E]">
                      {firstname}{" "}
                    </span>{" "}
                    has been approved successfully.
                  </p>

                  <div className="flex justify-center space-x-4">
                    <CommonButton
                      // onClick={() => setShowCouponModal((prev) => !prev)}
                      onClick={() => setshowSuccessModal(false)}
                      className="hover:bg-primary-color-700 rounded-md bg-primary-color-600 px-9 py-2 text-white"
                    >
                      {/* Create Coupon */} Ok
                    </CommonButton>
                  </div>
                </div>
              </BorderCard>
            </Modal>
          )}

          {/* Modal for Approved Status */}
          {/* {data?.data?.data?.status === 'approved' && modal && (
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
                  The financial aid request for <span className='font-[600] text-[#566B8E]'>{firstname} </span> has been approved successfully.
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
        </div>
      )}
    </div>
  );
};

export default ViewDetails;
