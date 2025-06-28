import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

function CourseLayout() {
  return (
    <main>
      <div className="font-poppins">
        <ScrollRestoration />
        <Outlet />
      </div>
    </main>
  );
}

export default CourseLayout;
