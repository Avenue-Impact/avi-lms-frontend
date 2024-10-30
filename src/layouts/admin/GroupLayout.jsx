import ProjectAreaNav from "@/Components/admindashboard/project-area/ProjectAreaNav";

import { Outlet } from "react-router-dom";

export default function GroupLayout() {
  return (
    <div>
      <ProjectAreaNav title={" Groups"} />
      <Outlet />
    </div>
  );
}
