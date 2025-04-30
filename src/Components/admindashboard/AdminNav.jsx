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
        <span>
          <NavLink to="/admin/notification">
            <BellIcon size={15} />
          </NavLink>
          {/* <p className="absolute right-60 top-5 rounded-full bg-red-800 px-2 text-[12px] text-white">
            {data?.data?.data?.length}
          </p> */}
        </span>
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
