import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroImg1 from "../../../../assets/imgs/Rectangle 692.svg";
import heroImg2 from "../../../../assets/imgs/Data-First.jpeg";
import heroImg3 from "../../../../assets/imgs/Data-Fourth.jpeg";
import { scrollToElement } from "@/utils/scrollToView";
import { useFetchVideo } from "@/hooks/students/use-fetch-taster-video";

const slides = [
  {
    id: 1,
    title: "Expert Consultants For Sustainable Success",
    description:
      "We provide customized solutions to address commercial, technical, and operational challenges for sustained profitability. Our certified professionals cover various disciplines, including Product Management, Data Analytics, and more.",
    image: heroImg1,
    button1: "Click to Register",
    button2: "View Course Outline",
    accentColor: "var(--accent-pink)",
  },
  {
    id: 2,
    title: "Transform Your Career With Industry Experts",
    description:
      "Gain practical skills and knowledge from professionals who are leaders in their fields. Our courses are designed to give you a competitive edge in today's dynamic job market.",
    image: heroImg2,
    button1: "Explore Live Courses",
    button2: "Learn More",
    accentColor: "var(--accent-cyan)",
  },
  {
    id: 3,
    title: "Hands-On Learning Experience",
    description:
      "Experience practical, project-based learning that prepares you for real-world challenges. Our interactive approach ensures you gain the skills that employers are looking for.",
    image: heroImg3,
    button1: "Start Learning",
    button2: "Our Methodology",
    accentColor: "var(--accent-yellow)",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 500, damping: 30, mass: 0.8 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 500, damping: 30, mass: 0.8 },
      opacity: { duration: 0.15 },
    },
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export function HeroSection({ coverImage, title, overview, courseId }) {
  const navigate = useNavigate();
  const [[page, direction], setPage] = useState([0, 0]);
  const [autoSlide, setAutoSlide] = useState(true);

  const { data: videoData, isLoading } = useFetchVideo(courseId);
  const previewUrl = videoData?.data?.data?.previewUrl;

  const currentSlide = page % slides.length;
  const currentSlideData = slides[currentSlide];

  // Fallback if no dynamic video
  const defaultVideoUrl = `https://avitrainingrecordings.s3.eu-west-2.amazonaws.com/live/wp-content/uploads/Business+Analysis/October+2025/Tester+Session/20+Oct+2025+Introduction+to+Business+Analysis+and+Success+Stories+(Live+Taster+Session).mp4`;

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
      className="mx-auto overflow-hidden py-16 md:py-28"
      onMouseEnter={() => setAutoSlide(false)}
      onMouseLeave={() => setAutoSlide(true)}
    >
      <div className="mx-auto w-[95%] sm:w-[85%]">
        <div className="flex flex-col items-center justify-center space-y-6 text-center font-poppins md:text-left">
          <motion.h1
            className="text-balance text-center text-4xl font-semibold leading-tight text-black md:text-5xl lg:text-6xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="mx-auto w-[95%] text-center text-base leading-relaxed text-gray-600 sm:w-[90%] md:mx-0 md:text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {overview ? overview : "Course Overview not available"}
          </motion.p>

          <motion.div
            className="mx-auto flex justify-center gap-4 pt-4 max-sm:w-[80%] max-sm:flex-col md:mx-0 md:justify-start"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <button
              onClick={() => scrollToElement("register")}
              className="flex transform items-center justify-center gap-2 rounded-full bg-tertiary-color-900 px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-tertiary-color-900/90"
              style={{
                boxShadow: `0 4px 14px 0 ${currentSlideData.accentColor}80`,
              }}
            >
              Click to Register
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollToElement("course-outline")}
              className="flex transform items-center justify-center gap-2 rounded-full border border-tertiary-color-900 px-8 py-4 text-lg font-medium text-tertiary-color-900 transition-all duration-300 hover:scale-105 hover:bg-gray-100"
            >
              View Course Outline
            </button>
          </motion.div>
        </div>

        <motion.div
          className="relative mt-12 md:mt-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.1,
            type: "spring",
            stiffness: 120,
            damping: 12,
          }}
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            {/* <video controls width="100%" src={previewUrl || defaultVideoUrl}>
          Your browser does not support the video tag.
        </video> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
