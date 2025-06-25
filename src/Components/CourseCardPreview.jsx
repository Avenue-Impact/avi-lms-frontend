import { EnrollPreviewButton } from "./PreviewButton";
import { Link } from "react-router-dom";
import styles from "../pages/pages.module.css";
import { Skeleton } from "./ui/skeleton";
import Cookies from "js-cookie";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useAddToWishlist } from "@/hooks/students/use-add-to-wishlist";
import { useRemoveFromWishlist } from "@/hooks/students/use-remove-from-wishlist";
import { useDeleteWishlist } from "@/hooks/students/use-delete-wishlist";
import React from "react";
import { useFetchWishlist } from "@/hooks/wishlists/use-fetch-wishlist";

const CourseCardPreview = ({
  imgSrc,
  path = "/PreviewVideoCourse",
  loading,
  courseId,
}) => {
  const { mutate: addToWishlist, isPending: isAdding } = useAddToWishlist();
  const { removeFromList, isRemoving } = useRemoveFromWishlist();
  const { data: wishlistData, refetch } = useFetchWishlist();

  // Determine if course is in wishlist (real API only)
  const inWishlist = React.useMemo(() => {
    return Array.isArray(wishlistData?.data?.data)
      ? wishlistData.data.data.some((course) => String(course.id) === String(courseId))
      : false;
  }, [wishlistData, courseId]);

  // Add to wishlist
  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(
      { courseId },
      {
        onSuccess: () => {
          refetch(); // Refresh wishlist after adding
        },
      }
    );
  };

  // Remove from wishlist
  const handleRemoveFromWishlist = (e) => {
    e.preventDefault();
    removeFromList(
      { courseId },
      {
        onSuccess: () => {
          refetch(); // Refresh wishlist after removing
        },
      }
    );
  };

  return (
    <div className={`${styles.previewCourses1} `}>
      {loading ? (
        <Skeleton className={"my-3 h-[190px] w-full rounded-lg"} />
      ) : (
        <div className={`${styles.courseImg} `}>
          <img className="w-full rounded-lg" src={imgSrc} alt="Course" />
        </div>
      )}
      <div className="pt-4 text-center flex items-center justify-center gap-2">
        <Link to={path} className="flex w-full items-center gap-2 justify-center">
          <EnrollPreviewButton className="bg-[#CC1747] flex-1 min-w-0">
            Enroll now
          </EnrollPreviewButton>
          <button
            type="button"
            onClick={inWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
            disabled={isAdding || isRemoving}
            className={`flex items-center justify-center border rounded-lg p-3 ml-2 py-4 transition-colors duration-150 flex-shrink-0 ${inWishlist ? 'bg-[#CC1747] border-[#CC1747] text-white' : 'bg-white border-[#CC1747] text-[#CC1747] hover:bg-[#ffeff3]'}`}
            style={{ width: "18%", minWidth: 40, maxWidth: 60 }}
            title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {inWishlist ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCardPreview;
