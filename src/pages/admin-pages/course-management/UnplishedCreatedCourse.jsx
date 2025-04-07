import UnpublishedCourseCard from "@/Components/admindashboard/course-management/UnpublishedCourseCard";
import { useUnpublishCourses } from "@/hooks/course-management/use-fetch-unpublish-course";
import { useUpdatePublishCourse } from "@/hooks/course-management/use-update-publish-course";
import { formatDate } from "@/lib/utils";
import React from "react";

const UnplishedCreatedCourse = () => {

  const { data, isLoading, error } = useUnpublishCourses();

  // console.log("This is unpublish courses", data)
  
  const { publish, isPending, isError } = useUpdatePublishCourse();
  
  const handlePublishCourse = (id) => {
    publish({ courseId: id });
  }

  



  return (
    <div className="mt-20">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        <p>{error?.response?.data?.message ?? "Something went wrong"}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.data?.data?.courses.map((course) => (
            <UnpublishedCourseCard
              key={course.id}
              imgSrc={course.cover_image}
              altText={course.title}
              title={course.title}
              onLaunch={() => handlePublishCourse(course.id)}
              isPending={isPending}
              isError={isError}
              date={
                course?.cohorts[0]
                  ? formatDate(course?.cohorts[0].created_at)
                  : "not published"
              }

              //   path={`/admin/course/management/preview/${course.id}?title=${course.title}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UnplishedCreatedCourse;
