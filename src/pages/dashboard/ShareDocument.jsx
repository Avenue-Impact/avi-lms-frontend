import { Outlet } from "react-router-dom";
import liveSession from "../../assets/images/dashboard/live-session.png";
import CourseSection from "@/Components/dashboard/CourseSection";

import DashboardSliderNav, {
  MobileSlideNave,
} from "@/Components/dashboard/DashboardSliderNav";
import { useState } from "react";
import MobileContent from "@/Components/dashboard/MobileContent";
function ShareDocument() {
  const [comp, setcomp] = useState("course sections");

  return (
    <div className="gap-4 bg-[#FDFDFD] lg:grid lg:grid-cols-[2.8fr_1fr]">
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
        <h1 className="my-6 text-2xl font-semibold leading-[28px] text-black *:block">
          <span>Section 2</span>
          <span> Introduction to Project Consulting Recordings </span>
        </h1>
        <div className="hidden lg:block">
          <DashboardSliderNav />
        </div>
        <div className="lg:hidden">
          <MobileSlideNave active={comp} setactive={setcomp} />
        </div>
        <div className="hidden lg:block">
          <Outlet />
        </div>
        <div className="lg:hidden">
          <MobileContent name={comp} />
        </div>
      </section>
      <aside className="hidden rounded-[12px] border border-[#E4E7EC] bg-white px-4 py-6 lg:block">
        <CourseSection />
      </aside>
    </div>
  );
}

export default ShareDocument;
