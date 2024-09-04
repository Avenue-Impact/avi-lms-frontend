import DashButton from "@/pages/auth/ButtonDash";
import NoCoursesImg from "../../../../assets/images/no_courses.png";
import React from "react";
import { Link } from "react-router-dom";

const NoCourses = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className=":w-full flex flex-col items-center justify-center rounded-lg p-6">
        <img
          src={NoCoursesImg}
          alt="No Courses"
          className="mb-4 h-32 w-32 rounded-full"
        />
        <h3 className="mb-2 text-2xl font-semibold text-gray-800">
          No Courses Available
        </h3>
        <p className="mb-4 text-center text-sm text-gray-600">
          You haven’t created any courses yet. Start building your first
          <span className="lg:block">
            {" "}
            course to engage your students and share your knowledge.
          </span>
        </p>
        <Link to="/admin/course/management/create-course">
          <DashButton className="mt-2 bg-[#CC1747] text-white hover:bg-[#b30e3b]">
            Create Course
          </DashButton>
        </Link>
      </div>
    </div>
  );
};

export default NoCourses;
