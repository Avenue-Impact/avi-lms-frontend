import { courseSections } from "@/lib/courseSection";
import ShareDocsEmpty from "./ShareDocsEmpty";
import { cn } from "@/lib/utils";
import CourseWorkAreaWithDocs from "./CourseWorkAreaWithDocs";
import { documents } from "@/lib/documents";

function CourseWorkShareDocs() {
  return (
    <div className="grid grid-cols-[3fr_1.5fr] gap-7">
      <div>
        {documents.length > 0 ? <CourseWorkAreaWithDocs /> : <ShareDocsEmpty />}
      </div>

      <aside className="overflow-y-hidden rounded-[12px] border border-[#E4E7EC] bg-white px-4 py-6 lg:block">
        <h3 className={cn("text-2xl font-medium capitalize text-black")}>
          Course section
        </h3>
        <ul className="h-screen overflow-y-scroll">
          {courseSections.map((section) => (
            <li
              key={section.section_id}
              className="group cursor-pointer border-b px-5 py-2 last:border-b-0 hover:border-b-2 hover:border-b-primary-color-600 hover:bg-primary-color-300/20"
            >
              <div className="text-left">
                <p className="font-poppins text-lg font-light capitalize text-tertiary-color-900 lg:text-xl">
                  {section.section}
                </p>
                <p
                  className={cn(
                    "group-hover/section: text-base font-light leading-6 text-tertiary-color-700 group-hover:font-semibold group-hover:text-primary-color-600",
                    // active === section.section_id &&
                    //   "font-semibold text-primary-color-600",
                  )}
                >
                  {section.section_title}
                </p>
              </div>
            </li>
          ))}
          {courseSections.map((section) => (
            <li
              key={section.section_id}
              className="group cursor-pointer border-b px-5 py-2 last:border-b-0 hover:border-b-2 hover:border-b-primary-color-600 hover:bg-primary-color-300/20"
            >
              <div className="text-left">
                <p className="font-poppins text-lg font-light capitalize text-tertiary-color-900 lg:text-xl">
                  {section.section}
                </p>
                <p
                  className={cn(
                    "group-hover/section: text-base font-light leading-6 text-tertiary-color-700 group-hover:font-semibold group-hover:text-primary-color-600",
                    // active === section.section_id &&
                    //   "font-semibold text-primary-color-600",
                  )}
                >
                  {section.section_title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default CourseWorkShareDocs;
