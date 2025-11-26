import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroImg1 from '../../../../assets/imgs/Rectangle 692.svg';
import heroImg2 from '../../../../assets/imgs/Data-First.jpeg';
import heroImg3 from '../../../../assets/imgs/Data-Fourth.jpeg';
import { scrollToElement } from "@/utils/scrollToView";

const slides = [
  {
    id: 1,
    title: "Expert Consultants For Sustainable Success",
    description: "We provide customized solutions to address commercial, technical, and operational challenges for sustained profitability. Our certified professionals cover various disciplines, including Product Management, Data Analytics, and more.",
    image: heroImg1,
    button1: "Click to Register",
    button2: "View Course Outline",
    accentColor: "var(--accent-pink)"
  },
  {
    id: 2,
    title: "Transform Your Career With Industry Experts",
    description: "Gain practical skills and knowledge from professionals who are leaders in their fields. Our courses are designed to give you a competitive edge in today's dynamic job market.",
    image: heroImg2,
    button1: "Explore Courses",
    button2: "Learn More",
    accentColor: "var(--accent-cyan)"
  },
  {
    id: 3,
    title: "Hands-On Learning Experience",
    description: "Experience practical, project-based learning that prepares you for real-world challenges. Our interactive approach ensures you gain the skills that employers are looking for.",
    image: heroImg3,
    button1: "Start Learning",
    button2: "Our Methodology",
    accentColor: "var(--accent-yellow)"
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 500, damping: 30, mass: 0.8 },
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 500, damping: 30, mass: 0.8 },
      opacity: { duration: 0.15 }
    }
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export function HeroSection({
  coverImage,
  title,
  overview,
}) {
  const navigate = useNavigate();
  const [[page, direction], setPage] = useState([0, 0]);
  const [autoSlide, setAutoSlide] = useState(true);
  
  const currentSlide = page % slides.length;
  const currentSlideData = slides[currentSlide];

  useEffect(() => {
    if (!autoSlide) return;
    
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [page, autoSlide]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section 
      id="hero" 
      className="mx-auto py-16 md:py-28 overflow-hidden"
      onMouseEnter={() => setAutoSlide(false)}
      onMouseLeave={() => setAutoSlide(true)}
    >
      <div className="sm:w-[85%] w-[95%] mx-auto ">
        <div className="space-y-6 font-poppins flex items-center justify-center flex-col text-center md:text-left">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black leading-tight text-balance text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {title}
          </motion.h1>

          <motion.p 
            className="text-base md:text-lg text-gray-600 text-center leading-relaxed sm:w-[90%] w-[95%] mx-auto md:mx-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {overview ? overview : 'Course Overview not available'}
          </motion.p>

          <motion.div 
            className="flex max-sm:flex-col max-sm:w-[80%] mx-auto md:mx-0 justify-center md:justify-start gap-4 pt-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <button 
              onClick={() => scrollToElement("register")}
              className="bg-tertiary-color-900 flex items-center justify-center gap-2 py-4 px-8 rounded-full text-white text-lg font-medium hover:bg-tertiary-color-900/90 transition-all duration-300 transform hover:scale-105"
              style={{ boxShadow: `0 4px 14px 0 ${currentSlideData.accentColor}80` }}
            >
              Click to Register
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => scrollToElement("course-outline")}
              className="border-tertiary-color-900 border flex items-center justify-center gap-2 py-4 px-8 rounded-full text-tertiary-color-900 text-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              View Course Outline
            </button>
          </motion.div>
        </div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="relative"
          >

            <motion.div 
              className="mt-12 md:mt-10 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, type: 'spring', stiffness: 500 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  // src={currentSlideData.image}
                  src={coverImage}
                  alt={'course cover image'}
                  className="w-full sm:h-[87vh] h-[60vh] object-cover object-center transform transition-transform duration-700 hover:scale-105"
                />
              </div>

              <motion.div
                className="absolute -top-6 -right-6 w-48 h-64 rounded-[3rem] z-50"
                style={{ backgroundColor: currentSlideData.accentColor }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />

              <motion.div
                className="absolute top-1/3 -right-8 w-24 h-24 rounded-full z-50"
                style={{ backgroundColor: currentSlideData.accentColor }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
              />
            </motion.div>

            {/* Navigation Arrows */}
            {/* <button 
              onClick={() => paginate(-1)}
              className="absolute left-0 top-1/2 bottom-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            <button 
              onClick={() => paginate(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 focus:outline-none"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button> */}
          </motion.div>
        </AnimatePresence>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const direction = index > currentSlide ? 1 : -1;
                setPage([index, direction]);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-tertiary-color-900' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
