import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { Heading, Paragraph } from "@/pages/auth/components/Text";
import { faClose, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ConfirmDeleteModal({
  setModal,
  setDeleteSuccess,
  title = "Delete WhatsApp Group",
  text = " Are you sure you want to delete this card? This action cannot be undone, and all associated will be permanently removed.",
  handleDelete,
  isPending,
  cardId,
}) {
  return (
    <BorderCard className="relative w-full max-w-[731px] bg-white py-12">
      <button
        type="button"
        className="absolute right-4 top-4 w-fit cursor-pointer"
        onClick={() =>
          setModal((prev) => ({
            ...prev,
            show: false,
          }))
        }
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
            onClick={() =>
              setModal((prev) => ({
                ...prev,
                show: false,
              }))
            }
          >
            Cancel
          </CommonButton>
          <CommonButton
            className="bg-primary-color-600"
            size="lg"
            onClick={handleDelete}
            disabled={isPending}
          >
            Yes, Delete
          </CommonButton>
        </div>
      </div>
    </BorderCard>
  );
}

export default ConfirmDeleteModal;
