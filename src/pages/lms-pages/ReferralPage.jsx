import React, { useEffect, useState } from "react";
import Modal from "../auth/components/Modal";
import ReferralModalForm from "../lms-pages/ReferralFormModal";
import { useFetchReferrals } from "@/hooks/students/use-fetch-referrals";
import DashButton from "../auth/ButtonDash";
import ReferralImg from "../../assets/images/image_111.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

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
    toast.success("Referral link copied to clipboard");
  };

  const referralCode = data?.data?.data?.referral_code;

  const handleShare = async () => {
    if (!referralCode) {
      setError("No referral code available");
      return;
    }

    // const referralLink = `https://www.avenueimpact.com/dashboard/referral?code=${referralCode}`;
    const referralLink = `${window.location.origin}/signup?code=${referralCode}`;

    const shareData = {
      title: "Referral Code",
      text: `Use my referral code: ${referralCode}`,
      url: referralLink,
    };

    copyToClipboard(referralLink);
    // if (navigator.share) {
    //   try {
    //     await navigator.share(shareData);
    //   } catch (err) {
    //     setError("Failed to share the referral code.");
    //   }
    // } else {
    //   setError("Sharing is not supported on this device.");
    // }
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>Error: {error?.response?.data?.message ?? "Something went wrong"}</p>
    );
  return (
    <div>
      <div className="flex flex-wrap justify-around text-sm md:flex-nowrap lg:gap-2">
        <div className="mb-4 w-full rounded-lg border-gray-300 bg-[#CC1747] px-6 py-12 text-white shadow-sm md:mb-0 md:flex-1 md:bg-transparent md:text-black lg:flex lg:flex-col lg:justify-between lg:border lg:p-4">
          <p className="text-[14px] font-[400] lg:text-sm lg:text-gray-600">
            Available balance
          </p>
          <h1 className="mt-10 text-[75px] font-[600] lg:mt-2 lg:text-4xl">
            {data?.data?.data?.available_balance?.currency_symbol ?? "£"}
            {data?.data?.data?.available_balance?.value ?? "0"}
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
            {/* £129k  */}{" "}
            {data?.data?.data?.total_amount?.currency_symbol ?? "£"}{" "}
            {data?.data?.data?.total_amount?.value ?? "0"}
          </h1>
        </div>

        <div className="mx-2 mb-4 flex flex-1 flex-col justify-between rounded-lg border border-gray-300 p-2 shadow-sm md:mb-0 lg:p-4">
          <p className="text-[12px] font-[400] text-gray-600 lg:text-[14px]">
            Total amount withdrawn
          </p>
          <h1 className="mt-2 text-[24px] font-[600] lg:text-4xl">
            {/* £129k */}{" "}
            {data?.data?.data?.total_amount_withdrawn?.currency_symbol ?? "£"}
            {data?.data?.data?.total_amount_withdrawn?.value ?? "0"}
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

          <div className="my-6 mt-4 flex flex-col sm:flex-row items-center gap-3 rounded-lg bg-gray-100 p-4 max-w-xl mx-auto w-full">
            <div className="flex flex-col text-left flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium">Your referral link</p>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {referralCode ? `${window.location.origin}/signup?code=${referralCode}` : "Loading..."}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-[#40B869] hover:bg-[#369e59] text-white px-4 py-2 rounded-md text-xs font-semibold shadow-sm transition-colors shrink-0"
              onClick={() =>
                copyToClipboard(`${window.location.origin}/signup?code=${referralCode}`)
              }
            >
              <FontAwesomeIcon icon={faCopy} />
              Copy Link
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 w-full max-w-xl mx-auto">
            {/* WhatsApp Share */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Join me on Avenue Impact! Use my referral link to sign up: ${window.location.origin}/signup?code=${referralCode}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors flex-1 min-w-[140px]"
            >
              Share on WhatsApp
            </a>

            {/* Email Share */}
            <a
              href={`mailto:?subject=${encodeURIComponent("Join me on Avenue Impact")}&body=${encodeURIComponent(`Hi,\n\nI'm inviting you to join Avenue Impact. Sign up using my referral link to get started:\n${window.location.origin}/signup?code=${referralCode}\n\nBest regards!`)}`}
              className="inline-flex items-center justify-center gap-2 bg-[#1C2C64] hover:bg-[#15224e] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors flex-1 min-w-[140px]"
            >
              Share via Email
            </a>
          </div>
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
