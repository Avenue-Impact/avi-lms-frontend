import { Linkedin } from "lucide-react";
import { CommonButton as Button } from "@/Components/ui/button";
// import { ArrowRight } from "lucide-react"
import { DarkLogo, WhiteLogo } from "@/Components/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { socialLinks } from "@/utils/socialLinks";
import { PiYoutubeLogoFill } from "react-icons/pi";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { GrTiktok } from "react-icons/gr";
import AVIFooter from "../AVIFooter";

// Custom X (Twitter) icon component
function XIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <footer>
      {pathname !== "/contact" && (
      <div className="w-full bg-[#0B1C3D] py-20 text-center">
        <div className="mx-auto max-w-[900px] px-6 flex flex-col items-center justify-center">
          <h2 className="mb-6 text-3xl sm:text-4xl md:text-[44px] font-bold leading-tight text-white tracking-tight">
            Let us help you deliver the<br className="hidden sm:block" /> next stage of transformation.
          </h2>
          <p className="mb-10 text-sm sm:text-base md:text-[17px] leading-relaxed text-gray-300 max-w-[700px]">
            Whether you are modernising operations, building internal capability, sourcing delivery talent or scaling customer services, Avenue Impact can support you.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-3 rounded-md bg-[#D50241] hover:bg-[#b00235] text-white font-semibold text-sm transition-colors flex items-center gap-2"
          >
            Get In Touch &rarr;
          </button>
        </div>
      </div>
      )}
      <AVIFooter />
    </footer>
  );
}
