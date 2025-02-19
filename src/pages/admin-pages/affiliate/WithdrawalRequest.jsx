import React, { useState } from "react";
// import { withdrawalRequest } from '@/lib/withdrawalRequest'
import DashButton from "@/pages/auth/ButtonDash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faDownload,
  faQuestionCircle,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import MarkRead from "../../../assets/images/mark_as_read.svg";
import MarkPaid from "../../../assets/images/mark_paid.svg";
import Modal from "@/pages/auth/components/Modal";
import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { useFetchWithdrawalRequests } from "@/hooks/affiliate/use-fetch-withdrawal-requests";
import { formatDateString } from "@/lib/formatdatestring";
import { useFetchGeneralCSVRequest } from "@/hooks/affiliate/use-generate-csv-file-withdrawal-requests";
import { useUpdateWithdrawalRequest } from "@/hooks/affiliate/use-update-withdrawal-request-status";
// import { useUpdateWithdrawalRequest } from "@/hooks/affiliate/use-update-withdrawal-request-status";
// import { useFetchUpdateWithdrawalRequest } from "@/hooks/affiliate/use-update-withdrawal-request-status";

const WithdrawalRequest = () => {
  // const [modal, setModal] = useState("");
  // const [currentRequestId, setCurrentRequestId] = useState(null);

  const { data, isLoading, isError } = useFetchWithdrawalRequests();
  console.log("The Fetch Withdrawal Requests", data);

    const { mutate: updateWithdrawalRequest, isPending } = useUpdateWithdrawalRequest();
    console.log("updateWithdrawalRequest", updateWithdrawalRequest);

 const handleMarkAsPaid = (requestId) => {
   updateWithdrawalRequest(
     { requestId, data: { status: "paid" } }, 
    //  {
    //    onSuccess: () => {
    //      setModal(true);
    //      setCurrentRequestId(requestId);
    //      console.log("Request marked as paid successfully!");
    //    },
    //    onError: (error) => {
    //      console.error("Error marking request as paid:", error);
    //    },
    //  },
   );
 };

    
  const { refetch, isFetching } = useFetchGeneralCSVRequest();

  const handleDownload = async () => {
    try {
      const { data } = await refetch();
      if (data) {
        const blob = new Blob([data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "withdrawal_requests.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const handleCopy = (account_number, bank_name) => {
    const textToCopy = `${account_number} ${bank_name}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Account details copied successfully!");
    });
  };

  return (
    <div className="mt-8 pl-3">
      <div className="grid grid-cols-12 py-10">
        <div className="font-[500]text-[#344054] col-span-4 text-[20px]">
          <p>Withdrawal Request</p>
        </div>

        <div className="col-span-8">
          <div className="flex items-center justify-between">
            <div className="relative w-3/4">
              <input
                type="text"
                className="w-full rounded-md border bg-gray-50 px-1 py-2 pl-10 text-[14px] focus:outline-none"
                placeholder="Search Course"
              />
              <div className="absolute left-3 top-1.5 text-gray-400">
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>

            <div>
              <DashButton
                className="rounded p-2 text-white"
                onClick={handleDownload}
                disabled={isFetching}
              >
                <FontAwesomeIcon icon={faDownload} />{" "}
                {isFetching ? "Downloading..." : "Export CSV"}
              </DashButton>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Request Data */}
      <div className="overflow-x-auto">
        {isError ? (
          "Network Error..."
        ) : isLoading ? (
          "Loading..."
        ) : (
          <table className="w-full border border-gray-300 bg-white text-[13px] text-[#344054]">
            <thead>
              <tr className="bg-[#E4E7EC]">
                <th className="border-b p-4 text-left">S/N</th>
                <th className="border-b p-4 text-left">Name</th>
                <th className="border-b p-4 text-left">Account Details</th>
                <th className="border-b p-4 text-left">Sort Code</th>
                <th className="border-b p-4 text-left">Amount</th>
                <th className="border-b p-4 text-left">Available Balance</th>
                <th className="border-b p-4 text-left">Date</th>
                <th className="border-b p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {data?.data?.data?.requests.map((request, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">
                    {request.student_details.first_name}{" "}
                    {request.student_details.last_name}
                    <br />
                    {request.student_details.email.length > 15
                      ? `${request.student_details.email.slice(0, 15)}...`
                      : request.student_details.email}
                  </td>
                  <td className="flex items-center p-4">
                    {request.account_number} | {request.bank_name}
                    <button
                      className="ml-2 text-blue-600 hover:text-blue-800"
                      onClick={() =>
                        handleCopy(request.account_number, request.bank_name)
                      }
                    >
                      <FontAwesomeIcon
                        icon={faCopy}
                        className="ml-2 text-[#98A2B3]"
                      />
                    </button>
                  </td>
                  <td className="p-4">{request.sort_code}</td>
                  <td className="p-4">{request.amount_to_withdraw.value}</td>
                  <td className="p-4">{request.available_balance.value}</td>
                  <td className="p-4">
                    {formatDateString(request.created_at)}
                  </td>
                  <td className="p-4">
                    {/* Status Button Based on API Response */}
                    {request.status === "pending" ? (
                      <button
                        onClick={() => handleMarkAsPaid(request._id)}
                        disabled={isPending}
                        className="flex items-center justify-center rounded bg-[#CC1747] px-3 py-2 text-white"
                      >
                        <img src={MarkRead} alt="Pending" className="mr-2" />
                        {isPending ? "Processing..." : "Mark as Paid"}
                      </button>
                    ) : request.status === "paid" ? (
                      <button className="flex items-center justify-center rounded bg-[#FFECE5] px-3 py-2 text-[#CC1747]">
                        <img src={MarkPaid} alt="Paid" className="mr-2" />
                        Payment Paid
                      </button>
                    ) : (
                      <span className="text-gray-500">Unknown Status</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* {modal && (
        <Modal>
          <BorderCard className="w-2/5 rounded-lg bg-white p-6 shadow-lg">
            <button
              className="float-right text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setModal(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="mt-4 text-center">
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="rounded-full bg-[#F2A356] p-2 text-[24px] text-white"
              />
              <h2 className="mb-4 pt-4 text-[16px] font-[600] text-[#23314A]">
                Mark as Paid
              </h2>
              <p className="mb-6 text-[14px] text-[#98A2B3]">
                Are you sure you want to mark this as paid?
              </p>

              <div className="flex justify-center space-x-4">
                <CommonButton
                  onClick={() => setModal(false)}
                  className="rounded-md border border-gray-400 px-9 py-2 text-gray-600 hover:bg-gray-100"
                  variant="outline"
                >
                  Cancel
                </CommonButton>
                <CommonButton
                  className="hover:bg-primary-color-700 ml-6 rounded-md bg-primary-color-600 px-9 py-2 text-white"
                  onClick={handleConfirmMarkPaid} 
                >
                  Yes, Mark
                </CommonButton>
              </div>
            </div>
          </BorderCard>
        </Modal>
      )} */}
    </div>
  );
};

export default WithdrawalRequest;
