import pink from "../assets/images/pink-arrow.png";

const ColorHero = () => {
  return (
    <section className="relative flex min-h-screen items-end px-6 py-12 md:py-24 lg:px-20 2xl:pb-[11.8125rem]">
      <div className="absolute -right-5 top-0 -z-10 h-[256px] w-[256px] rounded-full bg-[#FFEBF080] md:right-[244px] lg:h-[356px] lg:w-[356px]"></div>
      <div>
        <h1 className="z-10 font-poppins text-[2.5rem] font-light leading-snug md:text-6xl lg:text-7xl 2xl:text-8xl">
          <span className="font-[275] text-[rgb(204,23,71)]">
            {" "}
            Jumpstart Your Career <br className="hidden lg:block" /> with{" "}
          </span>
          <span className="font-light italic text-[#23314A]">
            {" "}
            Avenue Impact
          </span>
        </h1>
        <img
          src={pink}
          alt="pink arrow"
          className="m-6 hidden w-[110px] md:block"
        />
        <p className="z-10 mt-9 max-w-[1000px] md:mt-0 md:text-2xl">
          Transform your professional future with industry-recognized
          certificates from Avenue Impact. Our courses are designed by experts
          to help you gain the skills needed to succeed in today’s competitive
          job market.
        </p>
      </div>
    </section>
  );
};

export default ColorHero;
