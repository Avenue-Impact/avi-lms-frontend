import React, { useState } from "react";
import CreatedCouponCard from "./CreatedCouponCard";
import DashButton from "@/pages/auth/ButtonDash";
import { useCreateCoupon } from "@/hooks/coupon-management/use-create-coupon";
import { useFetchAllAdminCourses as useFetchCourses } from "@/hooks/course-management/use-fetch-all-courses";
import { z } from "zod";
import { Form } from "@/Components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "@/Components/ui/form-input";
import { useFetchGenerateCoupon } from "@/hooks/financial-aid/use-generate-coupon-code";
import toast from "react-hot-toast";
import { MultiSelectDropdown } from "@/Components/ui/multi-select-dropdown";

const createCouponCode = z.object({
  coupon_name: z.string().min(2, "Coupon Name is required"),
  percentage_discount: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Must be a number")
    .transform((val) => Number(val))
    .refine(
      (num) => num >= 0 && num <= 100,
      "Percentage must be between 0 and 100",
    ),
  expiryDate: z.string().min(1, "Expiration date is required"),
  usageLimit: z.string().refine((val) => !isNaN(Number(val)), "Must be a number").transform((val) => Number(val)).optional(),
  applicableCourses: z.array(z.string()).optional(),
  applicableToAll: z.boolean().default(false),
});

const CouponTable = () => {
  const { mutate: create, isPending } = useCreateCoupon();
  const { data: generatedData, refetch, isFetching: isGenerating } = useFetchGenerateCoupon();
  const { data: coursesData } = useFetchCourses();
  
  const form = useForm({
    resolver: zodResolver(createCouponCode),
    defaultValues: {
      coupon_name: "",
      percentage_discount: "",
      expiryDate: "",
      usageLimit: "",
      applicableCourses: [],
      applicableToAll: false,
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
    if (!generatedData?.data?.data) {
      toast.error("Please generate a coupon code first.");
      return;
    }

    create({
      code: generatedData?.data?.data,
      coupon_name: formData.coupon_name,
      discountType: "percentage",
      discountValue: formData.percentage_discount,
      expiryDate: new Date(formData.expiryDate).toISOString(),
      usageLimit: formData.usageLimit || undefined,
      applicableToAll: formData.applicableToAll,
      applicableCourses: formData.applicableCourses,
      admin_applied: true,
      status: "active",
    }, {
      onSuccess: () => {
        form.reset();
        // Optionally reset specific default values if needed, but reset() should handle it based on defaultValues or empty.
      }
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
                    type="text"
                    id="coupon_name"
                    className="w-full rounded border border-gray-300 px-4 py-7"
                  />
                </div>

                <div className="col-span-5">
                    <div className="relative">
                     <p className="text-[15px] font-[600]">Coupon Code</p>
                    <p
                      className={`${generatedData?.data?.data ? "px-4 py-4" : "px-4 py-7"} w-full rounded border border-gray-300 text-gray-400`}
                    >
                      {generatedData?.data?.data}
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
                    type="number"
                    id="percentage_discount"
                    className="w-full rounded border border-gray-300 px-4 py-7"
                  />
                </div>

                <div className="col-span-4 mt-5">
                  <FormInput
                    label="Expiration Date"
                    name="expiryDate"
                    placeholder="Select date"
                    control={form.control}
                    type="date"
                    id="expiryDate"
                    className="w-full rounded border border-gray-300 px-4 py-7"
                  />
                </div>

                {/* <div className="col-span-4 mt-5">
                  <FormInput
                    label="Usage Limit"
                    name="usageLimit"
                    placeholder="100"
                    control={form.control}
                    type="number"
                    id="usageLimit"
                    className="w-full rounded border border-gray-300 px-4 py-7"
                  />
                </div> */}

                 <div className="col-span-4 mt-5">
                   <div className="flex items-center gap-2 mb-2">
                     <label htmlFor="applicableToAll" className="text-sm font-medium">Apply to All Courses</label>
                     <input 
                       type="checkbox" 
                       {...form.register("applicableToAll")} 
                       id="applicableToAll"
                       className="h-4 w-4"
                     />
                   </div>
                   
                   {!form.watch("applicableToAll") && (
                     <div className="flex flex-col gap-2">
                       <label className="text-sm font-medium">Select Courses</label>
                       <MultiSelectDropdown
                          options={coursesData?.data?.data?.courses?.map((course) => ({
                            label: course.title,
                            value: course.id,
                          })) || []}
                          selectedValues={form.watch("applicableCourses") || []}
                          onChange={(vals) => form.setValue("applicableCourses", vals)}
                          placeholder="Select courses..."
                          label="courses"
                       />
                     </div>
                   )}
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
