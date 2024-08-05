import React from "react";

const ImpactCard = ({ number, heading, children, className }) => {
  // bg-[#FAFCFF]  bg-[#fafcff80]
  return (
    <article
      className={`impact-card px-12 py-12 md:px-[4rem] lg:h-[35.125rem] ${className} `}
    >
      <p className="text-5xl font-thin italic text-[#9DB0D2] md:text-[5rem]">
        {number}
      </p>
      <h2 className="mb-5 mt-7 text-[26.8px] capitalize text-[#667185] md:text-xl lg:mb-[22px] lg:mt-[30px] 2xl:text-nowrap 2xl:text-[2.5rem]">
        {heading}
      </h2>
      <p className="text-justify text-base text-[#667185] md:text-lg 2xl:text-2xl">
        {children}
      </p>
    </article>
  );
};

export default ImpactCard;
