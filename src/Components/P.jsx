const P = ({ children, className }) => {
	return (
		<p
			className={`text-[#667185] font-poppins font-normal md:text-xl ${className}`}>
			{children}
		</p>
	);
};

export default P;
