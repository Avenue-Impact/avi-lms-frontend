import CertificateEmpty from '@/Components/admindashboard/admin-certificate/CertificateEmpty'
import CertificatePage from '@/Components/admindashboard/admin-certificate/CertificatePage'
import { useFetchAllAdminCourses } from '@/hooks/course-management/use-fetch-all-courses';
import React from 'react'

const CertificateMainPage = () => {
  const {data} = useFetchAllAdminCourses();

  return (
    <div>
        {data?.data?.data?.courses.length < 1 ? <CertificateEmpty/> : <CertificatePage/>}
    </div>
  )
}

export default CertificateMainPage