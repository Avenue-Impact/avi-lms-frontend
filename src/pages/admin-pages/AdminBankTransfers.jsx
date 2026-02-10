import React from 'react';
import AdminNav from "../../Components/admindashboard/AdminNav";
import { useGetPendingBankTransfers, useApproveBankTransfer, useDeclineBankTransfer } from "../../hooks/admin-payment/use-bank-transfers";

const AdminBankTransfers = () => {
    const { data, isLoading, error } = useGetPendingBankTransfers();
    const { mutate: approve, isPending: isApproving } = useApproveBankTransfer();
    const { mutate: decline, isPending: isDeclining } = useDeclineBankTransfer();

    if (isLoading) return <p className="p-6">Loading...</p>;
    if (error) return <p className="p-6 text-red-500">Error loading transfers</p>;

    const transfers = data?.data?.data || [];

    return (
        <div>
            <AdminNav>
                <h1 className="text-2xl font-medium text-[#344054]">Bank Transfers</h1>
            </AdminNav>
            <main className="mt-3 px-6 py-7">
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transfers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No pending transfers</td>
                                </tr>
                            ) : (
                                transfers.map((transfer) => (
                                    <tr key={transfer._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(transfer.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {transfer.student_id?.first_name} {transfer.student_id?.last_name}
                                            <div className="text-xs text-gray-500">{transfer.student_id?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {transfer.course_id?.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {transfer.amount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                            <a href={transfer.data.transaction_details.receipt_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                View Receipt
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button 
                                                onClick={() => approve(transfer._id)}
                                                disabled={isApproving || isDeclining}
                                                className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 disabled:opacity-50"
                                            >
                                                {isApproving ? '...' : 'Approve'}
                                            </button>
                                            <button 
                                                onClick={() => decline(transfer._id)}
                                                disabled={isApproving || isDeclining}
                                                className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 disabled:opacity-50"
                                            >
                                                {isDeclining ? '...' : 'Decline'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminBankTransfers;
