import { ArrowRight } from "lucide-react"
import { CommonButton as Button } from "@/Components/ui/button"
import empowermentImg from '../../../assets/imgs/Rectangle 690.svg'

export function ConnectSection() {
  return (
    <section className="py-16 md:py-24">
      <div className=" w-full mx-auto ">
        <div className="sm:grid md:grid-cols-5 gap-0 items-center ">
          {/* Left side - Navy blue background with text */}
          <div className="bg-[#1a2b4a] col-span-3 text-white p-8 md:p-12 flex flex-col justify-center lg:p-16 h-[400px] md:h-[500px] lg:h-[600px]">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-relaxed mb-6">
                Ready to Connect with an Expert at Avenue Impact?
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed tracking-wider text-base md:text-lg">
            Receive bespoke support from our experienced 
            consultants and elevate your business to new 
            heights.
            </p>
            <div>
                <button
                size="lg"
                className="bg-[#D50241]  flex items-center hover:bg-white/20 text-white border border-white/20 rounded-full ps-8 p-[5px] gap-4 group"
                >
                Contact Us
                <ArrowRight className="ml-2 h-12 w-12 p-2 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-red-600 col-span-2">
            <img
              src={empowermentImg}
              alt="Team collaboration meeting from overhead view"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
