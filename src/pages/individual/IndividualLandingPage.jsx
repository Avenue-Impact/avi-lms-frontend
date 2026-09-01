import React from "react";
import HeroSection from "./components/HeroSection";
import JourneySection from "./components/JourneySection";
import EcosystemSection from "./components/EcosystemSection";
import PathwaysSection from "./components/PathwaysSection";
import WhyAvenueImpactSection from "./components/WhyAvenueImpactSection";
import SuccessStoriesSection from "./components/SuccessStoriesSection";
import CtaSection from "./components/CtaSection";
import AVIFooter from "../../Components/AVIFooter";

const IndividualLandingPage = () => {
  return (
    <main className="min-h-screen bg-[#EFF1F8] w-full overflow-x-hidden">
      {/* Section 1: Hero Section */}
      <HeroSection />

      {/* Section 2: Journey & Award Section */}
      <JourneySection />

      {/* Section 3: Ecosystem (Four products. One journey.) */}
      <EcosystemSection />

      {/* Section 4: Pathways & Start Dates */}
      <PathwaysSection />

      {/* Section 5: Why Avenue Impact */}
      <WhyAvenueImpactSection />

      {/* Section 6: Success Stories (Real transformations) */}
      <SuccessStoriesSection />

      {/* Section 7: Final CTA Banner */}
      <CtaSection />

      {/* Footer (Light theme) */}
      <AVIFooter theme="light" />
    </main>
  );
};

export default IndividualLandingPage;



