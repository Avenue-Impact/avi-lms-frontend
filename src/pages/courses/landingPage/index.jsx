import { HeroSection } from "./components/hero";
import { WhatYouLearnSection } from "./components/whatYouLearn";
import { JourneySection } from "./components/journey";
import { TestimonialSection } from "./components/testimonial";
import { WhySection } from "./components/why";
import RegistrationFormContainer from "./components/regForm/container";
import CoursesNavbar from "./components/navbar";
import { Footer } from "@/Components/footer";
import CoursesCountdownTimer from "./components/countdown";
import Curriculum from "./components/curriculum";
import { useParams } from "react-router-dom";
import { usePreviewCourses } from "@/hooks/students/use-fetch-all-courses";
// import SignUp from "@/pages/auth/Signup";


import { ClipLoader } from "react-spinners";

export default function LandingPage() {
  const { courseId } = useParams();
  // Use real API if not demo, else use demo data
  const { previewCourse, isLoading, error } = usePreviewCourses(courseId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <ClipLoader size={50} color="#1a365d" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-500">Failed to load course information. Please try again.</p>
      </div>
    );
  }

  const courseDetails = previewCourse?.data?.data?.course;

  if (!courseDetails) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Course not found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen max-sm:pt-6 ">
      <CoursesNavbar />
      <div className="">
        <HeroSection 
        courseId={courseId}
        coverImage={courseDetails?.cover_image} 
        title={courseDetails?.title} 
        overview={courseDetails?.overview} 
        />
        <CoursesCountdownTimer />
        <WhySection 
        title={courseDetails?.title}
        />
        <WhatYouLearnSection 
        benefits={courseDetails?.benefits} 
        />
        <JourneySection />
        <Curriculum />
        <TestimonialSection reviews={courseDetails?.reviews} />
        <RegistrationFormContainer />
        {/* <SignUp /> */}
        <Footer />
      </div>
    </main>
  )
}
