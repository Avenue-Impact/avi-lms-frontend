import { CommonButton as Button } from "@/Components/ui/button"
import { ArrowRight } from "lucide-react"
import heroImg from '../../../assets/imgs/Rectangle 700.svg'
import heroImgMobile from '../../../assets/imgs/hero_small.png'
import secondSlide from '../../../assets/imgs/Frame 1984078367.svg'
import { useNavigate } from "react-router-dom"
import AnimatedWaves from '@/Components/AnimatedWaves'
import { motion } from 'framer-motion';
import { GL } from "@/Components/gl"
import { useState } from "react";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

export function HeroSection() {
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);
  
  return (
    // <section className="relative mx-auto py-16 flex flex-col h-svh bg-[#14345F] justify-between md:py-28 overflow-hidden">
      <section className="relative mx-auto py-16 bg-tertiary-color-900 md:py-28">
      {/* <AnimatedWaves /> */}
      {/* <GL hovering={hovering} /> */}
      <div className="grid lg:grid-cols-2 sm:w-[85%] w-[95%] mx-auto md:gap-0 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 font-poppins">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted/10 border border-gray-300">
            <span className="text-sm font-medium text-white">Trusted Business Consultants</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight text-balance">
            Expert Consultants For Sustainable Success
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-100 leading-relaxed max-w-xl">
            We provide customized solutions to address commercial, technical, and operational challenges for sustained
            profitability. Our certified professionals cover various disciplines, including Product Management, Data
            Analytics, and more.
          </p>

          {/* CTA Button */}
          <button 
            onClick={() => navigate("/about")}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="bg-primary-color-600 flex items-center gap-2 p-[7px] ps-12 rounded-full text-primary-foreground hover:bg-primary-color-600/90 group">
              Get Started
              <ArrowRight className="ml-2 h-12 w-12 p-2 bg-white text-tertiary-color-900 rounded-full group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Image with Decorative Elements */}
        <div className="relative">
          {/* Responsive Clip Path SVG Definition */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="hero-clip" clipPathUnits="objectBoundingBox">
                <path 
                  d="M151.862 91.1182C169.563 36.7779 220.222 0 277.372 0H608.276C681.177 0 740.276 59.0984 740.276 132V578C740.276 650.902 681.177 710 608.276 710H132.098C42.3809 710 -21.1981 622.424 6.58822 537.118L151.862 91.1182Z" 
                  transform="scale(0.001349527, 0.001408451)" // 1/741, 1/710
                />
              </clipPath>
            </defs>
          </svg>

          {/* Main Image Container */}
          <div 
             className="relative w-full h-[87vh] overflow-hidden" 
             style={{ 
               clipPath: "url(#hero-clip)",
               WebkitClipPath: "url(#hero-clip)", // Safari support
             }} 
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={5}
              centeredSlides={true}
              speed={1000}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              loop={true}
              className="mySwiper w-full h-full"
            >
              {[1, 2, 3, 4].map((item) => (
                <SwiperSlide key={item}>
                  <img
                    src={window.innerWidth < 768 ? heroImgMobile : heroImg}
                    alt={`Business consultant presenting ${item}`}
                    className="w-full h-full object-cover" // Changed to object-cover to fill shape
                  />
                </SwiperSlide>
              ))}
              <SwiperSlide>
                  <img
                    src={window.innerWidth < 768 ? heroImgMobile : secondSlide}
                    alt={`Business consultant presenting`}
                    className="w-full h-full object-cover" // Changed to object-cover to fill shape
                  />
                </SwiperSlide>
            </Swiper>
          </div>

          {/* Decorative Pink Rectangle - Adjusted position to fit new flow if needed, but keeping for now */}
          <div
            className="absolute -top-6 -right-6 w-48 h-64 rounded-[3rem] z-50"
            style={{ backgroundColor: "var(--accent-pink)" }}
          />

          {/* Decorative Cyan Circle */}
          <div
            className="absolute top-1/3 -right-8 w-24 h-24 rounded-full z-50"
            style={{ backgroundColor: "var(--accent-cyan)" }}
          />
        </div>
      </div>
    </section>
  )
}
