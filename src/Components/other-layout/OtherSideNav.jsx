import { ClosedSidnav, SidebarItem } from "./ClosedSidbar";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const OtherSideNav = ({ setIsQuestionDrawerOpen }) => {
  return (
    <>
      <ClosedSidnav>
        <li className="my-1 flex cursor-pointer flex-col items-center justify-center p-3 text-gray-500 hover:text-primary-color-600">
          <span className="text-2xl text-primary-color-600 mb-1">
            <HiOutlineSquares2X2 />
          </span>
          <span className="text-[10px] font-medium text-black">Menu</span>
        </li>
        <li 
          className="my-1 flex cursor-pointer flex-col items-center justify-center p-3 text-gray-500 hover:text-primary-color-600"
          onClick={() => setIsQuestionDrawerOpen(true)}
        >
          <span className="text-2xl text-primary-color-600 mb-1">
            <AiOutlineQuestionCircle />
          </span>
          <span className="text-[10px] font-medium text-black">Question</span>
        </li>
      </ClosedSidnav>
    </>
  );
};

export default OtherSideNav;
