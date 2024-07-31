import React from "react";

const ImpactCard = ({ number, heading, children, className }) => {
	// bg-[#FAFCFF]  bg-[#fafcff80]
	return (
		<article
			className={`px-12 md:px-[4rem] py-12  lg:h-[35.125rem]  impact-card ${className} `}>
			<p className="text-[#9DB0D2] font-thin italic text-5xl md:text-[5rem] ">
				{number}
			</p>
			<h2 className="text-[#3A4C6C] text-2xl text-[2.5rem] font-light capitalize mt-7 mb-5 ">
				{heading}
			</h2>
			<p className="text-[#3A4C6C] text-base md:text-lg">{children}</p>
		</article>
	);
};

export default ImpactCard;
