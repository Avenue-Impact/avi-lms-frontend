import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import CourseManagementPage from "../../pages/admin-pages/CourseManagementPage";
import CourseType from "../../pages/admin-pages/CourseType";
import RecordedSession from "@/pages/admin-pages/course-management/RecordedSession";
import LiveSession from "@/pages/admin-pages/course-management/LiveSession";
import PublishPage from "@/pages/admin-pages/course-management/PublishPage";

const CourseCreation = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [subTab, setSubTab] = useState(null);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    if (tabIndex === 3) setSubTab(1); // Reset subTab when switching to Course Session
  };

  const handleSubTabClick = (subTabIndex) => {
    setSubTab(subTabIndex);
  };

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="flex flex-col">
        {/* Tabs and Buttons */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex">
            {[
              "Course Management",
              "Course Type",
              "Course Session",
              "Publish",
            ].map((label, index) => (
              <button
                key={index}
                className={`flex items-center px-4 py-2 text-sm font-medium ${activeTab === index + 1 ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "text-[#98A2B3] hover:text-gray-800"}`}
                onClick={() => handleTabClick(index + 1)}
              >
                <span
                  className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full ${activeTab === index + 1 ? "bg-[#CC1747] text-white" : "bg-[#98A2B3] text-white"}`}
                >
                  {index + 1}
                </span>
                {label}
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={`ml-2 ${activeTab === index + 1 ? "text-[#CC1747]" : "text-[#98A2B3]"}`}
                />
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            {(activeTab === 1 ||
              activeTab === 2 ||
              (activeTab === 3 && subTab === 1)) && (
              <button className="flex items-center rounded border border-[#667185] bg-transparent px-4 py-2 text-[#667185] hover:bg-[#f0f0f0]">
                Save and Continue
              </button>
            )}
            {activeTab === 3 && subTab === 2 && (
              <button className="flex items-center rounded border border-[#667185] bg-transparent px-4 py-2 text-[#667185] hover:bg-[#f0f0f0]">
                Preview
              </button>
            )}
            {activeTab === 4 && (
              <button className="flex items-center rounded border border-[#667185] bg-transparent px-4 py-2 text-[#667185] hover:bg-[#f0f0f0]">
                Publish
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div
          className={` ${activeTab === 1 ? "" : activeTab === 2 ? "" : activeTab === 3 ? "" : ""}`}
        >
          {activeTab === 1 && <CourseManagementPage />}
          {activeTab === 2 && (
            <div>
              <CourseType />
            </div>
          )}
          {activeTab === 3 && (
            <div>
              <div className="mb-4 flex w-max gap-4 border-b border-[#98A2B3]">
                <button
                  className={`border-b-2 px-4 py-2 font-[600] ${subTab === 1 ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "border-b-transparent text-[#344054]"} `}
                  onClick={() => handleSubTabClick(1)}
                >
                  Live Session
                </button>
                <button
                  className={`border-b-2 px-4 py-2 font-[600] ${subTab === 2 ? "border-b-primary-color-600 text-primary-color-600" : "border-b-transparent text-[#344054]"} `}
                  onClick={() => handleSubTabClick(2)}
                >
                  Recorded
                </button>
              </div>
              {subTab === 1 && <LiveSession />}
              {subTab === 2 && <RecordedSession />}
            </div>
          )}
          {activeTab === 4 && <PublishPage />}
        </div>
      </div>
    </div>
  );
};

export default CourseCreation;
