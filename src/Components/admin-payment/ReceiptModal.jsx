import React from "react";
import { FaDownload, FaTimes } from "react-icons/fa";

const ReceiptModal = ({ isOpen, onClose, receiptUrl }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Attempt download by creating an invisible link
    const link = document.createElement("a");
    link.href = receiptUrl;
    link.download = "Receipt.jpg"; // or dynamically extracted filename
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl">
        {/* Header Options */}
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-medium text-gray-900">
            Transfer Receipt
          </h3>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-md bg-[#CC1747] px-4 py-2 text-sm text-white transition-colors hover:bg-[#A31238]"
            >
              <FaDownload /> Download
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
              aria-label="Close modal"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex justify-center p-4">
          {receiptUrl ? (
            <img
              src={receiptUrl}
              alt="Bank Transfer Receipt"
              className="max-h-[70vh] w-auto max-w-full rounded object-contain shadow"
            />
          ) : (
            <div className="py-12 text-gray-500">
              No receipt image available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
