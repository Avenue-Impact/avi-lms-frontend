import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/format-date";
import { ClipLoader } from "react-spinners";
import { fetchCohorts, fetchAdmins } from "@/services/api";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Modal from "@/pages/auth/components/Modal";
import { useAssignInstructor } from "@/hooks/course-management/use-assign-instructor";
import { useParams } from "react-router-dom";
import { useAssignZoomToCohort, useZoomAccounts } from "@/hooks/zoom-management/use-zoom-accounts";
import { Video, UserCheck, UserX } from "lucide-react";
import InstructorSearchSelect from "@/Components/instructor/InstructorSearchSelect";

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

  const { assign, isAssigning, remove, isRemoving } = useAssignInstructor(courseId, cohortToAssign);

  // Zoom assignment state
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [selectedZoomAccountId, setSelectedZoomAccountId] = useState("");
  const [cohortToAssignZoom, setCohortToAssignZoom] = useState(null);
  const { mutate: assignZoom, isPending: isAssigningZoom } = useAssignZoomToCohort();
  const { data: zoomAccountsData } = useZoomAccounts();
  const zoomAccounts = zoomAccountsData?.data?.data?.filter((a) => a.is_active) || [];

  const currentCohort = data?.data?.data?.find((c) => c.id === cohortToAssign);

  const handleZoomAssignClick = (e, cohortId) => {
    e.stopPropagation();
    setCohortToAssignZoom(cohortId);
    setSelectedZoomAccountId("");
    setIsZoomModalOpen(true);
  };

  const handleZoomAssignSubmit = (e) => {
    e.preventDefault();
    if (!selectedZoomAccountId) return;
    assignZoom(
      { cohortId: cohortToAssignZoom, zoom_account_id: selectedZoomAccountId },
      { onSuccess: () => setIsZoomModalOpen(false) }
    );
  };

  const handleAssignClick = (e, cohortItem) => {
    e.stopPropagation();
    setCohortToAssign(cohortItem.id);
    const existingInstructorId =
      typeof cohortItem.instructor === "object" && cohortItem.instructor !== null
        ? cohortItem.instructor._id || cohortItem.instructor.id
        : cohortItem.instructor || "";
    setSelectedInstructorId(existingInstructorId || "");
    setIsModalOpen(true);
  };

  const handleRemoveInstructor = (e, cohortId, cohortName) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove the assigned instructor from "${cohortName}"?`)) {
      remove(cohortId);
    }
  };

  const handleModalRemove = () => {
    if (window.confirm(`Remove assigned instructor from "${currentCohort?.cohort}"?`)) {
      remove(cohortToAssign, {
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
          {data?.data.data.map((cohortItem) => {
            const hasInstructor = !!cohortItem.instructor;
            const instructorObj = typeof cohortItem.instructor === "object" ? cohortItem.instructor : null;
            const instructorName = instructorObj
              ? `${instructorObj.first_name || instructorObj.firstname || ""} ${instructorObj.last_name || instructorObj.lastname || ""}`.trim()
              : "";
            const instructorEmail = instructorObj?.email || "";

            return (
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
                  <span className="mb-1 block text-lg font-semibold text-tertiary-color-700">
                    {cohortItem.cohort}
                  </span>
                  <span className="block text-xs text-primary-color-600">
                    {formatDate(cohortItem.created_at)}
                  </span>
                  {hasInstructor ? (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                        <UserCheck className="h-3.5 w-3.5" />
                        {instructorName ? `${instructorName}${instructorEmail ? ` (${instructorEmail})` : ""}` : "Instructor Assigned"}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleRemoveInstructor(e, cohortItem.id, cohortItem.cohort)}
                        disabled={isRemoving}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                        title="Remove assigned instructor"
                      >
                        <UserX className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>
                  ) : (
                    <span className="block mt-2 text-xs text-gray-400 italic">
                      No instructor assigned
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleAssignClick(e, cohortItem)}
                    className="px-4 py-2 bg-primary-color-600 text-white rounded-md text-sm hover:bg-primary-color-700 transition"
                  >
                    {hasInstructor ? "Change Instructor" : "Assign Instructor"}
                  </button>
                  <button
                    onClick={(e) => handleZoomAssignClick(e, cohortItem.id)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                  >
                    <Video className="h-3.5 w-3.5" />
                    {cohortItem.zoom_account_id ? "Change Zoom" : "Assign Zoom"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isModalOpen && (
        <Modal>
          <div className="w-[460px] max-w-[95vw] bg-white p-6 rounded-xl shadow-2xl">
            <h2 className="text-xl font-bold mb-1 text-gray-900">
              {currentCohort?.instructor ? "Change Instructor" : "Assign Instructor"}
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Cohort: <span className="font-semibold text-gray-700">{currentCohort?.cohort}</span>
            </p>

            <form onSubmit={handleAssignSubmit}>
              <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
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
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    disabled={isAssigning || isRemoving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isAssigning || isRemoving || !selectedInstructorId}
                    className="px-4 py-2 bg-primary-color-600 text-white rounded-md text-sm font-medium hover:bg-primary-color-700 disabled:opacity-50 transition"
                  >
                    {isAssigning ? "Assigning..." : "Save Assignment"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Zoom Account Assignment Modal */}
      {isZoomModalOpen && (
        <Modal>
          <div className="w-[400px] bg-white p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                <Video className="h-4 w-4 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-tertiary-color-700">Assign Zoom Account</h2>
            </div>
            <form onSubmit={handleZoomAssignSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Zoom Account
                </label>
                {zoomAccounts.length === 0 ? (
                  <p className="text-sm text-red-500 py-2">
                    No active Zoom accounts found. Add one in{" "}
                    <a href="/admin/zoom-management" className="underline text-blue-600">
                      Zoom Management
                    </a>
                    .
                  </p>
                ) : (
                  <select
                    value={selectedZoomAccountId}
                    onChange={(e) => setSelectedZoomAccountId(e.target.value)}
                    className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="" disabled>Select a Zoom account</option>
                    {zoomAccounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsZoomModalOpen(false)}
                  className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                  disabled={isAssigningZoom}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAssigningZoom || !selectedZoomAccountId}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isAssigningZoom ? "Assigning..." : "Assign"}
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
