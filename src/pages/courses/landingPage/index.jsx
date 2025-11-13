import { HeroSection } from "./components/hero";
import { WhatYouLearnSection } from "./components/whatYouLearn";
import { JourneySection } from "./components/journey";
import { TestimonialSection } from "./components/testimonial";
import { WhySection } from "./components/why";
import RegistrationFormContainer from "./components/regForm/container";
import CoursesNavbar from "./components/navbar";
import { Footer } from "@/Components/footer";


export default function LandingPage() {
  return (
    <main className="min-h-screen max-sm:pt-6 ">
      <CoursesNavbar />
      <div className="">
        <HeroSection />
        <WhySection />
        <WhatYouLearnSection />
        <JourneySection />
        <TestimonialSection />
        <RegistrationFormContainer />
        <Footer />
      </div>
    </main>
  )
}
