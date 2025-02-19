import React, { useState } from "react";
import CreatedCouponCard from "./CreatedCouponCard";
import DashButton from "@/pages/auth/ButtonDash";
import { useCouponCode } from "@/hooks/financial-aid/use-create-coupon-code";
import { z } from "zod";
import { Form } from "@/Components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "@/Components/ui/form-input";
import { useFetchGenerateCoupon } from "@/hooks/financial-aid/use-generate-coupon-code";
import toast from "react-hot-toast";

const createCouponCode = z.object({
  coupon_name: z.string().min(2, "Coupon Name is required"),
//   coupon_code: z.string().min(2, "Coupon Code is required"),
  percentage_discount: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Must be a number")
    .transform((val) => Number(val))
    .refine(
      (num) => num >= 0 && num <= 100,
      "Percentage must be between 0 and 100",
    ),
});

const CouponTable = () => {
  const { create, isPending } = useCouponCode();
  const { data, refetch, isFetching: isGenerating } = useFetchGenerateCoupon();
    console.log("Generate coupon code", data);

  const form = useForm({
    resolver: zodResolver(createCouponCode),
    defaultValues: {
      coupon_name: "",
      coupon_code: "", 
      percentage_discount: "",
    },
  });

  // Function to call API and fetch coupon code
  const handleGenerateCoupon = async () => {
    try {
      const response = await refetch(); 
      if (response.data) {
        toast.success("Coupon code generated successfully!");
      } else {
        toast.error("Failed to generate coupon. Please try again.");
      }
    } catch (error) {
      toast.error("Error generating coupon.");
    }
  };

  const onSubmit = async (formData) => {
    if (!data?.data?.data) {
      toast.error("Please generate a coupon code first.");
      return;
    }

    create({
      coupon_name: formData.coupon_name,
      custom_coupon_code: data?.data?.data,
      percentage_discount: formData.percentage_discount,
    });
  };

  return (
    <div>
      <h2 className="mb-2 mt-5 text-[20px] font-[500] text-[#344054]">
        Create coupon
      </h2>

      <div className="mb-4 mt-5 gap-10 rounded border border-gray-300 p-10 md:mb-0">
        <div className="space-y-2 pb-8">
          <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
            Coupon Creation
          </h3>
          <p className="text-[#667185]">
            Create and issue custom coupon codes for personalized <br />{" "}
            discounts and incentives.
          </p>
        </div>

        {/* Form */}
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-12 space-x-4">
                <div className="col-span-3">
                  <FormInput
                    label="Coupon Name"
                    name="coupon_name"
                    placeholder="Coupon Name"
                    control={form.control}
                    input="text"
                    id="coupon_name"
                    className="w-full rounded border border-gray-300 px-4 py-7"
                  />
                </div>

                <div className="col-span-5">
                  <div className="relative">
                    {/* <FormInput
                      label="Coupon Code"
                      name="coupon_code"
                      placeholder="Click Generate"
                      control={form.control}
                      input="text"
                      id="coupon_code"
                      defaultValue={data?.data?.data || ""}
                      className="w-full rounded border border-gray-300 px-4 py-7"
                    /> */}
                    <p className="text-[15px] font-[600]">Coupon Code</p>
                    <p className="w-full rounded border text-gray-400 border-gray-300 p-4">
                      {data?.data?.data}
                    </p>

                    <button
                      type="button"
                      className="absolute right-5 top-[50px] -translate-y-1/2 transform rounded bg-[#CC1747] px-5 py-2.5 text-sm font-medium text-white"
                      onClick={handleGenerateCoupon}
                      disabled={isGenerating}
                    >
                      {isGenerating ? "Generating..." : "Generate"}
                    </button>
                  </div>
                </div>

                <div className="col-span-4">
                  <FormInput
                    label="Percentage Discount"
                    name="percentage_discount"
                    placeholder="18%"
                    control={form.control}
                    input="number"
                    id="percentage_discount"
                    className="w-full rounded border border-gray-300 px-4 py-7"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end pt-10">
                <DashButton
                  type="submit"
                  className="rounded px-4 py-2 text-white"
                  disabled={isPending}
                >
                  {isPending ? "Creating..." : "Create Coupon"}
                </DashButton>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="pt-8">
        <CreatedCouponCard />
      </div>
    </div>
  );
};

export default CouponTable;
