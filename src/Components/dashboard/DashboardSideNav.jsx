import { GrHomeRounded } from "react-icons/gr";
// import { BiBell } from "react-icons/bi";
import { FaRegHeart, FaRegBell } from "react-icons/fa";

import { useState } from "react";
import { Sidebar, SidebarItem } from "./SideNav";
const navItem = [
  {
    id: 1,
    text: "Dashboard",

    icon: <GrHomeRounded />,

    active: true,
    alert: "alert",
    path: "/dashboard",
  },
  {
    id: 2,
    text: "Notification",

    icon: <FaRegBell />,

    active: false,
    alert: "alert",
    path: "notification",
  },
  {
    id: 3,
    text: "Wishlist",

    icon: <FaRegHeart />,

    active: false,
    alert: "alert",
    path: "wishlists",
  },
];
function DashboardSideNav() {
  const [active, setActive] = useState(navItem);
  const hadleClick = (id) => {};
  return (
    <Sidebar>
      {navItem.map((item) => (
        <SidebarItem
          key={item.text}
          icon={item.icon}
          text={item.text}
          path={item.path}
          onClick={() => hadleClick(item.id)}
          active={item.active}
        />
      ))}
    </Sidebar>
  );
}

export default DashboardSideNav;
