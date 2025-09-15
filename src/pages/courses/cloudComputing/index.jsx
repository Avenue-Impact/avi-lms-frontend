import { Hero } from "./components/hero";
import { Benefits } from "./components/benefits";
import { Testimonials } from "./components/testimonials";
import { CloudModules } from "./components/cloudModules";
import { ProgramOverview } from "./components/programOverview";
import { CourseOverview } from "./components/courseOverview";
import { RegistrationForm } from "./components/registrationForm";

export default function CloudComputing() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CourseOverview />
      <CloudModules />
      <ProgramOverview />
      <Benefits />
      <Testimonials />
      <RegistrationForm />
    </main>
  )
}