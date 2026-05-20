import { Hero } from "./components/hero";
import { Benefits } from "./components/benefits";
import { Testimonials } from "./components/testimonials";
import { CloudModules } from "./components/cloudModules";
import { ProgramOverview } from "./components/programOverview";
import { CourseOverview } from "./components/courseOverview";
import { RegistrationForm } from "./components/registrationForm";
import SEOHead from "@/Components/SEOHead";

export default function CloudComputing() {
  return (
    <main className="min-h-screen">
      <SEOHead
        title="Cloud Computing Courses & Training | Avenue Impact"
        description="Master cloud computing with Avenue Impact. Gain hands-on experience in AWS, Azure, Google Cloud, and DevOps. Live interactive training classes."
        canonical="https://avenueimpact.com/courses/cloud-computing"
      />
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