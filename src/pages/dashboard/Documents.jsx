import { documents } from "@/lib/documents";
import { RxDownload } from "react-icons/rx";

const Documents = () => {
  return (
    <section className="mt-2 bg-white px-4 py-6 sm:px-[22px] md:px-10 md:py-8">
      <h3 className="mb-5 text-2xl font-medium capitalize text-black">
        shared document
      </h3>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
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
                <span className="cursor-pointer rounded-full bg-[#FFEBF0] p-1 text-primary-color-600 md:p-3 md:text-xl">
                  <RxDownload />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Documents;
