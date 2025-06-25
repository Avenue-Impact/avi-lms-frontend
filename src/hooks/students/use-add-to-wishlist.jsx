// import { STUDENT_BASE_URL } from "@/constant";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";
// const addToWishlist = async ({ courseId }) =>
//   await axios.post(
//     `${STUDENT_BASE_URL}/courses/${courseId}/wishlist`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${Cookies.get("token")}`,
//       },
//     },
//   );

// export const useAddToWishlist = () => {
//   const { mutate, isPending } = useMutation({
//     mutationFn: addToWishlist,
//     onSuccess: ({ data }) => {
//       toast.success(data?.message ?? "Course added to wishlist successfully");
//     },
//     onError: (error) => {
//       toast.error(
//         error.response.data.message || "Failed to add course to wishlist",
//       );
//     },
//   });

//   return { mutate, isPending };
// };

// import { DEMO_MODE } from "@/config";
import { STUDENT_BASE_URL } from "@/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const addToWishlist = async ({ courseId }) => {
  // if (DEMO_MODE) {
  //   // Save to localStorage or a global variable
  //   let wishlist = JSON.parse(localStorage.getItem("demoWishlist") || "[]");
  //   if (!wishlist.includes(courseId)) {
  //     wishlist.push(courseId);
  //     localStorage.setItem("demoWishlist", JSON.stringify(wishlist));
  //   }
  //   return { data: { message: "Demo: Course added to wishlist" } };
  // }

  return await axios.post(
    `${STUDENT_BASE_URL}/courses/${courseId}/wishlist`,
    {},
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );
};

export const useAddToWishlist = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Course added to wishlist successfully");
    },
    onError: (error) => {
      toast.error(
        error.response.data.message || "Failed to add course to wishlist",
      );
    },
  });

  return { mutate, isPending };
};

// export const DEMO_MODE = true; // or false for real API
