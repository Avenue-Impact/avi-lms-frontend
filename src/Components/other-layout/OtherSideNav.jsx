import React from "react";
import { ClosedSidnav, SidebarItem } from "./ClosedSidbar";
import { navItem } from "../dashboard/DashboardSideNav";

const OtherSideNav = () => {
  const handleClick = (id) => {
    console.log(id);
  };
  return (
    <>
      <ClosedSidnav>
        {navItem.map((item) => (
          <SidebarItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            path={item.path}
            onClick={() => handleClick(item.id)}
            active={item.active}
          />
        ))}
      </ClosedSidnav>
    </>
  );
};

export default OtherSideNav;
