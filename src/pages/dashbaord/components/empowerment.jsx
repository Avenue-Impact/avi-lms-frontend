import { ArrowRight } from "lucide-react"
import empowermentImg from '../../../assets/imgs/Rectangle 678.png'
import { useNavigate } from "react-router-dom"

export function EmpowermentSection() {
  const navigate = useNavigate();
  return (
    <section className="py-16 md:py-24">
      <div className="sm:w-[85%] w-full mx-auto ">
        <div className="sm:grid md:grid-cols-2 gap-0 items-center ">
          {/* Left side - Navy blue background with text */}
          <div className="bg-[#1a2b4a] text-white p-8 md:p-12 flex flex-col justify-center lg:p-16 sm:h-[600px] md:h-[500px] lg:h-[700px]">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-relaxed mb-6">
              Avenue Impact Empowers Your Business Growth
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed tracking-wider text-base md:text-lg">
              Whether you are looking to expand into new markets, streamline operations, or simply need support
              navigating today's complex business landscape, we are here to help. Let us help you grow your business and
              achieve your full potential.
            </p>
            <div>
                <button
                onClick={() => navigate("/about")}
                size="lg"
                className="bg-gradient-to-r from-[#EA5480] to-[#14345F] flex items-center hover:bg-white/20 text-white border border-white/20 rounded-full ps-8 p-[5px] gap-4 group"
                >
                Learn More
                <ArrowRight className="ml-2 h-12 w-12 p-2 bg-[#F53366] rounded-full group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[700px]">
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
