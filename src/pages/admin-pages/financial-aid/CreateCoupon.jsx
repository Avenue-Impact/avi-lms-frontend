import React from 'react'
import CouponTable from '@/Components/admindashboard/financial-aid/CouponTable'
import CouponEmptyTable from '@/Components/admindashboard/financial-aid/CouponEmptyTable'
import { couponList } from "@/lib/couponList";



const CreateCoupon = () => {
  return (
    <div>
        <CouponTable/>
        {/* {couponList.length < 1 ?<CouponEmptyTable/> : <CouponTable/>} */}
    </div>
  )
}

export default CreateCoupon