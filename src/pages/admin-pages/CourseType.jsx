import React, { useState } from "react";
import { AdminCohort } from './AdminCohort';
import { AdminDuration } from "./AdminDuration";
import DashButton from "../auth/ButtonDash";
// import { PreviewVideoSelect } from '../auth/components/DashSelect';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import DashButton from '../auth/ButtonDash';
// import { Link } from 'react-router-dom';

 const CourseType = () => {

    const [duration, setDuration] = useState("");
    const maxLength = 30;

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.length <= maxLength) {
        setDuration(value);
    }
};

  return (
    <>
        <div>
            {/* <h2 className="text-[24px] mt-5 font-[500] text-[#344054] mb-2">Course Type</h2> */}

            {/* Live Session + Mentoring */}
            <div className="grid grid-cols-12 gap-10 mb-4 md:mb-0 border border-gray-300 rounded  mt-5 p-10">
                <div className='col-span-5'>
                    <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
                        Live session + Mentoring 
                    </h3>
                    <p>Add Course Original Price, Discounted Price, Cohort, and Duration</p>
                </div>

                <div className="col-span-7 space-y-4">
                    {/* Course Original Price and Discounted Price */}
                    <div className="flex space-x-4">
                        {/* Course Original Price */}
                        <div className="flex-1">
                            <p className="font-[500]">Course Original Price</p>
                            <input 
                            type="text" 
                            placeholder="£2,200" 
                            className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>

                        {/* Discounted Price */}
                        <div className="flex-1">
                            <p className="font-[500]">Discounted Price</p>
                            <input 
                            type="text" 
                            placeholder="£4,200" 
                            className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>

                    </div>

                    {/* Duration and Time */}
                    <div className="flex space-x-4">
                    {/* Duration (Monday-Friday) */}
                    <div className="flex-1 ">
                        <p className="font-[500]">Duration</p>
                        <input 
                            type="text" 
                            placeholder="Monday-Friday" 
                            value={duration}
                            onChange={handleChange}
                            maxLength={maxLength}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                        <p className="flex justify-end text-[#667185] font-[500]  mb-1 mr-2">
                            {`${duration.length}/${maxLength}`}
                        </p>
                    </div>

                    {/* Time (7:00pm default) */}
                    <div className="flex-1">
                        <p className="font-[500]">Time</p>
                        <input 
                        type="time" 
                        defaultValue="19:00" 
                        className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                    </div>

                    <div className="pt-9">
                        <p className="font-[600] text-gray-600">Select Cohort</p>
                        <AdminCohort/>
                    </div>
                </div>
            </div>

            {/* On-Demand Session */}
            <div className="grid grid-cols-12 gap-10 mb-4 md:mb-0 border border-gray-300 rounded  mt-5 p-10">
                <div className='col-span-5'>
                    <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
                        On-Demand Session
                    </h3>
                    <p>Add Multiple Durations and Prices</p>
                </div>

                <div className="col-span-7 space-y-4">
                    {/* Course Original Price and Discounted Price */}
                    <div className="flex items-end space-x-4">
                        {/* Course Original Price */}
                        <div className="flex-1">
                            <p className="font-[600] text-gray-600">Duration</p>
                            <AdminDuration/>
                        </div>


                        <div className="flex-1">
                            <p className="font-[500]">Price</p>
                            <input 
                            type="text" 
                            placeholder="£39,200" 
                            className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>

                        {/* Discounted Price */}
                        <div className="flex-1">
                            <DashButton className="rounded px-4 py-2 text-white">
                                Add
                            </DashButton>
                        </div>

                    </div>

                </div>
            </div>

            <div className="flex justify-end items-center pt-10">
                  <DashButton className="rounded px-4 py-2 text-white">
                    Save & Continue
                  </DashButton>
              </div>

        </div>
    </>
  )
}

export default CourseType;
