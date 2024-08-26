import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ProfilePopUp from "./ProfilePopUp";

function PopUp({ children, className }) {
  return (
    <Popover className={cn(className)}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="w-[400px] px-6 shadow-none md:mr-10">
        <ProfilePopUp />
      </PopoverContent>
    </Popover>
  );
}

export default PopUp;
