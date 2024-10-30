import React from 'react'
import ReceivedArrow from '../../../assets/images/received-arrow.svg';
import BalanceSymbol from '../../../assets/images/total_balance_symbol.svg';
import AffiliateData from '../../../assets/images/affiliate_data.svg';


const ReferralEmpty = () => {
  return (
    <div className='mt-8 pl-3'>
        <p className="text-[24px] text-[#344054] font-[500]">Affiliate</p>

        <div className="mb-4 py-5 space-y-2 w-1/4 rounded-lg border-gray-300 shadow-sm flex flex-col justify-between border p-4">
            <div className='flex justify-between items-center '>
                <div>
                    <p className="text-[28px] font-[600] text-[#23314A]">£0</p>
                    <p className="text-[14px] font-[400] text-[#667185]">Total Payout</p>
                </div>

                <div className="shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-xl p-4 bg-white">
                    <img src={BalanceSymbol} alt="Balance Symbol" className="w-full h-auto object-cover rounded-lg" />
                </div>

            </div>


            <div className="flex items-center space-x-4 text-[14px] text-[#98A2B3]">
                <img src={ReceivedArrow} alt="Received_Arrow" />
                <span>10.2</span>
                <span>+1.01% this today</span>
            </div>

        </div>

        <div className="gap-10 mb-4 md:mb-0 mt-5 p-10">
          <div className='pt-8'>
            <div className="flex flex-col items-center justify-center p-6 rounded-lg ">
                <img src={AffiliateData} alt="No Data" className="w-32 h-32 mb-4 rounded-full" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Affiliate Data Available</h3>
                <p className="text-center text-sm text-gray-600 mb-4">
                        There are currently no affiliate activities to display. Once the students
                    <span className='lg:block'> 
                        start earning through referrals, their data will appear here.
                    </span>
                </p>
                
            </div>
            </div>
        </div>

    </div>
  )
}

export default ReferralEmpty