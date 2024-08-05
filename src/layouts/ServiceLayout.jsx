import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

function ServiceLayout() {
  return (
    <main>
      <div className="font-poppins">
        <ScrollRestoration />
        <Navbar />
        <Outlet />
        <Footer
          heading={"Transform Your Business Today"}
          description={
            "Embark on a transformative journey with Avenue Impact Consulting. Our Digital Transformation Services are designed to not only keep you ahead in the digital race but to empower your organization to lead. Contact us today to initiate your digital transformation journey."
          }
        />
      </div>
    </main>
  );
}

export default ServiceLayout;
