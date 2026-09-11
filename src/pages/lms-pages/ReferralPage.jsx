import React, { useState } from "react";
import Modal from "../auth/components/Modal";
import ReferralModalForm from "../lms-pages/ReferralFormModal";
import { useFetchReferrals } from "@/hooks/students/use-fetch-referrals";
import { useFetchMyWithdrawals } from "@/hooks/students/use-fetch-my-withdrawals";
import DashButton from "../auth/ButtonDash";
import ReferralImg from "../../assets/images/image_111.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faEnvelope, faClock, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faXTwitter,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import toast from "react-hot-toast";
import { formatDateString } from "@/lib/formatdatestring";

const ReferralPage = () => {
  const { data, isLoading: loadingReferrals, error } = useFetchReferrals();
  const { data: withdrawalsData, isLoading: loadingWithdrawals } = useFetchMyWithdrawals();

  const [modal, setShowModal] = useState(false);

  const referralData = data?.data?.data || data?.data;
  const referralCode = referralData?.referral_code;
  const referralLink = referralCode
    ? `${window.location.origin}/signup?code=${referralCode}`
    : "";

  const requestsList =
    withdrawalsData?.data ||
    withdrawalsData?.data?.requests ||
    (Array.isArray(withdrawalsData) ? withdrawalsData : []);

  const copyToClipboard = (text, customMsg) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(customMsg || "Referral link copied to clipboard");
  };

  const handleInstagramShare = () => {
    if (!referralLink) return;
    copyToClipboard(referralLink, "Referral link copied! Opening Instagram...");
    window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
  };

  const handleTiktokShare = () => {
    if (!referralLink) return;
    copyToClipboard(referralLink, "Referral link copied! Opening TikTok...");
    window.open("https://www.tiktok.com", "_blank", "noopener,noreferrer");
  };

  if (loadingReferrals) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">Loading referral information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p>Error: {error?.response?.data?.message ?? "Failed to load referral details."}</p>
      </div>
    );
  }

  const currencySymbol = referralData?.available_balance?.currency_symbol ?? "£";
  const shareMessage = `Join me on Avenue Impact! Use my referral code: ${referralCode} or sign up here: ${referralLink}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Available Balance */}
        <div className="rounded-xl border border-gray-200 bg-[#CC1747] p-5 text-white shadow-sm md:bg-white md:text-[#23314A]">
          <p className="text-xs font-medium uppercase tracking-wider text-white/80 md:text-gray-500">
            Available Balance
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-[#CC1747]">
            {currencySymbol}
            {referralData?.available_balance?.value ?? 0}
          </h2>
          <p className="mt-1 text-xs text-white/70 md:text-gray-400">Ready for withdrawal</p>
        </div>

        {/* Pending Balance */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Pending Withdrawal
          </p>
          <h2 className="mt-3 text-3xl font-bold text-amber-600">
            {currencySymbol}
            {referralData?.pending_balance?.value ?? 0}
          </h2>
          <p className="mt-1 text-xs text-gray-400">Processing payouts</p>
        </div>

        {/* Total Referrals */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Total Referrals
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-800">
            {referralData?.referrals?.length ?? 0}
          </h2>
          <p className="mt-1 text-xs text-gray-400">Students registered</p>
        </div>

        {/* Total Earned */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Total Earned
          </p>
          <h2 className="mt-3 text-3xl font-bold text-green-700">
            {currencySymbol}
            {referralData?.total_amount?.value ?? 0}
          </h2>
          <p className="mt-1 text-xs text-gray-400">Lifetime earnings</p>
        </div>

        {/* Total Withdrawn */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Total Withdrawn
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-700">
            {currencySymbol}
            {referralData?.total_amount_withdrawn?.value ?? 0}
          </h2>
          <p className="mt-1 text-xs text-gray-400">Completed payouts</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex justify-end">
        <DashButton
          onClick={() => setShowModal(true)}
          className="rounded-lg bg-[#CC1747] px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#b0133d] transition-colors"
        >
          Request to Withdraw
        </DashButton>
      </div>

      {/* Referral Link & Social Sharing Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-center">
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
          <img
            src={ReferralImg}
            alt="Referral Illustration"
            className="h-44 w-44 object-contain mb-3"
          />
          <h3 className="text-2xl font-bold text-gray-800">
            Refer a Friend & Earn 10% Cash Rewards!
          </h3>
          <p className="mt-2 text-sm text-gray-600 max-w-lg">
            Invite your network to Avenue Impact. When someone enrolls in any course using your link,
            you instantly earn a 10% cash reward credited directly to your balance.
          </p>

          {/* Referral Link Input Box */}
          <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 rounded-xl bg-gray-50 border border-gray-200 p-3 w-full">
            <div className="flex flex-col text-left flex-1 min-w-0 px-2">
              <span className="text-xs text-gray-500 font-medium">Your Unique Referral Link</span>
              <span className="text-sm font-semibold text-gray-800 truncate select-all">
                {referralLink || "Generating your referral link..."}
              </span>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-[#40B869] hover:bg-[#369e59] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors shrink-0"
              onClick={() => copyToClipboard(referralLink)}
            >
              <FontAwesomeIcon icon={faCopy} />
              Copy Link
            </button>
          </div>

          {/* Social Media Share Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 w-full">
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors flex-1 min-w-[130px]"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
              WhatsApp
            </a>

            {/* X (Twitter) */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors flex-1 min-w-[130px]"
            >
              <FontAwesomeIcon icon={faXTwitter} className="text-sm" />
              Post on X
            </a>

            {/* Instagram */}
            <button
              type="button"
              onClick={handleInstagramShare}
              className="inline-flex items-center justify-center gap-2 bg-[#CC1747] hover:bg-[#b0133d] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors flex-1 min-w-[130px]"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-sm" />
              Instagram
            </button>

            {/* TikTok */}
            <button
              type="button"
              onClick={handleTiktokShare}
              className="inline-flex items-center justify-center gap-2 bg-[#000000] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors flex-1 min-w-[130px]"
            >
              <FontAwesomeIcon icon={faTiktok} className="text-sm" />
              TikTok
            </button>

            {/* Email */}
            <a
              href={`mailto:?subject=${encodeURIComponent("Join me on Avenue Impact")}&body=${encodeURIComponent(
                `Hi,\n\nI'm inviting you to join Avenue Impact. Sign up using my referral link:\n${referralLink}\n\nBest regards!`
              )}`}
              className="inline-flex items-center justify-center gap-2 bg-[#1C2C64] hover:bg-[#15224e] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors flex-1 min-w-[130px]"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Withdrawal Requests History Table */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800">My Withdrawal Requests</h3>
            <p className="text-xs text-gray-500">Track all payouts and request statuses</p>
          </div>
        </div>

        {loadingWithdrawals ? (
          <p className="text-sm text-gray-500 py-6 text-center">Loading withdrawal history...</p>
        ) : requestsList.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-gray-500">You have not made any withdrawal requests yet.</p>
            <p className="text-xs text-gray-400 mt-1">
              Once you request a withdrawal, its status will be tracked here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-gray-700">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="p-3">S/N</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Bank Details</th>
                  <th className="p-3">Sort Code</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requestsList.map((req, idx) => {
                  const status = (req?.status || "pending").toLowerCase();
                  return (
                    <tr key={req._id || idx} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-medium text-gray-500">{idx + 1}</td>
                      <td className="p-3 whitespace-nowrap text-gray-600">
                        {req.created_at ? formatDateString(req.created_at) : "N/A"}
                      </td>
                      <td className="p-3 font-semibold text-gray-900">
                        {currencySymbol}
                        {req.amount_to_withdraw?.value ?? req.amount_to_withdraw ?? 0}
                      </td>
                      <td className="p-3">
                        <span className="font-medium text-gray-800">{req.bank_name}</span>
                        <span className="block text-xs text-gray-500 font-mono">
                          {req.account_number}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-xs text-gray-600">
                        {req.sort_code || "—"}
                      </td>
                      <td className="p-3">
                        {status === "pending" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20">
                            <FontAwesomeIcon icon={faClock} className="text-amber-600" />
                            Pending
                          </span>
                        ) : status === "paid" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                            Paid
                          </span>
                        ) : status === "rejected" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                            <FontAwesomeIcon icon={faTimesCircle} className="text-red-600" />
                            Rejected
                          </span>
                        ) : (
                          <span className="capitalize text-xs text-gray-500">{status}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
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
