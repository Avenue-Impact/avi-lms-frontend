import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { Input } from "@/Components/ui/input";
import { Heading, Paragraph } from "../../pages/auth/components/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import PasswordInput from "@/Components/ui/password-input";
import { useRequestWithdrawal } from "@/hooks/students/use-request-withdrawal";
import { cn } from "@/lib/utils";

// Format UK Sort Code as XX-XX-XX
const formatSortCode = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 6);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
};

// Comprehensive Validation Schema with Country/Bank Details Verification
const withdrawalSchema = z
  .object({
    accountType: z.enum(["UK", "NG", "OTHER"]).default("UK"),
    name: z.string().trim().min(2, "Full Name is required"),
    bankName: z.string().trim().min(2, "Bank Name is required"),
    accNo: z.string().trim().min(1, "Account Number is required"),
    sortCode: z.string().optional(),
    amountWithdraw: z
      .string()
      .trim()
      .min(1, "Enter amount to withdraw")
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Enter a valid withdrawal amount greater than 0",
      }),
    password: z.string().min(4, "Password must be at least 4 characters"),
  })
  .superRefine((data, ctx) => {
    const rawAcc = data.accNo.replace(/\s+/g, "");
    if (data.accountType === "UK") {
      // UK Bank Accounts are strictly 8 digits
      if (!/^\d{8}$/.test(rawAcc)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["accNo"],
          message: "UK bank account number must be exactly 8 digits",
        });
      }
      // UK Sort Codes are 6 digits
      const rawSort = (data.sortCode || "").replace(/[^0-9]/g, "");
      if (!/^\d{6}$/.test(rawSort)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["sortCode"],
          message: "UK sort code is required and must be 6 digits (e.g. 12-34-56)",
        });
      }
    } else if (data.accountType === "NG") {
      // Nigerian NUBAN is strictly 10 digits
      if (!/^\d{10}$/.test(rawAcc)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["accNo"],
          message: "Nigerian NUBAN account number must be exactly 10 digits",
        });
      }
    } else if (data.accountType === "OTHER") {
      if (rawAcc.length < 6 || rawAcc.length > 34) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["accNo"],
          message: "Account number / IBAN must be between 6 and 34 characters",
        });
      }
    }
  });

const ReferralFormModal = ({ setModal }) => {
  const { isPending, withdrawal } = useRequestWithdrawal();

  const form = useForm({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      accountType: "UK",
      name: "",
      bankName: "",
      accNo: "",
      sortCode: "",
      amountWithdraw: "",
      password: "",
    },
  });

  const accountType = form.watch("accountType");

  const handleAccountTypeChange = (type) => {
    form.setValue("accountType", type);
    form.clearErrors(["accNo", "sortCode"]);
  };

  const onSubmit = async (data) => {
    const cleanedAcc = data.accNo.replace(/\s+/g, "");
    const formattedSort = data.sortCode ? data.sortCode.trim() : "";
    withdrawal(
      {
        name: data.name.trim(),
        amount: Number(data.amountWithdraw),
        bank_name: data.bankName.trim(),
        account_number: cleanedAcc,
        sort_code: formattedSort,
        password: data.password,
      },
      {
        onSuccess: () => {
          form.reset();
          setModal(false);
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <BorderCard className="max-h-[90vh] w-full max-w-[90%] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl md:max-w-[640px]">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between border-b pb-3">
          <div>
            <Heading className="text-left text-xl font-bold text-gray-900 md:text-2xl">
              Request Withdrawal
            </Heading>
            <Paragraph className="text-left text-xs text-gray-500 md:text-sm">
              Withdraw your referral earnings directly to your bank account
            </Paragraph>
          </div>
          <button
            type="button"
            className="rounded-lg p-1 text-2xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setModal(false)}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>

        {/* Account Destination Selector */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-600">
            Account Destination / Type
          </label>
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => handleAccountTypeChange("UK")}
              className={cn(
                "rounded-md py-2 text-xs font-semibold transition-all",
                accountType === "UK"
                  ? "bg-white text-primary-color-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              UK Bank (8 Digits)
            </button>
            <button
              type="button"
              onClick={() => handleAccountTypeChange("NG")}
              className={cn(
                "rounded-md py-2 text-xs font-semibold transition-all",
                accountType === "NG"
                  ? "bg-white text-primary-color-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Nigeria (10 Digits)
            </button>
            <button
              type="button"
              onClick={() => handleAccountTypeChange("OTHER")}
              className={cn(
                "rounded-md py-2 text-xs font-semibold transition-all",
                accountType === "OTHER"
                  ? "bg-white text-primary-color-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              International (IBAN)
            </button>
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3.5">
            <FormInput
              label="Account Holder Full Name"
              name="name"
              control={form.control}
              type="text"
              placeholder="e.g. John Doe"
              id="name"
            />

            <FormInput
              label="Bank Name"
              name="bankName"
              control={form.control}
              type="text"
              placeholder={accountType === "UK" ? "e.g. Barclays, HSBC, Lloyds" : accountType === "NG" ? "e.g. GTBank, Zenith, Access" : "e.g. Bank of America"}
              id="bankName"
            />

            {/* Account Number with Input Sanitization */}
            <FormField
              control={form.control}
              name="accNo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-poppins text-sm font-semibold capitalize text-label">
                    {accountType === "UK"
                      ? "Account Number (8 digits)"
                      : accountType === "NG"
                      ? "NUBAN Account Number (10 digits)"
                      : "Account Number / IBAN"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="accNo"
                      type="text"
                      inputMode={accountType === "OTHER" ? "text" : "numeric"}
                      placeholder={
                        accountType === "UK"
                          ? "e.g. 12345678"
                          : accountType === "NG"
                          ? "e.g. 0123456789"
                          : "e.g. GB29NWBK60161331926819"
                      }
                      value={field.value}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (accountType === "UK") {
                          val = val.replace(/\D/g, "").slice(0, 8);
                        } else if (accountType === "NG") {
                          val = val.replace(/\D/g, "").slice(0, 10);
                        }
                        field.onChange(val);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sort Code with Auto-formatting for UK */}
            <FormField
              control={form.control}
              name="sortCode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-poppins text-sm font-semibold capitalize text-label">
                    {accountType === "UK"
                      ? "Sort Code (6 digits)"
                      : "Sort Code / Routing Code (Optional)"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="sortCode"
                      type="text"
                      inputMode="numeric"
                      placeholder={accountType === "UK" ? "e.g. 12-34-56" : "Optional routing code"}
                      value={field.value}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (accountType === "UK") {
                          val = formatSortCode(val);
                        }
                        field.onChange(val);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormInput
              label="Amount to Withdraw (£)"
              name="amountWithdraw"
              control={form.control}
              type="number"
              placeholder="e.g. 50"
              id="amountWithdraw"
            />

            <PasswordInput
              id="password"
              label="Confirm Password"
              name="password"
              control={form.control}
            />

            <p className="text-xs italic text-gray-500">
              For security, confirm your password to authorise this withdrawal. Payouts are reviewed and processed to your designated account.
            </p>

            <CommonButton
              className="mt-2 w-full bg-primary-color-600 py-2.5 text-base font-medium text-white hover:bg-primary-color-700 md:w-1/2"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Submit Withdrawal Request"}
            </CommonButton>
          </form>
        </Form>
      </BorderCard>
    </div>
  );
};

export default ReferralFormModal;
