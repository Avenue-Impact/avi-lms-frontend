import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import Card from "./Card";

const DigitalSwiper = ({ data }) => {
  return (
    <div className="md:hidden">
      <Swiper className="mySwiper" spaceBetween={2} slidesPerView={1.2}>
        {data.map((item) => (
          <SwiperSlide key={item.heading}>
            <Card heading={item.heading} className={"min-h-[330px]"}>
              {item.lists.map((list, i) => (
                <li key={i} className="font-poppins ml-6">
                  {list}
                </li>
              ))}
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DigitalSwiper;
