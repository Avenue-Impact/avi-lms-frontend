import { IoSearch } from "react-icons/io5";

import { createdCourses } from "@/lib/courses";
import CreatedCourseCard from "@/Components/admindashboard/course-management/CreatedCourseCard";
import { useState } from "react";
import Modal from "@/pages/auth/components/Modal";
import BorderCard from "@/Components/BorderCard";

import ProjectAreaTools from "@/Components/admindashboard/project-area/ProjectAreaTools";
import ProjectCohortSelection from "./ProjectCohortSelection";

const ProjectAreaWithcourse = () => {
  const [modal, setModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [modalTab, setModalTab] = useState("cohort");

  const handleModal = (id) => {
    setModal((prev) => !prev);

    const course = createdCourses.find((course) => course.id === id);
    setSelectedCourse(course);
  };
  return (
    <div>
      <header className="mt-7 flex items-center justify-between px-4 py-5">
        <p className="text-xl text-[#475367]">
          Courses({createdCourses.length})
        </p>
        <div className="flex w-full max-w-[528px] items-center gap-x-4 rounded-md border border-[#D0D5DD] px-4 py-2">
          <label htmlFor="search">
            <IoSearch className="text-xl text-[#667185]" />
          </label>

          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search here..."
            className="w-full placeholder:text-[#667185]"
          />
        </div>
      </header>
      <main className="grid grid-cols-3 gap-[18px]">
        {createdCourses.map((course) => {
          return (
            <div key={course.id} onClick={() => handleModal(course.id)}>
              <CreatedCourseCard
                title={course.title}
                rating={course.rating}
                review={course.reviews}
                path=""
              />
            </div>
          );
        })}
      </main>
      {modal && (
        <Modal>
          <BorderCard className="w-full max-w-[980px] rounded-[10px] bg-white">
            <div className="grid grid-cols-[1fr_2fr] gap-10">
              <CreatedCourseCard
                title={selectedCourse.title}
                rating={selectedCourse.rating}
                review={selectedCourse.reviews}
                path=""
              />

              {modalTab === "cohort" ? (
                <ProjectCohortSelection
                  setModal={setModal}
                  setModalTab={setModalTab}
                />
              ) : (
                <ProjectAreaTools
                  setModalTab={setModalTab}
                  setModal={setModal}
                  id={selectedCourse.id}
                />
              )}
            </div>
          </BorderCard>
        </Modal>
      )}
    </div>
  );
};

export default ProjectAreaWithcourse;
