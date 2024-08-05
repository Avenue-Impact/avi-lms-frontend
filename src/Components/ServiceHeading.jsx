import { cn } from "@/lib/utils";
import React from "react";

const ServiceHeading = ({ className, children }) => {
  return (
    <h1
      className={cn(
        className,
        "text-[40px] font-[275] capitalize text-white md:text-5xl lg:text-6xl lg:font-light lg:leading-[64px] 2xl:text-[64px]",
      )}
    >
      {children}
    </h1>
  );
};

export default ServiceHeading;
