import { EmptyPaymentIcon } from "../Icon";

const EmptyPayment = () => {
  return (
    <div className="grid h-full items-center justify-center">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="mb-4 mt-11">
          <EmptyPaymentIcon />
        </div>
        <div className="w-full max-w-[512px] text-center">
          <h3 className="text-xl font-medium text-[#101928]">
            No Payment Recorded
          </h3>
          <p className="mt-2 text-center font-light text-[#101928]">
            There are no payment records available at the moment. Once students
            complete their transactions, payment details will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyPayment;
