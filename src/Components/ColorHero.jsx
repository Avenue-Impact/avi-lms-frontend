import pink from "../assets/images/pink-arrow.png";

const ColorHero = () => {
	return (
		<section className="py-12 md:py-24 px-6 lg:px-20 relative">
			<div className=" w-[256px] h-[256px]   lg:w-[356px] lg:h-[356px] rounded-full bg-[#FFEBF080] absolute top-0 -right-5 md:right-[244px] -z-10"></div>
			<h1 className=" md:text-6xl text-[2.5rem] lg:text-7xl font-poppins font-light z-10 leading-snug ">
				<span className="text-[rgb(204,23,71)]">
					{" "}
					Jumpstart Your Career <br className="hidden lg:block" /> with{" "}
					<br className="lg:hidden" />
				</span>
				<span className="text-[#23314A] italic"> Avenue Impact</span>
			</h1>
			<img
				src={pink}
				alt="pink arrow"
				className="m-6  w-[110px] hidden md:block"
			/>
			<p className="max-w-[1000px] md:text-2xl z-10 mt-9 md:mt-0">
				Transform your professional future with industry-recognized certificates
				from Avenue Impact. Our courses are designed by experts to help you gain
				the skills needed to succeed in today’s competitive job market.
			</p>
		</section>
	);
};

export default ColorHero;
