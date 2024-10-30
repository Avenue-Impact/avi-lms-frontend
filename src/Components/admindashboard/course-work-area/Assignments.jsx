import Table from "@/Components/Table";
import { CommonButton } from "@/Components/ui/button";
import { assignment } from "@/lib/assignment";
import { EllipsisVertical } from "lucide-react";
import { FaCheck } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

function Assignments() {
  return (
    <>
      <header className="mt-7 flex items-center justify-between px-4 py-5">
        <p className="text-xl text-[#475367]">
          Assignments({assignment.length})
        </p>
        <div className="flex gap-6">
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
          <CommonButton variant={"outline"}>Filter</CommonButton>
        </div>
      </header>
      <Table cols={"0.5fr 1fr 1.02fr 1.7fr 0.79fr 1fr 1fr"}>
        <Table.Header className={"gap-1 *:text-sm *:font-medium *:capitalize"}>
          <h4>S/N</h4>
          <h4>Name </h4>
          <h4>Filename</h4>
          <h4>additional message</h4>
          <h4>date submitted</h4>
          <h4>documents</h4>
          <h4>status</h4>
        </Table.Header>

        <div className="divide-y">
          {assignment.map((ass, i) => {
            return (
              <Table.Row key={i} className={"gap-1 *:text-sm"}>
                <p>{i + 1 < 9 ? `0${i + 1}` : i + 1}</p>
                <p className="*:block">
                  <span className="text-sm font-medium text-[#101928]">
                    {ass.name}
                  </span>
                  <span className="w-20 overflow-x-hidden truncate text-sm text-[#475367]">
                    {ass.email}
                  </span>
                </p>
                <p>{ass.fileName}</p>
                <p>{ass.additionalMessage}</p>
                <p>{ass.date}</p>
                <p>{ass.document}</p>
                {ass.status ? (
                  <span
                    role="button"
                    className="flex h-min cursor-pointer items-center justify-center rounded-full bg-primary-color-600 text-white"
                  >
                    Not reviewed
                  </span>
                ) : (
                  <span className="flex h-min items-center justify-center space-x-1 rounded-full bg-[#F3FFF7] capitalize text-[#00A92F]">
                    <span>
                      <FaCheck />
                    </span>
                    <span>reviewed</span>
                  </span>
                )}
              </Table.Row>
            );
          })}
        </div>
      </Table>
    </>
  );
}

export default Assignments;
