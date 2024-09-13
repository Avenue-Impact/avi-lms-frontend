import { cn } from "@/lib/utils";

const LinkList = ({ active, className, children, onClick }) => {
  return (
    <li
      className={cn(
        "after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 *:capitalize after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full",
        className,
        active ? "text-primary-color-600 after:w-full" : "",
      )}
      onClick={() => onClick?.()}
    >
      {children}
    </li>
  );
};

export default LinkList;
