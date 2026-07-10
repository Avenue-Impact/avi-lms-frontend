import { cn } from "@/lib/utils";

const Hero = ({ videoSrc, imgSrc, children, className }) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full bg-black/45 text-center",
        className,
      )}
    >
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          id="video-bg"
          className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
        ></video>
      ) : imgSrc ? (
        <img
          src={imgSrc}
          alt="Hero background"
          className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
        />
      ) : null}

      <div className={cn("z-10 w-full px-6 text-left md:px-12 2xl:px-20")}>
        {children}
      </div>
    </div>
  );
};

export default Hero;
