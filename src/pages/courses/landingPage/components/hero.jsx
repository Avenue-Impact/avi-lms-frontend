import { CommonButton as Button } from "@/Components/ui/button"
import { ArrowRight } from "lucide-react"
import heroImg from '../../../../assets/imgs/Rectangle 692.svg'
import heroImgMobile from '../../../../assets/imgs/hero_small.png'
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { scrollToElement } from "@/utils/scrollToView"

export function HeroSection() {
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);
  
  return (
    <section id="hero" className="relative mx-auto py-16 md:py-28 overflow-hidden">
      <div className="sm:w-[85%] w-[95%] mx-auto text-center md:gap-0 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 font-poppins">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black leading-tight text-balance">
            Expert Consultants For Sustainable Success
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 leading-relaxed sm:w-[80%] w-[95%] mx-auto">
            We provide customized solutions to address commercial, technical, and operational challenges for sustained
            profitability. Our certified professionals cover various disciplines, including Product Management, Data
            Analytics, and more.
          </p>

          {/* CTA Button */}
          <div className="flex max-sm:flex-col max-sm:w-[80%] mx-auto justify-center gap-4">
            <button 
              onClick={() => scrollToElement("register")}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className="bg-tertiary-color-900 flex items-center justify-center gap-2 py-4 px-12 rounded-full text-white text-lg font-medium hover:bg-tertiary-color-900/90 group">
                Start Learning Now
            </button>

            <button 
              onClick={() => scrollToElement("curriculum")}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className="border-tertiary-color-900 border flex items-center justify-center gap-2 py-4 px-12 rounded-full text-tertiary-color-900 text-lg font-medium hover:bg-gray-100 group">
                View Course Outline
            </button>
          </div>
        </div>

        {/* Right Image with Decorative Elements */}
        <div className="relative mt-12">
          {/* Main Image Container */}
          <div className="relative rounded-3xl overflow-hidden">
              <img
                src={ heroImg}
                alt="Business consultant presenting to team"
                className="w-full sm:h-[87vh] h-[60vh] object-cover object-right"
              />
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
