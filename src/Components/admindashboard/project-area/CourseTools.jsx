import { useState } from "react";

import CreateFormModal from "./CreateFormModal";
import RegisterSuccess from "@/pages/auth/components/RegisterSuccess";
import Modal from "@/pages/auth/components/Modal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HiOutlinePencil } from "react-icons/hi";
import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { courseResource, courseTools } from "@/lib/courseResource";

function CourseTools() {
  const [createFormModal, setCreateFormModal] = useState(false);
  const [succesModal, setSuccessModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

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
        <div className="grid max-h-[80vh] w-full max-w-[619px] grid-cols-2 gap-6 justify-self-end overflow-y-auto">
          {courseTools.map((course) => {
            return (
              <article key={course.id}>
                <h4 className="font-medium">{course.title}</h4>
                <div className="mt-[10px] rounded-md border border-[#F0F2F5] px-4 py-6">
                  <h5 className="font-bold text-[#101928]">
                    {course.subtitle}
                  </h5>
                  <p className="mb-4 mt-[6px] text-[#667185]">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <button className="rounded-md bg-[#D0D5DD] px-3 py-2 text-white shadow-sm hover:bg-primary-color-600">
                      {course.btnText}
                    </button>
                    <div className="flex items-center gap-4">
                      <span
                        className="cursor-pointer text-lg hover:scale-110"
                        role="button"
                        onClick={() => setCreateFormModal((prev) => !prev)}
                      >
                        <HiOutlinePencil />
                      </span>
                      <span
                        className="cursor-pointer text-xl text-primary-color-600 hover:scale-110"
                        role="button"
                        onClick={() => setConfirmDeleteModal((prev) => !prev)}
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
        {confirmDeleteModal && (
          <Modal>
            <ConfirmDeleteModal
              setModal={setConfirmDeleteModal}
              setDeleteSuccess={setDeleteSuccess}
              title={"Delete Google Drive"}
              text={
                "Are you sure you want to delete this card? This action cannot be undone, and all associated will be permanently removed."
              }
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
          <CreateFormModal setModal={setCreateFormModal} />

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

export default CourseTools;
