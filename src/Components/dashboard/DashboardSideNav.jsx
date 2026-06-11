import { GrHomeRounded } from "react-icons/gr";
// import { BiBell } from "react-icons/bi";
import { FaRegHeart, FaRegBell } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { useState } from "react";
import { Sidebar, SidebarItem } from "./SideNav";
import { useCheckMentorshipAccess } from "@/hooks/course-management/use-check-mentorship-access";
import { Users } from "lucide-react";
export const navItem = [
  {
    id: 1,
    text: "Dashboard",

    icon: <GrHomeRounded />,

    active: "dashboard",
    alert: "alert",
    path: "/dashboard",
  },
  {
    id: 2,
    text: "Assignment",

    icon: <MdAssignment />,

    active: "assignment",
    alert: "alert",
    path: "/dashboard/assignment",
  },
  {
    id: 3,
    text: "Notification",

    icon: <FaRegBell />,

    active: "notification",
    alert: "alert",
    path: "/dashboard/notification",
  },
  {
    id: 5,
    text: "Mentorship",
    icon: <Users className="h-5 w-5" />,
    active: "mentorship",
    alert: "alert",
    path: "/dashboard/mentorship",
  },
  {
    id: 4,
    text: "Wishlist",

    icon: <FaRegHeart />,

    active: "wishlists",
    alert: "alert",
    path: "/dashboard/wishlists",
  },
];
function DashboardSideNav({ toggleNav, setTogglNav }) {
  const { data: mentorshipAccess } = useCheckMentorshipAccess();

  // Filter out Mentorship from the static array if they don't have access
  const visibleNavItems = navItem.filter(item => {
    if (item.active === "mentorship") {
      return mentorshipAccess?.allowed === true;
    }
    return true;
  });

  const hadleClick = (id) => {};
  return (
    <Sidebar toggleNav={toggleNav} setToggleNav={setTogglNav}>
      {visibleNavItems.map((item) => (
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
