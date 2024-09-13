import { useContext } from "react";
import { MobileSlideNav } from "./DashboardSliderNav";
import { MobileContent } from "./MobileContent";
import { DocumentContext } from "@/pages/dashboard/ShareDocument";

function LiveSession() {
  return (
    <div className="mb-6">
      <div className="border-b border-b-[#E4E7EC] pb-4">
        <p className="mb-10 font-poppins text-lg font-medium capitalize text-tertiary-color-900 lg:text-xl">
          Section 1
        </p>
        <p className="text-sm font-medium text-[#344054]">Join Live Session</p>
      </div>
      <section className="mt-7 px-5 md:mt-10 md:px-10 lg:mt-16">
        <h2 className="text-xl font-medium text-black md:text-2xl">
          Join Business Analysis Live Session
        </h2>
        <p className="my-5 text-lg font-[275] leading-[38.4px] text-tertiary-color-700 md:text-[2rem] lg:my-8">
          Business Analysis Agile Project Management Software Testing May 2024
        </p>
        <div className="space-y-3">
          <p className="text-sm font-light text-tertiary-color-900 lg:text-xl">
            Started from: May 21, 2024 6:00 pm UTC
          </p>
          <p className="text-sm font-light text-tertiary-color-900 lg:text-xl">
            Meeting date: June 13, 2024 6:00 pm UTC
          </p>
          <p className="text-sm font-light text-tertiary-color-900 lg:text-xl">
            Add to: iCal Expor, Google Calendar
          </p>
          <p className="text-sm font-light text-tertiary-color-900 lg:text-xl">
            Password: D5ViQXzB
          </p>
        </div>
        <button className="mt-5 rounded-md bg-tertiary-color-700 px-4 py-2 text-sm text-[#C7D7F4] hover:bg-[#C7D7F4] hover:text-tertiary-color-700 md:text-base lg:mt-8">
          Meeting hasn’t started yet
        </button>
      </section>
      <div className="lg:hidden">
        <MobileSlideNav />
      </div>
      <div className="lg:hidden">
        <MobileContent />
      </div>
    </div>
  );
}

export default LiveSession;
