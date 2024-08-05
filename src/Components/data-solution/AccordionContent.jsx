import ImageHero from "../ImageHero";

const AccordionContent = ({ src, heading, description }) => {
  return (
    <div className="accordion-content relative h-[400px] w-[450px] flex-grow bg-white/80 text-center md:h-[547px] md:w-[500px]">
      <div className="absolute left-0 top-0 h-full w-full bg-black/50"></div>
      <div className="overflow-hidden">
        <img
          src={src}
          className="accordion-img h-[400px] w-full object-cover md:h-[547px]"
          width={500}
          height={500}
        />
      </div>
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center px-6 py-20 text-left text-white lg:px-12">
        <div className="space-y-10 py-14">
          <p className="w-fit text-lg font-light capitalize lg:text-2xl 2xl:text-[31.87px] 2xl:leading-[31.87px]">
            {heading}
          </p>
          <p className="m-auto max-w-[450px] font-poppins text-base font-light lg:text-xl 2xl:text-[26.65px] 2xl:leading-[39.86px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccordionContent;
