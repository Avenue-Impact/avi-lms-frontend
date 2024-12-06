import { Outlet } from "react-router-dom";

import ProjectAreaNav from "@/Components/admindashboard/project-area/ProjectAreaNav";

function Groups() {
  // const fetchDataGroups =

  // const { data, isLoading } = useFetchAllProjectArea()

  return (
    <>
      <ProjectAreaNav title={" Group"} />
      <Outlet />
    </>
  );
}

export default Groups;
