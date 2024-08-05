import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer";

const AppLayout = () => {
  return (
    <div className="font-poppins">
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer
        heading={"Interested in a Free Introductory Call?"}
        description={
          "   Please provide your email address. During this call, we will discuss your business requirements and goals, and determine how we can support you in reaching your objectives"
        }
      />
    </div>
  );
};

export default AppLayout;
