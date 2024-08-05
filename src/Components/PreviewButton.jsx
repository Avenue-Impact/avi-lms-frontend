import { cn } from "@/lib/utils";
import React from "react";



export const EnrollPreviewButton = ({ children }) => {
	return (
		<button className="border border-white rounded-lg  text-center cursor-pointer text-[#CC1747] font-[500] bg-[#ffffff] py-4 px-2 gap-2 w-full w-auto">
			<span className="self-end text-normal  "> {children}</span>
		</button>
	);
};



const PreviewButton = ({ children, className }) => {
	return (
		<button className={cn(`border border-white rounded-lg  text-center cursor-pointer text-white bg-[#CC1747] py-4 px-2 gap-2 w-full font-light w-auto`, className)}>
			<span className="self-end text-normal  "> {children}</span>
		</button>
	);
};

export default PreviewButton;
