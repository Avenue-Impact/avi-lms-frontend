import { NavLink } from "react-router-dom";
import { BellIcon } from "../Icon";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useFetchNotifications } from "@/hooks/notifications/use-fetch-admin-notifications";
// import { ChevronDown } from "lucide-react";

function AdminNav({ children }) {
  const { data } = useFetchNotifications();

  return (
    <nav className="flex items-center justify-between border-b border-b-[#E4E7EC] py-3">
      <div>{children}</div>
      <div className="flex items-center gap-4">
        <NavLink to="/admin/notification" className="relative mt-1">
          <BellIcon size={20} />
          {data?.data?.data?.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
              {data.data.data.length}
            </span>
          )}
        </NavLink>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>ms</AvatarFallback>
        </Avatar>
        <span className="font-medium capitalize text-black">
          maxwell samantha
        </span>
        {/* <span>
          <ChevronDown />{" "}
        </span> */}
      </div>
    </nav>
  );
}

export default AdminNav;
