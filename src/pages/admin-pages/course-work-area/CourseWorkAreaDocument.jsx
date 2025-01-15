import AdminNav from "@/Components/admindashboard/AdminNav";
import LinkList from "@/Components/LinkList";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import CourseWorkShareDocs from "./CourseWorkShareDocs";
import CourseWorkAssignment from "./CourseWorkAssignment";
import { useGetSingleCohort } from "@/hooks/course-management/use-get-singleCohorts";

function CourseWorkAreaDocument() {
  const [tab, setTab] = useState("share-docs");
  const [active, setActive] = useState(2);
  const [queryString] = useSearchParams();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const cohortId = queryString.get("cohortId");
  const { isLoading, data, error } = useGetSingleCohort(courseId, cohortId);

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
            {queryString?.get("title")} | {queryString.get("cohort")}
          </p>
        </div>
      </AdminNav>
      <main>
        <ul className="mt-10 flex w-max items-center gap-4 border-b border-b-[#E4E7EC] *:capitalize">
          <LinkList
            className={"text-sm font-medium"}
            onClick={() => setTab("share-docs")}
            active={tab === "share-docs"}
          >
            share documents
          </LinkList>
          <LinkList
            className={"text-sm font-medium"}
            onClick={() => setTab("assignments")}
            active={tab === "assignments"}
          >
            assignments
          </LinkList>
        </ul>
        <div>
          {isLoading && <p>Loading...</p>}
          {error && (
            <p>{error?.response?.data?.message ?? "Something went wrong"}</p>
          )}
          {data && (
            <>
              {tab === "share-docs" && (
                <CourseWorkShareDocs
                  data={data}
                  active={active}
                  setActive={setActive}
                />
              )}

              {tab === "assignments" && (
                <CourseWorkAssignment
                  data={data}
                  active={active}
                  setActive={setActive}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default CourseWorkAreaDocument;
