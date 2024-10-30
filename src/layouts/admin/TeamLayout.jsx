import LinkList from "@/Components/LinkList";
import { FaArrowLeft } from "react-icons/fa6";
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function TeamLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { team, id } = useParams();

  return (
    <>
      <ScrollRestoration />
      <div className="py-10">
        <header className="flex gap-3">
          <button
            className="flex items-center gap-4"
            onClick={() => navigate(`/admin/project-area/${id}/group`)}
          >
            <span className="rounded-sm border border-[#E4E7EC] px-[9px] py-[7.7px]">
              <FaArrowLeft />
            </span>
            <span className="capitalize text-[#667185]">Go back</span>
          </button>
          <p className="text-2xl font-medium text-[#344054]">{team}</p>
        </header>
        <ul className="mt-10 flex w-max items-center gap-4 border-b border-b-[#E4E7EC] *:capitalize">
          <LinkList
            className={"text-sm font-medium"}
            onClick={() =>
              navigate(
                `/admin/project-area/2/group/${team}/course-project-area`,
              )
            }
            active={pathname.endsWith("course-project-area")}
          >
            Course Project Area
          </LinkList>
          <LinkList
            className={"text-sm font-medium"}
            onClick={() => navigate("course-tools")}
            active={pathname.endsWith("course-tools")}
          >
            Course Tools & Resources
          </LinkList>
          <LinkList
            className={"text-sm font-medium"}
            onClick={() => navigate("student-management")}
            active={pathname.endsWith("student-management")}
          >
            Student Management
          </LinkList>
        </ul>
        <section className="mt-4">
          <Outlet />
        </section>
      </div>
    </>
  );
}

export default TeamLayout;
