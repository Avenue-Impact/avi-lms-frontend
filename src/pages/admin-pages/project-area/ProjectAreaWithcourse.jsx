import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import Modal from "@/pages/auth/components/Modal";
import BorderCard from "@/Components/BorderCard";
import CreatedCourseCard from "@/Components/admindashboard/course-management/CreatedCourseCard";
import ProjectAreaTools from "@/Components/admindashboard/project-area/ProjectAreaTools";
import ProjectCohortSelection from "./ProjectCohortSelection";

import debounce from "lodash.debounce";

const ProjectAreaWithcourse = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [modalTab, setModalTab] = useState("cohort");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState({
    cohort: "",
    cohortId: "",
  });

  // console.log("FetchALl", data);

  const formatDate = (date) => {
    const createdAt = new Date(date);
    const locale = navigator.language;

    return new Intl.DateTimeFormat(locale).format(createdAt);
  };

  // const cohorts = data?.data?.data?.courses.cohorts

  useEffect(() => {
    if (data) {
      const courses = data?.data?.data?.courses || [];
      console.log("Courses", courses);
      if (searchQuery) {
        const searchResults = courses.filter((course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setFilteredCourses(searchResults);
      } else {
        setFilteredCourses(courses);
      }
    }
  }, [data, searchQuery]);

  const handleModal = (id) => {
    setModal((prev) => !prev);

    const course = filteredCourses.find((course) => course.id === id);
    setSelectedCourse(course);
  };

  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div>
      <header className="mt-7 flex items-center justify-between px-4 py-5">
        <p className="text-xl text-[#475367]">
          Courses({filteredCourses.length})
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
            onChange={handleSearchChange}
          />
        </div>
      </header>
      <main className="grid grid-cols-3 gap-[18px]">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleModal(course.id)}
              className="cursor-pointer"
            >
              <CreatedCourseCard
                imgSrc={course.cover_image}
                altText={course.title}
                title={course.title}
                date={
                  course?.cohorts[0]
                    ? formatDate(course?.cohorts[0].created_at)
                    : "Not published"
                }
                rating={course.average_rating ?? 0}
                review={course.total_reviews}
                path=""
              />
            </div>
          ))
        ) : (
          <p>No Courses</p>
        )}
      </main>
      {modal && (
        <Modal>
          <BorderCard className="w-full max-w-[980px] rounded-[10px] bg-white">
            <div className="grid grid-cols-[1fr_2fr] gap-10">
              <CreatedCourseCard
                imgSrc={selectedCourse.cover_image}
                title={selectedCourse.title}
                date={
                  selectedCourse?.cohorts[0]
                    ? formatDate(selectedCourse?.cohorts[0].created_at)
                    : "Not published"
                }
                // rating={selectedCourse.average_rating}
                // review={selectedCourse.reviews}
                path=""
              />
              {selectedCourse?.cohorts?.length > 0 ? (
                modalTab === "cohort" ? (
                  <ProjectCohortSelection
                    setModal={setModal}
                    onClick={() => setModalTab("project-tools")}
                    cohorts={selectedCourse?.cohorts || []}
                    selectedCourse={selectedCourse}
                    selectedCohort={selectedCohort}
                    setSelectedCohort={setSelectedCohort}
                  />
                ) : (
                  <ProjectAreaTools
                    setModalTab={setModalTab}
                    setModal={setModal}
                    selectedCourse={selectedCourse}
                    selectedCohort={selectedCohort}
                  />
                )
              ) : (
                <p>No cohorts available for this course</p>
              )}
            </div>
          </BorderCard>
        </Modal>
      )}
    </div>
  );
};

export default ProjectAreaWithcourse;
