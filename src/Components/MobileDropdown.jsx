import { NavLink } from "react-router-dom";

function MobileDropdown({ handleNav }) {
  return (
    <div className="mt-5 w-full border-t border-t-[#D6E3FA] py-3 text-left transition-all duration-150 ease-linear md:hidden">
      <ul className="mt-8 space-y-3 pl-12 font-poppins *:cursor-pointer *:capitalize *:text-[#23314A]">
        <li
          onClick={handleNav}
          // className="after:contents-[''] relative w-max transition-all duration-150 after:absolute after:left-0 after:m-auto after:block after:h-[2px] after:w-0 after:bg-red-500 after:transition-[width] after:duration-100 after:ease-in hover:after:w-full"
        >
          <NavLink to={"/digital-transformation"}>
            digital transformation
          </NavLink>
        </li>
        <li
          onClick={handleNav}
          // className="after:contents-[''] relative w-max transition-all duration-150 after:absolute after:left-0 after:m-auto after:block after:h-[3px] after:w-0 after:bg-red-500 after:transition-[width] after:duration-100 after:ease-in hover:after:w-full"
        >
          <NavLink to={"/data-solution"}> data solution</NavLink>
        </li>
        <li
          onClick={handleNav}
          // className="after:contents-[''] relative w-max transition-all duration-150 after:absolute after:left-0 after:m-auto after:block after:h-[2px] after:w-0 after:bg-red-500 after:transition-[width] after:duration-100 after:ease-in hover:after:w-full"
        >
          <NavLink to={"/avenue-impact-development"}>
            avenue impact development CIC
          </NavLink>
        </li>
        <li
          onClick={handleNav}
          // className="after:contents-[''] relative w-max transition-all duration-150 after:absolute after:left-0 after:m-auto after:block after:h-[2px] after:w-0 after:bg-red-500 after:transition-[width] after:duration-100 after:ease-in hover:after:w-full"
        >
          <NavLink to={"/avi"}>Digital learning hub</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default MobileDropdown;
