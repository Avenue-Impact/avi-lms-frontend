import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/format-date";

import { ClipLoader } from "react-spinners";
import { fetchCohorts, fetchAdmins } from "@/services/api";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Modal from "@/pages/auth/components/Modal";
import { useAssignInstructor } from "@/hooks/course-management/use-assign-instructor";
import { useParams } from "react-router-dom";

const AllCohorts = ({ setCohortId }) => {
  const { courseId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["get-cohorts"],
    queryFn: () => fetchCohorts(courseId),
  });

  const { data: adminsData } = useQuery({
    queryKey: ["get-admins"],
    queryFn: () => fetchAdmins(1, 100),
  });

  const instructors = adminsData?.data?.data?.admins?.filter(admin => admin.role === "Instructor") || [];

  const [active, setActive] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState("");
  const [cohortToAssign, setCohortToAssign] = useState(null);

  const { assign, isAssigning } = useAssignInstructor(courseId, cohortToAssign);

  const handleAssignClick = (e, cohortId) => {
    e.stopPropagation();
    setCohortToAssign(cohortId);
    setIsModalOpen(true);
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (selectedInstructorId) {
      assign(selectedInstructorId, {
        onSuccess: () => setIsModalOpen(false)
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <ClipLoader size={20} color={"#CC1747"} />
      ) : (
        <div className="col-span-7 space-y-3">
          {data?.data.data.map((cohortItem) => (
            <div
              onClick={() => {
                setActive(cohortItem.id);
                setCohortId(cohortItem.id);
                localStorage.setItem("cohorts", cohortItem.cohort);
              }}
              key={cohortItem.id}
              className={cn(
                "w-full rounded-lg border px-4 py-6 text-left hover:border-primary-color-600 hover:bg-[#FFEBF0] cursor-pointer flex justify-between items-center",
                active === cohortItem.id
                  ? "border-primary-color-600 bg-[#FFEBF0]"
                  : "",
              )}
            >
              <div>
                <span className="mb-3 block text-lg font-semibold text-tertiary-color-700">
                  {cohortItem.cohort}
                </span>
                <span className="block text-xs text-primary-color-600">
                  {formatDate(cohortItem.created_at)}
                </span>
                {cohortItem.instructor && (
                  <span className="block mt-2 text-sm text-gray-600">
                    Instructor Assigned
                  </span>
                )}
              </div>
              <button
                onClick={(e) => handleAssignClick(e, cohortItem.id)}
                className="px-4 py-2 bg-primary-color-600 text-white rounded-md text-sm hover:bg-primary-color-700"
              >
                Assign Instructor
              </button>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <Modal>
          <div className="w-[400px] bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-tertiary-color-700">Assign Instructor</h2>
            <form onSubmit={handleAssignSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Instructor</label>
                <select
                  value={selectedInstructorId}
                  onChange={(e) => setSelectedInstructorId(e.target.value)}
                  className="w-full border rounded-md p-2 focus:ring-primary-color-600 focus:border-primary-color-600"
                  required
                >
                  <option value="" disabled>Select an instructor</option>
                  {instructors.map((inst) => (
                    <option key={inst._id} value={inst._id}>
                      {inst.first_name} {inst.last_name} ({inst.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                  disabled={isAssigning}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAssigning || !selectedInstructorId}
                  className="px-4 py-2 bg-primary-color-600 text-white rounded-md hover:bg-primary-color-700 disabled:opacity-50"
                >
                  {isAssigning ? "Assigning..." : "Assign"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AllCohorts;
