import { HeroSection } from "./components/hero";
import { ImpactProcessSection } from "./components/impactProcess";
import { ProfessionalsSection } from "./components/professional";
import { EmpowermentSection } from "./components/empowerment";
import { Footer } from "./components/footer";
import { IndustriesSection } from "./components/industries";
import { ConnectSection } from "./components/connect";
import { AboutSection } from "./components/about";


export default function NewDashbaord() {
  return (
    <main className="min-h-screen max-sm:pt-6 ">
      <div className="">
        <HeroSection />
        <EmpowermentSection />
        <ImpactProcessSection />
        <ProfessionalsSection />
        <IndustriesSection />
        <ConnectSection />
        <AboutSection    />
        <Footer />
      </div>
    </main>
  )
}
