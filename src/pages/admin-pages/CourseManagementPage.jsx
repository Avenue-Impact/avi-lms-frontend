import React, { useState } from 'react';
import UploadCourseManagement from './UploadCourseManagement';
import DashButton from '../auth/ButtonDash';



const CourseManagementPage = () => {

  const [formData, setFormData] = useState({
    courseTitle: '',
    courseIncludes: '',
    toolsTech: '',
    benefits:'',
    highlight: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.slice(0, 
        name === 'courseTitle' ? 60 : 
        name === 'courseIncludes' ? 100 : 
        405)
    }));
  };


  return (
    <div className="grid grid-cols-12 gap-8 max-w-6xl pt-5 mx-auto ">
        <div className="col-span-8">
             {/* Course Title */}
              <div className="mb-6">
                  <p className="mb-2 text-[#475367] font-[500]">Course Title: <span className='text-[#CC1747]'>*</span> </p>
                  <textarea
                    name="courseTitle"
                    value={formData.courseTitle}
                    onChange={handleInputChange}
                    placeholder="Enter text here..."
                    className="border outline-none border-gray-300 rounded p-2 w-full h-[56px] resize-none"
                    rows="2"
                    cols="50"
                  />
                  <p className="text-right text-gray-500">{formData.courseTitle.length}/60</p>
              </div>

              {/* Course Includes Input */}
              <div className="mb-6">
                  <p className="mb-2 text-[#475367] font-[500]">Course Includes: <span className='text-[#CC1747]'>*</span> </p>
                  <textarea
                    name="courseIncludes"
                    value={formData.courseIncludes}
                    onChange={handleInputChange}
                    placeholder="Enter text here..."
                    className="border outline-none border-gray-300 rounded p-2 w-full h-[117px] resize-none"
                    rows="5"
                    cols="50"
                  />
                  <p className="text-right text-gray-500">{formData.courseIncludes.length}/100</p>
              </div>

              {/* Tools and Technologies */}
              <div>
                  <p className="mb-2 text-[#475367] font-[500]">Tools and Technologies: <span className='text-[#CC1747]'>*</span> </p>
                  <textarea
                    name="toolsTech"
                    value={formData.toolsTech}
                    onChange={handleInputChange}
                    placeholder="Enter text here..."
                    className="border outline-none border-gray-300 rounded p-2 w-full h-[203px] resize-none"
                    rows="5"
                    cols="50"
                  />
                  <p className="text-right text-gray-500">{formData.toolsTech.length}/405</p>
              </div>

              {/* Benefits */}
              <div>
                  <p className="mb-2 text-[#475367] font-[500]">Benefits: <span className='text-[#CC1747]'>*</span> </p>
                  <textarea
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    placeholder="Enter text here..."
                    className="border outline-none border-gray-300 rounded p-2 w-full h-[203px] resize-none"
                    rows="5"
                    cols="50"
                  />
                  <p className="text-right text-gray-500">{formData.benefits.length}/405</p>
              </div>

              {/* Programme Highlight */}
              <div>
                  <p className="mb-2 text-[#475367] font-[500]">Programme Highlight: <span className='text-[#CC1747]'>*</span> </p>
                  <textarea
                    name="highlight"
                    value={formData.highlight}
                    onChange={handleInputChange}
                    placeholder="Enter text here..."
                    className="border outline-none border-gray-300 rounded p-2 w-full h-[203px] resize-none"
                    rows="5"
                    cols="50"
                  />
                  <p className="text-right text-gray-500">{formData.highlight.length}/405</p>
              </div>


              <div  className="flex justify-end items-center pt-10">
                  {/* <DashButton className="px-4 py-2 border border-[#667185] text-[#667185] bg-transparent rounded flex items-center hover:bg-[#f0f0f0] hover:text-[#fff] hover:border-[#fff]">
                    Save as draft
                  </DashButton> */}

                  <DashButton className="rounded px-4 py-2 text-white">
                    Save & Continue
                  </DashButton>
              </div>
        </div>

        <div className="col-span-4">
            <UploadCourseManagement/>
        </div>
        
    </div>

  );
};

export default CourseManagementPage;
