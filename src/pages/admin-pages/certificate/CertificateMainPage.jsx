import CertificateEmpty from '@/Components/admindashboard/admin-certificate/CertificateEmpty'
import CertificatePage, {certCourses} from '@/Components/admindashboard/admin-certificate/CertificatePage'
import React from 'react'

const CertificateMainPage = () => {
  return (
    <div>
        {certCourses.length < 1 ? <CertificateEmpty/> : <CertificatePage/>}
    </div>
  )
}

export default CertificateMainPage