import BorderCard from "@/Components/BorderCard";
import { TrashCan } from "@/Components/Icon";
import Table from "@/Components/Table";
import { CommonButton } from "@/Components/ui/button";
import { students } from "@/lib/student";
import Modal from "@/pages/auth/components/Modal";
import RegisterSuccess from "@/pages/auth/components/RegisterSuccess";
import { Heading, Paragraph } from "@/pages/auth/components/Text";
import { faClose, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useParams } from "react-router-dom";

export default function StudentManagementTable() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  const handleDeleteModal = (id) => {
    const studentName = students.find((student) => student.id === id);
    setName(studentName.name);
    setConfirmDelete((prev) => !prev);
  };

  const handleDelete = () => {
    setConfirmDelete((prev) => !prev);
    setSuccess((prev) => !prev);
  };

  const { team } = useParams();
  return (
    <div>
      <header className="mt-7 flex items-center justify-between px-4 py-5">
        <p className="text-xl text-[#475367]">Students({students.length})</p>
        <div className="flex gap-6">
          <div className="flex w-full max-w-[528px] items-center gap-x-4 rounded-md border border-[#D0D5DD] px-4 py-2">
            <label htmlFor="search">
              <IoSearch className="text-xl text-[#667185]" />
            </label>

            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search here..."
              className="w-full placeholder:text-[#667185]"
            />
          </div>
          <CommonButton className="bg-primary-color-600 capitalize">
            add student
          </CommonButton>
        </div>
      </header>
      <Table cols={"0.6fr 2fr 2fr 1fr"}>
        <Table.Header className={"*:font-medium *:capitalize *:text-[#344054]"}>
          <h6>S/N</h6>
          <h6>name</h6>
          <h6>email address</h6>
          <h6>action</h6>
        </Table.Header>
        <div className="divide-y">
          {students.map((student) => {
            return (
              <Table.Row key={student.id}>
                <p className="text-sm text-[#344054]">{student.id}</p>
                <p className="text-sm font-medium text-[#101928]">
                  {student.name}
                </p>
                <p className="text-sm text-[#475367]">{student.email}</p>
                <CommonButton
                  className="space-x-4 bg-primary-color-600 text-white"
                  onClick={() => handleDeleteModal(student.id)}
                >
                  <span>
                    <TrashCan className={"*:fill-white"} />
                  </span>
                  <span>Remove from group</span>
                </CommonButton>
              </Table.Row>
            );
          })}
        </div>
      </Table>
      {confirmDelete && (
        <Modal>
          <BorderCard className="relative w-full max-w-[731px] bg-white py-12">
            <button
              type="button"
              className="absolute right-4 top-4 w-fit cursor-pointer"
              onClick={() => setConfirmDelete((prev) => !prev)}
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
                <Heading className="font-semibold text-[#23314A]">
                  Remove Student from Group
                </Heading>
                <p className="text-center text-sm text-tertiary-color-700">
                  Are you sure you want to remove{" "}
                  <span className="font-medium capitalize text-[#23314A]">
                    {name}
                  </span>{" "}
                  Robinson from the{" "}
                  <span className="font-medium text-[#23314A]">{team}</span>{" "}
                  group
                </p>
              </div>
              <div className="mx-auto flex w-max gap-[54.6px]">
                <CommonButton
                  className="rounded-sm border border-primary-color-600 text-primary-color-600"
                  size="lg"
                  variant="outline"
                  onClick={() => setConfirmDelete((prev) => !prev)}
                >
                  Cancel
                </CommonButton>
                <CommonButton
                  className="bg-primary-color-600"
                  size="lg"
                  onClick={handleDelete}
                >
                  Remove Student
                </CommonButton>
              </div>
            </div>
          </BorderCard>
        </Modal>
      )}
      {success && (
        <Modal>
          <RegisterSuccess
            title={"Student Removed Successfully"}
            text={`${name} has been successfully removed from the ${team} group`}
            setModal={setSuccess}
          />
        </Modal>
      )}
    </div>
  );
}
