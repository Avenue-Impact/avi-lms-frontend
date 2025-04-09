import { navItem } from "../dashboard/DashboardSideNav";
import { ClosedSidnav, SidebarItem } from "./ClosedSidbar";

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
