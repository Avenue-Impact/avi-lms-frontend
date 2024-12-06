import { useState } from "react";
import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { HiOutlinePencil } from "react-icons/hi";

import { courseResource } from "@/lib/courseResource";
import Modal from "@/pages/auth/components/Modal";
import RegisterSuccess from "@/pages/auth/components/RegisterSuccess";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateFormModal from "./CreateFormModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useParams, useSearchParams } from "react-router-dom";
import { useFetchAllProjectCards } from "@/hooks/project-area/use-fetch-all-project-cards";
import { useDeleteCard } from "@/hooks/project-area/use-delete-card";
import { useEditProjectGroup } from "@/hooks/project-area-groups/use-edit-project-group";

function CourseGroupProjectArea() {
  const [createFormModal, setCreateFormModal] = useState(false);
  const [succesModal, setSuccessModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({
    id: "",
    show: false,
  });
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const { courseId, groupId } = useParams();
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");
  const { deleteCard, isPending } = useDeleteCard();
  const { editGroupProject, isPending: isEditing } =
    useEditProjectGroup(groupId);

  const handleDelete = () => {
    deleteCard(
      { courseId, cohortId, cardId: confirmDeleteModal.id },
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
            Course Project Area
          </h3>
          <p className="my-2 max-w-[297px] text-[#667185]">
            Create cards for the Course Project area that will be used by
            students enrolled in the course.
          </p>
          <CommonButton
            className="bg-primary-color-600 font-normal"
            onClick={() => {
              setEdit(null);
              setCreateFormModal((prev) => !prev);
            }}
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
              cardId={confirmDeleteModal.id}
              setDeleteSuccess={setDeleteSuccess}
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
          <CreateFormModal
            edit={edit}
            setEdit={setEdit}
            setModal={setCreateFormModal}
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

  if (data?.data?.data?.cards?.length < 1)
    return (
      <p className="text-lg italic text-slate-300">No card created yet ...</p>
    );
  return (
    <div className="grid max-h-[80vh] w-full max-w-[619px] grid-cols-2 gap-6 justify-self-end overflow-y-auto">
      {data?.data?.data?.cards.map((card) => {
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
export default CourseGroupProjectArea;
