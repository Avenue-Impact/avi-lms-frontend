import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const desktopNav = [
  {
    id: "1",
    name: "share documents",
  },
  {
    id: "2",
    name: "assignments",
  },
  {
    id: "3",
    name: "overview",
  },
];

const DashboardSliderNav = ({ desktopSection, setDesktopSection }) => {
  return (
    <div className="border-b-[2px] border-b-[#E4E7EC] px-4">
      <ul className="flex gap-4 *:text-nowrap">
        {desktopNav.map((item) => {
          return (
            <li
              key={item.id}
              className={cn(
                "after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full",
                desktopSection === item.name
                  ? "text-primary-color-600 after:w-full"
                  : "",
              )}
            >
              <button
                className="capitalize"
                onClick={() =>
                  setDesktopSection((prev) => {
                    return { ...prev, desktop: item.name };
                  })
                }
              >
                {item.name}
              </button>
            </li>
          );
        })}
        {/* <li
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
        </li> */}
      </ul>
    </div>
  );
};

const mobileNav = [
  {
    id: "1",
    name: "course sections",
  },
  {
    id: "2",
    name: "project area",
  },
  {
    id: "3",
    name: "share documents",
  },
  {
    id: "4",
    name: "assignments",
  },
  {
    id: "5",
    name: "get certification",
  },
  {
    id: "6",
    name: "overview",
  },
  {
    id: "7",
    name: "leave a review",
  },
];
export const MobileSlideNav = ({ active, setactive }) => {
  return (
    <div className="relative mb-6 w-full overflow-x-hidden px-4">
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#E4E7EC]"></div>
      <ul className="baby flex gap-4 overflow-x-scroll *:text-nowrap">
        {mobileNav.map((item) => {
          return (
            <li
              key={item.id}
              className={cn(
                "after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 after:absolute after:-bottom-0 after:left-0 after:z-30 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full",
                active === item.name
                  ? "text-primary-color-600 after:w-full"
                  : "",
              )}
              onClick={() =>
                setactive((prev) => {
                  return { ...prev, mobile: item.name };
                })
              }
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DashboardSliderNav;
