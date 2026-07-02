import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa6";

import { useCourseManagementInfo } from "@/hooks/useCourseManagementInfo";
// import SaveButton from "@/Components/admindashboard/course-management/courses/SaveButton";
import { ScrollRestoration } from "react-router-dom";

import { Form } from "@/Components/ui/form";
import { CommonButton } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { ClipLoader } from "react-spinners";
import { formatCurrency } from "@/lib/formatNumber";

import { courseTypeSchema } from "@/lib/form-schemas/forms-schema";
import { useCreateCourseType } from "@/hooks/course-management/use-create-course-type";

const access = [
  {
    id: 1,
    access: "One Month Access",
  },
  {
    id: 2,
    access: "3 Months Access",
  },
  {
    id: 3,
    access: "6 Months Access",
  },
  {
    id: 4,
    access: "Annual Subscription",
  },
  {
    id: 5,
    access: "Lifetime Access",
  },
];

const OnDemandSessionCourseType = () => {
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [discountType, setDiscountType] = useState("None");
  const [discountValue, setDiscountValue] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState("");

  const [durationPrice, setDurationPrice] = useState([]);
  const [durationErr, setDurationErr] = useState("");
  const { setActiveTab } = useCourseManagementInfo();
  const { createCourseType, isCreating } = useCreateCourseType();

  useEffect(() => {
    if (!amount) {
        setDiscountedAmount("");
        return;
    }
    const price = parseFloat(amount);
    let discounted = price;
    const val = parseFloat(discountValue) || 0;

    if (discountType === "Percentage") {
      discounted = price - (price * val) / 100;
    } else if (discountType === "Fiat") {
      discounted = price - val;
    }
    
    setDiscountedAmount(Math.max(0, discounted).toString());
  }, [amount, discountType, discountValue]);

  const onSubmit = () => {
    if (durationPrice.length < 1) return setDurationErr("input duration ");

    const courseType = {
      on_demand_session: durationPrice.map(item => ({
        duration: item.duration,
        original_price: item.original_price,
        discounted_price: item.discounted_price,
        discount_type: item.discount_type,
        discount_value: item.discount_value,
      })),
    };

    createCourseType(
      {
        data: courseType,
        courseId: localStorage.getItem("courseId"),
      },
      {
        onSuccess: () => {
          setActiveTab((prev) => prev + 1);
        },
      },
    );
  };

  const handleAddPrice = () => {
    if (!amount || !duration) return;

    setDurationPrice((prev) => {
      return [
        ...prev,
        {
          original_price: {
            amount: Number(amount),
            currency: "Pounds",
            currency_symbol: "£",
          },
          discounted_price: {
            amount: Number(discountedAmount),
            currency: "Pounds",
            currency_symbol: "£",
          },
          discount_type: discountType,
          discount_value: Number(discountValue),
          duration,
        },
      ];
    });

    setAmount("");
    setDuration("");
    setDiscountType("None");
    setDiscountValue("");
    setDiscountedAmount("");
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-2 mt-5 text-[24px] font-[500] text-[#344054]">
          Course Type
        </h2>
      </div>

      <div>
        {/* On-Demand Session */}
        <div className="mb-4 mt-5 grid grid-cols-1 xl:grid-cols-12 gap-8 rounded border border-gray-300 p-6 md:p-10 md:mb-0">
          <div className="xl:col-span-3">
            <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
              On-Demand Session
            </h3>
            <p className="text-sm text-gray-500 mt-1">Add Multiple Durations and Prices</p>
          </div>

          <div className="xl:col-span-9">
            <div className="w-full space-y-6">
              {/* Course Original Price and Discounted Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] gap-4 items-end">
                {/* Duration */}
                <div>
                  <p className="font-[600] text-gray-600 mb-1 text-sm">Duration</p>

                  <Select onValueChange={setDuration} value={duration}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="pb-8 capitalize">
                      <SelectGroup>
                        <SelectLabel>duration</SelectLabel>
                        {access.map((duration) => (
                          <SelectItem
                            key={duration.id}
                            value={duration.access}
                            className="capitalize"
                          >
                            {`${duration.access} `}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="price" className="text-sm font-[600] text-gray-600 mb-1 block">
                    Original Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="w-full rounded border border-gray-300 p-2 text-sm"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="£"
                  />
                </div>

                <div>
                    <p className="font-[600] text-gray-600 mb-1 text-sm">Type</p>
                    <Select onValueChange={setDiscountType} value={discountType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="Percentage">%</SelectItem>
                        <SelectItem value="Fiat">Fiat</SelectItem>
                      </SelectContent>
                    </Select>
                </div>

                <div>
                  <label htmlFor="discountValue" className="text-sm font-[600] text-gray-600 mb-1 block">
                    Value
                  </label>
                  <input
                    type="number"
                    name="discountValue"
                    id="discountValue"
                    className="w-full rounded border border-gray-300 p-2 text-sm"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label htmlFor="discountedAmount" className="text-sm font-[600] text-gray-600 mb-1 block">
                    Final
                  </label>
                  <input
                    type="number"
                    name="discountedAmount"
                    id="discountedAmount"
                    className="w-full rounded border border-gray-300 p-2 bg-gray-100 text-sm"
                    value={discountedAmount}
                    readOnly
                    placeholder="£"
                  />
                </div>

                <div className="w-full sm:col-span-2 lg:col-span-1">
                  <CommonButton
                    type="button"
                    className="block w-full rounded bg-primary-color-600 px-4 py-2 text-sm"
                    onClick={handleAddPrice}
                  >
                    Add
                  </CommonButton>
                </div>
              </div>
            </div>

            <div className="w-full mt-6">
              {
                <ul className="space-y-2">
                  {durationPrice.map((item, index) => (
                    <li
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between border rounded p-3 bg-gray-50 gap-4 sm:gap-0"
                    >
                      <span className="text-sm font-medium text-gray-700">{`${item.duration} - ${item.discounted_price.currency_symbol}${item.discounted_price.amount} (Org: ${item.original_price.currency_symbol}${item.original_price.amount})`}</span>
          
                      <div className="flex items-center gap-2">
                        <CommonButton
                          className="h-8 rounded bg-white text-red-600 hover:bg-red-50 border border-red-200 px-3"
                          type="button"
                          onClick={() => {
                            setDurationPrice((prev) =>
                              prev.filter((_, i) => i !== index),
                            );
                          }}
                        >
                          <FaTrash size={14} />
                        </CommonButton>
                      </div>
                    </li>
                  ))}
                </ul>
              }
              {durationErr && (
                <span className="mt-2 block text-sm text-red-600">{durationErr}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 pt-10">
          <CommonButton
            onClick={() => setActiveTab((prev) => prev - 1)}
            className="ml-auto bg-gray-500 text-white hover:bg-gray-700"
          >
            Back
          </CommonButton>

          <CommonButton
            className="min-w-32 rounded bg-primary-color-600"
            onClick={onSubmit}
            disabled={isCreating}
          >
            {isCreating ? (
              <ClipLoader size={20} color={"#fff"} />
            ) : (
              "Save"
            )}
          </CommonButton>
        </div>
      </div>
    </>
  );
};

export default OnDemandSessionCourseType;
