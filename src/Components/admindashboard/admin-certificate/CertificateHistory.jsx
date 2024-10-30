import DashButton from '@/pages/auth/ButtonDash'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


const issueCertificate = [
    {
        id: '1',
        courseTitle: 'Project Consultant Training Programme (Bundle)',
        courseType: 'Live Session',
        issueDate: '29/08/2024',
        issueTime: '10:12pm',
        courseCohort:  'August 2024 Cohort'
    },
    {
        id: '2',
        courseTitle: 'Project Consultant Training Programme (Bundle)',
        courseType: 'Recorded Session',
        issueDate: '30/10/2024',
        issueTime: '10:12pm',
        courseCohort:  'October 2024 Cohort'
    },
    {
        id: '3',
        courseTitle: 'Project Consultant Training Programme (Bundle)',
        courseType: 'Recorded Session',
        issueDate: '30/10/2024',
        issueTime: '10:12pm',
        courseCohort:  'October 2024 Cohort'
    },
    {
        id: '4',
        courseTitle: 'Project Consultant Training Programme (Bundle)',
        courseType: 'Live Session',
        issueDate: '21/11/2024',
        issueTime: '10:12pm',
        courseCohort:  'November 2024 Cohort'
    },
    {
        id: '5',
        courseTitle: 'Project Consultant Training Programme (Bundle)',
        courseType: 'Live Session',
        issueDate: '30/12/2024',
        issueTime: '10:12pm',
        courseCohort:  'December 2024 Cohort'
    },
    {
        id: '6',
        courseTitle: 'Project Consultant Training Programme (Bundle)',
        courseType: 'Recorded Session',
        issueDate: '30/10/2025',
        issueTime: '04:12pm',
        courseCohort:  'January 2025 Cohort'
    },
    {
        id: '7',
        courseTitle: 'Project Consultant Training Programme (Bundle)',
        courseType: 'Live Session',
        issueDate: '30/10/2024',
        issueTime: '10:12pm',
        courseCohort:  'October 2024 Cohort'
    },
    {
        id: '8',
        courseTitle: 'Project Consultant Training Programme (Bundle)',
        courseType: 'Recorded Session',
        issueDate: '30/10/2024',
        issueTime: '10:12pm',
        courseCohort:  'October 2024 Cohort'
    },
    {
        id: '9',
        courseTitle: 'Project Consultant Training Programme (Bundle)',
        courseType: 'Live Session',
        issueDate: '30/10/2024',
        issueTime: '10:12pm',
        courseCohort:  'October 2024 Cohort'
    },
    {
        id: '10',
        courseTitle: 'Project Consultant Training Programme (Bundle)',
        courseType: 'Live Session',
        issueDate: '30/10/2024',
        issueTime: '10:12pm',
        courseCohort:  'October 2024 Cohort'
    },
]

const CertificateHistory = () => {
  return (
    <div>

        
        <div className='py-6 grid grid-cols-12'>
            <div className='text-[20px] col-span-4 font-[500] text-[#344054]' >
                <p>Certificate issue history</p>
            </div>

                <div className='flex items-center justify-between  col-span-8'> 
                    <div className="relative w-full">
                        <input type="text" className="w-full rounded-md border  px-1 py-2 pl-10 text-[14px] focus:outline-none"
                            placeholder="Search Course" />
                        <div className="absolute left-3 top-1.5 text-gray-400">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div>
                </div>
        </div>

        <table className="min-w-full bg-white text-[#344054] text-[13px] border border-gray-300">
        <thead>
          <tr className="min-w-full bg-[#E4E7EC] border-0 border-red-500">
            <th className="p-4 text-left border-b">S/N</th>
            <th className="p-4 text-left border-b">Course Title</th>
            <th className="p-4 text-left border-b">Course Type</th>
            <th className="p-4 text-left border-b">Issue Date</th>
            <th className="p-4 text-left border-b">Course Cohort</th>
          </tr>
        </thead>
        <tbody className='text-[14px]'>
          {issueCertificate.map((cert, index) => (
            <tr key={index}>
              <td className="p-4 border-b">{(index + 1).toString().padStart(2, '0')}</td>
              <td className="p-4 border-b">{cert.courseTitle}</td>
              <td className="p-3 border-b ">
                    <button className='bg-[#FFECE5] p-1 text-[#AD3307] rounded'>
                        {cert.courseType}
                    </button>
                </td>
              <td className="p-4 border-b">{cert.issueDate} | {cert.issueTime}</td>
              <td className="p-4 border-b">{cert.courseCohort}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default CertificateHistory