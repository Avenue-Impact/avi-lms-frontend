import { cn } from "@/lib/utils";

const DashButton = ({ children, className, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        `cursor-pointer rounded bg-[#CC1747] px-4 py-2 transition duration-300 disabled:hover:bg-slate-200 lg:hover:bg-[#B3123F]`,
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default DashButton;
