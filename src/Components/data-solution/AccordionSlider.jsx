import { useState } from "react";
import AccordionButton from "./AccordionButton";
import { dataManagement } from "./accordion";
import AccordionContent from "./AccordionContent";

function AccordionSlider() {
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
    <div className="parent h-fit overflow-x-hidden py-20">
      <div className="baby overflow-x-scroll px-6 lg:overflow-x-hidden lg:p-0 lg:px-52">
        <div className="accordion m-auto flex-nowrap items-center justify-center py-0 md:flex">
          <div className=" ">
            {/* <AccordionSlide> */}
            <div className="flex gap-4 lg:gap-6">
              {datas.map((data) => (
                <div
                  key={data.heading}
                  className={`${
                    data.isOpen &&
                    "accord-button flex h-[400px] w-full max-w-6xl items-center justify-center md:h-[547px]"
                  }`}
                >
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

export default AccordionSlider;
