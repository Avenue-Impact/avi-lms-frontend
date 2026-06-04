import { BriefcaseBusiness, Earth, Settings2 } from "lucide-react";

export function GlobalDeliverySection() {
  const items = [
    {
      icon: <BriefcaseBusiness className="w-5 h-5 text-[#1a1a2e]" />,
      title: "UK Strategy & Client Engagement",
      desc: "Close collaboration and strategic oversight from our UK leadership."
    },
    {
      icon: <Earth className="w-5 h-5 text-[#1a1a2e]" />,
      title: "Global Talent Powered by Africa",
      desc: "Skilled professionals delivering with agility, quality and efficiency."
    },
    {
      icon: <Settings2 className="w-5 h-5 text-[#1a1a2e]" />,
      title: "Seamless Delivery Excellence",
      desc: "Integrated Teams, proven processes and best-in-class tools"
    }
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Content */}
          <div className="w-full lg:w-5/12 flex flex-col items-start">
            <span className="text-[10px] sm:text-xs font-bold text-[#D50241] mb-3 uppercase tracking-wider">
              GLOBAL DELIVERY MODEL
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1a1a2e] leading-[1.15] mb-4">
              UK Strategy. Global Delivery. Local Impact.
            </h2>
            <p className="text-[#1a1a2e] font-medium text-sm md:text-base leading-relaxed mb-10 max-w-[450px]">
              We combine the best local expertise and global talent to deliver outcomes that matter
            </p>
            
            <div className="flex flex-col gap-8 w-full max-w-[500px]">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50/80 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-[#1a1a2e] font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image (Map Placeholder) */}
          <div className="w-full lg:w-6/12 flex justify-center lg:justify-end relative">
            {/* We use an img tag pointing to a generic world map. The user will upload the real image later if needed. */}
            <div className="relative w-full max-w-[600px] aspect-[4/3] flex items-center justify-center bg-transparent">
               {/* 
                 For now, we'll just try to load a map image if it exists, or fallback to an alt text styling.
                 Based on the design, it's a dotted/vector world map with pins.
               */}
               <img 
                 src="/images/world-map.png" 
                 alt="World Map connecting UK and Africa"
                 className="w-full h-full object-contain opacity-60"
                 onError={(e) => {
                   // Fallback if image doesn't exist
                   e.target.style.display = 'none';
                   e.target.nextElementSibling.style.display = 'flex';
                 }}
               />
               <div className="absolute inset-0 hidden flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                 <Earth className="w-16 h-16 mb-4 text-gray-300" />
                 <span className="text-sm font-medium">World Map Image Placeholder</span>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
