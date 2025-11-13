import { ArrowRight, Notebook, Star } from "lucide-react"

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
    description:
      "The first step in our services is to work closely with you to understand your business needs and goals. We will provide customised solutions that are specifically designed to drive growth and success.",
    user: {
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/71.jpg",
      position: "CEO, Company Name",
      rating: 4.5,
    },
    alt: "Digital data analysis visualization",
  },
  {
    description:
      "Next, we will provide customised solutions that are specifically designed to drive growth and success. We will provide customised solutions that are specifically designed to drive growth and success.",
    user: {
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/71.jpg",
      position: "CEO, Company Name",
      rating: 5,
    },
    alt: "Light bulb representing innovative solutions",
  },
  {
    description:
      "Explore our Digital Learning Hub for expert-led courses, resources, and interactive learning experiences to upskill at your own pace. We will provide customised solutions that are specifically designed to drive growth and success.",
    user: {
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/71.jpg",
      position: "CEO, Company Name",
      rating: 5,
    },
    alt: "Colorful books representing digital learning",
  },
]

export function TestimonialSection() {
  const navigate = useNavigate();
  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="sm:w-[85%] w-[95%] mx-auto">
        {/* Section Header */}
        <div className="sm:text-left text-center mb-16 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a5c] mb-6">What Our Learner Are Saying?</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We follow a clear, results-driven approach – analysing your challenges, crafting tailored solutions,
            implementing strategies effectively, and equipping your team through our digital learning hub to ensure
            lasting impact.
          </p>
        </div>

        {/* Process Cards Slider */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            {processSteps.map((step, index) => (
                <div onClick={() => navigate(step.link)} className="bg-white px-4 pt-6 cursor-pointer border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">

                  {/* Card Content */}
                  <div className="">
                    <h3 className="text-xl font-bold text-[#1a3a5c] mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{step.description}</p>
                  </div>

                  {/* Card Image */}
                  <div className="my-6 rounded-sm ">
                    <div className="flex items-center">
                      <img src={step.user.image} alt={step.user.name} className="w-12 h-12 rounded-full" />
                      <div className="ml-4">
                        <p className="text-sm font-semibold text-[#1a3a5c]">{step.user.name}</p>
                        <p className="text-xs text-gray-600">{step.user.position}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(step.user.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  )
}
