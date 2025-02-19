import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
// import { IoSearch } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
// import DashButton from '@/pages/auth/ButtonDash'
// import { couponList as initialCouponList } from '@/lib/couponList';
import CouponEmptyTable from "./CouponEmptyTable";
import { useFetchAllCoupons } from "@/hooks/financial-aid/use-fetch-all-coupon codes";
import { formatDateString } from "@/lib/formatdatestring";
import { useDeleteAllCoupon } from "@/hooks/financial-aid/use-delete-coupon-code";

const CreatedCouponCard = () => {
  const [showDropDown, setShowDropdown] = useState(null);
  // const [couponList, setcouponList] = useState();
  const dropdownRef = useRef(null);

  const { data: fetchAllCoupons, isLoading, isError } = useFetchAllCoupons();
  const { deleteCoupon, isPending } = useDeleteAllCoupon();
  const [deletingCouponId, setDeletingCouponId] = useState(null);


  // console.log("fetch-all-coupons", fetchAllCoupons);
  // console.log("isLoading-financial-aid", isLoading);

  const handleRemoveButton = (id) => {
    setDeletingCouponId(id);

    deleteCoupon({ couponCodeId: id })
      .then(() => toast.success("Coupon removed successfully!"))
      .catch(() => toast.error("Failed to remove coupon."))
      .finally(() => {
        setDeletingCouponId(null);
        setShowDropdown(null);
      });
  };


  const toggleDropDown = (index) => {
    if (showDropDown === index) {
      setShowDropdown(null);
    } else {
      setShowDropdown(index);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="overflow-x-auto">
      {isError ? (
        "Network error"
      ) : isLoading ? (
        "Loading..."
      ) : fetchAllCoupons?.data?.data?.length < 1 ? (
        <CouponEmptyTable />
      ) : (
        <table className="min-w-full border border-gray-300 bg-white text-[13px] text-[#344054]">
          <thead>
            <tr className="min-w-full border-0 border-red-500 bg-[#E4E7EC]">
              <th className="border-b p-4 text-left">S/N</th>
              <th className="border-b p-4 text-left">Coupon Name</th>
              <th className="border-b p-4 text-left">Coupon Code</th>
              <th className="border-b p-4 text-left">Percentage Discount</th>
              <th className="border-b p-4 text-left">Coupon Creation Date</th>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {fetchAllCoupons?.data?.data?.map((coupon, index) => (
              <tr key={index}>
                <td className="border-b p-4">{index + 1}</td>
                <td className="border-b p-4">{coupon.coupon_name}</td>
                <td className="border-b p-4">{coupon.custom_coupon_code}</td>
                <td className="border-b p-4">{coupon.percentage_discount}%</td>
                <td className="flex justify-between border-b p-4">
                  {formatDateString(coupon.updated_at)}
                  <button
                    onClick={() => toggleDropDown(index)}
                    className="ml-2 border border-gray-300 px-2 text-gray-600 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                  {showDropDown === index && (
                    <div
                      ref={dropdownRef}
                      className="w-50 absolute right-10 z-10 mt-2 rounded bg-white py-2 shadow-lg"
                    >
                      <button
                        onClick={() => handleRemoveButton(coupon._id)}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                        disabled={deletingCouponId === coupon._id}
                      >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />{" "}
                        {isPending ? "Removing..." : "Remove Coupon"}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CreatedCouponCard;
