import DashButton from '@/pages/auth/ButtonDash';
import React, { useState } from 'react';





const LiveSession = () => {

  const [formData, setFormData] = useState({
    sessionTitle: '',
    sectionSubTitle: '',
    selectionOverview: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.slice(0, 
        name === 'sessionTitle' ? 70 : 450)
    }));
  };


  return (
    <div>
      <div className="mb-4 md:mb-0 border border-gray-300 rounded  mt-5 p-10">
          <div className="grid grid-cols-12 gap-8 max-w-6xl pt-5 mx-auto ">
            <div className="col-span-8">
                {/* Session Title */}
                  <div className="mb-6">
                      <p className="mb-2 text-[#475367] font-[500]">Session Title</p>
                      <textarea
                        name="sessionTitle"
                        value={formData.sessionTitle}
                        onChange={handleInputChange}
                        placeholder="Join Business Analysis Live Session"
                        className="border outline-none border-gray-300 rounded p-2 w-full h-[56px] resize-none"
                        rows="2"
                        cols="50"
                      />
                      <p className="text-right text-gray-500">{formData.sessionTitle.length}/70</p>
                  </div>

                  {/* Section Sub Title */}
                  <div className="mb-6">
                      <p className="mb-2 text-[#475367] font-[500]">Section Sub Title</p>
                      <textarea
                        name="sectionSubTitle"
                        value={formData.sectionSubTitle}
                        onChange={handleInputChange}
                        placeholder="Business Analysis Agile Project Management Software Testing May 2024"
                        className="border outline-none border-gray-300 rounded p-2 w-full h-[56px] resize-none"
                        rows="2"
                        cols="50"
                      />
                      <p className="text-right text-gray-500">{formData.sectionSubTitle.length}/450</p>
                  </div>

                  {/* Selection Overview */}
                  <div>
                      <p className="mb-2 text-[#475367] font-[500]">Selection Overview</p>
                      <textarea
                        name="selectionOverview"
                        value={formData.selectionOverview}
                        onChange={handleInputChange}
                        placeholder="Enter text here..."
                        className="border outline-none border-gray-300 rounded p-2 w-full h-[203px] resize-none"
                        rows="5"
                        cols="50"
                      />
                      <p className="text-right text-gray-500">{formData.selectionOverview.length}/450</p>
                  </div>

                  {/* Course Content */}
                  <div className="mb-6">
                      <p className="mb-2 text-[#475367] font-[500]">Course Content</p>
                      <textarea
                        placeholder="Overview of Project Consulting "
                        className="border outline-none border-gray-300 rounded p-2 w-full h-[56px] resize-none"
                        rows="2"
                        cols="50"
                      />
                  </div>


                  {/* Starting Date and Time */}
                  <div className="flex space-x-4">
                        {/* Duration (Monday-Friday) */}
                        <div className="flex-1 ">
                            <p className="font-[500]">Started from</p>
                            <input 
                                type="date" 
                                defaultValue="2024-09-09" 
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>

                        {/* Time (7:00pm default) */}
                        <div className="flex-1">
                            <p className="font-[500]">Time</p>
                            <input 
                            type="time" 
                            defaultValue="19:00" 
                            className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                    </div>

                  {/* Meeting Date and Time */}
                  <div className="flex pt-6 space-x-4">
                        {/* Duration (Monday-Friday) */}
                        <div className="flex-1 ">
                            <p className="font-[500]">Meeting Date from</p>
                            <input 
                                type="date" 
                                defaultValue="2024-09-09" 
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>

                        {/* Time (7:00pm default) */}
                        <div className="flex-1">
                            <p className="font-[500]">Time</p>
                            <input 
                            type="time" 
                            defaultValue="19:00" 
                            className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                    </div>

                    <div  className="flex justify-end gap-6 items-center pt-10">
                      <DashButton className="px-4 py-2 border border-[#667185] text-[#667185] bg-transparent rounded flex items-center hover:bg-[#f0f0f0] hover:text-[#fff] hover:border-[#fff]">
                        Create New Section
                      </DashButton>

                      <DashButton className="rounded px-4 py-2 text-white">
                        Add Content
                      </DashButton>
                  </div>
            </div>

            <div className="col-span-4">
              <div className='text-16px font-500 text-[#667185]'>
                  <p>Section 1</p>
                  <p className='pt-4'>Join Business Analysis Live Session</p>
                  <p className='py-4'>Business Analysis Agile Project Management Software Testing May 2024</p>
              </div>

              <div>
                  <DashButton className="rounded px-4 py-2 bg-[#929db1] text-white lg:hover:bg-[#727988] lg:hover:text-[#313335]">
                      https://meet.google.com/ohj-
                  </DashButton>
              </div>
            </div>
            
        </div>

        
      </div>

      <div  className="flex justify-end gap-6 items-center pt-10">
          <DashButton className="rounded px-4 py-2 text-white">
            Continue
          </DashButton>
      </div>
    </div>

  );
};

export default LiveSession;
