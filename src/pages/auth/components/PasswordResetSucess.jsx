import BorderCard from "@/Components/BorderCard";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Heading, Paragraph } from "./Text";
import { CommonButton } from "@/Components/ui/button";

function PasswordResetSucess() {
  return (
    <BorderCard className="relative bg-white px-24 py-12">
      <button
        type="button"
        className="absolute right-4 top-4 w-fit cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faClose}
          className="text-tertiary-color-700 text-2xl"
        />
      </button>
      <div className="mx-auto max-w-[430px] space-y-8 text-center">
        <p className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#61C478] text-2xl text-white">
          <FontAwesomeIcon icon={faCheck} />
        </p>
        <div className="space-y-6">
          <Heading>Password Reset Successful!</Heading>
          <Paragraph>
            Your password has been successfully reset. You can now log in with
            your new password.
          </Paragraph>
        </div>
        <CommonButton className="bg-primary-color-600" size="lg">
          OK
        </CommonButton>
      </div>
    </BorderCard>
  );
}

export default PasswordResetSucess;
