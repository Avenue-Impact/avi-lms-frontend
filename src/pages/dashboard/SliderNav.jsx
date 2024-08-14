import React from "react";

const SliderNav = () => {
  return (
    <div className="w-full overflow-hidden bg-emerald-100">
      <ul className="flex items-center justify-start gap-3 overflow-scroll *:px-8">
        <li className="after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full">
          home
        </li>
        <li>about</li>
        <li>figure</li>
        <li>queque</li>
        <li>hopig</li>
      </ul>
    </div>
  );
};

export default SliderNav;
