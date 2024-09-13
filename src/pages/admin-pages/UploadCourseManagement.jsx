import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload, faVideo } from '@fortawesome/free-solid-svg-icons';

const MediaUploadContainer = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRefImage = useRef(null);
  const fileInputRefVideo = useRef(null);

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // Check the image dimensions
          if (img.width > 1920 || img.height > 1080) {
            setError('Image dimensions exceed 1920x1080 pixels');
            setSuccess('');
            setImagePreview('');
          } else {
            setSuccess('Image upload successfully');
            setError('');
            // If dimensions are acceptable, set the image preview
            setImagePreview(reader.result);
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
  

  // Handle video file upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 200 * 1024 * 1024) { // 200MB size limit
        alert('File size exceeds 200MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle click to open file input for image
  const handleClickImage = () => {
    fileInputRefImage.current.click();
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
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop for video
  const handleDropVideo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      if (file.size > 10 * 1024 * 1024) { // 10MB size limit
        alert('File size exceeds 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Image Upload */}
      <div className="col-span-1">
        <p className="mb-2 text-[#101928] font-[500]">Cover Image</p>
        <div className="border-dashed border-2 h-[205px] border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 flex items-center justify-center"
          onClick={handleClickImage}
          onDrop={handleDropImage}
          onDragOver={(e) => e.preventDefault()}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Cover 1"
              className="w-full h-[200px] rounded-md object-cover"
            />
          ) : (
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faCloudUpload} className="text-gray-400 text-3xl mb-2" />
              <span className="text-gray-500">Upload Image</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            ref={fileInputRefImage}
          />
        </div>
        {error ? (<p className="mb-2 text-[#e13636] pt-4 font-[400]" >{error}</p>
        ) : success ? (
           <p className="mb-2 text-[#23944c] pt-4 font-[400]" >{success}</p>
        )
        :(
          <p className="mb-2 text-[#475367] pt-4 font-[400]" >The Image must be 1920 x 1080 Resolution</p>
        )}
      </div>

        {/* Video Upload */}
        <div className="col-span-1 pt-3 lg:pt-10">
            <p className="mb-2 text-[#101928] font-[500]">Upload Taster Video</p>
            <div className="border-dashed border-2 h-[205px] border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 flex items-center justify-center"
              onClick={handleClickVideo} onDrop={handleDropVideo}
              onDragOver={(e) => e.preventDefault()}>
              {videoPreview ? (
                <video
                  src={videoPreview} alt="Cover Video"
                  className="w-full h-[200px] rounded-md object-cover" controls/>
              ) : (
                <div className="flex flex-col items-center">
                  <FontAwesomeIcon icon={faVideo} className="text-gray-400 text-3xl mb-2" />
                  <span className="text-gray-500">Upload Video</span>
                </div>
              )}
              <input type="file" accept="video/*"
                className="hidden" onChange={handleVideoUpload} ref={fileInputRefVideo}/>
            </div>
            <p className="mb-2 text-[#475367] pt-4 font-[400]">Max 200 MB files are allowed</p>
        </div>


        <div className="mb-4 flex h-full items-center justify-center text-justify md:mb-0 lg:flex-row">
            <div className="h-[1px] w-full bg-[#E7E7E7] "></div>
            <div className="text-gray-300 font-[12px] px-2">OR</div>
            <div className="h-[1px] w-full bg-[#E7E7E7] "></div>
        </div>


        <div className="mb-4">
            <label className="block mb-2 text-[#101928] font-medium">
              Upload from URL
            </label>
            <input
              type="text"
              placeholder="Input file URL"
              className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#101928]"
            />
      </div>


  </div>
  );
};

export default MediaUploadContainer;
