import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa6";

import { useCourseManagementInfo } from "@/hooks/useCourseManagementInfo";
// import SaveButton from "@/Components/admindashboard/course-management/courses/SaveButton";
import { ScrollRestoration, useParams } from "react-router-dom";

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

import { useCreateCourseType } from "@/hooks/course-management/use-create-course-type";
import { useEditCourseType } from "@/hooks/course-management/use-edit-course-type";

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

const EditOnDemandSessionCourseType = ({ dataToEdit }) => {
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [discountType, setDiscountType] = useState("None");
  const [discountValue, setDiscountValue] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [durationPrice, setDurationPrice] = useState(() =>
    dataToEdit.map((data) => ({
      duration: data.duration,
      original_price: data.original_price || { amount: data.amount, currency: "Pounds", currency_symbol: "£" },
      discounted_price: data.discounted_price || { amount: data.amount, currency: "Pounds", currency_symbol: "£" },
      discount_type: data.discount_type || "None",
      discount_value: data.discount_value || 0,
    })),
  );
  const [durationErr, setDurationErr] = useState("");

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

  const { courseId } = useParams();

  const { editCourseType, isPending } = useEditCourseType();

  const onSubmit = () => {
    if (durationPrice.length < 1) return setDurationErr("input duration ");

    const courseType = {
      on_demand_session: [...durationPrice],
    };

    editCourseType({ data: courseType, courseId });
  };

  const handleAddPrice = () => {
    if (!amount || !duration) return;

    const newPriceItem = {
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
    };

    setDurationPrice((prev) => {
      if (editIndex !== null) {
        const updated = [...prev];
        updated[editIndex] = newPriceItem;
        return updated;
      }
      return [...prev, newPriceItem];
    });

    setAmount("");
    setDuration("");
    setDiscountType("None");
    setDiscountValue("");
    setDiscountedAmount("");
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const item = durationPrice[index];
    setDuration(item.duration);
    setAmount(item.original_price.amount.toString());
    setDiscountType(item.discount_type);
    setDiscountValue(item.discount_value.toString());
    // discountedAmount will auto-calculate in useEffect
    setEditIndex(index);
  };

  return (
    <>
      <div>
        {/* On-Demand Session */}
        <div className="mb-4 mt-5 grid grid-cols-12 gap-10 rounded border border-gray-300 p-10 md:mb-0">
          <div className="col-span-5">
            <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
              On-Demand Session
            </h3>
            <p>Add Multiple Durations and Prices</p>
          </div>

          <div className="col-span-7 space-y-4">
            {/* Course Original Price and Discounted Price */}
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_0.5fr] gap-4 items-end">
              {/* Duration */}
              <div>
                <p className="font-[600] text-gray-600">Duration</p>

                <Select onValueChange={setDuration} value={duration}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a duration" />
                  </SelectTrigger>
                  <SelectContent className="pb-8 capitalize">
                    <SelectGroup>
                      <SelectLabel>select duration</SelectLabel>
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
                <div>
                  <label htmlFor="price" className="text-base font-medium">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="w-full rounded border border-gray-300 p-2"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="£39,200"
                  />
                </div>
              </div>

              <div>
                  <p className="font-[600] text-gray-600">Type</p>
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
                <label htmlFor="discountValue" className="text-base font-medium">
                  Value
                </label>
                <input
                  type="number"
                  name="discountValue"
                  id="discountValue"
                  className="w-full rounded border border-gray-300 p-2"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div>
                <label htmlFor="discountedAmount" className="text-base font-medium">
                  Final
                </label>
                <input
                  type="number"
                  name="discountedAmount"
                  id="discountedAmount"
                  className="w-full rounded border border-gray-300 p-2 bg-gray-100"
                  value={discountedAmount}
                  readOnly
                  placeholder="£"
                />
              </div>

              <CommonButton
                type="button"
                className="block w-full rounded bg-primary-color-600 px-4 py-2"
                onClick={handleAddPrice}
              >
                {editIndex !== null ? "Update" : "Add"}
              </CommonButton>
            </div>

            <div>
              {
                <ul>
                  {durationPrice.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between border-b py-2"
                    >
                      <span className="text-red-600">{`${item.duration} - ${
                        item.discounted_price.currency_symbol
                      }${item.discounted_price.amount} (Org: ${item.original_price.currency_symbol}${item.original_price.amount})`}</span>
                      
                      <div className="flex items-center gap-2">
                        <CommonButton
                          className="h-8 rounded bg-white text-blue-600 hover:bg-white"
                          type="button"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </CommonButton>
                        <CommonButton
                          className="h-8 rounded bg-white text-red-600 hover:bg-white"
                          type="button"
                          onClick={() => {
                            if (editIndex === index) {
                              setEditIndex(null);
                              setAmount("");
                              setDuration("");
                              setDiscountType("None");
                              setDiscountValue("");
                            }
                            setDurationPrice((prev) =>
                              prev.filter((_, i) => i !== index),
                            );
                          }}
                        >
                          <FaTrash />
                        </CommonButton>
                      </div>
                    </li>
                  ))}
                </ul>
              }
              {durationErr && (
                <span className="mt-2 text-red-600">{durationErr}</span>
              )}
            </div>
          </div>
        </div>

        <div className="pt-10">
          <CommonButton
            className="ml-auto block min-w-32 rounded bg-primary-color-600"
            onClick={onSubmit}
            disabled={isPending}
          >
            {isPending ? (
              <ClipLoader size={20} color={"#fff"} />
            ) : (
              " Save & Continue"
            )}
          </CommonButton>
        </div>
      </div>
    </>
  );
};

export default EditOnDemandSessionCourseType;
