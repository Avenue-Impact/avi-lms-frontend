import BorderCard from "@/Components/BorderCard";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heading, Paragraph } from "./Text";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { CommonButton } from "@/Components/ui/button";

function RegisterSuccess() {
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
          <Heading>Registration Successful!</Heading>
          <Paragraph>
            You have successfully registered and can now start using your
            account. Enjoy your experience with us!
          </Paragraph>
        </div>
        <CommonButton className="bg-primary-color-600" size="lg">
          OK
        </CommonButton>
      </div>
    </BorderCard>
  );
}

export default RegisterSuccess;
