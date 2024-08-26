import BorderCard from "@/Components/BorderCard";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heading, Paragraph } from "./Text";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { CommonButton } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

function RegisterSuccess({ title, text, setModal, path }) {
  const navigate = useNavigate();

  const handleModal = () => {
    setModal((prev) => !prev);
    navigate(path);
  };

  return (
    <BorderCard className="relative w-full max-w-[731px] bg-white py-12">
      <button
        type="button"
        className="absolute right-4 top-4 w-fit cursor-pointer"
        onClick={handleModal}
      >
        <FontAwesomeIcon
          icon={faClose}
          className="text-2xl text-tertiary-color-700"
        />
      </button>
      <div className="mx-auto max-w-[430px] space-y-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#61C478] text-2xl text-white">
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <div className="space-y-6">
          <Heading>{title}</Heading>
          <Paragraph>{text}</Paragraph>
        </div>
        <CommonButton
          className="bg-primary-color-600"
          size="lg"
          onClick={handleModal}
        >
          OK
        </CommonButton>
      </div>
    </BorderCard>
  );
}

export default RegisterSuccess;
