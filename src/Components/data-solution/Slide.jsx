import React from "react";

const Slide = ({ heading, text }) => {
  return (
    <article className="h-full px-6 py-8 text-left text-[#667185] lg:px-10">
      <p className="font-poppins text-2xl font-[400] lg:text-[20px] 2xl:text-2xl 2xl:font-light">
        {heading}
      </p>
      <p className="mt-4 font-poppins text-xl font-light lg:text-xl 2xl:text-xl 2xl:leading-[30px]">
        {text}
      </p>
    </article>
  );
};

export default Slide;
