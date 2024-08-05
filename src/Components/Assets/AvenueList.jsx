import { cn } from "@/lib/utils";

const AvenueList = ({ children, src, textColor, className, imgClass }) => {
  return (
    <div className="flex items-center gap-2">
      <img src={src} alt="a checkbox icon block  " className={cn(imgClass)} />
      <p
        className={cn(
          `font-[400] text-[${textColor}] text-[16px] lg:text-[24px]`,
          className,
        )}
      >
        {children}
      </p>
    </div>
  );
};

export default AvenueList;
