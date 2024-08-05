import React from 'react'
import DashButton from '../auth/ButtonDash';
import NoCoursesImg from '../../assets/images/no_courses.png'; 
// import styles from "../pages.module.css";

 const EmptyJoinProjectTeam = () => {
  return (
    <div>
        <div className='border-2 lg:h-[425px] border-gray-100 my-6 bg-white p-6 rounded-lg'>
            <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-[18px] font-semibold text-gray-800">Project Area</h3>
            </div>

            <div className="flex flex-col mt-6 md:flex-row  rounded-lg w-full max-w-5xl space-y-6 md:space-y-0 md:space-x-6">
                <div className="w-full md:w-2/4  text-justify mb-4 md:mb-0">
                    <h3 className="text-[24px] text-gray-800 font-semibold mb-2">Whatsapp Group</h3>
                    <div className='px-8 py-10'>
                        <h3 className='text-[20px] font-[600]'>No WhatsApp Group</h3>
                    </div>
                </div>


                <div className="w-full md:w-2/4  text-justify mb-4 md:mb-0">
                    <h3 className="text-[24px] text-gray-800 font-semibold mb-2">Join Project Meeting (Google Meet)</h3>
                    <div className='px-8 py-10'>
                        <h3 className='text-[20px] font-[600]'>No Project Meeting link yet</h3>
                    </div>
                </div>
            </div>
            
        </div> 


        {/* TOOLS & RESOURCES */}
        
        <div className='border-2 lg:h-[425px] border-gray-100 my-6 bg-white p-6 rounded-lg'>
            <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-[18px] font-semibold text-gray-800">Tools & resources</h3>
            </div>

            <div className="flex items-center justify-center mt-10 rounded-lg w-full text-center space-y-6 md:space-y-0 md:space-x-6">
                <div className=" mx-auto text-justify mb-4 md:mb-0">
                    <div className="border-2 border-gray-100 p-10">
                        <img src={NoCoursesImg} alt="No Courses" className="w-32 h-32 mb-4 rounded-full" />
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Courses</h3>
                    </div>
                </div>
            </div>

            
        </div> 
    </div>  
  )
}

export default EmptyJoinProjectTeam;