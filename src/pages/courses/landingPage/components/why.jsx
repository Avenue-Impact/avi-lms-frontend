import { ArrowRight, Notebook } from "lucide-react"

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
    title: "Digital Transformation",
    description:
      "The first step in our services is to work closely with you to understand your business needs and goals.",
    icon: Notebook,
    alt: "Digital data analysis visualization",
    link: "/digital-transformation"
  },
  {
    title: "Data Solutions",
    description:
      "Next, we will provide customised solutions that are specifically designed to drive growth and success.",
    icon: Notebook,
    alt: "Light bulb representing innovative solutions",
    link: "/data-solution"
  },
  {
    title: "Digital Learning Hub",
    description:
      "Explore our Digital Learning Hub for expert-led courses, resources, and interactive learning experiences to upskill at your own pace.",
    icon: Notebook,
    alt: "Colorful books representing digital learning",
    link: "/digital-learning-hub"
  },
  {
    title: "Implementation",
    description: "The final step in our services is to provide support throughout the implementation process.",
    icon: Notebook,
    alt: "Person implementing solutions",
    link: "/digital-transformation"
  },
]

export function WhySection() {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gray-50">
      <div className="sm:w-[85%] w-[95%] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a5c] mb-6">Why Learn Data Analytics with Us?</h2>
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
                <div onClick={() => navigate(step.link)} className="bg-white px-4 pt-6 cursor-pointer border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                  {/* Card Image */}
                  <div className="bg-primary-color-100 w-14 h-14 rounded-sm flex items-center justify-center">
                    {step.icon && (
                      <step.icon className="w-8 h-8 text-primary-color-500" />
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="py-6">
                    <h3 className="text-xl font-bold text-[#1a3a5c] mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{step.description}</p>
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
