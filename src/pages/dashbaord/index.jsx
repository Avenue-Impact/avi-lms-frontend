import { HeroSection } from "./components/hero";
import { ImpactProcessSection } from "./components/impactProcess";
import { ProfessionalsSection } from "./components/professional";
import { EmpowermentSection } from "./components/empowerment";
import { IndustriesSection } from "./components/industries";
import { ConnectSection } from "./components/connect";
import { AboutSection } from "./components/about";


export default function Dashbaord() {
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
      </div>
    </main>
  )
}
