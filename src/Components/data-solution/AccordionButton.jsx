import fowardArrow from "../../assets/images/foward-arrow.png";

const AccordionButton = ({ heading, onClick }) => {
	return (
		<div
			className=" py-6 px-3 lg:py-7 lg:px-4 bg-[hsl(220,16%,96%)] flex items-center gap-8 justify-between  m-auto cursor-pointer flex-col-reverse h-[400px] md:h-[547px]"
			onClick={onClick}>
			<span
				className="  text-[#98A2B3] font-light text-2xl lg:text-3xl capitalize align-bottom rotate-180  "
				style={{ writingMode: "vertical-lr" }}>
				{heading}
			</span>

			<div>
				<img src={fowardArrow} alt="" className="block w-7 lg:w-14 img-arr" />
			</div>
		</div>
	);
};

export default AccordionButton;
