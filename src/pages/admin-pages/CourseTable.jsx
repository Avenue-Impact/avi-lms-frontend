import LiveSessionStudentDeletePopover from "@/Components/admindashboard/course-management/live-session/LiveSessionStudentDeletePopover";
import Table from "@/Components/Table";
import { EllipsisVertical } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import ToggleAccessRevoke from "@/Components/admindashboard/course-management/live-session/ToggleAccessRevoke";
import { useState } from "react";
import { useBulkDeleteStudents } from "@/hooks/course-management/live-session/use-bulk-delete-students";
import { useBulkUpdateDuration } from "@/hooks/course-management/live-session/use-bulk-update-duration";
import SetDurationModal from "@/Components/admindashboard/course-management/live-session/SetDurationModal";
import CommonButton from "@/Components/ui/button";
import { TrashCan } from "@/Components/Icon";
import { Clock } from "lucide-react";

const formatDate = (dateString, justDate=false) => {
  if (!dateString) return "---";
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).replace(' ', '');
  return justDate ? formattedDate : `${formattedDate} | ${formattedTime}`;
};

const CourseTable = ({ data }) => {
  const [queryString] = useSearchParams();
  const { courseId } = useParams();

  const courseTitle = queryString.get("title");
  const cohortName = queryString.get("cohort");
  const cohortId = queryString.get("cohortId");

  const [selectedIds, setSelectedIds] = useState([]);
  const [isDurationModalOpen, setIsDurationModalOpen] = useState(false);

  const { bulkDeleteStudents, isPending: isDeleting } = useBulkDeleteStudents();
  const { bulkUpdateDuration, isPending: isUpdating } = useBulkUpdateDuration();

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = data?.map(student => student.student_id) || [];
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (studentId) => {
    setSelectedIds(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId) 
        : [...prev, studentId]
    );
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to remove ${selectedIds.length} students from this cohort?`)) {
      bulkDeleteStudents({
        courseId,
        cohortId,
        data: { student_ids: selectedIds }
      }, {
        onSuccess: () => setSelectedIds([])
      });
    }
  };

  const handleBulkSetDuration = (access_expires_at) => {
    bulkUpdateDuration({
      courseId,
      cohortId,
      student_ids: selectedIds,
      access_expires_at
    }, {
      onSuccess: () => {
        setIsDurationModalOpen(false);
        setSelectedIds([]);
      }
    });
  };

  const allSelected = data?.length > 0 && selectedIds.length === data?.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data?.length;

  return (
    <div className="overflow-x-auto relative">
      {selectedIds.length > 0 && (
        <div className="sticky top-0 z-10 flex items-center justify-between bg-primary-color-100 px-4 py-3 border-b border-primary-color-300 rounded-t-md mb-2">
          <span className="text-sm font-medium text-primary-color-600">
            {selectedIds.length} student{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            <CommonButton 
              variant="outline" 
              className="text-sm h-8 bg-white"
              onClick={() => setIsDurationModalOpen(true)}
            >
              <Clock className="w-4 h-4 mr-1" />
              Set Duration
            </CommonButton>
            <CommonButton 
              className="text-sm h-8 bg-red-600 text-white hover:bg-red-700 border-none"
              onClick={handleBulkDelete}
              disabled={isDeleting}
            >
              <TrashCan className="w-4 h-4 mr-1 stroke-white" />
              {isDeleting ? "Removing..." : "Unenroll"}
            </CommonButton>
          </div>
        </div>
      )}

      <SetDurationModal 
        open={isDurationModalOpen} 
        setOpen={setIsDurationModalOpen} 
        onSetDuration={handleBulkSetDuration} 
        isPending={isUpdating} 
      />

      <Table cols={"0.2fr 0.5fr 1.5fr 1.6fr 0.8fr 1.4fr 1.2fr 1.0fr 0.4fr"}>
        <Table.Header className={"gap-x-2 *:text-sm *:font-medium *:capitalize pl-4"}>
          <div className="flex items-center justify-center">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-primary-color-600 focus:ring-primary-color-600 cursor-pointer"
              checked={allSelected}
              ref={input => { if (input) input.indeterminate = someSelected }}
              onChange={handleSelectAll}
            />
          </div>
          <div>S/N</div>
          <div>Name</div>
          <div>Course Title</div>
          <div>Course Type</div>
          <div>Enrollment Date</div>
          <div>Access Exp</div>
          <div className="text-center">Access Revoked</div>
          <div className="text-center">Action</div>
        </Table.Header>
        <div className="divide-y">
          {data?.map((student, i) => (
            <Table.Row className={"gap-x-2 *:truncate items-center"} key={student.id}>
              <div className="flex items-center justify-center">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-primary-color-600 focus:ring-primary-color-600 cursor-pointer"
                  checked={selectedIds.includes(student.student_id)}
                  onChange={() => handleSelectOne(student.student_id)}
                />
              </div>
              <span className="font-poppins text-sm text-[#344054] text-center">
                {i + 1 < 10 ? `0${i + 1}` : i + 1}
              </span>
              <span className="font-poppins text-sm text-[#344054]">
                <span className="block font-poppins text-[14px] font-[500] capitalize text-[#101928]">
                  {student.first_name} {student.last_name}
                </span>
                <span className="font-poppins text-[12px] text-[#475367]">
                  {student.email}
                </span>
              </span>
              <span className="text-[14px] text-[#344054]">{courseTitle}</span>

              <span>
                <span className="flex items-center justify-center rounded-full bg-[#FFECE5] px-2 py-1 text-[12px] font-[500] text-[#AD3307] w-fit">
                  Live session
                </span>
              </span>

              <span className="text-[14px] text-[#344054]">{formatDate(student.created_at)}</span>
              <span className="text-[14px] text-[#344054]">
                {student.access_expires_at ? formatDate(student.access_expires_at, true) : "---"}
              </span>
              <div className="flex justify-center items-center">
                <ToggleAccessRevoke 
                  studentId={student.student_id} 
                  initialIsRevoked={student.is_access_revoked} 
                />
              </div>
              <div className="flex justify-center items-center">
                <LiveSessionStudentDeletePopover id={student.id} studentId={student.student_id}>
                  <button className="flex h-8 w-8 items-center justify-center rounded border border-[#E4E7EC] hover:bg-gray-50">
                    <EllipsisVertical className="w-4" />
                  </button>
                </LiveSessionStudentDeletePopover>
              </div>
            </Table.Row>
          ))}
        </div>
      </Table>
    </div>
  );
};

export default CourseTable;
