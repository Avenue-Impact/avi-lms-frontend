import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

import { CloudUpload } from "@/Components/Icons";
import { CommonButton } from "@/Components/ui/button";

import pdfImg from "@/assets/icons/pdf-img.png";
import progress from "@/assets/icons/progress.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClose,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { RxDownload } from "react-icons/rx";

const Assignment = () => {
  const inputRef = useRef(null);
  const [light, setLight] = useState(false);
  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => {
    setLight(true);
  };

  const onDragLeave = () => {
    setLight(false);
  };

  const onFileChange = (file) => {
    console.log(file);
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
    console.log("clicked");
  };

  return (
    <section className="bg-white px-[25px] pb-6 pt-0 md:px-8 lg:mt-2 lg:px-10 lg:py-8">
      <h3 className="mb-5 text-2xl font-medium capitalize text-black">
        assignments
      </h3>
      <form action="">
        <div>
          <label
            htmlFor="title"
            className="text-sm font-medium capitalize text-[#101928]"
          >
            title
          </label>
          <Input
            id="title"
            name="title"
            className="rounded-[6px] border border-[#D0D5DD]"
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="title"
            className="text-sm font-medium capitalize text-[#101928]"
          >
            Upload Assignment
          </label>
          <div className="group/file mt-1 rounded-lg border-[1.5px] border-dashed border-[#D0D5DD] px-6 py-7">
            <div
              className="relative"
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDragLeave}
            >
              <span
                className={cn(
                  "mx-auto block w-fit rounded-full bg-[#F0F2F5] p-4",
                  light ? "opacity-20" : "",
                )}
              >
                <input
                  type="file"
                  name=""
                  id=""
                  className="absolute left-0 top-0 h-full w-full opacity-0"
                  ref={inputRef}
                  onChange={onFileDrop}
                />
                <CloudUpload />
              </span>
            </div>
            <p className="pb-1 pt-4 text-center">
              <button
                type="button"
                className="cursor-pointer text-sm font-medium text-primary-color-600"
              >
                Click to upload
              </button>{" "}
              <span className="text-sm font-light text-[#475367]">
                or drag and drop
              </span>
            </p>
            <span className="block text-center text-xs font-light text-[#98A2B3]">
              SVG, PNG, JPG or GIF (max. 800x400px){" "}
            </span>
            <div className="flex items-center gap-1">
              <div className="h-px w-full bg-[#F0F2F5]" />
              <span className="mb-4 mt-[19px] uppercase text-[#101928]">
                or
              </span>
              <div className="h-px w-full bg-[#F0F2F5]" />
            </div>
            <CommonButton
              type="button"
              className="mx-auto block bg-primary-color-600 text-sm text-white"
              onClick={handleClick}
            >
              Browse file
            </CommonButton>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <p className="text-[#667185]">Upload one or more files</p>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-color-600 text-xs text-white">
            {fileList.length}
          </span>
        </div>
        <div className="divide-y">
          <div className="my-6 flex w-full max-w-[450px] items-center justify-between">
            <img src={pdfImg} alt="pdf icon" width={48} height={48} />
            <div>
              <p className="font-medium text-black">Name of document.pdf</p>
              <p className="mt-1 flex items-center gap-1 text-xs font-light text-[#98A2B3]">
                <span>11 Sep, 2023 </span>
                <span>12:24pm</span>
                <span>. 13MB</span>
              </p>
            </div>
            <img src={progress} alt="pdf icon" width={48} height={48} />
            <button type="button">
              {" "}
              <FontAwesomeIcon
                icon={faClose}
                className="text-2xl text-tertiary-color-700"
              />
            </button>
          </div>
          <div className="flex w-full max-w-[450px] items-center justify-between py-6">
            <span className="rounded-full bg-[#E7F6EC] p-2">
              <span className="mx-auto flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#61C478] text-lg text-white">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </span>
            <div>
              <p className="font-medium text-black">Name of document.pdf</p>
              <p className="mt-1 flex items-center gap-2 text-xs font-light text-[#98A2B3]">
                <span>11 Sep, 2023 </span>
                <span>12:24pm</span>
                <span>. 13MB</span>
              </p>
            </div>
            <button type="button" className="text-primary-color-600 md:text-lg">
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <button type="button" className="text-2xl font-bold text-[#475367]">
              <RxDownload />
            </button>
          </div>
        </div>
        <div className="mt-5">
          <label
            htmlFor="additional"
            className="text-sm font-medium capitalize text-[#101928]"
          >
            Additional Information
          </label>
          <Input
            id="additional"
            name="title"
            className="rounded-[6px] border border-[#D0D5DD]"
          />
        </div>
        <CommonButton
          className="mt-10 bg-primary-color-600 capitalize text-[#FFEBF0]"
          type="submit"
        >
          submit
        </CommonButton>
      </form>
    </section>
  );
};

export default Assignment;
