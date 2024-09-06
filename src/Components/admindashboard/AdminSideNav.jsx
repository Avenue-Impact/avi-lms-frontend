import { SidebarItem } from "@/Components/dashboard/SideNav";
import {
  AccountIcon,
  AffiliateIcon,
  BellIcon,
  CertificateIcon,
  CourseIcon,
  DataIcon,
  FinancialIcon,
  HeartIcon,
  ManagementIcon,
  PaymentIcon,
  ProjectIcon,
} from "@/Components/Icon";
import { DarkLogo } from "@/Components/Logo";
import Cookies from "js-cookie";
import { GrHomeRounded } from "react-icons/gr";
import { useNavigation } from "react-router-dom";

// import { Sidebar, SidebarItem } from "./SideNav";
const navItem = [
  {
    id: 1,
    text: "Dashboard",

    icon: <GrHomeRounded />,

    active: true,
    alert: "alert",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    text: "Course Work Art",

    icon: <CourseIcon />,
    active: false,
    alert: "alert",
    path: "/admin/notification",
  },
  {
    id: 3,
    text: "Project Area",
    icon: <ProjectIcon />,
    path: "/admin/project-area",
  },
];

const navitem2 = [
  {
    id: 1,
    text: "course management",
    icon: <ManagementIcon />,
    path: "/admin/course/management",
  },
  {
    id: 2,
    text: "data management",
    icon: <DataIcon />,
    path: "/admin/data-management",
  },
  {
    id: 3,
    text: "account management",
    icon: <AccountIcon />,
    path: "/admin/account-management",
  },
];
const navitem3 = [
  {
    id: 1,
    text: "payment",
    icon: <PaymentIcon />,
    path: "/admin/payment",
  },
  {
    id: 2,
    text: "Affiliate",
    icon: <AffiliateIcon />,
    path: "/admin/affiliate",
  },
  {
    id: 3,
    text: "Financial Aid",
    icon: <FinancialIcon />,
    path: "/admin/financial-aid",
  },
  {
    id: 4,
    text: "Certificate",
    icon: <CertificateIcon />,
    path: "/admin/certificate",
  },
];

function AdminSideNav() {
  return (
    <SideNav>
      <div>
        {navItem.map((item) => {
          return (
            <SidebarItem
              key={item.text}
              text={item.text}
              icon={item.icon}
              path={item.path}
            />
          );
        })}
      </div>
      <div>
        {navitem2.map((item) => {
          return (
            <SidebarItem
              key={item.text}
              text={item.text}
              icon={item.icon}
              path={item.path}
            />
          );
        })}
      </div>
      <div className="border-b border-b-slate-200">
        {navitem3.map((item) => {
          return (
            <SidebarItem
              key={item.text}
              text={item.text}
              icon={item.icon}
              path={item.path}
            />
          );
        })}
      </div>
    </SideNav>
  );
}

function SideNav({ children }) {
  const handleSignOut = () => {
    Cookies.remove("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <aside className="baby fixed left-0 top-0 h-screen w-[249px] overflow-y-auto border-r border-r-[#E4E7EC] px-2 py-6 2xl:overflow-y-hidden">
      <div>
        <DarkLogo />
      </div>
      <div className="flex h-full flex-col justify-between">
        <ul className="my-5 *:border-b *:border-b-[#E4E7EC]">{children}</ul>
        <div className="divide-y">
          <ul>
            <SidebarItem text={"review"} icon={<HeartIcon />} />
            <SidebarItem text={"notification"} icon={<BellIcon />} />
          </ul>
          <div className="px-6 py-10">
            <button className="flex items-center gap-5" onClick={handleSignOut}>
              <span></span>
              <span>
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.24996 2.33268C5.7102 2.33268 6.08329 1.95959 6.08329 1.49935C6.08329 1.03911 5.7102 0.666016 5.24996 0.666016H3.99996C2.15901 0.666016 0.666626 2.1584 0.666626 3.99935V13.9993C0.666626 15.8403 2.15901 17.3327 3.99996 17.3327H5.24996C5.7102 17.3327 6.08329 16.9596 6.08329 16.4993C6.08329 16.0391 5.7102 15.666 5.24996 15.666H3.99996C3.07949 15.666 2.33329 14.9198 2.33329 13.9993L2.33329 3.99935C2.33329 3.07887 3.07949 2.33268 3.99996 2.33268H5.24996Z"
                    fill="#CC1747"
                  />
                  <path
                    d="M17.9225 9.5886C18.248 9.26317 18.248 8.73553 17.9225 8.41009L14.5892 5.07676C14.2638 4.75132 13.7361 4.75132 13.4107 5.07676C13.0853 5.4022 13.0853 5.92983 13.4107 6.25527L15.3214 8.16602L5.66663 8.16602C5.20639 8.16602 4.83329 8.53911 4.83329 8.99935C4.83329 9.45959 5.20639 9.83268 5.66663 9.83268L15.3214 9.83268L13.4107 11.7434C13.0853 12.0689 13.0853 12.5965 13.4107 12.9219C13.7361 13.2474 14.2638 13.2474 14.5892 12.9219L17.9225 9.5886Z"
                    fill="#CC1747"
                  />
                </svg>
              </span>
              <span className="text-xl capitalize text-primary-color-600">
                sign out
              </span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AdminSideNav;
