import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function ImageSwiper({ children, slideMobile, slideDesk }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: slideDesk,
    slidesToScroll: slideDesk,
    autoplay: true,
    autoplaySpeed: 1,
    pauseOnHover: true,
    speed: 20000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: slideMobile,
          slidesToScroll: slideMobile,
        },
      },
    ],
  };

  return <Slider {...settings}>{children}</Slider>;
}
