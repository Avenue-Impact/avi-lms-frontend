import AppLayout from "@/layouts/AppLayout";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";

export const appRoute = {
  path: "/",
  element: AppLayout,
  children: [
    {
      index: true,
      element: Home,
    },
    {
      path: "/about",
      element: About,
    },
    {
      path: "/contact",
      element: Contact,
    },
  ],
};