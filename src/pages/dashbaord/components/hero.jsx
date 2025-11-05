import { CommonButton as Button } from "@/Components/ui/button"
import { ArrowRight } from "lucide-react"
import heroImg from '../../../assets/imgs/Rectangle 696.png'
import heroImgMobile from '../../../assets/imgs/hero_small.png'
import { useNavigate } from "react-router-dom"
import AnimatedWaves from '@/Components/AnimatedWaves'
import { motion } from 'framer-motion';
import { GL } from "@/Components/gl"
import { useState } from "react";

export function HeroSection() {
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);
  
  return (
    // <section className="relative mx-auto py-16 flex flex-col h-svh bg-[#14345F] justify-between md:py-28 overflow-hidden">
      <section className="relative mx-auto py-16 bg-tertiary-color-900 md:py-28 overflow-hidden">
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
          {/* Main Image Container */}
          <div className="relative rounded-3xl overflow-hidden">
          {/* <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: [0, -20, 0],
                transition: { 
                  y: { duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' },
                  opacity: { duration: 0.5 }
                }
              }}
              viewport={{ once: false, amount: 0.1 }}
              // className="bg-white backdrop-blur-sm rounded-xl w-full max-w-md"
            > */}
              <img
                src={ window.innerWidth < 768 ? heroImgMobile : heroImg}
                alt="Business consultant presenting to team"
                className="w-full h-[87vh] object-cover"
              />
            {/* </motion.div> */}
          </div>

          {/* Decorative Pink Rectangle */}
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
