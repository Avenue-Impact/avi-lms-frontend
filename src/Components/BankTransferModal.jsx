import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import DashButton from '../pages/auth/ButtonDash';
import { STUDENT_BASE_URL } from '@/constant';
import Cookies from 'js-cookie';


const BankTransferModal = ({ isOpen, onClose, transactionId, enrollmentId, bankDetails, amount, currency, onBack }) => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please upload evidence of payment");
            return;
        }
        if (!confirmed) {
            toast.error("Please confirm you have made the transfer");
            return;
        }

        const formData = new FormData();
        formData.append('receipt', file);
        formData.append('transactionId', transactionId);
        formData.append('enrollmentId', enrollmentId);

        try {
            setIsUploading(true);
            const response = await axios.post(
                `${STUDENT_BASE_URL}/courses/bank-transfer/upload`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get("token")}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            toast.success("Receipt uploaded successfully!");
            onClose();
            // Redirect to dashboard or success page
             window.location.href = '/dashboard'; 
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to upload receipt");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-sans">
            <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                 <button 
                    onClick={onClose} 
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <h2 className="text-xl font-bold text-gray-800">Bank Transfer</h2>
                <p className="mb-6 text-sm text-gray-500">Make transfer to the account details provided</p>

                <div className="mb-6 rounded-lg border border-gray-100 p-4 shadow-sm">
                    <div className="grid grid-cols-2 gap-y-4">
                         <div>
                            <p className="text-xs text-gray-400">Account number</p>
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-gray-800">{bankDetails?.accountNumber || '0028811110'}</span>
                                <svg className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => {navigator.clipboard.writeText(bankDetails?.accountNumber); toast.success('Copied!');}}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-right">
                             <p className="text-xs text-gray-400">Bank name</p>
                             <p className="font-bold text-gray-800">{bankDetails?.bankName || 'GT Bank'}</p>
                        </div>
                        <div>
                             <p className="text-xs text-gray-400">Account name</p>
                             <p className="font-bold text-gray-800">{bankDetails?.accountName || 'Avenue Impact'}</p>
                        </div>
                         <div className="col-span-2 mt-2">
                             <input 
                                id="receipt-upload"
                                type="file" 
                                accept="image/*,application/pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label htmlFor="receipt-upload" className="flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-[#CC1747] bg-[#FFF5F7] py-3 text-sm text-[#CC1747] hover:bg-[#FFE0E6] transition">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                                {file ? file.name : "Upload evidence of payment"}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="confirm-transfer" 
                        checked={confirmed}
                        onChange={(e) => setConfirmed(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-[#CC1747] focus:ring-[#CC1747]"
                    />
                    <label htmlFor="confirm-transfer" className="text-xs text-gray-500 select-none cursor-pointer">
                        Only confirm if you have made transfer
                    </label>
                </div>

                <div className="space-y-3">
                     <button 
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="w-full rounded bg-[#CC1747] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#B3123F]"
                    >
                        {isUploading ? 'Uploading...' : `Confirm payment (${currency || '£'} ${amount || '0'})`}
                    </button>
                    <button 
                         onClick={onBack ? onBack : onClose}
                         className="w-full rounded border border-gray-300 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                        Back to payment methods
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BankTransferModal;
