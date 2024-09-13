import BorderCard from "@/Components/BorderCard";
import DashButton from "@/pages/auth/ButtonDash";
import { Link } from "react-router-dom";

const cohorts = [
  {
    id: "01",
    month: "May Cohort",
    year: "2024",
    created: "Created: 01/02/2023",
  },
  {
    id: "01",
    month: "April Cohort",
    year: "2024",
    created: "Created: 01/02/2023",
  },
  {
    id: "01",
    month: "October Cohort",
    year: "2024",
    created: "Created: 01/02/2023",
  },
  {
    id: "01",
    month: "January Cohort",
    year: "2024",
    created: "Created: 01/02/2023",
  },
];

const CourseCohortsPreview = () => {
  return (
    <div>
      {/* Live Session + Mentoring */}
      <BorderCard className="mb-4 mt-5 grid grid-cols-[1fr_2fr]">
        <div className="">
          <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
            Live Session + Mentoring
          </h3>
          <p>Add Course Cohort</p>

          <DashButton className="rounded px-4 py-2 text-white">
            Add Cohort
          </DashButton>
        </div>

        <div className="w-full max-w-[612px] space-y-4 justify-self-end">
          {cohorts.map((cohort) => (
            <Link
              to={`/admin/course/management/info?month=${cohort.month}&year=${cohort.year}`}
              key={cohort.id}
              className="block w-full rounded-lg border px-4 py-6 text-left hover:border-primary-color-600 hover:bg-[#FFEBF0]"
            >
              <span className="mb-3 block text-lg font-semibold text-tertiary-color-700">
                {`${cohort.month} ${cohort.year}`}
              </span>
              <span className="block text-xs text-primary-color-600">
                {cohort.created}
              </span>
            </Link>
          ))}
        </div>
      </BorderCard>
    </div>
  );
};

export default CourseCohortsPreview;
