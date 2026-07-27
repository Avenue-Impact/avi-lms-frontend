import React, { useState } from "react";
import { WhiteLogo } from "./Logo";
import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { socialLinks } from "../utils/socialLinks";

const XIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TiktokIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.18 1.15 1.25 2.75 2.05 4.44 2.24v3.9c-1.52-.06-3.01-.58-4.28-1.44-.75-.52-1.39-1.2-1.89-1.97v6.62c-.06 2.37-.9 4.74-2.58 6.43-1.86 1.83-4.54 2.69-7.1 2.28-2.91-.45-5.46-2.61-6.28-5.43C-.19 12.8 1.48 8.87 4.9 7.64c.96-.34 1.99-.48 3.01-.4v3.91c-.84-.13-1.72.03-2.45.48-1.07.67-1.63 1.98-1.41 3.22.25 1.4 1.51 2.5 2.92 2.47 1.53.03 2.87-1.12 2.97-2.65V.02h2.585z" />
  </svg>
);

// Validates full email format with domain check (must have a TLD of 2+ chars)
const isValidEmailDomain = (email) => {
  // Split on @ — must have exactly one @
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  const domain = parts[1];
  // Domain must have at least one dot and a TLD of 2+ chars
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
};

const AVIFooter = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      return;
    }
    // Basic format check
    if (!/^[^\s@]+@[^\s@]+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    // Domain validation
    if (!isValidEmailDomain(email)) {
      setEmailError("Email domain appears invalid. Please check and try again.");
      return;
    }

    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative bg-[#030d22] text-white font-sans">
      <div className="mx-auto max-w-[1520px] px-6 py-16 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          
          {/* Logo & Description */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center">
              <WhiteLogo className="h-12 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              We partner with governments and enterprises to transform organisations, 
              empower people and create lasting impact.
            </p>
            <div className="flex gap-4 pt-2">
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <XIcon className="h-5 w-5" />
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="TikTok">
                <TiktokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-semibold tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Services</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-semibold tracking-wider text-white">Services</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/digital-transformation" className="hover:text-white transition-colors">Digital Transformation</Link>
              </li>
              <li>
                <Link to="/data-solution" className="hover:text-white transition-colors">Data Solution</Link>
              </li>
              <li>
                <Link to="/avenue-impact-development" className="hover:text-white transition-colors">Avenue Impact Development CIC</Link>
              </li>
              <li>
                <Link to="/digital-learning-hub" className="hover:text-white transition-colors">Digital Learning Hub</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-semibold tracking-wider text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gray-300 shrink-0" />
                <a href="mailto:info@avenueimpact.com" className="hover:text-white transition-colors break-all">info@avenueimpact.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gray-300 shrink-0" />
                <a href="tel:+4480005410720" className="hover:text-white transition-colors">+44 (0)8000 541 0720</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gray-300 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <p>London, United Kingdom</p>
                  <p>Lagos, Nigeria</p>
                  <p>Nairobi, Kenya</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Subscribe to Insights */}
          {/* <div className="lg:col-span-3 space-y-4">
            <h3 className="text-base font-semibold tracking-wider text-white">Subscribe to Insights</h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Get the latest insights on transformation, workforce and growth.
            </p>
            <form onSubmit={handleSubscribe} noValidate>
              <div className="flex w-full items-center rounded bg-[#0d1e3d] border border-gray-700 focus-within:border-gray-500 overflow-hidden">
                <input
                  id="footer-subscribe-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  aria-describedby={emailError ? "footer-email-error" : undefined}
                  aria-invalid={!!emailError}
                  className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="bg-[#D50241] text-white px-4 py-2.5 hover:bg-[#b00235] transition-colors flex items-center justify-center shrink-0"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
              
              {emailError && (
                <p id="footer-email-error" role="alert" className="mt-2 text-xs text-[#ff6b6b] flex items-center gap-1">
                  <span aria-hidden="true">⚠</span> {emailError}
                </p>
              )}
              
              {subscribed && (
                <p role="status" className="mt-2 text-xs text-green-400 flex items-center gap-1">
                  <span aria-hidden="true">✓</span> You've been subscribed!
                </p>
              )}
            </form>
          </div> */}

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-[#00d0ff]/20 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 Avenue Impact. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default AVIFooter;
