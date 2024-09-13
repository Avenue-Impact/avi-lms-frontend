import React from 'react'
import FinancialRequestPage from '@/Components/admindashboard/financial-aid/FinancialRequestPage'
import FinancialRequestTable from '@/Components/admindashboard/financial-aid/FinancialRequestTable'
import { financeTableList } from '@/lib/financeTableList';

const FinancialAidRequest = () => {
  return (
    <div>
      {/* <FinancialRequestPage/> */}
     {financeTableList.length < 1 ? <FinancialRequestPage/> : <FinancialRequestTable/>} 
    </div>
  )
}

export default FinancialAidRequest