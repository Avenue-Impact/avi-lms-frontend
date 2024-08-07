import { CloudUpload } from "@/Components/Icons";
import { CommonButton } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

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
    <section className="mt-2 bg-white px-[25px] py-6 md:px-8 lg:px-10 lg:py-8">
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
        <div className="flex items-center gap-4">
          <p className="text-[#667185]">Upload one or more files</p>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-color-600 text-xs text-white">
            {fileList.length}
          </span>
        </div>
      </form>
    </section>
  );
};

export default Assignment;
