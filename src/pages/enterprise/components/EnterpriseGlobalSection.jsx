import React from "react";
import { Globe, MapPin, Check } from "lucide-react";

export const EnterpriseGlobalSection = () => {
  const hubs = [
    { country: "UK", code: "GB", flag: "🇬🇧" },
    { country: "Ghana", code: "GH", flag: "🇬🇭" },
    { country: "Nigeria", code: "NG", flag: "🇳🇬" },
    { country: "South Africa", code: "ZA", flag: "🇿🇦" },
    { country: "Kenya", code: "KE", flag: "🇰🇪" },
    { country: "Rwanda", code: "RW", flag: "🇷🇼" },
    { country: "Zimbabwe", code: "ZW", flag: "🇿🇼" },
  ];

  return (
    <section
      id="global-capability"
      className="w-full bg-white py-12 sm:py-16 lg:py-20 font-inter text-[#0A1430] border-b border-slate-200"
    >
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        <div>
          {/* Eyebrow */}
          <div className="text-[#CC1747] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-2">
            GLOBAL DELIVERY HUB
          </div>

          {/* Heading */}
          <h2 className="font-space font-extrabold text-[28px] sm:text-[38px] lg:text-[42px] leading-tight text-[#0A1430]">
            Global capability, built on quality — not cost
          </h2>

          {/* Subtitle / Paragraph */}
          <div className="mt-4 space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p>
              Avenue Impact maintains delivery hubs across strategic global regions — combining top-tier technical talent with rigorous governance and quality control. We give you global capability without the usual quality friction or timezone issues.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Every hub operates under centralized UK governance, CPD-accredited quality standards, and strict security compliance.
            </p>
          </div>

          {/* Country Hub Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {hubs.map((hub) => (
              <div
                key={hub.country}
                className="inline-flex items-center gap-2 bg-[#F8F9FC] hover:bg-[#EEF2F9] border border-slate-200 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#0A1430] shadow-2xs transition-colors"
              >
                <span className="text-base">{hub.flag}</span>
                <span>{hub.country}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseGlobalSection;
