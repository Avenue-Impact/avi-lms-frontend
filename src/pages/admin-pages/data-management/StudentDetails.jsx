import BorderCard from "@/Components/BorderCard";
import Table from "@/Components/Table";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { studentDetails } from "@/lib/allStudent";

const StudentDetails = () => {
  return (
    <BorderCard className="mt-24 grid grid-cols-[1.5fr_4fr] rounded-xl border-2 border-[#F0F2F5] px-[28px] py-12">
      <div>
        <Avatar className="h-[120px] w-[120px]">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>ms</AvatarFallback>
        </Avatar>
        <p className="my-2 text-2xl font-medium text-[#344054]">Emery Torff</p>
        <div className="space-y-1 *:text-sm *:text-[#667185]">
          <p>thekdfisher@email.com </p>
          <p>Joined on Apr 12, 2023 | 09:32AM</p>
        </div>
      </div>

      <Table cols={"0.5fr 2fr 1.3fr 1fr 1.2fr"} cla>
        <Table.Header className={"*:text-sm *:font-medium *:capitalize"}>
          <h4>S/N</h4>
          <h4>Course Title</h4>
          <h4>Course Type</h4>
          <h4>Date enrolled</h4>
          <h4>Date enrolled</h4>
        </Table.Header>
        <div className="divide-y">
          {studentDetails.map((details, i) => (
            <Table.Row key={i} className={"*:px-1 *:text-sm"}>
              <p className="text-[#344054]">{i + 1}</p>
              <p className="text-[#344054]">{details.courseTitle}</p>
              <p>
                <span className="w-min text-nowrap rounded-[12px] bg-[#FFECE5] px-3 py-[2px] text-xs font-medium text-[#AD3307]">
                  {details.courseType}
                </span>
              </p>
              <p className="text-[#344054]">{details.date}</p>
              <p className="text-[#344054]">{details.duration}</p>
            </Table.Row>
          ))}
        </div>
      </Table>
    </BorderCard>
  );
};

export default StudentDetails;
