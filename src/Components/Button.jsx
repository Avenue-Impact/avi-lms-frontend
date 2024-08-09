/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import arrow from "../assets/images/arrow-up.png";
import { cn } from "@/lib/utils";

const Button = ({ children, className, type = "button", hover = false }) => {
  const navigate = useNavigate();
  return (
    <button
      className={cn(
        "group relative flex h-24 cursor-pointer justify-between gap-2 justify-self-start rounded-xl border border-white bg-transparent px-2 py-2 text-sm font-light capitalize text-white transition-colors duration-200 lg:justify-self-end 2xl:text-nowrap 2xl:px-5 2xl:text-xl",
        className,
        hover ? "hover:bg-white hover:text-primary-color-600" : "",
      )}
      onClick={() => navigate("/contact")}
      type={type}
    >
      <span className="self-end text-xl"> {children}</span>
      <span className="transition-colors duration-1000 2xl:w-[36px]">
        {/* <img src={arrow} alt="" className="self-start" /> */}
        <svg
          width="39"
          height="35"
          viewBox="0 0 39 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            hover ? "group-hover:*:stroke-primary-color-600" : "",
            "",
          )}
        >
          <path
            d="M2.09654 32.5991L37.3002 5.32015M37.3002 5.32015C32.5269 9.019 25.1994 19.2807 34.0766 30.7368M37.3002 5.32015C32.3727 8.82011 20.3909 13.0753 11.8836 2.09654"
            stroke="white"
            strokeWidth="4"
          />
        </svg>
      </span>
    </button>
  );
};

export default Button;
