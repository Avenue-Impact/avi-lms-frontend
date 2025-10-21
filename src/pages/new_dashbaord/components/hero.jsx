import { CommonButton as Button } from "@/Components/ui/button"
import { ArrowRight } from "lucide-react"
import heroImg from '../../../assets/imgs/Rectangle 696.png'
import heroImgMobile from '../../../assets/imgs/hero_small.png'

export function HeroSection() {
  return (
    <section className=" sm:w-[85%] w-[95%] mx-auto py-16 md:py-24">
      <div className="grid lg:grid-cols-2 md:gap-0 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 font-poppins">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted/50 border border-gray-300">
            <span className="text-sm font-medium text-muted-foreground">Trusted Business Consultants</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight text-balance">
            Expert Consultants For Sustainable Success
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            We provide customized solutions to address commercial, technical, and operational challenges for sustained
            profitability. Our certified professionals cover various disciplines, including Product Management, Data
            Analytics, and more.
          </p>

          {/* CTA Button */}
          <button className="bg-[#14345F] flex items-center gap-2 p-[7px] ps-12 rounded-full text-primary-foreground hover:bg-primary/90 group">
            Get Started
            <ArrowRight className="ml-2 h-12 w-12 p-2 bg-[#F53366] rounded-full group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Image with Decorative Elements */}
        <div className="relative">
          {/* Main Image Container */}
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={ window.innerWidth < 768 ? heroImgMobile : heroImg}
              alt="Business consultant presenting to team"
              className="w-full h-full object-cover"
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
