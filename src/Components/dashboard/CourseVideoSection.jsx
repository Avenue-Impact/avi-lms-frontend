import { useState } from "react";
import DashboardSliderNav, { MobileSlideNav } from "./DashboardSliderNav";
import { DesktopContent, MobileContent } from "./MobileContent";
import liveSession from "../../assets/images/dashboard/live-session.png";

function CourseVideoSection({
  sectionDetails,
  setSession,
  setSectionDetails,
  sections,
  setSections,
}) {
  return (
    <section>
      <div className="overflow-hidden rounded-[10px] lg:h-[400px] lg:w-[700px]">
        <img
          src={liveSession}
          alt="live session"
          width={897}
          height={532}
          className="object-cover"
        />
      </div>
      <h1 className="my-6 text-2xl font-semibold leading-[28px] text-black *:block *:capitalize">
        <span>{sectionDetails.section}</span>
        <span> {sectionDetails.topic} </span>
      </h1>
      <div className="hidden lg:block">
        <DashboardSliderNav
          desktopSection={sections.desktop}
          setDesktopSection={setSections}
        />
      </div>
      <div className="lg:hidden">
        <MobileSlideNav active={sections.mobile} setactive={setSections} />
      </div>
      <div className="hidden lg:block">
        <DesktopContent section={sections.desktop} />
      </div>
      <div className="lg:hidden">
        <MobileContent
          name={sections.mobile}
          setSession={setSession}
          setSectionDetails={setSectionDetails}
        />
      </div>
    </section>
  );
}

export default CourseVideoSection;
