import React from "react";
import HeroSection from "./components/HeroSection";
import JourneySection from "./components/JourneySection";
import EcosystemSection from "./components/EcosystemSection";
import PathwaysSection from "./components/PathwaysSection";

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
    </main>
  );
};

export default IndividualLandingPage;
