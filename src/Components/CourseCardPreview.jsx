import { EnrollPreviewButton } from "./PreviewButton";
import { Link } from "react-router-dom";
import styles from "../pages/pages.module.css";
import { Skeleton } from "./ui/skeleton";
import Cookies from "js-cookie";

const CourseCardPreview = ({
  imgSrc,
  path = "/PreviewVideoCourse",
  loading,
}) => {
  return (
    <div className={`${styles.previewCourses1} `}>
      {loading ? (
        <Skeleton className={"my-3 h-[190px] w-full rounded-lg"} />
      ) : (
        <div className={`${styles.courseImg} `}>
          <img className="w-full rounded-lg" src={imgSrc} alt="Course" />
        </div>
      )}
      <div className="pt-4 text-center">
        <Link to={path}>
          <EnrollPreviewButton className="bg-[#b84646]">
            Enroll now
          </EnrollPreviewButton>
        </Link>
      </div>
    </div>
  );
};

export default CourseCardPreview;
