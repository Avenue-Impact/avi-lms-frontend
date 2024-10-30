import { Outlet, useLocation, useNavigate } from "react-router-dom";

import AdminNav from "@/Components/admindashboard/AdminNav";
import LinkList from "@/Components/LinkList";

function DataManagementPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div>
      <AdminNav>
        <ul className="flex items-center gap-6 *:after:-bottom-[14px]">
          <LinkList
            onClick={() => navigate()}
            active={pathname.endsWith("data-management")}
          >
            dashboard analytics
          </LinkList>
          <LinkList
            onClick={() => navigate("course-management")}
            active={pathname.endsWith("course-management")}
          >
            course management
          </LinkList>
          <LinkList
            onClick={() => navigate("all-student")}
            active={pathname.endsWith("all-student")}
          >
            all students
          </LinkList>
        </ul>
      </AdminNav>
      <section>
        <Outlet />
      </section>
    </div>
  );
}

export default DataManagementPage;
