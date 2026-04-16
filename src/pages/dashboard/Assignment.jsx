import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

import { CloudUpload } from "@/Components/Icons";
import { CommonButton } from "@/Components/ui/button";

import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import { useSubmitAssignment } from "@/hooks/students/use-submit-assignment";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { File } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

const Assignment = ({ data, assignmentDetails }) => {
  const inputRef = useRef(null);
  const [light, setLight] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { mutate: submitAssignment, isPending } = useSubmitAssignment();
  // const [queryString] = useSearchParams();
  const cohortId = data.cohort_id;
  const { courseId } = useParams();
  const { sectionActive } = useViewCourseSections();

  const validFileSize = (file, maxSizeMb) => {
    let maxfilesize_in_mb = maxSizeMb || 100,
      filesize = file.size; // in MB
    const filesize_in_mb = Math.round(filesize / 1048576);
    if (filesize_in_mb > maxfilesize_in_mb) {
      return false;
    }
    return true;
  };

  const fileExist = (file) => {
    if (file) {
      const result = Array.from(fileList).filter((f) => f.name === f.name);
      if (result.length > 0) {
        return true;
      }
      return false;
    }
  };

  const validateExtension = (file) => {
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type == "application/pdf"
    ) {
      return true;
    }
    return false;
  };

  const handleFileInput = (event) => {
    const selectedFiles = event.target.files;

    const validFiles = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      // if (!fileExist(selectedFiles[i])) {
      if (validateExtension(selectedFiles[i])) {
        if (validFileSize(selectedFiles[i], 25)) {
          validFiles.push(selectedFiles[i]);
        } else {
          alert(selectedFiles[i] + "file size too large");
        }
      } else {
        alert(selectedFiles[i].name + "does not have a valid extension");
      }
      // } else {
      //   alert(selectedFiles[i].name + "File already exists");
      // }
    }

    setFileList((prev) => [...prev, ...validFiles]);
  };

  const handleDropFile = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    const validFiles = [];
    for (let i = 0; i < droppedFiles.length; i++) {
      if (fileExist(droppedFiles[i])) {
        if (validateExtension(droppedFiles[i])) {
          if (validFileSize(droppedFiles[i], 25)) {
            validFiles.push(droppedFiles[i]);
          } else {
            alert(droppedFiles[i] + "file size too large");
          }
        } else {
          alert(droppedFiles[i].name + "does not have a valid extension");
        }
      } else {
        alert(droppedFiles[i].name + "File already exists");
      }
    }

    setFileList((prev) => [...prev, ...validFiles]);
  };

  const fileSize = (sizeInByte) => {
    const names = ["bytes", "KiB", "MiB", "GiB", "TiB"];
    let count = 0;
    let size = parseInt(sizeInByte, 10) || 0;
    while (size >= 1024 && ++count) {
      size = size / 1024;
    }

    return size.toFixed(size < 10 && count > 0 ? 1 : 0) + "" + names[count];
  };

  const handleDelete = (fileName) => {
    const newFileArr = Array.from(fileList).filter((f) => f.name !== fileName);

    setFileList([...newFileArr]);
  };
  const onDragEnter = () => {
    setLight(true);
  };

  const onDragLeave = () => {
    setLight(false);
  };

  const handleClick = () => {
    inputRef.current.click();
  };
  const documentSchema = z.object({
    title: z
      .string()
      .min(3, { message: "character must be more than three" })
      .max(65, { message: "not more than 65" }),
    additional_informations: z
      .string()
      .min(3, { message: "character must be more than three" })
      .max(40, { message: "not more than 40 characters" }),
  });

  const form = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      title: "",
      additional_informations: "",
    },
  });

  const onSubmit = (data) => {
    const file = new FormData();
    file.append("title", data.title);
    file.append("additional_informations", data.additional_informations);

    for (let i = 0; i < fileList.length; i++) {
      file.append("assignments", fileList[i]);
    }

    submitAssignment(
      {
        data: file,
        courseId,
        cohortId,
        section: sectionActive,
      },
      {
        onSuccess: () => {
          setFileList([]);
          form.reset();
        },
      },
    );
  };
  if (!assignmentDetails) {
    return (
      <div className="py-10 text-center text-gray-500">
        <p>No assignments for this section.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 w-full max-w-[768px]">
      <div className="mb-8 rounded-lg border border-gray-100 bg-gray-50 p-6">
        <h3 className="mb-2 text-xl font-semibold text-[#101928]">
          {assignmentDetails.title}
        </h3>
        <div
          className="prose text-sm text-[#475367]"
          dangerouslySetInnerHTML={{ __html: assignmentDetails.instructions }}
        />
        {assignmentDetails.resources &&
          assignmentDetails.resources.length > 0 && (
            <div className="mt-4">
              <h4 className="mb-2 font-medium text-[#101928]">Resources:</h4>
              <ul className="list-inside list-disc">
                {assignmentDetails.resources.map((resource, idx) => (
                  <li key={idx}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-color-600 hover:underline"
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-medium capitalize text-[#344054]">
            Submit Assignment
          </h3>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormInput
              name="title"
              label="Title"
              placeholder=""
              id="title"
              type="text"
              control={form.control}
            />
            <p className="mt-1 text-right text-gray-500">
              {form.watch("title") ? `${form.watch("title").length}` : 0}
              /65
            </p>
          </div>

          <div className="mt-5">
            <label
              htmlFor="title"
              className="text-sm font-medium capitalize text-[#101928]"
            >
              Upload Document
            </label>
            <div
              className="group/file mt-1 rounded-lg border-[1.5px] border-dashed border-[#D0D5DD] px-6 py-7"
              onDrop={() => {
                onDragLeave();
                handleDropFile();
              }}
              onDragOver={handleDropFile}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
            >
              <div className="relative">
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
                    onChange={handleFileInput}
                    multiple
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

          {Array.from(fileList)
            .reverse()
            .map((file, i) => {
              return (
                <div
                  className="mt-5 flex w-full max-w-[450px] items-center justify-between"
                  key={i}
                >
                  <div className="flex items-center gap-2">
                    <span>
                      <File className="h-12 w-12 text-primary-color-600" />
                    </span>
                    <div>
                      <p className="font-medium text-black">{file.name}</p>
                      <p className="flex items-center gap-1 text-sm font-light text-[#98A2B3]">
                        {/* <span>11 Sep, 2023 | 12:24pm</span>
                          <span className="h-1 w-1 rounded bg-[#98A2B3]"></span> */}

                        <span>{fileSize(file.size)}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="text-primary-color-600 md:text-lg"
                      onClick={() => handleDelete(file.name)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </div>
              );
            })}

          <div className="mb-10 mt-5">
            <FormInput
              name="additional_informations"
              label="Additional Informations"
              placeholder=""
              id="additional_informations"
              type="text"
              control={form.control}
            />
            <p className="mt-1 text-right text-gray-500">
              {/* {form.watch("title") ? `${form.watch("title").length}` : 0}
              /65 */}
              Maximum Character 40
            </p>
          </div>

          <div className="ml-auto">
            <CommonButton
              className="bg-primary-color-600"
              disabled={isPending || fileList.length < 1}
            >
              Submit
            </CommonButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Assignment;
