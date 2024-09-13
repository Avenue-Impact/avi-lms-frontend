import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DigitalTransformation from "./pages/DigitalTransformation";
import DataSolution from "./pages/DataSolution";
import AvenueImpactDevelopment from "./pages/AvenueImpactDevelopment";
import AVI from "./pages/AVI";
import PreviewCourse from "./pages/previewCourse";
import PreviewVideoCourse from "./pages/previewVideoCourse";
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
import OtherLayout from "./layouts/OtherLayout";
import AdminLayout from "./layouts/AdminLayout";
import ShareDocument from "./pages/dashboard/ShareDocument";
import Documents from "./pages/dashboard/Documents";
import Assignment from "./pages/dashboard/Assignment";
import Overview from "./pages/dashboard/Overview";

import DashboardDiscover from "./pages/dashboard/DashboardDiscover";
import JoinProjectTeam from "./pages/dashboard/JoinProjectTeam";
import EmptyJoinProjectTeam from "./pages/dashboard/EmptyJoinProjectTeam";
import EmptyGetCertificate from "./pages/dashboard/EmptyGetCertificate";
import GetCertificate from "./pages/dashboard/GetCertificate";
import LeaveRating from "./pages/dashboard/LeaveRating";

import ServiceLayout from "./layouts/ServiceLayout";
import NewPassword from "./pages/auth/NewPassword";
import DiscoverCourses from "./pages/dashboard/DiscoverCourses";
import AuthLayout from "./layouts/AuthLayout";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute";

import AuthProtectedRoute from "./Components/AuthProtectedRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AdminEmpty } from "./Components/admindashboard/AdminEmpty";
import CourseManagement from "./pages/admin-pages/CourseManagement";
import CourseCreation from "./Components/admindashboard/CourseCreation";
import CoursesLayout from "./layouts/admin/CoursesLayout";
import CreatedCourse from "./pages/admin-pages/course-management/CreatedCourse";
import EditCourse from "./pages/admin-pages/course-management/EditCourse";
import AdminLogin from "./pages/admin-pages/AdminLogin";
import AdminPayment from "./Components/admindashboard/AdminPayment";
import ProjectArea from "./pages/admin-pages/project-area/ProjectArea";
import ProjectAreaLayout from "./layouts/admin/ProjectAreaLayout";
import General from "./pages/admin-pages/project-area/Genral";
import Groups from "./pages/admin-pages/project-area/Groups";
import CourseProjectArea from "./Components/admindashboard/project-area/CourseProjectArea";
import CourseTools from "./Components/admindashboard/project-area/CourseTools";
import FinancialLayout from "./layouts/admin/FinancialLayout";
import CreateCoupon from "./pages/admin-pages/financial-aid/CreateCoupon";
import FinancialAidRequest from "./pages/admin-pages/financial-aid/FinancialAidRequest";

import ViewDetails from "./Components/admindashboard/financial-aid/ViewDetails";


import CourseInfomation from "./pages/admin-pages/course-management/CourseInfomation";


const queryClient = new QueryClient();

function App() {
  const [userInfo, setUserInfo] = useState({});

  const routes = createBrowserRouter([
    {
      path: "/preview-course",
      element: <PreviewCourse />,
    },
    {
      path: "/PreviewVideoCourse",
      element: <PreviewVideoCourse />,
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
      ],
    },

    {
      path: "/",
      element: <ServiceLayout />,
      children: [
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
      element: <AuthProtectedRoute tokin={"token"} path={"/dashboard"} />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          // loader: async () => {
          //   const token = Cookies.get("token");
          //   if (token) return (window.location.href = "/dashboard");
          // },
          children: [
            {
              path: "/AVI",
              element: <AVI />,
            },
            {
              path: "login",
              element: <Login setUserInfo={setUserInfo} userInfo={userInfo} />,
            },
            {
              path: "/signup",
              element: <SignUp />,
            },
            {
              path: "/new-password",
              element: <NewPassword />,
            },
            {
              path: "/forgot-password",
              element: <ForgotPassword />,
            },
          ],
        },
      ],
    },

    {
      path: "/discover-courses",
      element: <DiscoverCourses />,
    },
    {
      element: <ProtectedRoute tokin={"token"} path={"/login"} />,
      // loader: async () => {
      //   const token = Cookies.get("token");
      //   if (!token) return (window.location.href = "/login");
      // },
      children: [
        {
          path: "/dashboard",
          element: <DashboardLayout userInfo={userInfo} />,

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
            {
              path: "Dashboard_Discover",
              element: <DashboardDiscover />,
            },

            {
              path: "EmptyJoinProjectTeam",
              element: <EmptyJoinProjectTeam />,
            },
            {
              path: "EmptyGetCertificate",
              element: <EmptyGetCertificate />,
            },

            {
              path: "LeaveRating",
              element: <LeaveRating />,
            },
          ],
        },
        {
          element: <OtherLayout />,
          path: "/dashboard",
          children: [
            {
              element: <ShareDocument />,
              path: "/dashboard",
              children: [
                {
                  path: "share-documents",
                  element: <Documents />,
                },
                {
                  path: "assignments",
                  element: <Assignment />,
                },
                {
                  path: "overview",
                  element: <Overview />,
                },
              ],
            },
            {
              path: "certificate",
              element: <GetCertificate />,
            },
            {
              path: "projects",
              element: <JoinProjectTeam />,
            },
          ],
        },
      ],
    },
    //admin routes
    {
      element: (
        <AuthProtectedRoute tokin={"adminToken"} path={"/admin/dashboard"} />
      ),
      children: [
        {
          path: "admin/login",
          element: <AdminLogin />,
        },
      ],
    },
    {
      element: <ProtectedRoute tokin={"adminToken"} path={"/admin/login"} />,
      children: [
        {
          element: <AdminLayout />,
          path: "/admin",
          children: [
            {
              path: "/admin/dashboard",
              element: <AdminEmpty />,
            },
            {
              element: <CoursesLayout />,
              path: "course/management",

              children: [
                {
                  children: [
                    {
                      index: true,
                      element: <CourseManagement />,
                    },
                    {
                      path: "courses",
                      element: <CreatedCourse />,
                    },
                    {
                      path: "edit",
                      element: <EditCourse />,
                    },
                    {
                      path: "info",
                      element: <CourseInfomation />,
                    },
                  ],
                },
                {
                  path: "create-course",
                  element: <CourseCreation />,
                },
              ],
            },
            {
              path: "financial-aid",
              element: <FinancialLayout />,
                children: [
                  {
                    index: true,
                    element: <CreateCoupon/>
                  },
                  {
                    path: "aid-request",
                    element: <FinancialAidRequest/>
                  },
                  ],
            },

            {
              path: "view-details",
              element: <ViewDetails/>
            },
            
            {
              path: "/admin/payment",
              element: <AdminPayment/>
            },
          
            {
              element: <ProjectAreaLayout />,
              path: "project-area",
              children: [
                {
                  index: true,
                  element: <ProjectArea />,
                },
                {
                  path: ":id/general",
                  element: <General />,
                  children: [
                    {
                      index: true,
                      element: <CourseProjectArea />,
                    },
                    {
                      path: "course-tool",
                      element: <CourseTools />,
                    },
                  ],
                },
                {
                  path: ":id/group",
                  element: <Groups />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
        <RouterProvider router={routes} />;
      </QueryClientProvider>
    </>
  );
}

export default App;
