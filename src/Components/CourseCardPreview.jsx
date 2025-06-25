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
import { DEMO_MODE } from "@/config";
import { useFetchWishlist } from "@/hooks/wishlists/use-fetch-wishlist";

const CourseCardPreview = ({
  imgSrc,
  path = "/PreviewVideoCourse",
  loading,
  courseId,
}) => {
  const { mutate, isPending } = useAddToWishlist();
  const { mutate: removeFromList, isPending: isRemoving } = useRemoveFromWishlist();
  const { mutate: deleteFromWishlist, isPending: isDeleting } = useDeleteWishlist();
  const [inWishlist, setInWishlist] = React.useState(false);
  const { data: wishlistData } = useFetchWishlist();

  // Check if course is in wishlist (demo mode)
  React.useEffect(() => {
    function checkWishlist() {
      if (DEMO_MODE) {
        const wishlist = JSON.parse(localStorage.getItem("demoWishlist") || "[]");
        setInWishlist(wishlist.map(String).includes(String(courseId)));
      } else if (wishlistData?.data?.data) {
        // Real API: check if course is in the fetched wishlist
        setInWishlist(
          wishlistData.data.data.some(
            (course) => String(course.id) === String(courseId)
          )
        );
      }
    }
    checkWishlist();
    if (DEMO_MODE) {
      window.addEventListener("storage", checkWishlist);
      return () => window.removeEventListener("storage", checkWishlist);
    }
  }, [courseId, wishlistData]);

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    mutate({ courseId }, {
      onSuccess: () => {
        if (DEMO_MODE) {
          const wishlist = JSON.parse(localStorage.getItem("demoWishlist") || "[]");
          setInWishlist(wishlist.map(String).includes(String(courseId)));
        }
      },
    });
  };

  const handleRemoveFromWishlist = (e) => {
    e.preventDefault();
    deleteFromWishlist(courseId, {
      onSuccess: () => {
        if (DEMO_MODE) {
          const wishlist = JSON.parse(localStorage.getItem("demoWishlist") || "[]");
          setInWishlist(wishlist.map(String).includes(String(courseId)));
        }
      },
    });
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
            disabled={isPending || isDeleting}
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
