import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function PopoverComponent({ className, trigger, children }) {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        className={cn(
          "mr-10 w-[259px] rounded-sm bg-white shadow-lg",
          className,
        )}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}

export default PopoverComponent;
