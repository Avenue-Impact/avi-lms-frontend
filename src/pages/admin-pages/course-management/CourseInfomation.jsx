import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CourseManagementSection from "@/Components/admindashboard/course-management/courses/CourseManagementSection";
import LinkList from "@/Components/LinkList";

import LiveSessionStudentManagement from "@/Components/admindashboard/course-management/courses/LiveSessionStudentManagement";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { fetchAdmins } from "@/services/api";
import Modal from "@/pages/auth/components/Modal";
import { useAssignInstructor } from "@/hooks/course-management/use-assign-instructor";

import { useSafeBack } from "@/hooks/use-safe-back";

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

  // const [active, setActive] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState("");
  const [cohortToAssign, setCohortToAssign] = useState(null);

  const { assign, isAssigning } = useAssignInstructor(courseId, cohortToAssign);

  const handleAssignClick = (e) => {
    // e.stopPropagation();
    setCohortToAssign(cohortId);
    setIsModalOpen(true);
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
            Assign Instructor
          </LinkList>
          <LinkList
            className={"text-sm font-medium"}
            onClick={() => setActive("course-management")}
            active={active === "course-management"}
          >
            student management
          </LinkList>
        </ul>
      </header>
      {active === "course-section" && <CourseManagementSection />}
      {active === "course-management" && <LiveSessionStudentManagement />}

      {isModalOpen && (
        <Modal>
          <div className="w-[820px] rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold text-black">
              Assign Instructor
            </h2>
            <form onSubmit={handleAssignSubmit}>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Select Instructor
                </label>
                <select
                  value={selectedInstructorId}
                  onChange={(e) => setSelectedInstructorId(e.target.value)}
                  className="w-full rounded-md border p-2 focus:border-primary-color-600 focus:ring-primary-color-600"
                  required
                >
                  <option value="" disabled>
                    Select an instructor
                  </option>
                  {instructors.map((inst) => (
                    <option key={inst.id} value={inst.id} className="hover:border-primary-color-600 focus:ring-primary-color-600">
                      {inst.firstname} {inst.lastname} ({inst.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md border px-4 py-2 text-gray-600 hover:bg-gray-50"
                  disabled={isAssigning}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAssigning || !selectedInstructorId}
                  className="hover:bg-primary-color-700 rounded-md bg-primary-color-600 px-4 py-2 text-white disabled:opacity-50"
                >
                  {isAssigning ? "Assigning..." : "Assign"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CourseInfomation;
