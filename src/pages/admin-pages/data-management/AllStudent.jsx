import Table from "@/Components/Table";
import { CommonButton } from "@/Components/ui/button";
import { allStudent } from "@/lib/allStudent";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import StudentDetails from "./StudentDetails";

export default function AllStudent() {
  const [Profile, setProfile] = useState(false);
  if (!Profile)
    return (
      <div>
        <header className="mt-7 flex items-center justify-between px-4 py-5">
          <p className="text-xl text-[#475367]">
            All Students({allStudent.length})
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
            />
          </div>
        </header>

        <div className="mt-10">
          <Table cols={"0.3fr 2fr 1.8fr 1.2fr 1fr"}>
            <Table.Header className={"*:text-sm *:font-medium *:capitalize"}>
              <h4>S/N</h4>
              <h4>Name</h4>
              <h4>Date Created </h4>
              <h4>No Of courses enrolled</h4>
              <h4>Action</h4>
            </Table.Header>
            <div className="divide-y">
              {allStudent.map((student, i) => {
                return (
                  <Table.Row key={i}>
                    <p>{i + 1}</p>
                    <p className="text-sm">
                      <span className="block font-medium text-[#101928]">
                        {student.name}
                      </span>
                      <span className="block text-[#475367]">
                        {student.email}
                      </span>
                    </p>

                    <p className="text-sm text-[#344054]">
                      {student.createdAt}
                    </p>
                    <p className="text-sm text-[#344054]">
                      {student.noOfCourses}
                    </p>
                    <CommonButton
                      className="bg-primary-color-600"
                      onClick={() => setProfile((prev) => !prev)}
                    >
                      view profile
                    </CommonButton>
                  </Table.Row>
                );
              })}
            </div>
          </Table>
        </div>
      </div>
    );
  return <StudentDetails />;
}
