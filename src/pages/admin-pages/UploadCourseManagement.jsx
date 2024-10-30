import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload, faVideo } from "@fortawesome/free-solid-svg-icons";
import FormInput from "@/Components/ui/form-input";
import { cn } from "@/lib/utils";

const MediaUploadContainer = ({
  image,
  setImage,
  message,
  setMessage,
  imageRef,
  video,
  setVideo,
  form,
}) => {
  // const [videoPreview, setVideoPreview] = useState({});

  const fileInputRefVideo = useRef(null);

  const urlInput = form.watch("url").length;

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();

        img.onload = () => {
          // Check the image dimensions
          if (img.width > 1920 || img.height > 1080)
            return setMessage((prev) => {
              return {
                ...prev,
                error: "Image dimensions exceed 1920x1080 pixels",
                success: "",
              };
            });

          setMessage((prev) => {
            return {
              ...prev,
              error: "",
              success: "Image upload successfully",
            };
          });

          // If dimensions are acceptable, set the image preview
          setImage((prev) => {
            return { ...prev, file: file, preview: reader.result };
          });
        };

        form.setValue("image", file);

        img.src = reader.result;
      };

      reader.readAsDataURL(file);
    }
  };

  // Handle video file upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 200 * 1024 * 1024)
        return alert("File size exceeds 200MB");

      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo((prev) => {
          return { ...prev, file: file, preview: reader.result };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle click to open file input for image
  const handleClickImage = () => {
    imageRef.current.click();
  };

  // Handle click to open file input for video
  const handleClickVideo = () => {
    fileInputRefVideo.current.click();
  };

  // Handle drag and drop for image
  const handleDropImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage((prev) => {
          return { ...prev, file: file, preview: reader.result };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop for video
  const handleDropVideo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB size limit
        alert("File size exceeds 10MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo((prev) => {
          return { ...prev, file: file, preview: reader.result };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Image Upload */}
      <div className="col-span-1">
        <p className="mb-2 font-[500] text-[#101928]">Cover Image</p>
        <div
          className="flex h-[205px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-4 text-center hover:bg-gray-50"
          onClick={handleClickImage}
          onDrop={handleDropImage}
          onDragOver={(e) => e.preventDefault()}
        >
          {image.preview ? (
            <img
              src={image.preview}
              alt="Cover 1"
              className="h-[200px] w-full rounded-md object-cover"
            />
          ) : (
            <div className="flex flex-col items-center">
              <FontAwesomeIcon
                icon={faCloudUpload}
                className="mb-2 text-3xl text-gray-400"
              />
              <span className="text-gray-500">Upload Image</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            ref={imageRef}
            name="image"
          />
        </div>
        {message.error ? (
          <p className="mb-2 pt-4 font-[400] text-[#e13636]">{message.error}</p>
        ) : message.success ? (
          <p className="mb-2 pt-4 font-[400] text-[#23944c]">
            {message.success}
          </p>
        ) : (
          <p className="mb-2 pt-4 font-[400] text-[#475367]">
            The Image must be 1920 x 1080 Resolution
          </p>
        )}
      </div>

      {/* Video Upload */}
      <div
        className={cn(
          "disabled: col-span-1 pt-3 disabled:cursor-not-allowed lg:pt-10",
        )}
      >
        <p className="mb-2 font-[500] text-[#101928]">Upload Taster Video</p>
        <div
          className={cn(
            "flex h-[205px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-4 text-center hover:bg-gray-50",
            urlInput > 1 ? "cursor-not-allowed" : "cursor-pointer",
          )}
          onClick={handleClickVideo}
          onDrop={handleDropVideo}
          onDragOver={(e) => e.preventDefault()}
        >
          {video.preview ? (
            <video
              src={video.preview}
              alt="Cover Video"
              className="h-[200px] w-full rounded-md object-cover"
              controls
            />
          ) : (
            <div className={cn("flex flex-col items-center")}>
              <FontAwesomeIcon
                icon={faVideo}
                className="mb-2 text-3xl text-gray-400"
              />
              <span className="text-gray-500">Upload Video</span>
            </div>
          )}
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
            ref={fileInputRefVideo}
            name="image"
            disabled={urlInput > 1}
          />
        </div>
        <p className="mb-2 pt-4 font-[400] text-[#475367]">
          Max 200 MB files are allowed
        </p>
      </div>

      <div className="mb-4 flex h-full items-center justify-center text-justify md:mb-0 lg:flex-row">
        <div className="h-[1px] w-full bg-[#E7E7E7]"></div>
        <div className="px-2 font-[12px] text-gray-300">OR</div>
        <div className="h-[1px] w-full bg-[#E7E7E7]"></div>
      </div>

      <div className="mb-4">
        <FormInput
          label={"Upload from URL"}
          type={"text"}
          className="w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#101928]"
          placeholder="Input file URL e.g https://"
          name="url"
          id="url"
          control={form.control}
          disabled={video.file ? true : false}
        />
      </div>
    </div>
  );
};

export default MediaUploadContainer;
