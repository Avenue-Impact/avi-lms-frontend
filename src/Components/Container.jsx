import React from "react";

const Container = ({ children, className }) => {
	return (
		<div className={`py-12 md:py-12 px-6 lg:px-20 ${className}`}>
			{children}
		</div>
	);
};

export default Container;
