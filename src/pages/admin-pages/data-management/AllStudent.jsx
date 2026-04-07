import Table from "@/Components/Table";
import { CommonButton } from "@/Components/ui/button";
import { useCallback, useState } from "react";
import { IoSearch } from "react-icons/io5";
import StudentDetails from "./StudentDetails";
import { useFetchAllStudent } from "@/hooks/students/use-fetch-all-students";
import GlobalPagination from "@/Components/ui/GlobalPagination";
import _ from "lodash";

export default function AllStudent() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const { data, error, isLoading } = useFetchAllStudent(page, perPage);
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
    ((student?.firstname || "") + ' ' + (student?.lastname || "") + (student?.email || ""))
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
          <Table cols={"0.3fr 1.2fr 1fr 1.8fr 1.2fr 1fr"}>
            <Table.Header className={"*:text-sm *:font-medium"}>
              <h4>S/N</h4>
              <h4>Name</h4>
              <h4>Username</h4>
              <h4>Email</h4>
              <h4>Date Created </h4>
              <h4>Action</h4>
            </Table.Header>
            <div className="divide-y">
              {filteredStudent.map((student, i) => (
                <Table.Row key={i}>
                  <p className="pl-3">{i + 1}</p>
                  <p className="pl-3 text-sm">
                    <span className="block font-medium capitalize text-[#101928]">
                      {student.firstname} {student.lastname}
                    </span>
                  </p>
                  <p className="block pl-2 text-sm text-[#344054]">
                    {student.username}
                  </p>
                  <p className="pl-2 text-sm text-[#344054]">{student.email}</p>
                  <p className="pl-2 text-sm text-[#344054]">
                    {student.createdAt ?? "N/A"}
                  </p>
                  <CommonButton
                    className="bg-primary-color-600"
                    onClick={() => setSelectedStudentId(student.id)}
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
