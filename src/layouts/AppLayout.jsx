import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { Footer } from "@/Components/footer";
import FloatingWhatsApp from "@/Components/FloatingWhatsApp";

const AppLayout = () => {
  return (
    <div className="font-poppins">
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default AppLayout;
