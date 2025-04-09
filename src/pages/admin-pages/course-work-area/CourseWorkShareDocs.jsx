import { cn } from "@/lib/utils";
import CourseWorkAreaWithDocs from "./CourseWorkAreaWithDocs";
import ShareDocsEmpty from "./ShareDocsEmpty";

import { useFetchSharedResources } from "@/hooks/course-work-area/use-fetch-shared-resources";
import { createContext, useContext, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const ShareDocContext = createContext({});
function CourseWorkShareDocs({ data, active, setActive }) {
  return (
    <ShareDocContext.Provider value={{ active, setActive }}>
      <div className="grid grid-cols-[3fr_1.5fr] gap-7">
        {data?.data?.data?.recorded_sessions.length < 1 ? (
          <>no document </>
        ) : (
          <SharedDocs />
        )}

        <aside className="overflow-y-hidden rounded-[12px] border border-[#E4E7EC] bg-white px-4 py-6 lg:block">
          <h3 className={cn("text-2xl font-medium capitalize text-black")}>
            Course section
          </h3>
          <CourseSection data={data} />
        </aside>
      </div>
    </ShareDocContext.Provider>
  );
}

const SharedDocs = () => {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");
  const [modalActive, setModalActive] = useState("student");

  const { active } = useContext(ShareDocContext);

  const { isLoading, data, error, isRefetching } = useFetchSharedResources(
    courseId,
    cohortId,
    active,
  );

  if (isLoading || isRefetching) return <p>Loading...</p>;
  if (error)
    return <p>{error?.response?.data?.message ?? "Something Went wrong"}</p>;
  return (
    <div>
      {data?.data?.data?.documents?.length > 0 ? (
        <CourseWorkAreaWithDocs
          data={data}
          modalActive={modalActive}
          setModalActive={setModalActive}
        />
      ) : (
        <ShareDocsEmpty
          modalActive={modalActive}
          setModalActive={setModalActive}
        />
      )}
    </div>
  );
};

const CourseSection = ({ data }) => {
  const { active, setActive } = useContext(ShareDocContext);
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");

  const { refetch } = useFetchSharedResources(courseId, cohortId, active);

  const handleChangeSection = (section) => {
    setActive(section);
    if (section === active) return;
    refetch();
  };

  if (data?.data?.data?.recorded_sessions.length < 1) {
    return <p>No video yet ...</p>;
  }

  return (
    <ul className="h-screen overflow-y-scroll">
      {data?.data?.data?.recorded_sessions.map((section) => {
        return (
          <li
            key={section.id}
            className={cn(
              "group cursor-pointer border-b px-5 py-2 last:border-b-0 hover:border-b-2 hover:border-b-primary-color-600 hover:bg-primary-color-300/20",
              String(active) == section.section &&
                "border border-b-primary-color-600 bg-primary-color-300/20",
            )}
            onClick={() => {
              handleChangeSection(section.section);
            }}
          >
            <div className="text-left">
              <p className="font-poppins text-lg font-light capitalize text-tertiary-color-900 lg:text-xl">
                Section {section.section}
              </p>
              <p
                className={cn(
                  "group-hover/section: text-base font-light leading-6 text-tertiary-color-700 group-hover:font-semibold group-hover:text-primary-color-600",
                  String(active) == section.section &&
                    "font-semibold text-primary-color-600",
                )}
              >
                {section.title}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CourseWorkShareDocs;
