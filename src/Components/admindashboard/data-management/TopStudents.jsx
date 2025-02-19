import Table from "@/Components/Table";
import { useFetchTopStudents } from "@/hooks/data-management/use-fetch-top-students";

const TopStudents = () => {
  const { isLoading, data, error } = useFetchTopStudents();

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <p>{error?.response?.data?.message ?? "  Something went wrong!!"}</p>
    );

  return (
    <div className="rounded-lg border border-[#F0F2F5] p-6">
      <p className="mb-7 font-bold text-[#23314A]">Top Students</p>
      {data?.data?.data?.length < 1 ? (
        <p className="text-lg italic text-slate-400">No top student yet ...</p>
      ) : (
        <Table cols={"2fr 1fr"}>
          <Table.Header className={"*:text-sm *:font-medium"}>
            <p>Name</p>
            <p>No. of Courses</p>
          </Table.Header>
          <div className="divide-y">
            {data?.data?.data?.map((student) => {
              return (
                <Table.Row className={"*:px-1 *:text-sm"} key={student.id}>
                  <div className="truncate">
                    {/* <p className="text-sm font-medium text-[#344054]">Robinson</p> */}
                    <p className="truncate text-[#475367]">
                      {student.student_email}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-[#98A2B3]">
                    {student.number_of_enrollments}
                  </p>
                </Table.Row>
              );
            })}
          </div>
        </Table>
      )}
    </div>
  );
};

export default TopStudents;
