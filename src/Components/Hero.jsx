/* eslint-disable react/prop-types */

import { cn } from "@/lib/utils";

const Hero = ({ videoSrc, children, className }) => {
  return (
    <div className="relative min-h-screen w-full text-center">
      <div>
        <video
          src={videoSrc}
          autoPlay
          loop
          id="video-bg"
          className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
        ></video>
      </div>
      {/* <div className="absolute left-0 top-0 -z-[5] h-full w-full bg-black/40"></div> */}
      <div
        className={cn(
          "z-20 min-h-screen w-full bg-black/70 px-6 pb-24 text-left md:px-12 md:py-16",
          className,
        )}
      >
        <div className="flex min-h-screen w-full items-center md:items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Hero;
