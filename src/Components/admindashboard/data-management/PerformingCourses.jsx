import { useFetchTopCourses } from "@/hooks/data-management/use-fetch-top-courses";
const performingCourses = [
  {
    title: "Project Consultant Training Programme (Bundle)",
    numberOfStudent: "121,799 ",
  },
  {
    title: "Agile and Digital Business Analysis ",
    numberOfStudent: "66,734 ",
  },
  {
    title: "Digital Transformation Solutions",
    numberOfStudent: "21,567 ",
  },
  {
    title: "Product Management",
    numberOfStudent: "11,387 ",
  },
  {
    title: "Artificial Intelligence",
    numberOfStudent: "7,387 ",
  },
];
export const PerformingCourses = () => {
  const { isLoading, data, error } = useFetchTopCourses();
  const colors = ["#FFC6D5", "#FF5A85", "#A3032D", "#CC1747", "#F53366"];

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;

  return (
    <>
      {data?.data?.data?.map((course, i) => {
        return (
          <div
            className="grid grid-cols-[3fr_0.9fr] gap-2"
            key={course.course_id}
          >
            <div className="grid grid-cols-[0.2fr_5fr] items-center gap-1">
              <span
                className={`size-2 rounded-full`}
                style={{
                  backgroundColor: `${colors[i % colors.length]}`,
                }}
              />
              <p className="text-sm text-[#667185]">{course.course_title}</p>
            </div>
            <p className="text-sm font-medium text-[#101928]">
              <span>{course.number_of_students} </span>
              <span>Students</span>
            </p>
          </div>
        );
      })}
    </>
  );
};
