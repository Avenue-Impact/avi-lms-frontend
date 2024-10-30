import { cn } from "@/lib/utils";

export default function SaveButton({ children, onClick, className }) {
  return (
    <button
      className={cn(
        "flex items-center rounded border border-[#667185] bg-transparent px-4 py-2 text-[#667185] hover:bg-[#f0f0f0]",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
