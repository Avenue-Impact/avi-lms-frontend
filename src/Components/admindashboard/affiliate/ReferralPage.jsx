import React from "react";
import ReceivedArrow from "../../../assets/images/received-arrow.svg";
import BalanceSymbol from "../../../assets/images/total_balance_symbol.svg";
// import AffiliateData from '../../../assets/images/affiliate_data.svg';
import { referralData } from "@/lib/referralData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSearch } from "@fortawesome/free-solid-svg-icons";
import DashButton from "@/pages/auth/ButtonDash";
import { useFetchPayoutStats } from "@/hooks/affiliate/use-fetch-payout-stats";
import { useFetchAffiliates } from "@/hooks/affiliate/use-fetch-affiliates";
import { Skeleton } from "@/Components/ui/skeleton";
// import { useFetchGeneralCSVRequest } from "@/hooks/affiliate/use-generate-csv-file-withdrawal-requests";
import { formatDateString } from "@/lib/formatdatestring";
import { useFetchGeneralCSVAffiliateRequest } from "@/hooks/affiliate/use-generate-csv-files-affiliates";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { useAffiliatePercentage } from "@/hooks/affiliate/use-create-set-affiliate-percentage";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const setPercentage = z.object({
  set_percentage: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Must be a number") 
    .transform((val) => Number(val))
    .refine(
      (num) => num >= 0 && num <= 100,
      "Percentage must be between 0 and 100",
    ),
});

const ReferralPage = () => {
  const { data: fetchpayout, isLoading } = useFetchPayoutStats();
  console.log("Fetch the pay out", fetchpayout);
  const { data: fetchAffiliates, isLoading: isFecthing } = useFetchAffiliates();

  const { create, isPending } = useAffiliatePercentage();

  const form = useForm({
    resolver: zodResolver(setPercentage),
    defaultValues: {
      set_percentage: "",
    },
  });

  const onSubmit = async (data) => {
    // console.log("Form Data:", data);
    create({
      affiliate_percentage: data.set_percentage,
    });
  };

  const { refetch, isFetching } = useFetchGeneralCSVAffiliateRequest();
  const handleDownload = async () => {
    try {
      const { data } = await refetch();
      if (data) {
        const blob = new Blob([data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "affiliate_requests.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  if (isFecthing?.data?.data?.length < 1) {
    <p>No data.....</p>;
  }

  return (
    <div className="mt-8 pl-3">
      <p className="text-[24px] font-[500] text-[#344054]">Affiliate</p>

      <div className="grid grid-cols-12 space-x-4">
        <div className="col-span-4 flex flex-col justify-between space-y-2 rounded-lg border border-gray-300 p-4 py-5 shadow-sm">
          {isLoading ? (
            <Skeleton className={"min-h-[117px] w-full max-w-[450px]"} />
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[28px] font-[600] text-[#23314A]">
                  {/* £{totalAmount}{" "} */}
                  {fetchpayout?.data?.data?.total_payout.currency_symbol}{" "}
                  {fetchpayout?.data?.data?.total_payout.value}
                </p>
                <p className="text-[14px] font-[400] text-[#667185]">
                  Total Payout
                </p>
              </div>

              <div className="rounded-xl bg-white p-4 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl">
                <img
                  src={BalanceSymbol}
                  alt="Balance Symbol"
                  className="h-auto w-full rounded-lg object-cover"
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4 text-[14px] text-[#98A2B3]">
            <img src={ReceivedArrow} alt="Received_Arrow" />
            <span>10.2</span>
            <span>+1.01% this today</span>
          </div>
        </div>

        <div className="col-span-5 space-y-2 rounded-lg border border-gray-300 p-4 py-5 shadow-sm">
          <p className="font-[500]">Set affiliate percentage:</p>

          <div className="relative">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput
                  placeholder="10%"
                  name="set_percentage"
                  control={form.control}
                  input="number"
                  id="set_percentage"
                  className="w-full rounded border border-gray-300 p-4"
                />

                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 transform rounded bg-[#CC1747] px-5 py-2.5 text-sm font-medium text-white"
                  disabled={isPending}
                >
                  {isPending ? "Submitting....." : "Set"}
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 py-10">
        <div className="font-[500]text-[#344054] col-span-4 text-[20px]">
          <p>Referred Student</p>
        </div>

        <div className="col-span-8">
          <div className="flex items-center justify-between">
            <div className="relative w-3/5">
              <input
                type="text"
                className="w-full rounded-md border bg-gray-50 px-1 py-2 pl-10 text-[14px] focus:outline-none"
                placeholder="Search Course"
              />
              <div className="absolute left-3 top-1.5 text-gray-400">
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>

            <div className="border-grey-300 flex items-center gap-2 rounded border-2 px-3 py-1.5">
              <span>
                <svg
                  width="14"
                  height="11"
                  viewBox="0 0 14 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.979126 0.864583C0.979126 0.438864 1.32424 0.09375 1.74996 0.09375H12.5416C12.9673 0.09375 13.3125 0.438864 13.3125 0.864583C13.3125 1.2903 12.9673 1.63542 12.5416 1.63542H1.74996C1.32424 1.63542 0.979126 1.2903 0.979126 0.864583Z"
                    fill="#667185"
                  />
                  <path
                    d="M2.52079 5.48958C2.52079 5.06386 2.86591 4.71875 3.29163 4.71875H11C11.4257 4.71875 11.7708 5.06386 11.7708 5.48958C11.7708 5.9153 11.4257 6.26042 11 6.26042H3.29163C2.86591 6.26042 2.52079 5.9153 2.52079 5.48958Z"
                    fill="#667185"
                  />
                  <path
                    d="M4.83329 9.34375C4.40757 9.34375 4.06246 9.68886 4.06246 10.1146C4.06246 10.5403 4.40757 10.8854 4.83329 10.8854H9.45829C9.88401 10.8854 10.2291 10.5403 10.2291 10.1146C10.2291 9.68886 9.88401 9.34375 9.45829 9.34375H4.83329Z"
                    fill="#667185"
                  />
                </svg>
              </span>

              <span>Filter </span>
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

      {/* Referral Data */}
      <div className="overflow-x-auto">
        {isFecthing ? (
          "Loading...."
        ) : (
          <table className="max-w-full border border-gray-300 bg-white text-[13px] text-[#344054]">
            <thead>
              <tr className="max-w-full border-0 border-red-500 bg-[#E4E7EC]">
                <th className="border-b p-4 text-left">S/N</th>
                <th className="border-b p-4 text-left">Name</th>
                <th className="border-b p-4 text-left">Referred Student</th>
                <th className="border-b p-4 text-left">Date of Referral</th>
                <th className="border-b p-4 text-left">Course Referred</th>
                <th className="border-b p-4 text-left">Course Type</th>
                <th className="border-b p-4 text-left">Amount</th>
                <th className="border-b p-4 text-left">Payment Date</th>
                <th className="border-b p-4 text-left">Affiliate Commission</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {fetchAffiliates?.data?.data?.map((data, index) => (
                <tr key={index}>
                  <td className="border-b p-4">{index + 1}</td>
                  <td className="border-b p-4">
                    {data.user_details.first_name} {data.user_details.last_name}{" "}
                    {`${data.user_details.email.length > 15 ? `${data.user_details.email.slice(0, 15)}...` : data.user_details.email}`}
                  </td>
                  <td className="border-b p-4">
                    {data.referee_details.first_name}{" "}
                    {data.referee_details.last_name}{" "}
                    {data.referee_details.email}
                  </td>
                  <td className="border-b p-4">{data.referralDate ?? "N/A"}</td>
                  <td className="border-b p-4">
                    {data.course_details.course_title}
                  </td>
                  <td className="border-b p-3">
                    <button className="rounded bg-[#FFECE5] p-1 text-[#AD3307]">
                      {data.course_details.access_type}
                    </button>
                  </td>
                  <td className="border-b p-4">
                    {data.course_details.course_amount.currency_symbol}{" "}
                    {data.course_details.course_amount.value}
                  </td>
                  <td className="border-b p-4">
                    {formatDateString(data.course_details.payment_date)}
                  </td>
                  <td className="border-b p-4">
                    {data.course_details.affiliate_commission.currency_symbol}
                    {data.course_details.affiliate_commission.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReferralPage;
