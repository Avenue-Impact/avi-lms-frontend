import React from 'react'
import FinancialRequestPage from '@/Components/admindashboard/financial-aid/FinancialRequestPage'
import FinancialRequestTable from '@/Components/admindashboard/financial-aid/FinancialRequestTable'
import { financeTableList } from '@/lib/financeTableList';
import { useFetchFinancialAid } from '@/hooks/financial-aid/use-fetch-all-financial-aids';

const FinancialAidRequest = () => {
  const { data: isFinancing } = useFetchFinancialAid();
  
  return (
    <div>
      {/* <FinancialRequestPage/> */}
      {isFinancing?.data?.data.length < 1 ? (
        <FinancialRequestPage />
      ) : (
        <FinancialRequestTable />
      )}
    </div>
  );
}

export default FinancialAidRequest