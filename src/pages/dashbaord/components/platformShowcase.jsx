import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PlatformShowcaseSection() {
  const navigate = useNavigate();

  const features = [
    "Mentorship & Coaching",
    "Interview Readiness",
    "Skills Training & Assessment",
    "Talent Deployment",
  ];

  return (
    <section className="w-full bg-[#060F24] py-20 md:py-28">
      <div className="mx-auto max-w-[90%] px-4 sm:px-6">
        {/* Inner container with 2 distinct background halves */}
        <div className="flex w-full flex-col overflow-hidden rounded-md shadow-2xl lg:flex-row">
          {/* Left Content Half */}
          <div className="flex w-full flex-col items-start justify-center bg-[#0B1C3D] p-10 text-white lg:w-1/2 lg:p-16 xl:p-20">
            <span className="mb-4 text-xs font-bold tracking-wide text-white">
              Our Platform
            </span>
            <h2 className="mb-6 text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl lg:text-[40px]">
              An integrated platform for workforce transformation
            </h2>
            <p className="mb-10 text-sm leading-relaxed text-gray-400 md:text-base">
              Mentor, train, assess and deploy future-ready talent — all in one
              place.
            </p>

            <ul className="mb-12 w-full space-y-4">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-4 text-sm font-medium text-gray-300"
                >
                  <Circle className="h-5 w-5 flex-shrink-0 stroke-[1.5] text-gray-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/digital-learning-hub")}
              className="group flex items-center gap-3 rounded border border-gray-500 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-gray-300 hover:bg-white/5"
            >
              Explore Platform
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Image Half */}
          <div className="relative flex w-full items-center justify-center bg-[#132244] p-10 lg:w-1/2 lg:p-16 xl:p-20">
            <div className="relative w-full min-w-[85%] sm:min-w-[640px]">
              <img
                src="/images/788a199eb60265162780c6580b0deda0ba6c6132.png"
                alt="Avenue Impact Platform Interface on Monitor"
                className="relative z-10 h-auto w-full object-contain drop-shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
