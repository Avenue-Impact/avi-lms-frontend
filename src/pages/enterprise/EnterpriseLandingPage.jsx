import React, { useState } from "react";
import SEOHead from "@/Components/SEOHead";
import EnterpriseNavbar from "./components/EnterpriseNavbar";
import EnterpriseHero from "./components/EnterpriseHero";
import EnterpriseSubNav from "./components/EnterpriseSubNav";
import EnterpriseProblemSection from "./components/EnterpriseProblemSection";
import EnterpriseSupportSection from "./components/EnterpriseSupportSection";
import EnterpriseResultsSection from "./components/EnterpriseResultsSection";
import EnterpriseProcessSection from "./components/EnterpriseProcessSection";
import EnterpriseSectorsSection from "./components/EnterpriseSectorsSection";
import EnterpriseGlobalSection from "./components/EnterpriseGlobalSection";
import EnterpriseLeadershipSection from "./components/EnterpriseLeadershipSection";
import EnterpriseCtaBanner from "./components/EnterpriseCtaBanner";
import EnterpriseModal from "./components/EnterpriseModal";
import AVIFooter from "@/Components/AVIFooter";

export const EnterpriseLandingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen bg-[#0A1430] w-full overflow-x-hidden font-inter text-[#0A1430]">
      <SEOHead
        title="Enterprise Talent & Delivery Solutions | Avenue Impact"
        description="Transform your workforce, deliver change, and access global technical capability with Avenue Impact's dedicated delivery teams and CPD-accredited talent pipelines."
      />

      {/* Navigation Header */}
      <EnterpriseNavbar onOpenModal={handleOpenModal} />

      {/* Hero Section */}
      <EnterpriseHero onOpenModal={handleOpenModal} />

      {/* Sticky Quick-Jump Sub-Nav */}
      <EnterpriseSubNav />

      {/* Main Content Sections */}
      <main className="bg-white">
        {/* Section 1: The Delivery Challenge */}
        <EnterpriseProblemSection onOpenModal={handleOpenModal} />

        {/* Section 2: How We Can Support Your Organisation */}
        <EnterpriseSupportSection onOpenModal={handleOpenModal} />

        {/* Section 3: Results, Not Promises (Case Studies) */}
        <EnterpriseResultsSection onOpenModal={handleOpenModal} />

        {/* Section 4: A Clear, Accountable Process */}
        <EnterpriseProcessSection />

        {/* Section 5: Built for Organisations Navigating Change */}
        <EnterpriseSectorsSection />

        {/* Section 6: Global Capability, Built on Quality — Not Cost */}
        <EnterpriseGlobalSection />

        {/* Section 7: Led by Experience, Built for Impact */}
        <EnterpriseLeadershipSection onOpenModal={handleOpenModal} />

        {/* Section 8: Ready to talk about your delivery needs? */}
        <EnterpriseCtaBanner onOpenModal={handleOpenModal} />
      </main>

      {/* Footer */}
      <AVIFooter theme="dark" />

      {/* Delivery Inquiry Modal */}
      <EnterpriseModal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default EnterpriseLandingPage;
