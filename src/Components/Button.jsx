import { useNavigate } from "react-router-dom";
import arrow from "../assets/images/arrow-up.png";

const Button = ({ children }) => {
	const navigate = useNavigate();
	return (
		<button
			className="border border-white rounded-xl text-base cursor-pointer bg-transparent justify-self-start lg:justify-self-end text-white py-2 px-2 flex gap-2 h-24 font-light w-auto capitalize"
			onClick={() => navigate("/contact")}>
			<span className="self-end text-xl "> {children}</span>
			<img src={arrow} alt="" className="w-[20%] self-start" />
		</button>
	);
};

export default Button;
