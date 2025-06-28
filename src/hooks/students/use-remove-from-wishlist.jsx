import { STUDENT_BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
// import { DEMO_MODE } from "@/config";

const removeFromWishlist = async ({ courseId }) => {
  // if (DEMO_MODE) {
  //   let wishlist = JSON.parse(localStorage.getItem("demoWishlist") || "[]");
  //   wishlist = wishlist.map(String).filter((id) => id !== String(courseId));
  //   localStorage.setItem("demoWishlist", JSON.stringify(wishlist));
  //   toast.success("Demo: Course removed from wishlist successfully");
  //   return { data: { message: "Demo: Course removed from wishlist successfully" } };
  // }
  // https://avi-lms-backend.onrender.com/api/v1/courses/wishlists/:courseId
  return await axios.delete(`${STUDENT_BASE_URL}/courses/wishlist/${courseId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  const { mutate: removeFromList, isPending: isRemoving } = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: ({ data }) => {
      // if (!DEMO_MODE) {
        toast.success(data?.message ?? "Course removed from wishlist successfully");
      // }
      queryClient.invalidateQueries("fetch-wishlists");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to remove course from wishlist",
      );
    },
  });

  return { removeFromList, isRemoving };
};
