import { useFetchSharedDocuments } from "@/hooks/students/use-fetch-shared-document";
import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import { RxDownload } from "react-icons/rx";
import { useParams } from "react-router-dom";
import docsimg from "../../assets/images/dashboard/docs.png";
import pdf from "../../assets/images/dashboard/pdf.png";

const Documents = ({ data }) => {
  const { courseId } = useParams();

  const cohortId = data.cohort_id;
  const { sectionActive } = useViewCourseSections();

  const imageUrl = (filetype, url) => {
    const file = filetype.split("/").pop();
    if (file === "pdf") {
      return pdf;
    } else if (
      filetype === "docs" ||
      filetype === "docx" ||
      filetype === "txt"
    ) {
      return docsimg;
    } else {
      return url;
    }
  };

  const handleDownload = (url, name) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const {
    data: docs,
    isLoading,
    error,
    isFetching,
  } = useFetchSharedDocuments(courseId, cohortId, sectionActive);

  if (isLoading || isFetching) return <p>Loading...</p>;

  if (error)
    return <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;

  if (docs?.data?.data?.length < 1) return <NoDocument />;
  return (
    <section className="bg-white pb-6 pt-0 sm:px-[22px] md:px-10 md:py-8 lg:mt-2 lg:px-4">
      <h3 className="mb-5 text-2xl font-medium capitalize text-black">
        shared document
      </h3>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
        {docs?.data?.data?.map((document) => {
          return (
            <div key={document._id} className="">
              <div className="h-32 overflow-hidden rounded-tl-xl rounded-tr-xl md:h-36">
                <img
                  src={imageUrl(document.file_type, document.url)}
                  alt={document.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-1 px-2 py-[10px] sm:gap-2 md:px-3">
                <p className="text-[10px] font-light text-tertiary-color-700 md:text-sm">
                  {document.name}
                </p>
                <button
                  type="button"
                  className="cursor-pointer rounded-full bg-[#FFEBF0] p-1 text-primary-color-600 md:p-3 md:text-xl"
                  onClick={() => handleDownload(document.url, document.name)}
                >
                  <RxDownload />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

function NoDocument() {
  return (
    <div className="py-10 text-center">
      <h3 className="text-xl font-medium text-tertiary-color-700">
        No shared documents found.
      </h3>
      <p className="text-tertiary-color-600 text-sm font-light">
        You haven&apos;t shared any documents yet.
      </p>
    </div>
  );
}

export default Documents;
