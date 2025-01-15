import ShareDocumentModal from "@/Components/admindashboard/course-work-area/ShareDocumentModal";
import UploadDocumentModal from "@/Components/admindashboard/course-work-area/UploadDocumentModal";
import { CommonButton } from "@/Components/ui/button";
import { DocumentContext } from "@/pages/dashboard/ShareDocument";
import { useContext, useState } from "react";
import { RxDownload } from "react-icons/rx";

function CourseWorkAreaWithDocs({ data, modalActive, setModalActive }) {
  const [modal, setModal] = useState(false);

  return (
    <div className="py-6">
      <h2 className="text-2xl font-medium text-[#344054]">Shared documents</h2>
      <p className="my-3 text-sm text-[#667185]">
        Access and manage documents shared across courses and sections for
        streamlined collaboration.
      </p>
      <div className="flex items-center gap-6">
        <CommonButton
          variant={"outline"}
          onClick={() => {
            setModal((prev) => !prev);
            setModalActive("upload");
          }}
        >
          Share new document
        </CommonButton>
        <CommonButton
          variant={"outline"}
          onClick={() => {
            setModal((prev) => !prev);
            setModalActive("student");
          }}
        >
          Share to students
        </CommonButton>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
        {data?.data?.data?.documents.map((document, i) => {
          return (
            <div key={i} className="">
              <div className="h-32 overflow-hidden rounded-tl-xl rounded-tr-xl md:h-36">
                <img
                  src={document.url}
                  alt={document.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-1 px-2 py-[10px] sm:gap-2 md:px-3">
                <p className="truncate text-[10px] font-light text-tertiary-color-700 md:text-sm">
                  Material for {data?.data?.data?.title}
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
      {modal && modalActive === "student" && (
        <ShareDocumentModal setModal={setModal} />
      )}
      {modal && modalActive === "upload" && (
        <UploadDocumentModal setModal={setModal} />
      )}
    </div>
  );
}

export default CourseWorkAreaWithDocs;
