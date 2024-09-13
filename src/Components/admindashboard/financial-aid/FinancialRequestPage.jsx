import React from 'react'
import NoCoursesImg from '../../../assets/images/couponempty.svg';


const FinancialRequestPage = () => {
  return (
    <div>
       <h2 className="text-[20px] mt-5 font-[500] text-[#344054] mb-2">Financial Aid Request</h2>

      <div className="gap-10 mb-4 md:mb-0 mt-5 p-10">
          <div className='pt-8'>
                <div className="flex flex-col items-center justify-center p-6 rounded-lg ">
                    <img src={NoCoursesImg} alt="No Courses" className="w-32 h-32 mb-4 rounded-full" />
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Financial Aid</h3>
                    <p className="text-center text-sm text-gray-600 mb-4">
                          There are no financial aid requests at the moment. When students
                        <span className='lg:block'> 
                        submit requests, you'll be able to review and manage them here.
                        </span>
                    </p>
                    
                </div>
            </div>

         

      </div>

    </div>
  )
}

export default FinancialRequestPage;