import { cn } from "@/lib/utils";
import React from "react";

const Card = ({ heading, children, className }) => {
  return (
    <article
      className={cn(
        "mx-4 space-y-8 rounded bg-[#FAFCFF] px-9 py-10",
        className,
      )}
    >
      <h3 className="lg:text-[20px] text-[18px] capitalize text-[#667185] ">
        {heading}
      </h3>
      <ul className="list-disc space-x-3 *:text-base *:text-[#667185] md:space-y-4 lg:text-[20px] text-[17px]">
        {children}
      </ul>
    </article>
  );
};

export default Card;
