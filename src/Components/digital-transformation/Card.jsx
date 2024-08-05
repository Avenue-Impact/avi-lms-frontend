import { cn } from "@/lib/utils";
import React from "react";

const Card = ({ heading, children, className }) => {
  return (
    <article
      className={cn("space-y-8 rounded bg-[#FAFCFF] px-9 py-10", className)}
    >
      <h3 className="text-[18px] capitalize text-[#667185] lg:text-[28px]">
        {heading}
      </h3>
      <ul className="list-disc text-[17px] *:text-base *:text-[#667185] md:space-y-4 lg:text-[20px]">
        {children}
      </ul>
    </article>
  );
};

export default Card;
