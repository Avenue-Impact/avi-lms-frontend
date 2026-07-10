import { cn } from "@/lib/utils";

const Hero = ({ videoSrc, imgSrc, imgOpacity = "opacity-100", children, className }) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full text-center",
        className,
      )}
    >
      {/* Background Media Container */}
      <div className="absolute inset-0 -z-10 bg-black overflow-hidden">
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            id="video-bg"
            className="h-full w-full object-cover"
          ></video>
        ) : imgSrc ? (
          <img
            src={imgSrc}
            alt="Hero background"
            className={cn(
              "h-full w-full object-cover",
              imgOpacity,
            )}
          />
        ) : null}
      </div>

      {/* Dark Overlay Layer */}
      <div className="via-[#0d0d0d]/55 absolute inset-0 bg-gradient-to-tr from-[#0d0d0d] to-[#0d0d0d]/20" />

      <div className={cn("z-10 w-full px-6 text-left md:px-12 2xl:px-20")}>
        {children}
      </div>
    </div>
  );
};

export default Hero;
