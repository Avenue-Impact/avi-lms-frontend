import { ArrowRight, CheckCircle2, Globe, Users, LayoutDashboard, LineChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BusinessIdeaSection() {
  const navigate = useNavigate();
  
  const features = [
    "Product Strategy & Consulting",
    "Market Research & Validation",
    "Product Design & Development",
    "Go-to-Market & Scaling",
  ];

  const bottomStats = [
    {
      icon: <Globe className="w-8 h-8 text-[#1a1a2e]" strokeWidth={1.5} />,
      text: "UK Strategy. Global Delivery. Local Impact.",
    },
    {
      icon: <Users className="w-8 h-8 text-[#1a1a2e]" strokeWidth={1.5} />,
      text: "Our Consultants work with top government agencies, banks, insurers, and global enterprises.",
    },
    {
      icon: <LayoutDashboard className="w-8 h-8 text-[#1a1a2e]" strokeWidth={1.5} />,
      text: "Integrated platform for learning and talent deployment.",
    },
    {
      icon: <LineChart className="w-8 h-8 text-[#1a1a2e]" strokeWidth={1.5} />,
      text: "Measurable outcomes that drive growth and efficiency.",
    }
  ];

  return (
    <section className="w-full bg-white flex flex-col">
      {/* ── Top Section (Image & Text) ── */}
      <div className="w-full relative py-16 md:py-24">
        {/* The background image that fades out on the left */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/5cc6c76adaaa7f1efe085594098f1046e9842826.jpg" 
            alt="Woman working on laptop smiling" 
            className="w-full h-full object-cover object-right-top"
          />
          {/* White gradient overlay to make text readable on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="w-full lg:w-5/12 pt-8 pb-12">
            <span className="text-sm font-semibold text-[#D50241] mb-2 block">
              Have a Business Idea?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a2e] leading-tight mb-6">
              Let's Build it Together
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
              From idea to impact, we partner with founders and businesses to design, <span className="text-[#D50241] font-semibold">build and launch</span> innovative products that solve real problems.
            </p>
            
            <ul className="space-y-4 mb-10 w-full">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700 text-sm md:text-base font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#D50241] flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => navigate("/signup")}
              className="group flex items-center gap-3 px-8 py-3.5 rounded-sm bg-[#D50241] hover:bg-[#b00235] text-white transition-all duration-300 font-semibold text-sm shadow-md"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Section (Stats/Icons strip) ── */}
      <div className="w-full border-t border-gray-100 bg-white py-12">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {bottomStats.map((stat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-shrink-0">
                  {stat.icon}
                </div>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
