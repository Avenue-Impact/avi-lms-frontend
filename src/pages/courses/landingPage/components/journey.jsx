import { ArrowRight, Check } from "lucide-react"
import { CommonButton as Button } from "@/Components/ui/button"
import empowermentImg from '../../../../assets/imgs/Frame 1984078367.svg'
import { useNavigate } from "react-router-dom"

export function JourneySection() {
    const navigate = useNavigate();

    const journeySteps = [
      "Enroll in the course",
      "Learn with structure",
      "Practice and apply",
      "Get personalized feedback",
      "Certify your achievement"
    ]

  return (
    <section className="py-16 md:py-24 sm:w-[85%] w-[95%] mx-auto">
      <div className=" w-full mx-auto ">
        <div className="sm:grid md:grid-cols-5 gap-0 items-center ">
          {/* Left side - Navy blue background with text */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] col-span-3">
            <img
              src={empowermentImg}
              alt="Team collaboration meeting from overhead view"
              className="object-contain w-full h-full"
            />
          </div>

          {/* Right side - Image */}
          <div className=" col-span-2 mt-12 text-black p-8 md:p-12 flex flex-col justify-center lg:p-16">
            <h2 className="text-2xl lg:text-3xl font-semibold leading-relaxed mb-6">
                Your Journey to Becoming a Data Analyst
            </h2>
            <p className="text-black/90 mb-8 leading-relaxed tracking-wider text-base md:text-md">
              Receive bespoke support from our experienced 
              consultants and elevate your business to new 
              heights.
            </p>
            <div>
                {journeySteps.map((step, index) => (
                    <div key={index} className="flex items-center mb-6">
                        <span className="w-6 h-6 rounded-full bg-primary-color-500 text-white flex items-center justify-center mr-3">
                          <Check className="w-3 h-3" /> 
                        </span>
                        <p className="text-black/90 text-sm">{step}</p>
                    </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
