import React from "react";

const Slide = ({ heading, text }) => {
	return (
		<article className="px-6 lg:px-10 text-left text-[#667185] h-full py-8">
			<p className=" lg:text-[20px] text-[14px] font-[400] font-poppins">{heading}</p>
			<p className="lg:text-[18px] text-[14px] font-light font-poppins mt-4">{text}</p>
		</article>
	);
};

export default Slide;
