import React from "react";
import NoCoursesImg from "../../../assets/images/admin/no-student-icon.png";
import AdminNav from "@/Components/admindashboard/AdminNav";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ReviewEmpty = () => {
  // const navigate = useNavigate();

  return (
    <div>
      <AdminNav>
        <div className="flex items-center gap-2">
          {/* <button
            className="flex items-center gap-2"
            onClick={() => navigate("/admin/reviews")}
          >
            <span className="rounded-sm border border-[#E4E7EC] px-[9px] py-[7.7px]">
              <FaArrowLeft />
            </span>
            <span className="text-sm capitalize text-[#667185]">Go back</span>
          </button> */}

          <p className="text-xl font-medium text-[#344054]">
            No Reviews Yet
          </p>
        </div>
      </AdminNav>

      <div className="mb-4 mt-5 gap-10 p-10 md:mb-0">
        <div className="pt-8">
          <div className="flex flex-col items-center justify-center rounded-lg p-6">
            <img
              src={NoCoursesImg}
              alt="No Courses"
              className="mb-4 h-32 w-32 rounded-full"
            />
            <h3 className="mb-2 text-2xl font-semibold text-gray-800">
              No Reviews Yet
            </h3>
            <p className="mb-4 text-center text-sm text-gray-600">
              This student has not given a review for the course yet. Encourage
              <span className="lg:block">
                them to share their thoughts and help others make informed
              </span>
              <span className="lg:block">decision</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewEmpty;
