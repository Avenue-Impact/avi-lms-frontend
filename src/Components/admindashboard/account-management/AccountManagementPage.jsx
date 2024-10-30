import BorderCard from '@/Components/BorderCard'
import { CommonButton } from '@/Components/ui/button'
import DashButton from '@/pages/auth/ButtonDash'
import Modal from '@/pages/auth/components/Modal'
import { faCheck, faDownload, faEdit, faQuestionCircle, faSave, faSearch, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'


export const accountManagement = [
    {
        id: "1",
        name: 'Amelia Brown',
        email: 'Ameliabrown@gmail.com',
        roles: 'Content Manager',
        joinDate: 'September, 25 2024',
        joinTime: '12:30pm',
        actionEdit: 'Edit',
        actionDel: 'Delete'
    },
    {
        id: "2",
        name: 'Emery Torff’s',
        email: 'Emerytorffs@gmail.com',
        roles: 'Financial Admin',
        joinDate: 'October, 29 2024',
        joinTime: '12:30pm',
        actionEdit: 'Edit',
        actionDel: 'Delete'
    },
    {
        id: "3",
        name: 'Tajuden Hammed',
        email: 'Tajudenhammed@gmail.com',
        roles: 'Admin',
        joinDate: 'November, 11 2024',
        joinTime: '12:30pm',
        actionEdit: 'Edit',
        actionDel: 'Delete'
    },
    {
        id: "4",
        name: 'Maroof Kolawole',
        email: 'Maroofkolawole@gmail.com',
        roles: 'Couse Admin',
        joinDate: 'December, 12 2024',
        joinTime: '12:30pm',
        actionEdit: 'Edit',
        actionDel: 'Delete'
    }
]

const AccountManagementPage = () => {

    const [deleteAcc, setDeleteAcc] = useState(accountManagement);
    const [modalDeleteAcc, setModalDeleteAcc] = useState();
    const [selectedAccount, setSelectedAccount] = useState();
    const [showSuccessModal , setShowSuccessModal ] = useState();

  // Function to delete account by id
  const handleDeleteAcc = (id) => {
    const updatedAcc = deleteAcc.filter((account) => account.id !== id);
    setDeleteAcc(updatedAcc);

        setShowSuccessModal(true) // Show success modal on successful delete
  };

  return (
    <div>

        <div className='py-10 grid grid-cols-12'>
            <div className='text-[20px] col-span-4 font-[500]text-[#475367]' >
                <p>Users ({deleteAcc.length})</p>
            </div>

            <div className='col-span-8'>
                <div className='flex items-center justify-between'> 
                    <div className="relative w-3/4">
                        <input type="text" className="w-full rounded-md border bg-gray-50 px-1 py-2 pl-10 text-[14px] focus:outline-none"
                            placeholder="Search here..." />
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

                        <span>Filter by role </span>
                    </div>

                </div>

            </div>
            
        </div>

        <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-[#344054] text-[13px] border border-gray-300">
            <thead>
                <tr className="min-w-full bg-[#E4E7EC] border-0 border-red-500">
                <th className="p-4 text-left border-b">S/N</th>
                <th className="p-4 text-left border-b">Name</th>
                <th className="p-4 text-left border-b">Email Address</th>
                <th className="p-4 text-left border-b">Roles</th>
                <th className="p-4 text-left border-b">Joined</th>
                <th className="p-4 text-left border-b">Action</th>
                </tr>
            </thead>
            <tbody className='text-[14px]'>
                {deleteAcc.map((account, id) => (
                <tr key={id}>
                    <td className="p-4 border-b">{id + 1}</td>
                    <td className="p-4 border-b">{account.name}</td>
                    <td className="p-4 border-b">{account.email}</td>
                    <td className="p-4 border-b">{account.roles}</td>
                    <td className="p-4 border-b">{account.joinDate} | {account.joinTime}</td>
                    
                    <td className="flex justify-between gap-2 p-3 border-b">
                       
                       <DashButton className="rounded text-white">
                            <FontAwesomeIcon icon={faEdit} /> {account.actionEdit}
                        </DashButton>

                        <DashButton
                                onClick={() => {
                                    setSelectedAccount(account); setModalDeleteAcc(true); 
                                }}
                                className="rounded text-gray-600 bg-white border border-gray-500 lg:hover:bg-white"
                            >
                                <FontAwesomeIcon icon={faTrash} /> {account.actionDel}
                            </DashButton>
                        
                    </td>
                    
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {modalDeleteAcc && selectedAccount &&(
            <Modal>
                <BorderCard className="bg-white p-6 rounded-lg shadow-lg w-2/5">
                    <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none float-right"
                        onClick={() => setModalDeleteAcc((prev) => !prev)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                    <div className="text-center mt-4">
                        <FontAwesomeIcon  icon={faQuestionCircle} 
                        className="text-white text-[24px] p-2 rounded-full bg-[#F2A356]" />
                            <h2 className="text-[16px] text-[#23314A] font-[600] mb-4">
                                Delete {selectedAccount.name}?
                            </h2>
                        <p className="text-[#98A2B3] text-[14px] mb-6">
                            Are you sure you want to approve this financial aid request for ? This action will grant the requested financial aid to the student and cannot be undone.
                        </p>

                        <div className="flex justify-center space-x-4">
                        <CommonButton onClick={() =>setModalDeleteAcc(false)} className="px-9 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100" variant="outline">
                            Reject
                        </CommonButton>
                        <CommonButton  onClick={() => {handleDeleteAcc(selectedAccount.id); 
                            setModalDeleteAcc(false);
                            }} className="ml-6 px-9 py-2 bg-primary-color-600 text-white rounded-md hover:bg-primary-color-700">
                                Yes, Approve
                        </CommonButton>
                        </div>
                    </div>
                </BorderCard>
            </Modal>
        )}

        {showSuccessModal && (
            <Modal>
                <BorderCard className="bg-white p-6 rounded-lg shadow-lg w-2/5">
                    <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none float-right"
                        onClick={() => setShowSuccessModal((prev) => !prev)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <div className="text-center mt-4">
                        <FontAwesomeIcon icon={faCheck} className="text-white text-[24px] p-3 rounded-3xl bg-green-500" />
                        <h2 className="text-[16px] text-[#23314A] font-[600] mb-4">Successfully</h2>
                        <p className="text-[#98A2B3] text-[14px] mb-6">
                            Student successfully deleted. All associated data has been removed from the database.
                        </p>

                        <div className="flex justify-center space-x-4">
                        <CommonButton onClick={() => setShowSuccessModal(false)} className="px-9 py-2 bg-primary-color-600 text-white rounded-md hover:bg-primary-color-700">
                            Ok
                        </CommonButton>
                        </div>
                    </div>

                </BorderCard>
            </Modal>
        )}
    </div>
  )
}

export default AccountManagementPage;