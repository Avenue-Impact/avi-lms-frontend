import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";

import AppLayout from "./layouts/AppLayout";
import About from "./pages/About";
import AvenueImpactDevelopment from "./pages/AvenueImpactDevelopment";
import AVI from "./pages/AVI";
import Partner from "./pages/Partner";
import SelfPace from "./pages/SelfPace";

import BusinessAnalysis from "./pages/courses/businessAnalysis";
import DataAnalytics from "./pages/courses/dataAnalytics";
import CloudComputing from "./pages/courses/cloudComputing";
import ProjectManagement from "./pages/courses/projectManagement";
import ThanksPage from "./pages/thanksPage";
import LandingPage from "./pages/courses/landingPage";

import Contact from "./pages/Contact";
// import BusinessAnalysis from "./pages/courses/businessAnalysis";
// import DataAnalytics from "./pages/courses/dataAnalytics";
import DataSolution from "./pages/DataSolution";
import DigitalTransformation from "./pages/DigitalTransformation";
import Feedback from "./pages/Feedback";
import BusinessInterestForm from "./pages/businessInterest/index";
// import Home from "./pages/Home";
// import ThanksPage from "./pages/thanksPage";

import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentCancel from "./pages/payment/PaymentCancel";

// import Feedback from "./pages/Feedback";

// import PreviewCourse from "./pages/PreviewCourse";
import Component from "./Components/Component";
import DashboardLayout from "./layouts/DashboardLayout";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import InstructorSignUp from "./pages/auth/InstructorSignUp";
import DashBoardHomePage from "./pages/dashboard/DashboardHomePage";
import UserNotification from "./pages/dashboard/UserNotification";
import Wishlist from "./pages/dashboard/Wishlist";

import AdminLayout from "./layouts/AdminLayout";
import OtherLayout from "./layouts/OtherLayout";
import CourseViewLayout from "./layouts/course-view-layout";
import LiveSessionView from "./pages/dashboard/live-session-view";
import RecordedSessionView from "./pages/dashboard/recorded-session-view";
import SampleCourseDetailDashboard from "./Components/dashboard/sample/dashbaord";
import Referral from "./pages/dashboard/Referral";
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
import CourseCreation from "./Components/admindashboard/CourseCreation";
import AuthProtectedRoute from "./Components/AuthProtectedRoute";
import CourseLayout from "./layouts/admin/courseLayout";
import CoursesLayout from "./layouts/admin/CoursesLayout";
import FinancialLayout from "./layouts/admin/FinancialLayout";
import ProjectAreaLayout from "./layouts/admin/ProjectAreaLayout";
import AdminLogin from "./pages/admin-pages/AdminLogin";
import AdminPayment from "./pages/admin-pages/AdminPayment";
import AdminBankTransfers from "./pages/admin-pages/AdminBankTransfers";
import CreatedCourse from "./pages/admin-pages/course-management/CreatedCourse";
import EditCourse from "./pages/admin-pages/course-management/EditCourse";
import CourseManagement from "./pages/admin-pages/CourseManagement";
import CreateCoupon from "./pages/admin-pages/financial-aid/CreateCoupon";
import FinancialAidRequest from "./pages/admin-pages/financial-aid/FinancialAidRequest";
import General from "./pages/admin-pages/project-area/Genral";
import Groups from "./pages/admin-pages/project-area/Groups";
import ProjectArea from "./pages/admin-pages/project-area/ProjectArea";

import ViewDetails from "./Components/admindashboard/financial-aid/ViewDetails";

import AdminMeeting from "./pages/admin-pages/meeting/AdminMeeting";
import CourseInfomation from "./pages/admin-pages/course-management/CourseInfomation";

import AdminCertificateLayout from "./layouts/admin/AdminCertificateLayout";
import AffiliateLayout from "./layouts/admin/AffiliateLayout";
import ReferralsAdmin from "./pages/admin-pages/affiliate/ReferralsAdmin";
import WithdrawalRequest from "./pages/admin-pages/affiliate/WithdrawalRequest";
import CertificateIssueHistory from "./pages/admin-pages/certificate/CertificateIssueHistory";
import CertificateMainPage from "./pages/admin-pages/certificate/CertificateMainPage";

import ZoomManagementLayout from "./layouts/admin/ZoomManagementLayout";
import AccountManagLayout from "./layouts/admin/AccountManagLayout";
import AccountMagament from "./pages/admin-pages/account-managemnet/AccountMagament";
import ZoomManagementPage from "./pages/admin-pages/zoom-management/ZoomManagementPage";

import CourseWorkAreaLayout from "./layouts/admin/CourseWorkAreaLayout";
import CourseWorkArea from "./pages/admin-pages/course-work-area/CourseWorkArea";
import CourseWorkAreaDocument from "./pages/admin-pages/course-work-area/CourseWorkAreaDocument";
import AllStudent from "./pages/admin-pages/data-management/AllStudent";
import EnrolledStudent from "./pages/admin-pages/data-management/EnrolledStudent";
import DashboardAnalytics from "./pages/admin-pages/data-management/DashboardAnalytics";
import DataCourseManagement from "./pages/admin-pages/data-management/DataCourseManagement";
import DataManagementPage from "./pages/admin-pages/data-management/DataManagementPage";
// import PreviewVideoCourse from "./pages/PreviewVideoCourse";
import EditGroupPage from "./Components/admindashboard/project-area/EditGroupPage";
import GroupDetails from "./Components/admindashboard/project-area/GroupDetails";
import AdminConfirmationRole from "./pages/admin-pages/account-managemnet/AdminConfirmationRole";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorLayout from "./layouts/InstructorLayout";
import CohortManagement from "./pages/instructor/CohortManagement";
import AssignmentManagement from "./pages/instructor/AssignmentManagement";
import SubmissionReview from "./pages/instructor/SubmissionReview";
import InstructorErrorPage from "./instructor-error-page";
import SubmissionsPage from "./pages/instructor/SubmissionsPage";
import MessagesPage, { FeedbackPage } from "./pages/instructor/MessagesAndFeedback";
import UserJoinMeeting from "./pages/dashboard/UserJoinMeeting";
import PreviewCourse from "./pages/previewCourse";
import PreviewVideoCourse from "./pages/previewVideoCourse";
import VideoManagement from "./pages/admin-pages/data-management/VideoManagement";

import AdminErrorPage from "./admin-error-page";
import DashboardErrorPage from "./dashboard-error-page";
import ErrorPage from "./error-page";
import NotificationLayout from "./layouts/admin/NotificationLayout";
import ReviewLayout from "./layouts/admin/ReviewsLayout";
import RootLayout from "./layouts/RootLayout";
import { homePageLoader } from "./loaders/student/home-page-loader";
import Notifications from "./pages/admin-pages/notification/Notifications";
import ReviewDetails from "./pages/admin-pages/reviews/ReviewInfo";
import ReviewMainPage from "./pages/admin-pages/reviews/ReviewMainPage";
import ZoomSetupPage from "./pages/docs/ZoomSetupPage";
import PlatformDocsPage from "./pages/docs/PlatformDocsPage";
import { elements } from "chart.js";
import Dashbaord from "./pages/dashbaord";
import LoadingPage from "./Components/LoadingPage";
import NotFoundPage from "./pages/NotFoundPage";
import InstructorLiveSessions from "./pages/instructor/InstructorLiveSessions";

const queryClient = new QueryClient();

function App() {
  const [userInfo, setUserInfo] = useState({});

  const routes = createBrowserRouter([
    {
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/preview-course/:courseId",
          element: <PreviewCourse />,
        },
        {
          path: "/preview-video-course/:courseId/enroll",
          element: <PreviewVideoCourse />,
        },
        {
          path: "/payment/success",
          element: <PaymentSuccess />,
        },
        {
          path: "/payment/cancel",
          element: <PaymentCancel />,
        },
        {
          path: "/",
          element: <AppLayout />,
          children: [
            // {
            //   path: "/home",
            //   element: <Home />,
            // },
            {
              index: true,
              element: <Dashbaord />,
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
              path: "/docs/zoom-setup",
              element: <ZoomSetupPage />,
            },
            {
              path: "/docs/platform",
              element: <PlatformDocsPage />,
            },
          ],
        },
        {
          path: "/feedback",
          element: <Feedback />,
        },
        {
          path: "/business-interest-form",
          element: <BusinessInterestForm />,
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
          path: "/courses",
          element: <CourseLayout />,
          children: [
            {
              path: "/courses/landing-page/c/:courseId",
              element: <LandingPage />,
            },
            {
              path: "/courses/business-analysis",
              element: <BusinessAnalysis />,
            },
            {
              path: "/courses/data-analytics",
              element: <DataAnalytics />,
            },
            {
              path: "/courses/cloud-computing",
              element: <CloudComputing />,
            },
            {
              path: "/courses/project-management",
              element: <ProjectManagement />,
            },
            {
              path: "/courses/thanks",
              element: <ThanksPage />,
            },
          ],
        },
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "/digital-learning-hub",
              element: <AVI />,
            },
            {
              path: "/partner",
              element: <Partner />,
            },
            {
              path: "/self-pace",
              element: <SelfPace />,
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
                  path: "login",
                  element: (
                    <Login setUserInfo={setUserInfo} userInfo={userInfo} />
                  ),
                },
                {
                  path: "/signup",
                  element: <SignUp />,
                },
                {
                  path: "/instructor/signup",
                  element: <InstructorSignUp />,
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
          element: <SampleCourseDetailDashboard />,
          path: "/dashboard-s/course-details",
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
              errorElement: <DashboardErrorPage />,

              children: [
                {
                  index: true,
                  element: <DashBoardHomePage />,
                  loader: homePageLoader(queryClient),
                  errorElement: <DashboardErrorPage />,
                },

                {
                  path: "notification",
                  element: <UserNotification />,
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
                  element: <CourseViewLayout />,
                  children: [
                    {
                      element: <LiveSessionView />,
                      path: "/dashboard/:courseId/live",
                    },
                    {
                      element: <RecordedSessionView />,
                      path: "/dashboard/:courseId/recorded",
                    },
                  ],
                },
                {
                  path: ":courseId/certificate",
                  element: <GetCertificate />,
                  loader: async ({ params }) => {
                    const { courseId } = params;
                    return `this is for certificate ${courseId}`;
                  },
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
            <AuthProtectedRoute
              tokin={"adminToken"}
              path={"admin/course/management"}
            />
          ),
          errorElement: <AdminErrorPage />,
          children: [
            {
              path: "admin/login",
              element: <AdminLogin />,
            },
          ],
        },
        {
          element: (
            <ProtectedRoute tokin={"adminToken"} path={"/admin/login"} />
          ),
          errorElement: <AdminErrorPage />,

          children: [
            {
              element: <AdminMeeting />,
              path: "meeting/:courseId",
            },
            {
              element: <AdminLayout />,
              path: "/admin",
              errorElement: <AdminErrorPage />,
              children: [
                // {
                //   path: "/admin/dashboard",
                //   element: <AdminEmpty />,
                // },

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

                // Zoom Management
                {
                  element: <ZoomManagementLayout />,
                  path: "zoom-management",
                  children: [
                    {
                      index: true,
                      element: <ZoomManagementPage />,
                    },
                  ],
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
                  path: "/admin/bank-transfers",
                  element: <AdminBankTransfers />,
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
                    {
                      path: "enrolled-student",
                      element: <EnrolledStudent />,
                    },
                    {
                      path: "videos",
                      element: <VideoManagement />,
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
                {
                  path: "*",
                  element: <AdminErrorPage />,
                },
              ],
            },
          ],
        },
        // instructor routes
        {
          element: <ProtectedRoute tokin={"token"} path={"/login"} requiredRole="Instructor" />,
          errorElement: <InstructorErrorPage />,
          children: [
            {
              element: <InstructorLayout />,
              path: "/instructor/",
              children: [
                {
                  path: "login",
                  element: <Navigate to="/login?_r=/instructor/dashboard" replace />,
                },
                {
                  path: "dashboard",
                  element: <InstructorDashboard />,
                },
                {
                  path: "cohorts",
                  element: <CohortManagement />,
                },
                {
                  path: "cohorts/:cohortId/assignments",
                  element: <AssignmentManagement />,
                },
                {
                  path: "assignments/:taskId/submissions",
                  element: <SubmissionReview />,
                },
                {
                  path: "submissions",
                  element: <SubmissionsPage />,
                },
                {
                  path: "live-sessions",
                  element: <InstructorLiveSessions />,
                },
                {
                  path: "messages",
                  element: <MessagesPage />,
                },
                {
                  path: "feedbacks",
                  element: <FeedbackPage />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
        {/* <AnniversarySpotlightBadge /> */}
        <RouterProvider router={routes} fallbackElement={<LoadingPage />} />
      </QueryClientProvider>
    </>
  );
}

export default App;
