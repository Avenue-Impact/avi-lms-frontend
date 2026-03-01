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

export function TestimonialSection({ reviews = [] }) {
  // Filter out reviews without content
  const validReviews = reviews.filter(review => review?.content?.trim() !== '');
  
  if (validReviews.length === 0) {
    return null; // Don't render the section if there are no reviews
  }

  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="sm:w-[85%] w-[95%] mx-auto">
        {/* Section Header */}
        <div className="sm:text-left text-center mb-16 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a5c] mb-6">What Our Learners Are Saying</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Hear from professionals who have taken our courses and transformed their careers.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {validReviews.map((review, index) => {
            const user = review.user_id || {};
            const userName = user.firstname ? 
              `${user.firstname}${user.lastname ? ' ' + user.lastname : ''}` : 
              'Anonymous';
            const userAvatar = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`;
            
            return (
              <div key={review._id || index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                {/* Review Content */}
                <div className="flex-grow">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{review.content}"</p>
                </div>

                {/* Reviewer Info */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <img 
                      src={userAvatar} 
                      alt={userName} 
                      className="w-12 h-12 rounded-full object-cover" 
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`;
                      }}
                    />
                    <div className="ml-4">
                      <p className="text-sm font-semibold text-[#1a3a5c]">{userName}</p>
                      {user.position && (
                        <p className="text-xs text-gray-600">{user.position}</p>
                      )}
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-2">
                          {new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
