import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BorderCard from "../BorderCard";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Heading } from "@/pages/auth/components/Text";

const ModalCard = () => {
  return (
    <BorderCard className="relative w-full max-w-[731px] bg-white py-12">
      <button
        type="button"
        className="absolute right-4 top-4 w-fit cursor-pointer"
        onClick={() => handleClose?.()}
      >
        <FontAwesomeIcon
          icon={faClose}
          className="text-2xl text-tertiary-color-700"
        />
      </button>
      <div className="mx-auto max-w-[430px] space-y-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F2A356] text-2xl text-white">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </span>
        <div className="space-y-6">
          <Heading className="font-semibold text-[#23314A]">{title}</Heading>
          <Paragraph>{text}</Paragraph>
        </div>
        <div className="mx-auto flex w-max gap-[54.6px]">
          <CommonButton
            className="rounded-sm border border-primary-color-600 text-primary-color-600"
            size="lg"
            variant="outline"
            onClick={() => setModal((prev) => !prev)}
          >
            Cancel
          </CommonButton>
          <CommonButton
            className="bg-primary-color-600"
            size="lg"
            onClick={handleDelete}
          >
            Yes, Delete
          </CommonButton>
        </div>
      </div>
    </BorderCard>
  );
};

const Heading = ({ children }) => {
  return (
    <h1
      className={cn(
        "text-center font-poppins text-base text-heading md:text-nowrap md:text-xl lg:text-xl",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default ModalCard;
