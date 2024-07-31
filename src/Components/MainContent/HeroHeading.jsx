import { cn } from "@/lib/utils";

function HeroHeading({ children, className }) {
  return (
    <h1
      

  className={cn(
    "text-left font-poppins font-[300] text-4xl capitalize leading-snug text-white sm:text-[2.5rem] md:text-5xl md:leading-normal lg:text-7xl",
    className,
  )}
>
  {children}
</h1>

  );
}

export default HeroHeading;
