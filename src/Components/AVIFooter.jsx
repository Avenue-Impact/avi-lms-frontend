import React from "react";
import { WhiteLogo } from "./Logo";
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import footerImg from "../assets/imgs/Union.svg"; // Reusing an existing asset if appropriate, or just using color

const AVIFooter = () => {
  return (
    <footer className="relative overflow-hidden bg-tertiary-color-900 pb-8 pt-16 text-white">
      {/* Background decoration if needed, keeping it clean for now */}

      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-14">
        <div className="flex flex-col items-start justify-between pb-16 md:flex-row md:items-end">
          {/* Left Side: Logo & Socials */}
          <div className="mb-10 md:mb-0">
            <div className="mb-8">
              <WhiteLogo />
            </div>

            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-blue-400">
                <Linkedin size={20} />
              </a>
              <a href="#" className="transition-colors hover:text-blue-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="transition-colors hover:text-blue-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="transition-colors hover:text-blue-400">
                <Instagram size={20} />
              </a>
            </div>

            <p className="mt-8 text-sm font-light text-gray-400">
              © 2024 Avenue Impact Limited. All rights reserved
            </p>
          </div>

          {/* Right Side: Contact Info */}
          <div className="space-y-2 text-right text-sm font-light text-gray-300 md:text-right">
            <p className="mb-2 text-lg font-medium text-white">
              +44 8000 541 0720
            </p>
            <p>London, UK</p>
            <p>Mon - Sat 8:00 - 18:00</p>
          </div>
        </div>

        {/* Bottom Bar if needed, but design shows it integrated */}
      </div>
    </footer>
  );
};

export default AVIFooter;
