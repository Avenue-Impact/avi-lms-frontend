import React, { useState } from "react";
import AdminNav from "../../Components/admindashboard/AdminNav";
import {
  useGetBankTransfers,
  useApproveBankTransfer,
  useDeclineBankTransfer,
} from "../../hooks/admin-payment/use-bank-transfers";
import ReceiptModal from "../../Components/admin-payment/ReceiptModal";

const AdminBankTransfers = () => {
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedReceiptUrl, setSelectedReceiptUrl] = useState(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const { data, isLoading, error } = useGetBankTransfers(statusFilter);
  const { mutate: approve, isPending: isApproving } = useApproveBankTransfer();
  const { mutate: decline, isPending: isDeclining } = useDeclineBankTransfer();

  const handleViewReceipt = (url) => {
    setSelectedReceiptUrl(url);
    setIsReceiptModalOpen(true);
  };

  const transfers = data?.data?.data || [];

  return (
    <div>
      <AdminNav>
        <div className="flex w-full items-center justify-between pr-6">
          <h1 className="text-2xl font-medium text-[#344054]">
            Bank Transfers
          </h1>
        </div>
      </AdminNav>
      <main className="mt-3 px-6 py-7">
        <div className="mb-4 flex justify-end">
          <div className="flex items-center space-x-2 rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setStatusFilter("pending")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                statusFilter === "pending"
                  ? "bg-white text-[#CC1747] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter("success")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                statusFilter === "success"
                  ? "bg-white text-[#CC1747] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Approved
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Receipt
                </th>
                {statusFilter === "pending" && (
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={statusFilter === "pending" ? "6" : "5"}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={statusFilter === "pending" ? "6" : "5"}
                    className="px-6 py-4 text-center text-red-500"
                  >
                    Error loading transfers
                  </td>
                </tr>
              ) : transfers.length === 0 ? (
                <tr>
                  <td
                    colSpan={statusFilter === "pending" ? "6" : "5"}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No {statusFilter} transfers found
                  </td>
                </tr>
              ) : (
                transfers.map((transfer) => (
                  <tr key={transfer._id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(transfer.created_at).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {transfer.student_id?.first_name}{" "}
                      {transfer.student_id?.last_name}
                      <div className="text-xs text-gray-500">
                        {transfer.student_id?.email}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {transfer.course_id?.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                      {transfer.amount} {transfer.currency}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-blue-600">
                      <button
                        onClick={() =>
                          handleViewReceipt(
                            transfer.data.transaction_details.receipt_url,
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                      >
                        View Receipt
                      </button>
                    </td>
                    {statusFilter === "pending" && (
                      <td className="space-x-2 whitespace-nowrap px-6 py-4 text-sm font-medium">
                        <button
                          onClick={() => approve(transfer._id)}
                          disabled={isApproving || isDeclining}
                          className="rounded bg-green-100 px-3 py-1 text-green-700 hover:bg-green-200 disabled:opacity-50"
                        >
                          {isApproving ? "..." : "Approve"}
                        </button>
                        <button
                          onClick={() => decline(transfer._id)}
                          disabled={isApproving || isDeclining}
                          className="rounded bg-red-100 px-3 py-1 text-red-700 hover:bg-red-200 disabled:opacity-50"
                        >
                          {isDeclining ? "..." : "Decline"}
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        receiptUrl={selectedReceiptUrl}
      />
    </div>
  );
};

export default AdminBankTransfers;
