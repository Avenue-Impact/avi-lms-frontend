import { TrashCan } from "@/Components/Icon";
import { CommonButton } from "@/Components/ui/button";
import { groupCourse } from "@/lib/groupcourse";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

function FilledGroup() {
  return (
    <div className="mt-10">
      <Table>
        <TableHeader className={"*:text-xs *:font-medium *:text-[#344054]"}>
          <h6>S/N</h6>
          <h6>Group Name</h6>
          <h6> Date created</h6>
          <h6> No. of Students</h6>
          <h6>Action</h6>
        </TableHeader>
        <div className="divide-y">
          {groupCourse.map((group) => {
            return (
              <Row key={group.id} className={"*:text-sm *:text-[#344054]"}>
                <p>{group.id}</p>
                <p>{group.groupName}</p>
                <p>{`${group.createdDate} ${group.time}`}</p>
                <p>{group.numberOfStudent}</p>
                <div className="flex gap-3">
                  <CommonButton
                    size="sm"
                    className="flex w-max gap-2 bg-primary-color-600"
                  >
                    <span>
                      <Pencil className="h-4 w-4" />
                    </span>
                    <span>Edit</span>
                  </CommonButton>
                  <CommonButton
                    variant="outline"
                    size="sm"
                    className="flex w-max gap-2"
                  >
                    <span>
                      <TrashCan />
                    </span>
                    <span>Delete</span>
                  </CommonButton>
                </div>
              </Row>
            );
          })}
        </div>
      </Table>
    </div>
  );
}

export default FilledGroup;

function Table({ children }) {
  return (
    <div role="table" className="">
      {children}
    </div>
  );
}

function TableHeader({ children, className }) {
  return (
    <div
      role="table header"
      className={cn(
        "grid grid-cols-[1fr_3fr_2fr_1.5fr_2fr] rounded-tl-[10px] rounded-tr-[10px] bg-[#F0F2F5] px-7 py-[13.5px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
function Row({ children, className }) {
  return (
    <div
      role="table row"
      className={cn(
        "grid grid-cols-[1fr_3fr_2fr_1.5fr_2fr] px-6 py-[26px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
