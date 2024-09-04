import { CommonButton } from "@/Components/ui/button";
import CoursesRecordedSection from "../recoded-session/CoursesRecordedSection";

function PublishCourseSection() {
  return (
    <section className="rounded-md border-2 border-[#F0F2F5] p-12 pr-6">
      <h2 className="text-2xl font-medium text-[#344054]">Course Sections</h2>
      <div className="grid grid-cols-[2fr_1fr] gap-7">
        <div className="space-y-[47px]">
          <Section
            section={1}
            topic={
              "Business Analysis Agile Project Management Software Testing May 2024"
            }
          />
          <Section
            section={2}
            topic={
              "Business Analysis Agile Project Management Software Testing May 2024"
            }
          />
          <Section
            section={3}
            topic={
              "Business Analysis Agile Project Management Software Testing May 2024"
            }
          />
        </div>
        <CoursesRecordedSection />
      </div>
    </section>
  );
}

function Section({ section, topic }) {
  return (
    <div className="w-full max-w-[450px] pt-12">
      <h4 className="text-xl font-medium capitalize text-[#475367]">
        section {section}
      </h4>
      <p className="my-[14px] text-justify text-[#667185]">{topic}</p>
      <p className="text-[#667185]">
        <span>1.</span>
        Overview of Project Consulting Started from: May 21, 2024 6:00 PM UTC
        Meeting date: June 13, 2024 6:00 PM UTC
      </p>
      <CommonButton className="mt-[14px] w-full bg-[#98A2B3] font-semibold">
        Meeting hasn’t started yet
      </CommonButton>
    </div>
  );
}

export default PublishCourseSection;
