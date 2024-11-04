import { EnrollPreviewButton } from "./PreviewButton";
import { Link } from "react-router-dom";
import styles from "../pages/pages.module.css";

const CourseCardPreview = ({
  imgSrc,
  path = "/PreviewVideoCourse",
  previewButtonText,
}) => {
  return (
    <div className={`${styles.previewCourses1} `}>
      <div className={`${styles.courseImg} `}>
        <img className="w-full rounded-lg" src={imgSrc} alt="Course" />
      </div>
      <div className="pt-4 text-center">
        <Link to={path}>
          <EnrollPreviewButton className="bg-[#b84646]">
            {previewButtonText}
          </EnrollPreviewButton>
        </Link>
      </div>
    </div>
  );
};

export default CourseCardPreview;
