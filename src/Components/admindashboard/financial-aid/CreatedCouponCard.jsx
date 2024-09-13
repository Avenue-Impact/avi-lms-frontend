import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
// import { IoSearch } from "react-icons/io5";
import React, { useEffect, useRef, useState } from 'react'
// import DashButton from '@/pages/auth/ButtonDash'
import { couponList as initialCouponList } from '@/lib/couponList'; // Adjust the path as needed
import CouponEmptyTable from './CouponEmptyTable';

const CreatedCouponCard = () => {
  const [showDropDown, setShowDropdown] = useState(null);
  const [couponList, setcouponList] = useState(initialCouponList);
  const dropdownRef = useRef(null);

  const handleRemoveButton = (id) => {
    const updatedList = couponList.filter(coupon => coupon.id !== id);
    setcouponList(updatedList);

    if (updatedList.length === 0) {
      alert('All coupons removed');
    } else {
      alert('Coupon removed');
    }

    setShowDropdown(null);
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="overflow-x-auto">
      {couponList.length < 1 ? (
        <CouponEmptyTable />
      ) : (
        <table className="min-w-full bg-white text-[#344054] text-[13px] border border-gray-300">
          <thead>
            <tr className="min-w-full bg-[#E4E7EC] border-0 border-red-500">
              <th className="p-4 text-left border-b">S/N</th>
              <th className="p-4 text-left border-b">Coupon Name</th>
              <th className="p-4 text-left border-b">Coupon Code</th>
              <th className="p-4 text-left border-b">Percentage Discount</th>
              <th className="p-4 text-left border-b">Coupon Creation Date</th>
            </tr>
          </thead>
          <tbody className='text-[14px]'>
            {couponList.map((coupon, index) => (
              <tr key={index}>
                <td className="p-4 border-b">{index + 1}</td>
                <td className="p-4 border-b">{coupon.couponName}</td>
                <td className="p-4 border-b">{coupon.codeNo}</td>
                <td className="p-4 border-b">{coupon.percentage}</td>
                <td className="p-4 border-b flex justify-between">
                  {coupon.paymentDate} | {coupon.time}
                  <button onClick={() => toggleDropDown(index)} className="ml-2 text-gray-600 focus:outline-none px-2 border border-gray-300">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                  {showDropDown === index && (
                    <div ref={dropdownRef} className="absolute right-10 z-10 w-50 py-2 mt-2 bg-white rounded shadow-lg">
                      <button onClick={() => handleRemoveButton(coupon.id)} className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">
                        <FontAwesomeIcon icon={faTrash} className="mr-2" /> Remove Coupon
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
