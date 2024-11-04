import { useState } from "react";
import { CommonButton } from "../ui/button";

import Modal from "@/pages/auth/components/Modal";
import BorderCard from "../BorderCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";

import EditProfileForm from "./EditProfileForm";

const EditProfile = () => {
  // const { refetch } = useQuery(["userProfile"]);

  const [modal, setModal] = useState(false);

  // useEffect(() => {
  //   if (data) {
  //     form.setValue("firstname", data?.data?.data.firstname);
  //     form.setValue("lastname", data?.data?.data.lastname);
  //     form.setValue("email", data?.data?.data.email);
  //     form.setValue("username", data?.data?.data.username);
  //   }
  // }, [data, form]);

  // Handle file change event

  return (
    <>
      {modal && (
        <Modal>
          <BorderCard className="relative w-full max-w-[731px] rounded-md bg-white py-16 text-center">
            <button
              type="button"
              className="absolute right-4 top-4 w-fit cursor-pointer"
              onClick={() => setModal(false)}
            >
              <FontAwesomeIcon
                icon={faClose}
                className="text-2xl text-tertiary-color-700"
              />
            </button>
            <div className="maxw w-full">
              <p className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#61C478] text-2xl text-white">
                <FontAwesomeIcon icon={faCheck} />
              </p>
              <p className="mb-6 mt-8 text-base font-semibold text-[#23314A] lg:text-xl">
                Account Settings Updated
              </p>
              <p className="text-sm text-[#98A2B3]">
                Your account settings have been successfully updated.
              </p>
            </div>
            <CommonButton
              className="mt-8 bg-[#CC1747] px-[39px] py-[10px] capitalize"
              onClick={() => setModal(false)}
            >
              Ok
            </CommonButton>
          </BorderCard>
        </Modal>
      )}
      <EditProfileForm setModal={setModal} />
    </>
  );
};

export default EditProfile;
