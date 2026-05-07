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
import { Video } from "lucide-react";

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

  // Zoom assignment state
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [selectedZoomAccountId, setSelectedZoomAccountId] = useState("");
  const [cohortToAssignZoom, setCohortToAssignZoom] = useState(null);
  const { mutate: assignZoom, isPending: isAssigningZoom } = useAssignZoomToCohort();
  const { data: zoomAccountsData } = useZoomAccounts();
  const zoomAccounts = zoomAccountsData?.data?.data?.filter((a) => a.is_active) || [];

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
    piopwqpwpqwowop
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
              <button
                onClick={(e) => handleZoomAssignClick(e, cohortItem.id)}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                <Video className="h-3.5 w-3.5" />
                {cohortItem.zoom_account_id ? "Change Zoom" : "Assign Zoom"}
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
