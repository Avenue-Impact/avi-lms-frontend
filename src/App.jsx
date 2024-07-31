// import Home from './Components/pages/Home'; // Ensure these components exist
// import About from './Components/pages/About';
// import Contact from './Components/pages/Contact';

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DigitalTransformation from "./pages/DigitalTransformation";
import DataSolution from "./pages/DataSolution";
import AvenueImpactDevelopment from "./pages/AvenueImpactDevelopment";
import AVI from "./pages/AVI";
import PreviewCourse from "./pages/previewCourse";
import Component from "./Components/Component";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import DashboardLayout from "./layouts/DashboardLayout";
import EmptyPage from "./pages/dashboard/EmptyPage";
import Notification from "./pages/dashboard/Notification";
import Wishlist from "./pages/dashboard/Wishlist";

import StudentSettings from "./pages/dashboard/StudentSettings";
import Referral from "./pages/dashboard/Referral";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/preview-course",
      element: <PreviewCourse />,
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/digital-transformation",
          element: <DigitalTransformation />,
        },
        {
          path: "/data-solution",
          element: <DataSolution />,
        },
        {
          path: "/avenue-impact-development",
          element: <AvenueImpactDevelopment />,
        },
        {
          path: "/components",
          element: <Component />,
        },
      ],
    },
    {
      path: "/AVI",
      element: <AVI />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <EmptyPage />,
        },
        {
          path: "notification",
          element: <Notification />,
        },
        {
          path: "wishlists",
          element: <Wishlist />,
        },
        {

          path: "referral",
          element: <Referral />,

        },
        {
          path: "student-settings",
          element: <StudentSettings />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
