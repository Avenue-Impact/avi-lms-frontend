import React from 'react'

import DataManagementEmpty from '@/Components/admindashboard/account-management/AccountManagementEmpty';
import DataManagementPage, {accountManagement} from '@/Components/admindashboard/account-management/AccountManagementPage';

const AccountMagament = () => {
  return (
    <div>
      {accountManagement.length < 1 ?<DataManagementEmpty/> : <DataManagementPage/>}
      
      
    </div>
  )
}

export default AccountMagament;