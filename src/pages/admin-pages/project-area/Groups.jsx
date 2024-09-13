import { useState } from "react";

import { FaArrowLeft } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FilterIcon } from "lucide-react";

import { groupCourse } from "@/lib/groupcourse";

import ProjectAreaNav from "@/Components/admindashboard/project-area/ProjectAreaNav";
import PopoverComponent from "@/Components/PopoverComponent";
import { CommonButton } from "@/Components/ui/button";
import EmptyGroup from "./EmptyGroup";
import FilledGroup from "./FilledGroup";
import Modal from "@/pages/auth/components/Modal";
import BorderCard from "@/Components/BorderCard";
import CreateGroupForm from "@/Components/admindashboard/project-area/CreateGroupForm";
import RegisterSuccess from "@/pages/auth/components/RegisterSuccess";
import CreateMultipleGroupForm from "@/Components/admindashboard/project-area/CreateMultipleGroupForm copy";

function Groups() {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(true);
  const [multipleModal, setMultipleModal] = useState(true);

  return (
    <>
      <section>
        <ProjectAreaNav title={" Groups"} />
        <div className="my-12 flex items-center gap-3">
          <button
            className="flex items-center gap-4"
            onClick={() => navigate("/admin/project-area")}
          >
            <span className="rounded-sm border border-[#E4E7EC] px-[9px] py-[7.7px]">
              <FaArrowLeft />
            </span>
            <span className="capitalize text-[#667185]">Go back</span>
          </button>
          <h2 className="text-2xl font-medium text-[#344054]">
            Project Consultant Training Programme (Bundle) | May Cohort 2024
          </h2>
        </div>
        <div className="flex items-center justify-between">
          <p>Groups({groupCourse.length})</p>
          <div className="flex items-center gap-4">
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
            <PopoverComponent
              trigger={
                <p className="flex items-center gap-2 rounded-md border p-2 text-sm font-bold text-[#344054]">
                  <span>
                    <FilterIcon />
                  </span>
                  <span>Filter</span>
                </p>
              }
            >
              hello
            </PopoverComponent>
            <CommonButton
              className="bg-primary-color-600"
              onClick={() => setModal((prev) => !prev)}
            >
              Create Single Group
            </CommonButton>
            <CommonButton
              variant="outline"
              className="text-[#475367]"
              onClick={() => setMultipleModal((prev) => !prev)}
            >
              Create Multiple Group
            </CommonButton>
          </div>
        </div>

        {groupCourse.length < 1 ? <EmptyGroup /> : <FilledGroup />}
      </section>

      {modal && (
        <Modal>
          <BorderCard className="w-full max-w-[603px] rounded-md bg-white p-12">
            <div className="mb-10 flex items-start justify-between">
              <div className="">
                <h3 className="text-2xl font-medium text-[#344054]">
                  Create Single Group
                </h3>
                <p className="mt-2 w-full max-w-[297px] text-[#667185]">
                  Organize students into a focused learning group with tailored
                  content and activities.
                </p>
              </div>
              <CommonButton
                className=""
                variant="outline"
                onClick={() => setModal((prev) => !prev)}
              >
                Cancel
              </CommonButton>
            </div>
            <div>
              <CreateGroupForm />
            </div>
          </BorderCard>
          {success && (
            <Modal>
              <RegisterSuccess
                title={"Group Created Successfully"}
                text={
                  "You have successfully created a new group. Students assigned to this group will have access to content specific to their group."
                }
                setModal={setSuccess}
              />
            </Modal>
          )}
        </Modal>
      )}
      {multipleModal && (
        <Modal>
          <BorderCard className="w-full max-w-[603px] rounded-md bg-white p-12">
            <div className="mb-10 flex items-start justify-between">
              <div className="">
                <h3 className="text-2xl font-medium text-[#344054]">
                  Create Multiple Groups
                </h3>
                <p className="mt-2 w-full max-w-[297px] text-[#667185]">
                  Easily organize students into multiple groups, providing
                  content tailored to each specific group
                </p>
              </div>
              <CommonButton
                className=""
                variant="outline"
                onClick={() => setMultipleModal((prev) => !prev)}
              >
                Cancel
              </CommonButton>
            </div>
            <div>
              <CreateMultipleGroupForm />
            </div>
          </BorderCard>
          {success && (
            <Modal>
              <RegisterSuccess
                title={"Group Created Successfully"}
                text={
                  "You have successfully created a new group. Students assigned to this group will have access to content specific to their group."
                }
                setModal={setSuccess}
              />
            </Modal>
          )}
        </Modal>
      )}
    </>
  );
}

export default Groups;
