import React from 'react'
import ReceivedArrow from '../../../assets/images/received-arrow.svg';
import BalanceSymbol from '../../../assets/images/total_balance_symbol.svg';
// import AffiliateData from '../../../assets/images/affiliate_data.svg';
import { referralData } from '@/lib/referralData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSearch } from '@fortawesome/free-solid-svg-icons';
import DashButton from '@/pages/auth/ButtonDash';



const ReferralPage = () => {

const totalAmount = referralData.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2);
 
    return (
    <div className='mt-8 pl-3'>
        <p className="text-[24px] text-[#344054] font-[500]">Affiliate</p>

        <div className='grid grid-cols-12 space-x-4'>
            <div className="col-span-4 py-5 space-y-2 rounded-lg border-gray-300 shadow-sm flex flex-col justify-between border p-4">
                <div className='flex justify-between items-center '>
                    <div>
                        <p className="text-[28px] font-[600] text-[#23314A]">£{totalAmount}</p>
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


            <div className="col-span-5 rounded-lg border py-5 space-y-2 border-gray-300 shadow-sm p-4">
                <p className="font-[500]">Set affiliate percentage:</p>
                
                <div className='relative'>
                    <input type="text" 
                    placeholder="10%" className="border border-gray-300 rounded p-4 w-full"/>

                    <button className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-[#CC1747] text-white font-medium px-5 py-2.5 text-sm rounded">
                        Set
                    </button>
                </div>
            </div>
        </div>


        <div className='py-10 grid grid-cols-12'>
            <div className='text-[20px] col-span-4 font-[500]text-[#344054]' >
                <p>Referred Student</p>
            </div>

            <div className='col-span-8'>
                <div className='flex items-center justify-between'> 
                    <div className="relative w-3/5">
                        <input type="text" className="w-full rounded-md border bg-gray-50 px-1 py-2 pl-10 text-[14px] focus:outline-none"
                            placeholder="Search Course" />
                        <div className="absolute left-3 top-1.5 text-gray-400">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div>

                    <div className='flex items-center gap-2 border-2 py-1.5 px-3 rounded border-grey-300'>
                        
                        <span>
                            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.979126 0.864583C0.979126 0.438864 1.32424 0.09375 1.74996 0.09375H12.5416C12.9673 0.09375 13.3125 0.438864 13.3125 0.864583C13.3125 1.2903 12.9673 1.63542 12.5416 1.63542H1.74996C1.32424 1.63542 0.979126 1.2903 0.979126 0.864583Z" fill="#667185"/>
                            <path d="M2.52079 5.48958C2.52079 5.06386 2.86591 4.71875 3.29163 4.71875H11C11.4257 4.71875 11.7708 5.06386 11.7708 5.48958C11.7708 5.9153 11.4257 6.26042 11 6.26042H3.29163C2.86591 6.26042 2.52079 5.9153 2.52079 5.48958Z" fill="#667185"/>
                            <path d="M4.83329 9.34375C4.40757 9.34375 4.06246 9.68886 4.06246 10.1146C4.06246 10.5403 4.40757 10.8854 4.83329 10.8854H9.45829C9.88401 10.8854 10.2291 10.5403 10.2291 10.1146C10.2291 9.68886 9.88401 9.34375 9.45829 9.34375H4.83329Z" fill="#667185"/>
                            </svg>
                        </span>

                        <span>Filter </span>
                    </div>

                    <div>
                        <DashButton className="rounded  p-2 text-white">
                            <FontAwesomeIcon icon={faDownload} />  Export CSV
                        </DashButton>
                    </div>
                </div>

            </div>
            
        </div>
        
        {/* Referral Data */}
        <div className="overflow-x-auto">
      
            <table className="max-w-full bg-white text-[#344054] text-[13px] border border-gray-300">
                <thead>
                    <tr className="max-w-full  bg-[#E4E7EC] border-0 border-red-500">
                    <th className="p-4 text-left border-b">S/N</th>
                    <th className="p-4 text-left border-b">Name</th>
                    <th className="p-4 text-left border-b">Referred Student</th>
                    <th className="p-4 text-left border-b">Date of Referral</th>
                    <th className="p-4 text-left border-b">Course Referred</th>
                    <th className="p-4 text-left border-b">Course Type</th>
                    <th className="p-4 text-left border-b">Amount</th>
                    <th className="p-4 text-left border-b">Payment Date</th>
                    <th className="p-4 text-left border-b">Affiliate Commission</th>
                    </tr>
                </thead>
                <tbody className='text-[14px]'>
                    {referralData.map((data, index) => (
                    <tr key={index}>
                        <td className="p-4 border-b">{index + 1}</td>
                        <td className="p-4 border-b">{data.name} |  {`${data.email.length > 15 ? `${data.email.slice(0, 15)}...` : data.email}`}</td>
                        <td className="p-4 border-b">{data.referralName} | {data.referralEmail}</td>
                        <td className="p-4 border-b">{data.referralDate}</td>
                        <td className="p-4 border-b">{data.referralCourse}</td>
                        <td className="p-3 border-b ">
                            <button className='bg-[#FFECE5] p-1 text-[#AD3307] rounded'>
                                {data.courseType}
                            </button>
                        </td>
                        <td className="p-4 border-b">£{data.amount}</td>
                        <td className="p-4 border-b">{data.date} | {data.time}</td>
                        <td className="p-4 border-b">{data.date} | £{data.affiliateCommission}</td>
                        
                    </tr>
                    ))}
                </tbody>
            </table>
      
        </div>

    </div>
  )
}

export default ReferralPage