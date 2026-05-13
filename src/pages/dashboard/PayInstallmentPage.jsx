import { useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useFetchInstallments } from "@/hooks/students/use-fetch-installments";
import { usePayInstallment } from "@/hooks/students/use-pay-installment";
import BankTransferModal from "@/Components/BankTransferModal";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faExclamationTriangle,
  faArrowLeft,
  faCreditCard,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";

const statusConfig = {
  paid: { icon: faCheckCircle, color: "text-green-500", label: "Paid" },
  pending: { icon: faClock, color: "text-yellow-500", label: "Pending" },
  overdue: { icon: faExclamationTriangle, color: "text-red-500", label: "Overdue" },
};

const GATEWAYS = [
  { id: "stripe", label: "Credit / Debit Card", icon: faCreditCard },
  { id: "paystack", label: "Paystack", icon: faCreditCard },
  { id: "bank_transfer", label: "Bank Transfer", icon: faUniversity },
];

const PayInstallmentPage = () => {
  const { enrollmentId } = useParams();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  const [selectedGateway, setSelectedGateway] = useState("stripe");
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankTransferData, setBankTransferData] = useState(null);

  const { data, isLoading, isError } = useFetchInstallments(enrollmentId);
  const { payInstallment, isPending } = usePayInstallment();

  const installmentData = data?.data?.data;
  const installments = installmentData?.installments || [];
  const nextDue = installmentData?.nextDue;

  const handlePay = () => {
    if (!selectedGateway) {
      toast.error("Please select a payment method.");
      return;
    }

    payInstallment(
      { enrollmentId, gateway: selectedGateway },
      {
        onSuccess: (res) => {
          const d = res?.data;
          if (d?.url) {
            window.location.href = d.url;
          } else if (d?.bankDetails) {
            setBankTransferData(d);
            setShowBankModal(true);
          } else if (d?.message === "All installments are already paid.") {
            toast.success("All installments are fully paid! Refreshing...");
            setTimeout(() => window.location.reload(), 1500);
          }
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || "Payment failed. Please try again.");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#CC1747] border-t-transparent" />
      </div>
    );
  }

  if (isError || !installments.length) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
        <p className="text-gray-500">No installment records found for this enrollment.</p>
        <Link to="/dashboard" className="text-sm text-[#CC1747] underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const paidCount = installments.filter((i) => i.status === "paid").length;
  const total = installments.length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Back */}
      <Link
        to="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Dashboard
      </Link>

      <h1 className="mb-1 text-2xl font-bold text-[#23314A]">Installment Payment</h1>
      <p className="mb-6 text-sm text-gray-500">
        {paidCount} of {total} installments paid
      </p>

      {/* Progress bar */}
      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-[#CC1747] transition-all duration-500"
          style={{ width: `${(paidCount / total) * 100}%` }}
        />
      </div>

      {/* Installment schedule */}
      <div className="mb-8 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-700">Payment Schedule</h2>
        </div>
        <ul className="divide-y divide-gray-50">
          {installments.map((inst) => {
            const cfg = statusConfig[inst.status] || statusConfig.pending;
            const isNext = nextDue && inst._id === nextDue._id;
            return (
              <li
                key={inst._id}
                className={`flex items-center justify-between px-5 py-4 ${isNext ? "bg-red-50" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={cfg.icon} className={`text-lg ${cfg.color}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Installment {inst.installment_number} of {inst.total_installments}
                      {isNext && (
                        <span className="ml-2 rounded bg-red-100 px-1.5 py-0.5 text-xs font-semibold text-red-600">
                          Due Next
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400">
                      Due: {new Date(inst.due_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#23314A]">
                    £{inst.amount?.toLocaleString()}
                  </p>
                  <p className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Pay next installment section */}
      {nextDue ? (
        <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-semibold text-[#23314A]">Pay Next Installment</h2>
          <p className="mb-5 text-sm text-gray-500">
            Amount due:{" "}
            <span className="font-bold text-[#CC1747]">£{nextDue.amount?.toLocaleString()}</span>
          </p>

          {/* Gateway selector */}
          <div className="mb-5 space-y-3">
            <p className="text-sm font-medium text-gray-700">Select payment method</p>
            {GATEWAYS.map((gw) => (
              <label
                key={gw.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-all ${
                  selectedGateway === gw.id
                    ? "border-[#CC1747] bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="gateway"
                  value={gw.id}
                  checked={selectedGateway === gw.id}
                  onChange={() => setSelectedGateway(gw.id)}
                  className="accent-[#CC1747]"
                />
                <FontAwesomeIcon icon={gw.icon} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{gw.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handlePay}
            disabled={isPending}
            className="w-full rounded-lg bg-[#CC1747] py-3 text-sm font-semibold text-white transition hover:bg-[#B3123F] disabled:opacity-60"
          >
            {isPending ? "Processing..." : `Pay £${nextDue.amount?.toLocaleString()} Now`}
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-green-100 bg-green-50 p-6 text-center">
          <FontAwesomeIcon icon={faCheckCircle} className="mb-2 text-4xl text-green-500" />
          <h2 className="text-lg font-bold text-green-700">All installments paid!</h2>
          <p className="mt-1 text-sm text-gray-500">Your course access is fully restored.</p>
          <Link
            to="/dashboard"
            className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Back to Dashboard
          </Link>
        </div>
      )}

      {/* Bank Transfer Modal */}
      {showBankModal && bankTransferData && (
        <BankTransferModal
          isOpen={showBankModal}
          onClose={() => setShowBankModal(false)}
          onBack={() => setShowBankModal(false)}
          transactionId={bankTransferData.transactionId}
          enrollmentId={bankTransferData.enrollmentId}
          bankDetails={bankTransferData.bankDetails}
          amount={bankTransferData.amount}
          currency={bankTransferData.currency}
        />
      )}
    </div>
  );
};

export default PayInstallmentPage;
