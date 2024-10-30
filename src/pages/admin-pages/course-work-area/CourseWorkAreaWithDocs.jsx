import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { documents } from "@/lib/documents";
import Modal from "@/pages/auth/components/Modal";
import { Input } from "postcss";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { RxDownload } from "react-icons/rx";

function CourseWorkAreaWithDocs() {
  const [modal, setModal] = useState(false);

  return (
    <div className="py-6">
      <h2 className="text-2xl font-medium text-[#344054]">Shared documents</h2>
      <p className="my-3 text-sm text-[#667185]">
        Access and manage documents shared across courses and sections for
        streamlined collaboration.
      </p>
      <CommonButton
        variant={"outline"}
        onClick={() => setModal((prev) => !prev)}
      >
        Share new document
      </CommonButton>
      <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
        {documents.map((document, i) => {
          return (
            <div key={i} className="">
              <div className="h-32 overflow-hidden rounded-tl-xl rounded-tr-xl md:h-36">
                <img
                  src={document.img}
                  alt={document.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center gap-1 px-2 py-[10px] sm:gap-2 md:px-3">
                <p className="text-[10px] font-light text-tertiary-color-700 md:text-sm">
                  {document.title}
                </p>
                <button
                  type="button"
                  className="cursor-pointer rounded-full bg-[#FFEBF0] p-1 text-primary-color-600 md:p-3 md:text-xl"
                >
                  <RxDownload />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {modal && (
        <Modal>
          <BorderCard className="w-full max-w-[603px] rounded-lg bg-white">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-medium text-[#344054]">
                  Shared documents
                </h2>
                <p className="mt-2 max-w-[297px] text-sm text-[#667185]">
                  Access and manage documents shared across courses and sections
                  for streamlined collaboration.
                </p>
              </div>
              <CommonButton
                variant={"outline"}
                onClick={() => setModal((prev) => !prev)}
              >
                cancel
              </CommonButton>
            </div>
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
              <CommonButton className="bg-primary-color-600">
                Select all student
              </CommonButton>
            </div>
            <div className="mt-7 space-y-4">
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
            </div>

            <div className="ml-auto mt-7 flex w-min items-center gap-4">
              <CommonButton variant={"outline"} className="w-[150px]">
                Back
              </CommonButton>
              <CommonButton className="w-[150px] bg-primary-color-600">
                Next
              </CommonButton>
            </div>
          </BorderCard>
        </Modal>
      )}
    </div>
  );
}

export default CourseWorkAreaWithDocs;
