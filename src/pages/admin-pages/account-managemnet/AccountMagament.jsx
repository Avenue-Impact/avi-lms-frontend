import React from 'react'

import DataManagementEmpty from "@/Components/admindashboard/account-management/AccountManagementEmpty";
import DataManagementPage from "@/Components/admindashboard/account-management/AccountManagementPage";
import { useFetchAccountManagement } from "@/hooks/account-management/use-fetch-all-account-management";



const AccountMagament = () => {

  const { adminData } = useFetchAccountManagement();
  return (
    <div>
      {adminData && adminData.length < 1 ? (
        <DataManagementEmpty />
      ) : (
        <DataManagementPage />
      )}
    </div>
  );
}

export default AccountMagament;