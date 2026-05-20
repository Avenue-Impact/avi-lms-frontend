import { HeroSection } from "./components/hero";
import { ImpactProcessSection } from "./components/impactProcess";
import { ProfessionalsSection } from "./components/professional";
import { EmpowermentSection } from "./components/empowerment";
import { IndustriesSection } from "./components/industries";
import { ConnectSection } from "./components/connect";
import { AboutSection } from "./components/about";
import SEOHead from "@/Components/SEOHead";

export default function Dashbaord() {
  return (
    <main className="min-h-screen max-sm:pt-6 ">
      <SEOHead
        title="Avenue Impact | Digital Transformation & IT Training"
        description="Empower your career and business with Avenue Impact. Expert IT training in business analysis, data analytics, cloud computing, and digital transformation consulting."
        canonical="https://avenueimpact.com/"
      />
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
