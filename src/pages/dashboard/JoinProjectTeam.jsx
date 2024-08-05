import React from 'react'
import DashButton from '../auth/ButtonDash';
// import styles from "../pages.module.css";

 const JoinProjectTeam = () => {
  return (
    <div>
        <div className='border-2 lg:h-[425px] border-gray-100 my-6 bg-white p-6 rounded-lg'>
            <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-[18px] font-semibold text-gray-800">Project Area</h3>
            </div>

            <div className="flex flex-col mt-6 md:flex-row  rounded-lg w-full max-w-5xl space-y-6 md:space-y-0 md:space-x-6">
                <div className="w-full md:w-2/4  text-justify mb-4 md:mb-0">
                    <h3 className="text-[24px] text-gray-800 font-semibold mb-2">Whatsapp Group</h3>
                    <div className='border-2 border-gray-100 rounded-lg px-8 py-10'>
                        <h3 className='text-[20px] font-[600]'>Join Team A</h3>
                        <p className='text-[#667185] py-2 font-[12px]'>Join Team A group by click the WhatsApp Group button below</p>
                        <DashButton className="mt-2 bg-[#CC1747] h-[40px] w-[177px] text-white hover:bg-[#b30e3b]">WhatsApp Group</DashButton>
                    </div>
                </div>


                <div className="w-full md:w-2/4  text-justify mb-4 md:mb-0">
                    <h3 className="text-[24px] text-gray-800 font-semibold mb-2">Join Project Meeting (Google Meet)</h3>
                    <div className='border-2 border-gray-100 rounded-lg px-8 py-10'>
                        <h3 className='text-[20px] font-[600]'>Team A Google Meet</h3>
                        <p className='text-[#667185] py-2 font-[12px]'>Join Team A group by click the Google Meet button below</p>
                        <DashButton className="mt-2 bg-[#CC1747] h-[40px] w-[177px] text-white hover:bg-[#b30e3b]">Google Meet</DashButton>
                    </div>
                </div>
            </div>
            
        </div> 


        {/* TOOLS & RESOURCES */}
        
        <div className='border-2 lg:h-[425px] border-gray-100 my-6 bg-white p-6 rounded-lg'>
            <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-[18px] font-semibold text-gray-800">Tools & resources</h3>
            </div>

            <div className="flex flex-col mt-6 md:flex-row  rounded-lg w-full max-w-5xl space-y-6 md:space-y-0 md:space-x-6">
                <div className="w-full md:w-2/4  text-justify mb-4 md:mb-0">
                    {/* <h3 className="text-[24px] text-gray-800 font-semibold mb-2">Whatsapp Group</h3> */}
                    <div className='border-2 border-gray-100 rounded-lg px-8 py-10'>
                        <h3 className='text-[20px] font-[600]'>Team A Google Drive</h3>
                        <p className='text-[#667185] py-2 font-[12px]'>Join Team A group by click the WhatsApp Group button below</p>
                        <DashButton className="mt-2 bg-[#CC1747] h-[40px] w-[177px] text-white hover:bg-[#b30e3b]">Google Drive Link</DashButton>
                    </div>
                </div>


                <div className="w-full md:w-2/4  text-justify mb-4 md:mb-0">
                    {/* <h3 className="text-[24px] text-gray-800 font-semibold mb-2">Join Project Meeting (Google Meet)</h3> */}
                    <div className='border-2 border-gray-100 rounded-lg px-8 py-10'>
                        <h3 className='text-[20px] font-[600]'>Balsamiq Wireframe </h3>
                        <p className='text-[#667185] py-2 font-[12px]'>Join Team A google meet by click the Google Meet button below</p>
                        <DashButton className="mt-2 bg-[#CC1747] h-[40px] w-[177px] text-white hover:bg-[#b30e3b]">Balsamiq Link</DashButton>
                    </div>
                </div>

                <div className="w-full md:w-2/4  text-justify mb-4 md:mb-0">
                    {/* <h3 className="text-[24px] text-gray-800 font-semibold mb-2">Join Project Meeting (Google Meet)</h3> */}
                    <div className='border-2 border-gray-100 rounded-lg px-8 py-10'>
                        <h3 className='text-[20px] font-[600]'>Devops Jira</h3>
                        <p className='text-[#667185] py-2 font-[12px]'>Join Team A group by click the Google Meet button below</p>
                        <DashButton className="mt-2 bg-[#CC1747] h-[40px] w-[177px] text-white hover:bg-[#b30e3b]">DevOps Link</DashButton>
                    </div>
                </div>
            </div>
            
        </div> 
    </div>  
  )
}

export default JoinProjectTeam;