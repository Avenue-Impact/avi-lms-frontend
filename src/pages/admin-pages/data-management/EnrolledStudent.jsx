import Table from "@/Components/Table";
import { CommonButton } from "@/Components/ui/button";
import { useCallback, useState } from "react";
import { IoSearch } from "react-icons/io5";
import StudentDetails from "./StudentDetails";
import { useFetchAllManagementStudent } from "@/hooks/data-management/use-fetch-all-students-stats";
import GlobalPagination from "@/Components/ui/GlobalPagination";
import _ from "lodash";

export default function EnrolledStudent() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const { data, error, isLoading } = useFetchAllManagementStudent(page, perPage);
  // console.log("Fetch all the students", data);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(
    _.debounce((query) => {
      setSearchQuery(query);
    }, 500),
    [],
  );

  const handleChange = (event) => {
    handleSearch(event.target.value);
  };

  const studentsList = Array.isArray(data?.data?.data) ? data.data.data : (data?.data?.data?.students || []);

  const filteredStudent = studentsList.filter((student) =>
    ((student?.student_name || "") + (student?.student_email || ""))
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading student details</p>;

  if (selectedStudentId) {
    return (
      <StudentDetails
        studentId={selectedStudentId}
        onBack={() => setSelectedStudentId(null)}
      />
    );
  }

  return (
    <div>
      <header className="mt-7 flex items-center justify-between px-4 py-5">
        <p className="text-xl text-[#475367]">
          All Students({studentsList.length})
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
            onChange={handleChange}
          />
        </div>
      </header>

      <div className="mt-10">
        {filteredStudent.length === 0 ? (
          <p className="col-span-3 text-center font-medium text-[#CC1747]">
            User not found
          </p>
        ) : (
          <Table cols={"0.3fr 2fr 1.8fr 1.2fr 1fr"}>
            <Table.Header className={"*:text-sm *:font-medium"}>
              <h4>S/N</h4>
              <h4>Name</h4>
              <h4>Date Created </h4>
              <h4>No of courses enrolled</h4>
              <h4>Action</h4>
            </Table.Header>
            <div className="divide-y">
              {filteredStudent.map((student, i) => (
                <Table.Row key={i}>
                  <p>{i + 1}</p>
                  <p className="text-sm">
                    <span className="block font-medium capitalize text-[#101928]">
                      {student.student_name}
                    </span>
                    <span className="block text-[#475367]">
                      {student.student_email}
                    </span>
                  </p>
                  <p className="text-sm text-[#344054]">
                    {student.createdAt ?? "N/A"}
                  </p>
                  <p className="text-sm text-[#344054]">
                    {student.number_of_enrollments}
                  </p>
                  <CommonButton
                    className="bg-primary-color-600"
                    onClick={() => setSelectedStudentId(student.student_id)}
                  >
                    View Profile
                  </CommonButton>
                </Table.Row>
              ))}
            </div>
          </Table>
        )}
        {data?.data?.pagination && (
          <GlobalPagination
            pagination={data.data.pagination}
            onPageChange={setPage}
            onLimitChange={(limit) => {
              setPerPage(limit);
              setPage(1);
            }}
          />
        )}
      </div>
    </div>
  );
}
