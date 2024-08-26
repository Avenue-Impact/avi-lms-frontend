import { Heading } from "../auth/components/Text";
import BorderCard from "@/Components/BorderCard";

import { useState } from "react";
import Modal from "../auth/components/Modal";
import ConfirmDelete from "@/Components/dashboard/ConfirmDelete";
import EditProfile from "@/Components/dashboard/EditProfile";
import { cn } from "@/lib/utils";
import ChangePassword from "@/Components/dashboard/ChangePassword";
import { useAuth } from "@/hooks/useAuth";

function StudentSettings() {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState("edit");



  return (
    <div className="">
      {showModal && (
        <Modal>
          <ConfirmDelete setShowModal={setShowModal} />
        </Modal>
      )}
      <header className="flex items-center justify-between">
        <Heading className="text-left">Account settings </Heading>
        <button
          className="text-nowrap border-0 bg-transparent text-primary-color-600 underline md:text-xl lg:text-2xl"
          onClick={() => setShowModal((prev) => !prev)}
        >
          Delete Account
        </button>
      </header>

      <div className="h-full border-b-[2px] border-b-[#E4E7EC] px-4">
        <ul className="flex gap-4 *:text-nowrap">
          <li
            className={cn(
              "after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 *:capitalize after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full",
              page === "edit" ? "text-primary-color-600 after:w-full" : "",
            )}
          >
            <button onClick={() => setPage("edit")}>edit profile</button>
          </li>
          <li
            className={cn(
              "after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 *:capitalize after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full",
              page === "change-password"
                ? "text-primary-color-600 after:w-full"
                : "",
            )}
          >
            <button onClick={() => setPage("change-password")}>
              change password
            </button>
          </li>
        </ul>
      </div>
      <BorderCard className="mt-4 h-full bg-white py-3 lg:py-6 lg:pb-10">
        {page === "edit" ? <EditProfile /> : <ChangePassword />}
      </BorderCard>
    </div>
  );
}

export default StudentSettings;
