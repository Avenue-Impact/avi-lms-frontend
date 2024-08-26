import { GrHomeRounded } from "react-icons/gr";
// import { BiBell } from "react-icons/bi";
import { FaRegHeart, FaRegBell } from "react-icons/fa";

import { useState } from "react";
import { Sidebar, SidebarItem } from "./SideNav";
export const navItem = [
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
    path: "/dashboard/notification",
  },
  {
    id: 3,
    text: "Wishlist",

    icon: <FaRegHeart />,

    active: false,
    alert: "alert",
    path: "/dashboard/wishlists",
  },
];
function DashboardSideNav({ toggleNav, setTogglNav }) {
  const hadleClick = (id) => {};
  return (
    <Sidebar toggleNav={toggleNav} setToggleNav={setTogglNav}>
      {navItem.map((item) => (
        <SidebarItem
          key={item.text}
          icon={item.icon}
          text={item.text}
          path={item.path}
          onClick={() => hadleClick(item.id)}
          active={item.active}
          setToggleNav={setTogglNav}
        />
      ))}
    </Sidebar>
  );
}

export default DashboardSideNav;
