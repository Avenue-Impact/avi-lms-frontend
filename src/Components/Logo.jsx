import whiteLogo from "../assets/logo/logo_white.png";
import darkLogo from "../assets/logo/logo.svg";
export const WhiteLogo = ({ className }) => {
  return (
    <img src={whiteLogo} alt="" className={`${className} cursor-pointer`} />
  );
};

export const DarkLogo = ({ className }) => {
  return (
    <img src={darkLogo} alt="" className={`${className}  lg:w-[200px] lg:h-[50.55px] w-[155.05px] h-[44.45px]  w cursor-pointer`} />
  );
};
