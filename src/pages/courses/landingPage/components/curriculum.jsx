import Card, { CardContent } from "@/Components/ui/card"
import { ArrowRight } from "lucide-react"
import { useState } from "react";

const timeSchedules = [
  {
    week: 1,
    title: "Project Management Fundamentals",
    topics: "Introduction to PM, Project lifecycle, Stakeholder management",
    image: "project management fundamentals introduction professional training",
  },
  {
    week: 2,
    title: "Project Planning & Scope Management",
    topics: "WBS creation, Scope definition, Requirements gathering",
    image: "project planning scope management work breakdown structure",
  },
  {
    week: 3,
    title: "Time & Schedule Management",
    topics: "Activity sequencing, Critical path method, Schedule optimization",
    image: "time schedule management gantt chart project timeline",
  },
  {
    week: 4,
    title: "Cost Management & Budgeting",
    topics: "Cost estimation, Budget planning, Earned value management",
    image: "cost management budgeting financial planning project",
  },
  {
    week: 5,
    title: "Quality & Risk Management",
    topics: "Quality planning, Risk identification, Mitigation strategies",
    image: "quality risk management assessment mitigation strategies",
  },
  {
    week: 6,
    title: "Team Leadership & Communication",
    topics: "Team building, Conflict resolution, Stakeholder communication",
    image: "team leadership communication collaboration professional",
  },
  {
    week: 7,
    title: "Project Execution & Monitoring",
    topics: "Performance tracking, Change management, Status reporting",
    image: "project execution monitoring performance tracking dashboard",
  },
  {
    week: 8,
    title: "Project Closure & Lessons Learned",
    topics: "Project closure, Documentation, Continuous improvement",
    image: "project closure lessons learned documentation improvement",
  },
]

export default function Curriculum() {
  const [hoveredWeek, setHoveredWeek] = useState(null);
    return (
      <section id="course-outline" className="py-16 ">
        <div className=" sm:w-[85%] w-[90%] mx-auto ">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Training Schedule</h2>
            <p className="text-lg text-muted-foreground">
              8-week comprehensive curriculum with hands-on projects and real-world case studies
            </p>
          </div>

          <div className="max-sm:space-y-4 grid lg:grid-cols-2 sm:gap-12 gap-4 items-center">
            {timeSchedules?.map((item) => (
              <Card
                key={item.week}
                className={`border-border transition-all duration-300 cursor-pointer ${
                  hoveredWeek === item.week
                    ? "shadow-xl -translate-y-1 border-primary/50"
                    : "hover:shadow-md hover:-translate-y-0.5"
                }`}
                onMouseEnter={() => setHoveredWeek(item.week)}
                onMouseLeave={() => setHoveredWeek(null)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div
                        className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          hoveredWeek === item.week ? "bg-primary-color-600 scale-110" : "bg-primary-color-600/20"
                        }`}
                      >
                        <span
                          className={`font-bold transition-colors duration-300 ${
                            hoveredWeek === item.week ? "text-white" : "text-primary-color-600"
                          }`}
                        >
                          {item.week}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        {item.title}
                        {hoveredWeek === item.week && <ArrowRight className="w-4 h-4 text-primary animate-pulse" />}
                      </h3>
                      <p className="text-muted-foreground">{item.topics}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
}