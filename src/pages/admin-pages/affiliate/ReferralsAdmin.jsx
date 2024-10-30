import React from 'react'
import ReferralEmpty from '@/Components/admindashboard/affiliate/ReferralEmpty'
import ReferralPage from '@/Components/admindashboard/affiliate/ReferralPage'
import { referralData } from '@/lib/referralData'


const ReferralsAdmin = () => {
  return (
    <div>
        
        {referralData.length < 1 ? <ReferralEmpty/> : <ReferralPage/>}
        
    </div>
  )
}

export default ReferralsAdmin