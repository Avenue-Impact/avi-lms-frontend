import React from "react";

const H3 = ({ children, className }) => {
	return (
		<h3
			className={`text-[#3A4C6C] font-light text-2xl lg:text-[2.5rem] capitalize ${className}`}>
			{children}
		</h3>
	);
};

export default H3;
