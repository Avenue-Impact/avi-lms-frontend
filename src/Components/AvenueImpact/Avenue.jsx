import overlay from "../../assets/images/overlay-img.png";

const Avenue = ({ img, number, heading, text }) => {
  return (
    <div className="group relative mx-auto h-[350px] w-[350px] overflow-hidden rounded-3xl md:h-[350px] md:w-[350px] 2xl:h-[400px] 2xl:w-[400px]">
      <img src={img} alt={heading} className="h-full w-full object-cover" />
      <div className="absolute bottom-0 left-0 translate-y-24 overflow-hidden rounded-l-3xl rounded-tr-3xl bg-[#FAFCFF] transition-all duration-300 group-hover:translate-y-0 group-hover:bg-[#CC1747] lg:max-w-[320px]">
        <div className="relative">
          <img
            src={overlay}
            alt="Overlay"
            className="absolute left-0 top-0 h-full w-full object-cover mix-blend-overlay"
          />
          <div className="relative z-10 px-6 py-4 transition-all duration-300 ease-linear">
            <p className="text-xl font-light text-[#D6E3FA] group-hover:text-[#FF7EA0]">
              {number}
            </p>
            <p className="mb-4 mt-1 font-poppins text-2xl font-light text-[#23314A] group-hover:text-[#FFEBF0]">
              {heading}
            </p>
            <p className="text-lg font-light text-[#FF7EA0] opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avenue;
