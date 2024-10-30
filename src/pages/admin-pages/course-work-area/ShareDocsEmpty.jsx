import { CommonButton } from "@/Components/ui/button";
import icon from "../../../assets/icons/book.png";

function ShareDocsEmpty() {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
      <div>
        <img src={icon} alt="" className="mx-auto block" />
        <p className="mx-auto mb-2 mt-5 text-center text-xl font-medium text-[#101928]">
          No Documents Shared
        </p>
        <p className="mx-auto text-center font-light text-[#101928]">
          There are no shared documents available at the moment. Once documents
          are uploaded and shared, they will appear here for easy access and
          management.
        </p>
        <CommonButton className="m-auto mt-5 block bg-primary-color-600">
          Upload Document
        </CommonButton>
      </div>
    </div>
  );
}

export default ShareDocsEmpty;
