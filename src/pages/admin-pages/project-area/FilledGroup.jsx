import { TrashCan } from "@/Components/Icon";
import Table from "@/Components/Table";
import { CommonButton } from "@/Components/ui/button";
import { groupCourse } from "@/lib/groupcourse";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FilledGroup() {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-10">
        <Table cols={"1fr 3fr 2fr 1.5fr 2fr"}>
          <Table.Header className={"*:text-xs *:font-medium *:text-[#344054]"}>
            <h6>S/N</h6>
            <h6>Group Name</h6>
            <h6> Date created</h6>
            <h6> No. of Students</h6>
            <h6>Action</h6>
          </Table.Header>
          <div className="divide-y">
            {groupCourse.map((group) => {
              return (
                <Table.Row
                  key={group.id}
                  className={"*:text-sm *:text-[#344054]"}
                >
                  <p>{group.id}</p>
                  <p>{group.groupName}</p>
                  <p>{`${group.createdDate} ${group.time}`}</p>
                  <p>{group.numberOfStudent}</p>
                  <div className="flex gap-3">
                    <CommonButton
                      size="sm"
                      className="flex w-max gap-2 bg-primary-color-600"
                      onClick={() =>
                        navigate(`${group.groupName}/course-project-area`)
                      }
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
                </Table.Row>
              );
            })}
          </div>
        </Table>
      </div>
    </>
  );
}

export default FilledGroup;
