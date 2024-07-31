import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer";

const AppLayout = () => {
	return (
		<div className="font-poppins">
			<ScrollRestoration />
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};

export default AppLayout;
