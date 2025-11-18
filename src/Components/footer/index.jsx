import { Linkedin } from "lucide-react"
import { CommonButton as Button } from "@/Components/ui/button"
// import { ArrowRight } from "lucide-react"
import { DarkLogo, WhiteLogo } from "@/Components/Logo"
import { useNavigate } from "react-router-dom"
import { socialLinks } from "@/utils/socialLinks"
import { PiYoutubeLogoFill } from "react-icons/pi"
import { BsInstagram } from "react-icons/bs"
import { FaFacebook } from "react-icons/fa6"
import { GrTiktok } from "react-icons/gr"

// Custom X (Twitter) icon component
function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function Footer() {
    const navigate = useNavigate();

  return (
    <footer className="bg-tertiary-color-900 text-white py-16 lg:px-24">
      <div className="sm:w-[85%] w-[95%] mx-auto">
        <div className="grid md:grid-cols-2 items-start gap-12 mb-16">
          {/* Left Column */}
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 leading-10">
              Interested in a Free
              <br />
              Introductory Call?
            </h2>
            <div>
                <button
                onClick={() => navigate("/contact")}
                size="lg"
                className="bg-[#D50241]  flex items-center hover:bg-white/20 text-white border border-white/20 rounded-full ps-8 p-[5px] gap-4 group"
                >
                Send Us A Message
                {/* <ArrowRight className="ml-2 h-12 w-12 p-2 group-hover:translate-x-1 transition-transform" /> */}
                </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex items-center">
            <p className="text-xl leading-relaxed">
              Please provide your email address. During this call, we will discuss your business requirements and goals,
              and determine how we can support you in reaching your objectives
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/20">
          {/* Left: Logo, Social, Copyright */}
          <div className=" space-y-12">
            <div className="w-[200px] h-[50px] cursor-pointer" onClick={() => navigate("/")}>
                <WhiteLogo/>
            </div>

            {/* <div className="flex max-sm:items-center max-sm:justify-center gap-4 mb-6">
              <a
                href={socialLinks.linkedin}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.twitter}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
                aria-label="X (Twitter)"
              >
                <XIcon className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.facebook}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.instagram}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <BsInstagram className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.youtube}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <PiYoutubeLogoFill className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.tiktok}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <GrTiktok className="h-5 w-5" />
              </a>
            </div> */}

            <p className="text-sm text-white/70">© 2025 Avenue Impact Limited. All rights reserved</p>
          </div>

          {/* Right: Contact Info */}
          <div className="sm:text-right text-center space-y-2">
            <div className="space-y-4 ">
              <p className="text-xl font-semibold">+44 8000 541 0720</p>
              <p className="text-lg">London, UK</p>
              <p className="text-white/80">Mon - Sat 8:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
