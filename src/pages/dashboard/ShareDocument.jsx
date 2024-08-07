import { Link, Outlet, useLocation } from "react-router-dom";
import liveSession from "../../assets/images/dashboard/live-session.png";
import CourseSection from "@/Components/dashboard/CourseSection";
import { cn } from "@/lib/utils";
function ShareDocument() {
  const location = useLocation();
  return (
    <div className="grid gap-4 bg-[#FDFDFD] lg:grid-cols-[2.8fr_1fr]">
      <section>
        <div className="overflow-hidden rounded-[10px] lg:h-[400px] lg:w-[700px]">
          <img
            src={liveSession}
            alt="live session"
            width={897}
            height={532}
            className="object-cover"
          />
        </div>
        <h1 className="my-6 text-2xl font-semibold leading-[28px] text-black *:block">
          <span>Section 2</span>
          <span> Introduction to Project Consulting Recordings </span>
        </h1>
        <div className="border-b-[2px] border-b-[#E4E7EC] px-4">
          <ul className="flex gap-4 *:text-nowrap">
            <li
              className={cn(
                "after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full",
                location.pathname === "/dashboard/share-documents"
                  ? "text-primary-color-600 after:w-full"
                  : "",
              )}
            >
              <Link to={"share-documents"}>share documents</Link>
            </li>
            <li
              className={cn(
                "after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full",
                location.pathname === "/dashboard/assignments"
                  ? "text-primary-color-600 after:w-full"
                  : "",
              )}
            >
              <Link to={"assignments"}>assignments</Link>
            </li>
            <li
              className={cn(
                "after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full",
                location.pathname === "/dashboard/overview"
                  ? "text-primary-color-600 after:w-full"
                  : "",
              )}
            >
              <Link to={"overview"}>overview</Link>
            </li>
            {/* <ul className="flex gap-4">
              <li className="after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full">
                <Link to={"share-documents"}>share documents</Link>
              </li>
              <li className="after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full">
                <Link to={"assignments"}>assignments</Link>
              </li>
              <li className="after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full">
                <Link to={"overview"}>overview</Link>
              </li>
            </ul> */}
          </ul>
        </div>
        <div>
          <Outlet />
        </div>
      </section>
      <aside className="hidden rounded-[12px] border border-[#E4E7EC] bg-white px-4 py-6 lg:block">
        <CourseSection />
      </aside>
    </div>
  );
}

export default ShareDocument;
