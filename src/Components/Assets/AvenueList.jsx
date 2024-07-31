import { cn } from "@/lib/utils";

const AvenueList = ({ children, src, textColor, className }) => {
	return (
		<div className="flex gap-2 items-center ">
			<img src={src} alt="a checkbox icon" />
			<p className={cn(`font-[400] text-[${textColor}] lg:text-[24px] text-[16px]`, className)}>
				{children}
			</p>
		</div>
	);
};

export default AvenueList;
