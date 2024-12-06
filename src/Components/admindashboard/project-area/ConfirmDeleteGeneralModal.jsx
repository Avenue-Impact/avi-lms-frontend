import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
// import { useDeleteCard } from "@/hooks/project-area/use-delete-card";
import { Heading, Paragraph } from "@/pages/auth/components/Text";
import { faClose, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useParams, useSearchParams } from "react-router-dom";

function ConfirmDeleteGeneralModal({
  setModal,
  title = "Delete",
  text = "Are you sure you want to delete this group? This action cannot be undone.",
  handleDelete,
  isPending,
}) {
  return (
    <BorderCard className="relative w-full max-w-[731px] bg-white py-12">
      {/* Close Button */}
      <button
        type="button"
        className="absolute right-4 top-4 w-fit cursor-pointer"
        onClick={() =>
          setModal({ id: "", show: false }) // Ensure modal closes properly
        }
      >
        <FontAwesomeIcon
          icon={faClose}
          className="text-2xl text-tertiary-color-700"
        />
      </button>

      {/* Modal Content */}
      <div className="mx-auto max-w-[430px] space-y-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F2A356] text-2xl text-white">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </span>
        <div className="space-y-6">
          <Heading className="font-semibold text-[#23314A]">{title}</Heading>
          <Paragraph>{text}</Paragraph>
        </div>
        <div className="mx-auto flex w-max gap-[54.6px]">
          {/* Cancel Button */}
          <CommonButton
            className="rounded-sm border border-primary-color-600 text-primary-color-600"
            size="lg"
            variant="outline"
            onClick={() =>
              setModal({ id: "", show: false }) // Close the modal
            }
          >
            Cancel
          </CommonButton>

          {/* Confirm Delete Button */}
          <CommonButton
            className={`bg-primary-color-600 ${isPending ? "opacity-50" : ""}`}
            size="lg"
            onClick={handleDelete} // Trigger the delete action
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Yes, Delete"}
          </CommonButton>
        </div>
      </div>
    </BorderCard>
  );
}


export default ConfirmDeleteGeneralModal;
