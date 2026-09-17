import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CourseManagementSection from "@/Components/admindashboard/course-management/courses/CourseManagementSection";
import LinkList from "@/Components/LinkList";

import LiveSessionStudentManagement from "@/Components/admindashboard/course-management/courses/LiveSessionStudentManagement";
import AdminCourseMaterialsSection from "@/Components/admindashboard/course-management/AdminCourseMaterialsSection";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { fetchAdmins, getSingleCohort } from "@/services/api";
import Modal from "@/pages/auth/components/Modal";
import { useAssignInstructor } from "@/hooks/course-management/use-assign-instructor";
import { useSafeBack } from "@/hooks/use-safe-back";
import { UserX } from "lucide-react";
import InstructorSearchSelect from "@/Components/instructor/InstructorSearchSelect";

function CourseInfomation() {
  const [queryString] = useSearchParams();
  const navigate = useNavigate();
  const goBack = useSafeBack();

  const { data: adminsData } = useQuery({
    queryKey: ["get-admins"],
    queryFn: () => fetchAdmins(1, 100),
  });

  const instructors =
    adminsData?.data?.data?.admins?.filter(
      (admin) => admin.role === "Instructor",
    ) || [];

  const { courseId } = useParams();
  const cohortId = queryString.get("cohortId");

  const { data: singleCohortData } = useQuery({
    queryKey: ["get-single-cohort", { courseId, cohortId }],
    queryFn: () => getSingleCohort(courseId, cohortId),
    enabled: !!cohortId,
  });

  const currentCohort = singleCohortData?.data?.data;

  // const [active, setActive] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState("");
  const [cohortToAssign, setCohortToAssign] = useState(null);

  const { assign, isAssigning, remove, isRemoving } = useAssignInstructor(courseId, cohortToAssign);

  const handleAssignClick = (e) => {
    setCohortToAssign(cohortId);
    const existingId =
      typeof currentCohort?.instructor === "object" && currentCohort?.instructor !== null
        ? currentCohort.instructor._id || currentCohort.instructor.id
        : currentCohort?.instructor || "";
    setSelectedInstructorId(existingId || "");
    setIsModalOpen(true);
  };

  const handleModalRemove = () => {
    if (window.confirm(`Remove assigned instructor from "${cohort || "this cohort"}"?`)) {
      remove(cohortId, {
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedInstructorId("");
        },
      });
    }
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (selectedInstructorId) {
      assign(selectedInstructorId, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };
  const cohort = queryString.get("cohort");

  const [active, setActive] = useState("course-section");

  return (
    <div className="mt-12">
      <header className="flex items-center justify-between">
        <div className="flex w-full items-center justify-between gap-1 md:gap-6 lg:w-max lg:justify-normal">
          <button
            onClick={goBack}
            type="button"
            className="flex items-center gap-1"
          >
            <span className="flex items-center justify-center rounded-sm border-[#E4E7EC] text-base text-black md:h-6 md:w-6 md:border md:text-[10px]">
              <FaLongArrowAltLeft />
            </span>
            <span className="hidden text-sm capitalize text-[#667185] md:block">
              go back
            </span>
          </button>
          <p className="text-xl font-medium text-black lg:text-2xl 2xl:text-2xl">
            {cohort}
          </p>
        </div>
        <ul className="*:capitalize flex items-center gap-4">
          <LinkList
            className={"text-sm font-medium"}
            onClick={() => setActive("course-section")}
            active={active === "course-section"}
          >
            course sections
          </LinkList>
          <LinkList
            className={"text-sm font-medium"}
            onClick={(e) => handleAssignClick(e)}
            active={active === "assign-instructor"}
          >
            {currentCohort?.instructor ? "Change Instructor" : "Assign Instructor"}
          </LinkList>
          <LinkList
            className={"text-sm font-medium"}
            onClick={() => setActive("course-management")}
            active={active === "course-management"}
          >
            student management
          </LinkList>
          <LinkList
            className={"text-sm font-medium"}
            onClick={() => setActive("course-materials")}
            active={active === "course-materials"}
          >
            course materials
          </LinkList>
        </ul>
      </header>
      {active === "course-section" && <CourseManagementSection />}
      {active === "course-management" && <LiveSessionStudentManagement />}
      {active === "course-materials" && (
        <AdminCourseMaterialsSection
          courseId={courseId}
          cohortId={cohortId}
          cohortName={cohort}
        />
      )}

      {isModalOpen && (
        <Modal>
          <div className="w-[520px] max-w-[95vw] rounded-xl bg-white p-6 shadow-2xl">
            <h2 className="mb-1 text-xl font-bold text-gray-900">
              {currentCohort?.instructor ? "Change Instructor" : "Assign Instructor"}
            </h2>
            <p className="mb-4 text-xs text-gray-500">
              Cohort: <span className="font-semibold text-gray-700">{cohort || "Selected Cohort"}</span>
            </p>

            <form onSubmit={handleAssignSubmit}>
              <div className="mb-5">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Select Instructor (Search by Name or Email)
                </label>
                <InstructorSearchSelect
                  instructors={instructors}
                  selectedId={selectedInstructorId}
                  onSelect={(id) => setSelectedInstructorId(id)}
                  placeholder="Type to search instructor by name or email..."
                />
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                {currentCohort?.instructor ? (
                  <button
                    type="button"
                    onClick={handleModalRemove}
                    disabled={isRemoving || isAssigning}
                    className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                  >
                    <UserX className="h-3.5 w-3.5" />
                    {isRemoving ? "Removing..." : "Remove Instructor"}
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    disabled={isAssigning || isRemoving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isAssigning || isRemoving || !selectedInstructorId}
                    className="hover:bg-primary-color-700 rounded-md bg-primary-color-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 transition"
                  >
                    {isAssigning ? "Assigning..." : "Save Assignment"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CourseInfomation;
