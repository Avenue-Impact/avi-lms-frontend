import { useContext } from "react";
import DashboardSliderNav, { MobileSlideNav } from "./DashboardSliderNav";
import { DesktopContent, MobileContent } from "./MobileContent";
import liveSession from "../../assets/images/dashboard/live-session.png";
import { DocumentContext } from "@/pages/dashboard/ShareDocument";

function CourseVideoSection() {
  const { sectionDetails } = useContext(DocumentContext);
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
        <DashboardSliderNav />
      </div>
      <div className="lg:hidden">
        <MobileSlideNav />
      </div>
      <div className="hidden lg:block">
        <DesktopContent />
      </div>
      <div className="lg:hidden">
        <MobileContent />
      </div>
    </section>
  );
}

export default CourseVideoSection;
