
import { certCourses } from "@/lib/wishlists";
import ReviewEmpty from "./ReviewEmpty";
import Review from "./Review";
import { useFetchAllAdminCourses } from "@/hooks/course-management/use-fetch-all-courses";

const ReviewMainPage = () => {
  const { data} = useFetchAllAdminCourses();
  // console.log("Fetch Courses", data);

  return <div>{data?.data?.data?.courses.length < 1 ? <ReviewEmpty /> : <Review />}</div>;
};

export default ReviewMainPage;
