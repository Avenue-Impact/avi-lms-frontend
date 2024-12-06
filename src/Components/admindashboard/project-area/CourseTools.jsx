import { useState } from "react";

import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { useDeleteToolsCard } from "@/hooks/project-area/use-delete-tools-card";
import { useFetchAllProjectCards } from "@/hooks/project-area/use-fetch-all-project-cards";
import Modal from "@/pages/auth/components/Modal";
import RegisterSuccess from "@/pages/auth/components/RegisterSuccess";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HiOutlinePencil } from "react-icons/hi";
import { useParams, useSearchParams } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import CreateToolsFormModal from "./CreateToolsFormModal";

function CourseTools() {
  const [createFormModal, setCreateFormModal] = useState(false);
  const [succesModal, setSuccessModal] = useState(false);
  const [edit, setEdit] = useState("");
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({
    id: "",
    show: false,
  });
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");
  const { deleteCard, isPending } = useDeleteToolsCard();

  const handleDelete = () => {
    deleteCard(
      { courseId, cohortId, resourceId: confirmDeleteModal.id },
      {
        onSuccess: () => {
          setConfirmDeleteModal((prev) => ({
            ...prev,
            show: false,
          }));
          setDeleteSuccess((prev) => !prev);
        },
      },
    );
  };

  return (
    <>
      <BorderCard className="grid grid-cols-[1fr_2fr] rounded-[10px] p-12">
        <div>
          <h3 className="text-2xl font-medium text-[#344054]">
            Course Tools & Resources
          </h3>
          <p className="my-2 max-w-[297px] text-[#667185]">
            Create cards for the Course Project area that will be used by
            students enrolled in the course.
          </p>
          <CommonButton
            className="bg-primary-color-600 font-normal"
            onClick={() => setCreateFormModal((prev) => !prev)}
          >
            Create
          </CommonButton>
        </div>
        <CreatedCard
          setConfirmDeleteModal={setConfirmDeleteModal}
          setCreateFormModal={setCreateFormModal}
          setEdit={setEdit}
        />

        {confirmDeleteModal.show && (
          <Modal>
            <ConfirmDeleteModal
              setModal={setConfirmDeleteModal}
              setDeleteSuccess={setDeleteSuccess}
              title={"Delete Google Drive"}
              text={
                "Are you sure you want to delete this card? This action cannot be undone, and all associated will be permanently removed."
              }
              handleDelete={handleDelete}
              isPending={isPending}
            />
          </Modal>
        )}
        {deleteSuccess && (
          <Modal>
            <RegisterSuccess
              title={"Card Deleted Successfully"}
              text={
                "The card has been successfully deleted. All associated data has been permanently removed."
              }
              path={""}
              setModal={setDeleteSuccess}
            />
          </Modal>
        )}
      </BorderCard>

      {createFormModal && (
        <Modal>
          <CreateToolsFormModal
            setModal={setCreateFormModal}
            edit={edit}
            setEdit={setEdit}
          />

          {succesModal && (
            <Modal>
              <RegisterSuccess
                title={"Card Created Successfully"}
                text={
                  "You have successfully created a new card for course tools & resources. Students enrolled in the course will be able to view the added card."
                }
                setModal={setSuccessModal}
              />
            </Modal>
          )}
        </Modal>
      )}
    </>
  );
}

const CreatedCard = ({
  setConfirmDeleteModal,
  setCreateFormModal,
  setEdit,
}) => {
  const { courseId } = useParams();

  const [queryString] = useSearchParams();

  const cohortId = queryString.get("cohortId");

  const { isLoading, data, error } = useFetchAllProjectCards(
    courseId,
    cohortId,
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    return <p>{error?.response?.data?.message ?? "something went wrong"}</p>;
  }

  if (data?.data?.data?.toolsAndResources?.length < 1)
    return (
      <p className="text-lg italic text-slate-300">No card created yet ...</p>
    );
  return (
    <div className="grid max-h-[80vh] w-full max-w-[619px] grid-cols-2 gap-6 justify-self-end overflow-y-auto">
      {data?.data?.data?.toolsAndResources.map((card) => {
        return (
          <article key={card.id}>
            <h4 className="font-medium">{card.title}</h4>
            <div className="mt-[10px] rounded-md border-2 border-[#dadee3] px-4 py-6">
              <h5 className="font-bold text-[#101928]">{card.subtitle}</h5>
              <p className="mb-4 mt-[6px] text-[#667185]">{card.description}</p>
              <div className="flex items-center justify-between">
                <button className="rounded-md bg-[#D0D5DD] px-3 py-2 text-white shadow-sm hover:bg-primary-color-600">
                  {card.button_text}
                </button>
                <div className="flex items-center gap-4">
                  <span
                    className="cursor-pointer text-lg hover:scale-110"
                    role="button"
                    onClick={() => {
                      setCreateFormModal((prev) => !prev);
                      setEdit(card);
                    }}
                  >
                    <HiOutlinePencil />
                  </span>
                  <span
                    className="cursor-pointer text-xl text-primary-color-600 hover:scale-110"
                    role="button"
                    onClick={() =>
                      setConfirmDeleteModal((prev) => ({
                        ...prev,
                        show: true,
                        id: card.id,
                      }))
                    }
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
export default CourseTools;
