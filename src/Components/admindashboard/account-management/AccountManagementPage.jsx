import BorderCard from "@/Components/BorderCard";
import { TrashCan } from "@/Components/Icon";
import Table from "@/Components/Table";
import { CommonButton } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useDeleteAdmin } from "@/hooks/account-management/use-delete-admin";
import { useEditAdminRole } from "@/hooks/account-management/use-edit-admin-role";
import { useFetchAccountManagement } from "@/hooks/account-management/use-fetch-all-account-management";
import DashButton from "@/pages/auth/ButtonDash";
import Modal from "@/pages/auth/components/Modal";
import {
  faCheck,
  faDownload,
  faEdit,
  faQuestionCircle,
  faSave,
  faSearch,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Save } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

function formapateString(dateString) {
  const date = new Date(dateString);

  // Define an array of month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the month, day, and year
  const month = months[date.getMonth()];
  const day = date.gepate();
  const year = date.getFullYear();

  // Get the hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Determine AM/PM and adjust hours
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format

  // Construct the formatted date string
  const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes}${amPm}`;

  return formattedDate;
}

const AccountManagementPage = () => {
  const [modalDeleteAcc, setModalDeleteAcc] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [adminToEdit, setAdminToEdit] = useState({});

  const { data: adminData, isLoading, error } = useFetchAccountManagement();

  const { mutate, isPending: isEditing } = useEditAdminRole();

  const { delAdmin, isPending } = useDeleteAdmin();

  // Function to delete account by id
  const handleDeleteAcc = () => {
    if (selectedAccount?.id) {
      delAdmin({ adminId: selectedAccount.id });
      setModalDeleteAcc(false);

      //   console.log("Deleted Admin",selectedAccount.id);
    }
  };

  const handleEdit = (account) => {
    if (account.id !== adminToEdit.id || !adminToEdit.id) {
      toast.error("Select a role for the admin");
      return;
    }

    const data = {
      first_name: account.firstname,
      last_name: account.lastname,
      role: adminToEdit.role,
    };

    console.log(data);
    mutate(
      { data, adminId: adminToEdit.id },
      {
        onSuccess: () => setAdminToEdit({}),
      },
    );
  };

  if (isLoading) return <p>Loading...</p>;

  if (error)
    return <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;

  return (
    <div>
      <div className="grid grid-cols-12 py-10">
        <div className="font-[500]text-[#475367] col-span-4 text-[20px]">
          <p>Users ({adminData?.data?.data?.admins?.length})</p>
        </div>

        <div className="col-span-8">
          <div className="flex items-center justify-between">
            <div className="relative w-3/4">
              <input
                type="text"
                className="w-full rounded-md border bg-gray-50 px-1 py-2 pl-10 text-[14px] focus:outline-none"
                placeholder="Search here..."
              />
              <div className="absolute left-3 top-1.5 text-gray-400">
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>

            <div className="border-grey-300 flex items-center gap-2 rounded border-2 px-3 py-1.5">
              <span>
                <svg
                  width="14"
                  height="11"
                  viewBox="0 0 14 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.979126 0.864583C0.979126 0.438864 1.32424 0.09375 1.74996 0.09375H12.5416C12.9673 0.09375 13.3125 0.438864 13.3125 0.864583C13.3125 1.2903 12.9673 1.63542 12.5416 1.63542H1.74996C1.32424 1.63542 0.979126 1.2903 0.979126 0.864583Z"
                    fill="#667185"
                  />
                  <path
                    d="M2.52079 5.48958C2.52079 5.06386 2.86591 4.71875 3.29163 4.71875H11C11.4257 4.71875 11.7708 5.06386 11.7708 5.48958C11.7708 5.9153 11.4257 6.26042 11 6.26042H3.29163C2.86591 6.26042 2.52079 5.9153 2.52079 5.48958Z"
                    fill="#667185"
                  />
                  <path
                    d="M4.83329 9.34375C4.40757 9.34375 4.06246 9.68886 4.06246 10.1146C4.06246 10.5403 4.40757 10.8854 4.83329 10.8854H9.45829C9.88401 10.8854 10.2291 10.5403 10.2291 10.1146C10.2291 9.68886 9.88401 9.34375 9.45829 9.34375H4.83329Z"
                    fill="#667185"
                  />
                </svg>
              </span>

              <span>Filter by role </span>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table cols={"0.3fr 0.9fr 1fr 0.8fr 0.8fr 0.8fr"}>
          <Table.Header
            className={"gap-2 *:text-sm *:font-medium *:capitalize"}
          >
            <p>S/N</p>
            <p>Name</p>
            <p>Email Address</p>
            <p>Roles</p>
            <p>Joined</p>
            <p>Action</p>
          </Table.Header>
          {
            <div className="text-[14px]">
              {adminData?.data?.data?.admins?.map((account, i) => (
                <Table.Row
                  key={account.id}
                  className={"gap-2 border-b border-[#D0D5DD] *:text-sm"}
                >
                  <p className="text-[#344054]">
                    {i + 1 < 9 ? `0${i + 1}` : i + 1}
                  </p>
                  <p className="text-sm font-medium text-[#101928]">
                    {account.firstname} {account.lastname}
                  </p>
                  <p className="truncate text-[#475367]">{account.email}</p>
                  {/* <p>{account.role}</p> */}
                  <div>
                    <Select
                      onValueChange={(value) => {
                        setAdminToEdit({ id: account.id, role: value });
                      }}
                    >
                      <SelectTrigger className="w-full items-start border-none p-0 ring-0 focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder={account.role} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Financial Admin">
                            Financial Admin
                          </SelectItem>
                          <SelectItem value="Content Manager">
                            Content Manager
                          </SelectItem>
                          <SelectItem value="Course Admin">
                            Course Admin
                          </SelectItem>
                          <SelectItem value="Super Admin">
                            Super Admin
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <p>
                    {account.joined_date
                      ? formapateString(account.joined_date)
                      : "N/A"}
                  </p>

                  <div className="flex items-center justify-between">
                    <button
                      className="flex items-center gap-2 rounded bg-primary-color-600 px-3 py-2 font-normal text-white disabled:opacity-50"
                      onClick={() => handleEdit(account)}
                      disabled={isEditing || account.id !== adminToEdit.id}
                    >
                      <Save className="h-3 w-3" />
                      <span className="text-sm">save</span>
                    </button>

                    <button
                      className="flex items-center gap-2 rounded border px-3 py-2 font-normal text-[#3A4C6C] disabled:opacity-50"
                      onClick={() => {
                        setSelectedAccount(account);
                        setModalDeleteAcc(true);
                      }}
                    >
                      <TrashCan />
                      Delete
                    </button>
                  </div>
                </Table.Row>
              ))}
            </div>
          }
        </Table>
      </div>

      {modalDeleteAcc && (
        <Modal>
          <BorderCard className="w-2/5 rounded-lg bg-white p-6 shadow-lg">
            <button
              className="float-right text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setModalDeleteAcc((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="mt-4 text-center">
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="rounded-full bg-[#F2A356] p-2 text-[24px] text-white"
              />
              <h2 className="mb-4 text-[16px] font-[600] text-[#23314A]">
                Delete {selectedAccount.firstname}?
              </h2>
              <p className="mb-6 text-[14px] text-[#98A2B3]">
                Are you sure you want to delete {selectedAccount.firstname} as{" "}
                {selectedAccount.role}.
              </p>

              <div className="flex justify-center space-x-4">
                <CommonButton
                  onClick={() => setModalDeleteAcc(false)}
                  className="rounded-md border border-gray-400 px-9 py-2 text-gray-600 hover:bg-gray-100"
                  variant="outline"
                >
                  Reject
                </CommonButton>

                <CommonButton
                  onClick={handleDeleteAcc}
                  className="hover:bg-primary-color-700 ml-6 rounded-md bg-primary-color-600 px-9 py-2 text-white"
                  disabled={isPending}
                >
                  {isPending ? "Deleting..." : "Delete"}
                </CommonButton>
              </div>
            </div>
          </BorderCard>
        </Modal>
      )}
    </div>
  );
};

export default AccountManagementPage;
