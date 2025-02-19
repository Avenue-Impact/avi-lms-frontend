import React, { useEffect, useState } from "react";
import Modal from "../auth/components/Modal";
import ReferralModalForm from "../lms-pages/ReferralFormModal";
import { useFetchReferrals } from "@/hooks/students/use-fetch-referrals";
import DashButton from "../auth/ButtonDash";
import ReferralImg from "../../assets/images/image_111.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const ReferralPage = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const { data } = useFetchReferrals();
  console.log("This is user referral page", data);

  const [modal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      if (data) {
        setLoading(false);
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
      setLoading(false);
    }
  }, [data]);

  // console.log("Fecth referral", data);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Referral link copied to clipboard");
  };

  const referralCode = data?.data?.data?.referral_code;
  console.log("This is second referral", referralCode);

  const handleShare = async () => {
    if (!referralCode) {
      setError("No referral code available");
      return;
    }

    const referralLink = `https://localhost:5173/dashboard/referral?code=${referralCode}`;

    const shareData = {
      title: "Referral Code",
      text: `Use my referral code: ${referralCode}`,
      url: referralLink,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        setError("Failed to share the referral code.");
      }
    } else {
      setError("Sharing is not supported on this device.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <div className="flex flex-wrap justify-around text-sm md:flex-nowrap lg:gap-2">
        <div className="mb-4 w-full rounded-lg border-gray-300 bg-[#CC1747] px-6 py-12 text-white shadow-sm md:mb-0 md:flex-1 md:bg-transparent md:text-black lg:flex lg:flex-col lg:justify-between lg:border lg:p-4">
          <p className="text-[14px] font-[400] lg:text-sm lg:text-gray-600">
            Available balance
          </p>
          <h1 className="mt-10 text-[75px] font-[600] lg:mt-2 lg:text-4xl">
            {data?.data?.data?.available_balance.currency_symbol}
            {data?.data?.data?.available_balance.value}
          </h1>
        </div>

        <div className="mb-4 flex flex-1 flex-col justify-between rounded-lg border border-gray-300 p-2 shadow-sm md:mb-0 lg:p-4">
          <p className="text-[12px] font-[400] text-gray-600 lg:text-[14px] lg:text-sm">
            Total number of referrals
          </p>
          <h1 className="mt-2 text-[24px] font-[600] lg:text-4xl">
            {/* 09 */} {data?.data?.data?.referrals?.length ?? 0}
          </h1>
        </div>

        <div className="mx-2 mb-4 flex flex-1 flex-col justify-between rounded-lg border border-gray-300 p-2 shadow-sm md:mb-0 lg:p-4">
          <p className="text-[12px] font-[400] text-gray-600 lg:text-[14px]">
            Total amount
          </p>
          <h1 className="mt-2 text-[24px] font-[600] lg:text-4xl">
            {/* £129k  */} {data?.data?.data?.total_amount.currency_symbol}{" "}
            {data?.data?.data?.total_amount.value}
          </h1>
        </div>

        <div className="mx-2 mb-4 flex flex-1 flex-col justify-between rounded-lg border border-gray-300 p-2 shadow-sm md:mb-0 lg:p-4">
          <p className="text-[12px] font-[400] text-gray-600 lg:text-[14px]">
            Total amount withdrawn
          </p>
          <h1 className="mt-2 text-[24px] font-[600] lg:text-4xl">
            {/* £129k */}{" "}
            {data?.data?.data?.total_amount_withdrawn.currency_symbol}
            {data?.data?.data?.total_amount_withdrawn.value}
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
            Invite friends to join Avenue Impact and get amazing rewards for
            every successful referral.
          </p>

          <div className="my-6 mt-4 flex items-center rounded-lg bg-gray-100 p-4 pr-10 lg:my-0">
            <div className="mr-2 flex flex-col">
              <p className="text-sm text-gray-600">Your referral link</p>
              <p className="text-lg font-semibold">
                {data?.data?.data?.referral_code}
              </p>
            </div>
            <button
              className="ml-2 text-[#40B869] hover:text-[#48c674]"
              onClick={() =>
                copyToClipboard(`${data?.data?.data?.referral_code}`)
              }
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>

          <DashButton
            onClick={handleShare}
            className="mt-2 w-full bg-[#CC1747] px-32 text-white hover:bg-[#b30e3b] lg:w-2/5"
          >
            Share link
          </DashButton>
        </div>
      </div>

      {modal && (
        <Modal>
          <ReferralModalForm setModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};

export default ReferralPage;
