import AdminNav from "@/Components/admindashboard/AdminNav";
import LinkList from "@/Components/LinkList";
import { FaArrowLeft } from "react-icons/fa6";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function CourseWorkAreaDocument() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div>
      <AdminNav>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2"
            onClick={() => navigate("/admin/course-work-area")}
          >
            <span className="rounded-sm border border-[#E4E7EC] px-[9px] py-[7.7px]">
              <FaArrowLeft />
            </span>
            <span className="text-sm capitalize text-[#667185]">Go back</span>
          </button>
          <p className="text-lg font-medium text-[#344054]">
            Project Consultant Training Programme (Bundle) | May Cohort 2024
          </p>
        </div>
      </AdminNav>
      <main>
        <ul className="mt-10 flex w-max items-center gap-4 border-b border-b-[#E4E7EC] *:capitalize">
          <LinkList
            className={"text-sm font-medium"}
            onClick={() => navigate(`/admin/course-work-area/documents`)}
            active={pathname.endsWith("documents")}
          >
            share documents
          </LinkList>
          <LinkList
            className={"text-sm font-medium"}
            onClick={() => navigate("assignment")}
            active={pathname.endsWith("assignment")}
          >
            assignments
          </LinkList>
        </ul>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default CourseWorkAreaDocument;
