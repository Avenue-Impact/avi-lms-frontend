import { ArrowRight } from "lucide-react"
import cardImg_1 from '../../../assets/imgs/impactCard1.png'
import cardImg_2 from '../../../assets/imgs/impactCard2.png'
import cardImg_3 from '../../../assets/imgs/impactCard3.png'
import cardImg_4 from '../../../assets/imgs/impactCard4.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { useNavigate } from "react-router-dom"

const processSteps = [
  {
    title: "Analysis",
    description:
      "The first step in our services is to work closely with you to understand your business needs and goals.",
    image: cardImg_1,
    alt: "Digital data analysis visualization",
  },
  {
    title: "Providing Tailored Solutions",
    description:
      "Next, we will provide customised solutions that are specifically designed to drive growth and success.",
    image: cardImg_2,
    alt: "Light bulb representing innovative solutions",
  },
  {
    title: "Digital Learning Hub",
    description:
      "Explore our Digital Learning Hub for expert-led courses, resources, and interactive learning experiences to upskill at your own pace.",
    image: cardImg_3,
    alt: "Colorful books representing digital learning",
  },
  {
    title: "Implementation",
    description: "The final step in our services is to provide support throughout the implementation process.",
    image: cardImg_4,
    alt: "Person implementing solutions",
  },
]

export function ImpactProcessSection() {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gray-100">
      <div className="sm:w-[85%] w-[95%] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a5c] mb-6">Our Impact Process</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We follow a clear, results-driven approach – analysing your challenges, crafting tailored solutions,
            implementing strategies effectively, and equipping your team through our digital learning hub to ensure
            lasting impact.
          </p>
        </div>

        {/* Process Cards Slider */}
        <div className="relative px-4">
          <Swiper
            slidesPerView={1.2}
            spaceBetween={20}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 3.2,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              type: 'bullets',
            }}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="w-full py-4"
          >
            {processSteps.map((step, index) => (
              <SwiperSlide key={index} className="h-auto min-w-[200px]">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                  {/* Card Image */}
                  <div className="relative h-64 w-full">
                    <img
                      src={step.image || "/placeholder.svg"}
                      alt={step.alt}
                      className="object-cover h-full w-full"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="py-6 px-4">
                    <h3 className="text-xl font-bold text-[#1a3a5c] mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{step.description}</p>
                    <button
                      onClick={() => navigate("/about")}
                      className="inline-flex sm:pt-4 items-center text-sm font-medium text-[#1a3a5c] hover:text-[#e91e63] transition-colors group"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 text-[#e91e63] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation Buttons */}
            {/* <div className="swiper-button-prev !text-[#1a3a5c] !left-0"></div>
            <div className="swiper-button-next !text-[#1a3a5c] !right-0"></div> */}
          </Swiper>
          
          {/* Pagination */}
          <div className="swiper-pagination !relative mt-8 !bottom-0"></div>
        </div>
      </div>
    </section>
  )
}
