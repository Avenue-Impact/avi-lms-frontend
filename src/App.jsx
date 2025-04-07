import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import AppLayout from "./layouts/AppLayout";
import About from "./pages/About";
import AvenueImpactDevelopment from "./pages/AvenueImpactDevelopment";
import AVI from "./pages/AVI";
import Contact from "./pages/Contact";
import DataSolution from "./pages/DataSolution";
import DigitalTransformation from "./pages/DigitalTransformation";
import Home from "./pages/Home";
// import PreviewCourse from "./pages/PreviewCourse";
import Component from "./Components/Component";
import DashboardLayout from "./layouts/DashboardLayout";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import EmptyPage from "./pages/dashboard/EmptyPage";
import Notification from "./pages/dashboard/Notification";
import Wishlist from "./pages/dashboard/Wishlist";

import AdminLayout from "./layouts/AdminLayout";
import OtherLayout from "./layouts/OtherLayout";
import Assignment from "./pages/dashboard/Assignment";
import Documents from "./pages/dashboard/Documents";
import Overview from "./pages/dashboard/Overview";
import Referral from "./pages/dashboard/Referral";
import ShareDocument from "./pages/dashboard/ShareDocument";
import StudentSettings from "./pages/dashboard/StudentSettings";

import DashboardDiscover from "./pages/dashboard/DashboardDiscover";
import EmptyGetCertificate from "./pages/dashboard/EmptyGetCertificate";
import EmptyJoinProjectTeam from "./pages/dashboard/EmptyJoinProjectTeam";
import GetCertificate from "./pages/dashboard/GetCertificate";
import JoinProjectTeam from "./pages/dashboard/JoinProjectTeam";
import LeaveRating from "./pages/dashboard/LeaveRating";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout";
import ServiceLayout from "./layouts/ServiceLayout";
import NewPassword from "./pages/auth/NewPassword";
import DiscoverCourses from "./pages/dashboard/DiscoverCourses";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AdminEmpty } from "./Components/admindashboard/AdminEmpty";
import AdminPayment from "./Components/admindashboard/AdminPayment";
import CourseCreation from "./Components/admindashboard/CourseCreation";
import AuthProtectedRoute from "./Components/AuthProtectedRoute";
import CoursesLayout from "./layouts/admin/CoursesLayout";
import FinancialLayout from "./layouts/admin/FinancialLayout";
import ProjectAreaLayout from "./layouts/admin/ProjectAreaLayout";
import AdminLogin from "./pages/admin-pages/AdminLogin";
import CreatedCourse from "./pages/admin-pages/course-management/CreatedCourse";
import EditCourse from "./pages/admin-pages/course-management/EditCourse";
import CourseManagement from "./pages/admin-pages/CourseManagement";
import CreateCoupon from "./pages/admin-pages/financial-aid/CreateCoupon";
import FinancialAidRequest from "./pages/admin-pages/financial-aid/FinancialAidRequest";
import General from "./pages/admin-pages/project-area/Genral";
import Groups from "./pages/admin-pages/project-area/Groups";
import ProjectArea from "./pages/admin-pages/project-area/ProjectArea";

import ViewDetails from "./Components/admindashboard/financial-aid/ViewDetails";

import CourseInfomation from "./pages/admin-pages/course-management/CourseInfomation";

import AdminCertificateLayout from "./layouts/admin/AdminCertificateLayout";
import AffiliateLayout from "./layouts/admin/AffiliateLayout";
import ReferralsAdmin from "./pages/admin-pages/affiliate/ReferralsAdmin";
import WithdrawalRequest from "./pages/admin-pages/affiliate/WithdrawalRequest";
import CertificateIssueHistory from "./pages/admin-pages/certificate/CertificateIssueHistory";
import CertificateMainPage from "./pages/admin-pages/certificate/CertificateMainPage";

import AccountManagLayout from "./layouts/admin/AccountManagLayout";
import AccountMagament from "./pages/admin-pages/account-managemnet/AccountMagament";

import CourseWorkAreaLayout from "./layouts/admin/CourseWorkAreaLayout";
import CourseWorkArea from "./pages/admin-pages/course-work-area/CourseWorkArea";
import CourseWorkAreaDocument from "./pages/admin-pages/course-work-area/CourseWorkAreaDocument";
import CourseWorkAssignment from "./pages/admin-pages/course-work-area/CourseWorkAssignment";
import CourseWorkShareDocs from "./pages/admin-pages/course-work-area/CourseWorkShareDocs";
import AllStudent from "./pages/admin-pages/data-management/AllStudent";
import DashboardAnalytics from "./pages/admin-pages/data-management/DashboardAnalytics";
import DataCourseManagement from "./pages/admin-pages/data-management/DataCourseManagement";
import DataManagementPage from "./pages/admin-pages/data-management/DataManagementPage";
// import PreviewVideoCourse from "./pages/PreviewVideoCourse";
import EditGroupPage from "./Components/admindashboard/project-area/EditGroupPage";
import GroupDetails from "./Components/admindashboard/project-area/GroupDetails";
import PreviewCourse from "./pages/previewCourse";
import PreviewVideoCourse from "./pages/previewVideoCourse";
import ZoomMeeting from "./pages/admin-pages/meeting/ZoomMeeting";
import AdminMeeting from "./pages/admin-pages/meeting/AdminMeeting";
import UserJoinMeeting from "./pages/dashboard/UserJoinMeeting";
import AdminConfirmationRole from "./pages/admin-pages/account-managemnet/AdminConfirmationRole";
import StudentDetails from "./pages/admin-pages/data-management/StudentDetails";

import ReviewLayout from "./layouts/admin/ReviewsLayout";
import Review from "./pages/admin-pages/reviews/Review";
import NotificationLayout from "./layouts/admin/NotificationLayout";
import Notifications from "./pages/admin-pages/notification/Notifications";
import ReviewDetails from "./pages/admin-pages/reviews/ReviewInfo";
import ReviewMainPage from "./pages/admin-pages/reviews/ReviewMainPage";

const queryClient = new QueryClient();

function App() {
  const [userInfo, setUserInfo] = useState({});

  const routes = createBrowserRouter([
    {
      path: "/preview-course/:courseId",
      element: <PreviewCourse />,
    },
    {
      path: "/preview-video-course/:courseId/enroll",
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

      children: [
        {
          path: "/user/meeting/:courseId",
          element: <UserJoinMeeting />,
        },
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
              path: "/dashboard/:courseId",
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
              path: ":courseId/certificate",
              element: <GetCertificate />,
            },
            {
              path: ":courseId/projects",
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
          element: <AdminMeeting />,
          path: "meeting/:courseId",
        },
        {
          element: <AdminLayout />,
          path: "/admin",
          children: [
            {
              path: "/admin/dashboard",
              element: <AdminEmpty />,
            },

            // Project Area
            {
              element: <ProjectAreaLayout />,
              path: "project-area",
              children: [
                {
                  index: true,
                  element: <ProjectArea />,
                },
                {
                  path: ":courseId/general",
                  element: <General />,
                },
                {
                  path: ":courseId/group",
                  element: <Groups />,
                  children: [
                    {
                      index: true,
                      element: <GroupDetails />,
                    },
                    {
                      path: ":groupId/edit-project-group",
                      element: <EditGroupPage />,
                    },
                  ],
                },
              ],
            },

            // Course Management
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
                      path: "preview/:courseId",
                      element: <EditCourse />,
                    },
                    {
                      path: "info/:courseId",
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

            // Account Management
            {
              element: <AccountManagLayout />,
              path: "account-management",

              children: [
                {
                  index: true,
                  element: <AccountMagament />,
                },
              ],
            },
            {
              element: <AdminConfirmationRole />,
              path: "set-admin-password/create-password",
            },

            // Fianancial Aid
            {
              path: "financial-aid",
              element: <FinancialLayout />,

              children: [
                {
                  index: true,
                  element: <CreateCoupon />,
                },
                {
                  path: "aid-request",
                  element: <FinancialAidRequest />,
                },
              ],
            },

            {
              path: "view-details/:id/:firstname/:lastname/:title/:email",
              element: <ViewDetails />,
            },

            {
              path: "/admin/payment",
              element: <AdminPayment />,
            },

            {
              element: <AffiliateLayout />,
              path: "affiliate",
              children: [
                {
                  index: true,
                  element: <ReferralsAdmin />,
                },
                {
                  path: "withdrawal-request",
                  element: <WithdrawalRequest />,
                },
              ],
            },

            {
              path: "course-work-area",
              element: <CourseWorkAreaLayout />,
              children: [
                {
                  index: true,
                  element: <CourseWorkArea />,
                },
                {
                  path: ":courseId/documents",
                  element: <CourseWorkAreaDocument />,
                },
              ],
            },
            {
              path: "data-management",
              element: <DataManagementPage />,
              children: [
                {
                  index: true,
                  element: <DashboardAnalytics />,
                },
                {
                  path: "course-management",
                  element: <DataCourseManagement />,
                },
                {
                  path: "all-student",
                  element: <AllStudent />,
                },
                // {
                //   path: "student-details/:studentId",
                //   element: <StudentDetails />,
                // },
              ],
            },

            // Certificate
            {
              element: <AdminCertificateLayout />,
              path: "certificate",
              children: [
                {
                  index: true,
                  element: <CertificateMainPage />,
                },
                {
                  path: "certificate-issue",
                  element: <CertificateIssueHistory />,
                },
              ],
            },

            // Review
            {
              element: <ReviewLayout />,
              path: "reviews",
              children: [
                {
                  index: true,
                  element: <ReviewMainPage />,
                },
                {
                  path: "review-details/:id/:courseTitle",
                  element: <ReviewDetails />,
                },
              ],
            },

            // Notification
            {
              element: <NotificationLayout />,
              path: "notification",
              children: [
                {
                  index: true,
                  element: <Notifications />,
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
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </>
  );
}

export default App;
