import React from 'react'
// import DashButton from '@/pages/auth/ButtonDash'
import NoCoursesImg from '../../../assets/images/couponempty.svg';
// import { couponList } from "@/lib/couponList";

const CouponEmptyTable = () => {
  return (
    <div>
        {/* <h2 className="text-[20px] mt-5 font-[500] text-[#344054] mb-2">Create coupon</h2>

        <div className="gap-10 mb-4 md:mb-0 border border-gray-300 rounded  mt-5 p-10">
            <div className='space-y-2 pb-8'>
                <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
                    Coupon Creation
                </h3>
                <p className='text-[#667185]'>Create and issue custom coupon codes for personalized <br/> discounts and incentives.</p>
            </div>

            
            <div className="grid grid-cols-12 space-x-4 ">
                <div className="col-span-3">
                    <p className="font-[500]">Coupon Name</p>
                    <input  type="text" 
                    placeholder="18%" className="border border-gray-300 rounded p-4 w-full"/>
                </div>
                
                <div className="col-span-5">
                    <p className="font-[500]">Custom Coupon Code</p>
                    
                    <div className='relative'>
                        <input type="text" 
                        placeholder="23ZX34D2TSi" className="border border-gray-300 rounded p-4 w-full"/>

                        <button className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-[#CC1747] text-white font-medium px-5 py-2.5 text-sm rounded">
                            Generate
                        </button>
                    </div>
                </div>

                <div className="col-span-4">
                    <p className="font-[500]">Percentage Discount</p>
                    <input type="text" 
                    placeholder="18%" className="border border-gray-300 rounded p-4 w-full"/>
                </div>          
            </div>

            <div className="flex justify-end items-center pt-10">
                  <DashButton className="rounded px-4 py-2 text-white">
                    Create Coupon
                  </DashButton>
            </div>

        </div> */}



        {/* Empty Coupon Page */}
        <div className='pt-8'>
            <div className="flex flex-col items-center justify-center p-6 rounded-lg ">
                <img src={NoCoursesImg} alt="No Courses" className="w-32 h-32 mb-4 rounded-full" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Coupon Created</h3>
                <p className="text-center text-sm text-gray-600 mb-4">
                    It looks like you haven't created any coupons yet. Start by clicking the 
                    <span className='lg:block'> 
                        "Create Coupon" button to offer discounts and promotions to your students.
                    </span>
                </p>
                
            </div>
        </div>

    </div>
  )
}

export default CouponEmptyTable