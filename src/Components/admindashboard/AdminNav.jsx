import { Link } from "react-router-dom";
import { BellIcon } from "../Icon";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown } from "lucide-react";

function AdminNav({ children }) {
  return (
    <nav className="flex items-center justify-between border-b border-b-[#E4E7EC] py-3">
      <div>{children}</div>
      <div className="flex items-center gap-4">
        <span>
          <BellIcon />
        </span>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>ms</AvatarFallback>
        </Avatar>
        <span className="font-medium capitalize text-black">
          maxwell samantha
        </span>
        <span>
          <ChevronDown />{" "}
        </span>
      </div>
    </nav>
  );
}

export default AdminNav;
