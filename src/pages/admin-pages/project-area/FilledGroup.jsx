import ConfirmDeleteGeneralModal from "@/Components/admindashboard/project-area/ConfirmDeleteGeneralModal";
import ConfirmDeleteModal from "@/Components/admindashboard/project-area/ConfirmDeleteModal";
import { TrashCan } from "@/Components/Icon";
import Table from "@/Components/Table";
import { CommonButton } from "@/Components/ui/button";
import { useDeleteSingleProject } from "@/hooks/project-area-groups/use-delete-single-project-group";
import Modal from "@/pages/auth/components/Modal";
import RegisterSuccess from "@/pages/auth/components/RegisterSuccess";
// import { groupCourse } from "@/lib/groupcourse";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

function FilledGroup({ groupData = [], setModal, setEditGroup }) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    const createdAt = new Date(date);
    const locale = navigator.language;

    return new Intl.DateTimeFormat(locale, {
      dateStyle: "medium", // Customize to "short", "long", or "full" as needed
      timeStyle: "short", // Use "short", "medium", or "long" depending on desired granularity
    }).format(createdAt);
  };

  // const [deleteSuccess, SetDeleteSuccess] = useState(false);

  const { deleteSingleGroup, isPending } = useDeleteSingleProject();
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({
    id: "",
    show: false,
  });
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleDelete = () => {
    deleteSingleGroup(
      { courseId, cohortId, groupId: confirmDeleteModal.id },
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
      <div className="mt-10">
        <Table cols={"1fr 3fr 2fr 1.5fr 2fr"}>
          <Table.Header className={"*:text-xs *:font-medium *:text-[#344054]"}>
            <h6>S/N</h6>
            <h6>Group Name</h6>
            <h6> Date created</h6>
            <h6> No. of Students</h6>
            <h6>Action</h6>
          </Table.Header>
          <div className="divide-y">
            {groupData.map((group, i) => {
              return (
                <Table.Row
                  key={group.id}
                  className={"*:text-sm *:text-[#344054]"}
                >
                  <p>{i + 1}</p>
                  <p
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(
                        `${group.id}/edit-project-group?team=${group.group_name}&cohortId=${cohortId}`,
                      )
                    }
                  >
                    {group.group_name}
                  </p>
                  <p>
                    {group ? formatDate(group?.created_at) : "No Date & Time"}
                  </p>

                  <p>{group.max_number_of_students}</p>
                  <div className="flex gap-3">
                    <CommonButton
                      size="sm"
                      className="flex w-max gap-2 bg-primary-color-600"
                      onClick={() => {
                        setEditGroup(group);
                        setModal((prev) => !prev);
                      }}
                    >
                      <span>
                        <Pencil className="h-4 w-4" />
                      </span>
                      <span>Edit</span>
                    </CommonButton>

                    <CommonButton
                      variant="outline"
                      size="sm"
                      className="flex w-max gap-2"
                      onClick={() =>
                        setConfirmDeleteModal({ id: group.id, show: true })
                      }
                    >
                      <span>
                        <TrashCan />
                      </span>
                      <span>Delete</span>
                    </CommonButton>
                  </div>
                </Table.Row>
              );
            })}
          </div>
        </Table>
      </div>

      {confirmDeleteModal.show && (
        <Modal>
          <ConfirmDeleteGeneralModal
            setModal={setConfirmDeleteModal}
            groupId={confirmDeleteModal.id}
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
    </>
  );
}

export default FilledGroup;
