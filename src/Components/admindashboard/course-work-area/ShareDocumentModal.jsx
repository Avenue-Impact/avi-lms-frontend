import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { useFetchAllLiveStudents } from "@/hooks/course-management/live-session/use-fetch-all-live-student";
import { useAddUserToShareDocument } from "@/hooks/course-work-area/use-add-user-to-shared-resources";
import { ShareDocContext } from "@/pages/admin-pages/course-work-area/CourseWorkShareDocs";
import Modal from "@/pages/auth/components/Modal";
import { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useParams, useSearchParams } from "react-router-dom";

const ShareDocumentModal = ({ setModal, setModalActive }) => {
  return (
    <Modal>
      <BorderCard className="w-full max-w-[603px] rounded-lg bg-white">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-medium text-[#344054]">
              Shared documents
            </h2>
            <p className="mt-2 max-w-[297px] text-sm text-[#667185]">
              Access and manage documents shared across courses and sections for
              streamlined collaboration.
            </p>
          </div>
          <CommonButton
            variant={"outline"}
            onClick={() => setModal((prev) => !prev)}
          >
            cancel
          </CommonButton>
        </div>
        <AllStudent setModal={setModal} />

        {/* <div className="mt-7 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#667185]">thekdfisher@email.com</p>
            <input
              type="checkbox"
              className="checked:accent-primary-color-600"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#667185]">thekdfisher@email.com</p>
            <input
              type="checkbox"
              className="checked:accent-primary-color-600"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#667185]">thekdfisher@email.com</p>
            <input
              type="checkbox"
              className="checked:accent-primary-color-600"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#667185]">thekdfisher@email.com</p>
            <input
              type="checkbox"
              className="checked:accent-primary-color-600"
            />
          </div>
        </div> */}
      </BorderCard>
    </Modal>
  );
};

const AllStudent = ({ setModal }) => {
  const [queryString] = useSearchParams();
  const { courseId } = useParams();
  const cohortId = queryString.get("cohortId");
  const [students, setStudents] = useState([]);
  const { mutate: addUser, isPending } = useAddUserToShareDocument();
  const { active } = useContext(ShareDocContext);

  const handleCheckboxChange = (email, isChecked) => {
    if (isChecked) {
      // Add email if checkbox is selected
      setStudents((prev) => [...prev, email]);
    } else {
      // Remove email if checkbox is deselected
      setStudents((prev) => prev.filter((e) => e !== email));
    }
  };

  const { data, isLoading, error } = useFetchAllLiveStudents(
    courseId,
    cohortId,
  );
  const handleSubmit = () => {
    addUser(
      {
        courseId,
        cohortId,
        section: active,
        data: {
          listOfEmails: students,
        },
      },
      {
        onSuccess: () => {
          setModal((prev) => !prev);
          setStudents([]);
        },
      },
    );
  };
  if (isLoading) return <p>Loading...</p>;
  if (error)
    return <p>{error?.response?.data?.message ?? "something went wrong"}</p>;
  if (data?.data?.data?.length < 1)
    return <p className="mt-6">No students in this cohort</p>;
  if (data?.data?.data?.length > 0) {
    const allmail = data?.data?.data?.map((student) => student.email);

    return (
      <>
        <div className="flex items-center justify-between">
          <div className="flex w-full max-w-[330px] items-center gap-x-4 rounded-md border border-[#D0D5DD] px-4 py-2">
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
          <CommonButton
            className="bg-primary-color-600"
            onClick={() => setStudents(allmail)}
          >
            Select all student
          </CommonButton>
        </div>

        <div>
          <div className="mt-6 space-y-4 divide-y px-[14px] py-[22px] shadow-lg">
            {data?.data?.data.map((student) => {
              return (
                <div key={student.id} className="py-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={student.email}
                      id={student.id}
                      value={student.email}
                      className="accent-primary-color-600"
                      checked={students.includes(student.email)}
                      onChange={(e) =>
                        handleCheckboxChange(student.email, e.target.checked)
                      }
                    />
                    <p>{student.email}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="ml-auto mt-7 flex w-min items-center gap-4">
          <CommonButton
            variant={"outline"}
            className="w-[150px]"
            onClick={() => setModal((prev) => !prev)}
          >
            Back
          </CommonButton>
          <CommonButton
            className="w-[150px] bg-primary-color-600"
            disabled={students.length < 1 || isPending}
            onClick={handleSubmit}
          >
            Next
          </CommonButton>
        </div>
      </>
    );
  }
};

export default ShareDocumentModal;
