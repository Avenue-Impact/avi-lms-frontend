import React from 'react'
import AccountImages from '../../../assets/images/account_images.svg';
import DashButton from '@/pages/auth/ButtonDash';



const DataManagementEmpty = () => {
  return (
    <div>
      {/* Empty Coupon Page */}
      <div className='pt-8'>
          <div className="flex flex-col items-center justify-center p-6 rounded-lg ">
              <img src={AccountImages} alt="No Courses" className="w-32 h-32 mb-4 " />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Admin Accounts Created</h3>
              <p className="text-center text-sm text-gray-600 mb-4">
                    There are no admin accounts set up yet. To start managing the platform,
                  <span className='lg:block'> 
                      create an admin account with the appropriate permissions.
                  </span>
              </p>
              <DashButton className="text-whit">Create Account</DashButton>
          </div>
      </div>
    </div>
  )
}

export default DataManagementEmpty