import { cn } from "@/lib/utils";

function HeroHeading({ children, className }) {
  return (
    <h1
      className={cn(
        "text-left font-poppins text-4xl font-extralight capitalize text-white sm:text-[2.5rem] md:text-5xl md:font-[300] lg:text-7xl 2xl:text-8xl 2xl:font-[275]",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export default HeroHeading;
