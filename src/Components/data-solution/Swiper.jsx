import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { solutions } from "../../assets/lib/data";
import Slide from "./Slide";
export default function Swiper({ data }) {
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 2.07,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1.05,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<div className="slider-container *:even:*:*:divide-x *:even:*:*:divide-[#667185] *:even:*:*:h-full ">
			<Slider {...settings}>
				{data.map((item) => (
					<Slide
						heading={item.heading}
						text={item.paragraph}
						key={item.heading}
					/>
				))}
			</Slider>
		</div>
	);
}
