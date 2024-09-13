import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import DashButton from '@/pages/auth/ButtonDash';
import { financeTableList } from '@/lib/financeTableList';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const FinancialRequestTable = () => {
//   const [selectedFinance, setSelectedFinance] = useState(null);

  return (
    <div className='py-1'>
        <div className='py-6 grid grid-cols-12'>
            <div className='text-[20px] col-span-4 font-[500]text-[#344054]' >
                <p>Financial Aid Request</p>
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

      <table className="min-w-full bg-white text-[#344054] text-[13px] border border-gray-300">
        <thead>
          <tr className="min-w-full bg-[#E4E7EC] border-0 border-red-500">
            <th className="p-4 text-left border-b">S/N</th>
            <th className="p-4 text-left border-b">Name</th>
            <th className="p-4 text-left border-b">Course Title</th>
            <th className="p-4 text-left border-b">Date</th>
            <th className="p-4 text-left border-b">Status</th>
            <th className="p-4 text-left border-b">Action</th>
          </tr>
        </thead>
        <tbody className='text-[14px]'>
          {financeTableList.map((finance, index) => (
            <tr key={index}>
              <td className="p-4 border-b">{index + 1}</td>
              <td className="p-4 border-b">{finance.name} <br /> {finance.email}</td>
              <td className="p-4 border-b">{finance.courseTitle}</td>
              <td className="p-4 border-b">{finance.date} | {finance.time}</td>
              <td className="p-2 font-[500] border-b">
                <button className={`
                  py-1 px-2 font-[500] bg-[#F3FFF7] border-b rounded
                  ${finance.status === 'Approved' ? 'bg-[#F3FFF7] text-[#00A92F]' : " "}
                  ${finance.status === 'Rejected' ? 'bg-[#FFECE5] text-[#AD3307]' : " "}
                  ${finance.status === 'Pending' ? 'bg-[#FFFFE5] text-[#DBC500]' : " "}
                `}>
                  {finance.status}
                </button>
              </td>
              <td className="p-1 border-b">
                {/* Wrap the DashButton with Link and pass the selectedFinance as state */}
                <Link to="/admin/view-details" state={{ finance }}> 
                  <DashButton className="rounded text-white">
                    <FontAwesomeIcon icon={faEye} /> {finance.action}
                  </DashButton>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialRequestTable;
