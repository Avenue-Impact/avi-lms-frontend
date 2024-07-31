import { useState } from "react";
import AccordionButton from "./AccordionButton";
import { dataManagement } from "./accordion";
import AccordionContent from "./AccordionContent";

function Accordion() {
	const [datas, setData] = useState(dataManagement);
	const handleClick = (title) => {
		const newdata = datas.map((data) => {
			if (data.heading === title) {
				return { ...data, isOpen: true };
			}
			return { ...data, isOpen: false };
		});
		setData(newdata);
	};
	return (
		<div className="parent h-fit overflow-x-hidden ">
			<div className="baby lg:px-52 lg:p-0 overflow-x-scroll lg:overflow-x-hidden px-6">
				<div className=" accordion md:flex items-center justify-center  flex-nowrap   m-auto  py-0">
					<div className=" ">
						{/* <AccordionSlide> */}
						<div className="flex gap-4 lg:gap-6  ">
							{datas.map((data) => (
								<div
									key={data.heading}
									className={`${
										data.isOpen &&
										"h-[400px] md:h-[547px] w-full max-w-6xl accord-button flex items-center justify-center"
									}`}>
									{!data.isOpen && (
										<AccordionButton
											heading={data.heading}
											onClick={() => handleClick(data.heading)}
										/>
									)}
									{data.isOpen && (
										<AccordionContent
											src={data.img}
											heading={data.heading}
											description={data.description}
										/>
									)}
								</div>
							))}
						</div>
						{/* </AccordionSlide> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Accordion;
