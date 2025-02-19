import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { Heading, Paragraph } from "../../pages/auth/components/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import PasswordInput from "@/Components/ui/password-input";
import { useRequestWithdrawal } from "@/hooks/students/use-request-withdrawal";

// Validation Schema
const withdrawalSchema = z.object({
  name: z.string().min(2, "Full Name is required"),
  bankName: z.string().min(2, "Bank Name is required"),
  accNo: z.string().min(10, "Account Number must be at least 10 digits"),
  sortCode: z.string().optional(),
  amountWithdraw: z.string().min(1, "Enter amount to withdraw"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

const ReferralFormModal = ({ setModal }) => {
  const { isPending, withdrawal } = useRequestWithdrawal();
  console.log("THe full info about withdraaw", withdrawal);

  
  const form = useForm({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      name: "",
      bankName: "",
      accNo: "",
      sortCode: "",
      amountWithdraw: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data); // Log when user fills the form correctly

    withdrawal({
      name: data.name,
      amount: Number(data.amountWithdraw),
      bank_name: data.bankName,
      account_number: data.accNo,
      sort_code: data.sortCode || "",
      password: data.password,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <BorderCard className="max-h-[90vh] w-full max-w-[90%] overflow-y-auto rounded-lg bg-white p-6 shadow-lg md:max-w-[670px]">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <Heading className="text-left text-xl md:text-2xl">
              Request to Withdraw
            </Heading>
            <Paragraph className="text-left text-sm md:text-base">
              Request to withdraw your referrals’ fund
            </Paragraph>
          </div>
          <button
            type="button"
            className="text-2xl text-tertiary-color-700"
            onClick={() => setModal(false)}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormInput
              label="Full Name"
              name="name"
              control={form.control}
              type="text"
              id="name"
            />
            <FormInput
              label="Bank Name"
              name="bankName"
              control={form.control}
              type="text"
              id="bankName"
            />
            <FormInput
              label="Account Number"
              name="accNo"
              control={form.control}
              type="number"
              id="accNo"
            />
            <FormInput
              label="Sort Code (Optional)"
              name="sortCode"
              control={form.control}
              type="text"
              id="sortCode"
            />
            <FormInput
              label="Amount to Withdraw"
              name="amountWithdraw"
              control={form.control}
              type="number"
              id="amountWithdraw"
            />
            <PasswordInput
              id="password"
              label="Enter Password"
              name="password"
              control={form.control}
            />

            <p className="max-w-[429px] text-sm italic leading-5 text-primary-color-600">
              Enter your password to confirm that you want to withdraw your
              referral funds. This takes 4 to 5 working days.
            </p>

            <CommonButton
              className="hover:bg-primary-color-700 w-full bg-primary-color-600 py-2 text-lg font-medium text-white md:w-2/4"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Request Withdrawal"}
            </CommonButton>
          </form>
        </Form>
      </BorderCard>
    </div>
  );
};

export default ReferralFormModal;
