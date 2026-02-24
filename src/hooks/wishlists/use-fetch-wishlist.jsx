// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import Cookies from "js-cookie";

// const fetchWishlists = async () =>
//   await axios.get(
//     `https://avi-lms-backend.onrender.com/api/v1/courses/wishlist`,
//     {
//       headers: {
//         Authorization: `Bearer ${Cookies.get("token")}`,
//       },
//     },
//   );

// export const useFetchWishlist = () =>
//   useQuery({
//     queryKey: ["fetch-wishlists"],
//     queryFn: fetchWishlists,
//   });




import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { STUDENT_BASE_URL } from "@/constant";
// import { demoCourses } from "@/pages/dashboard/DiscoverCourses";
// import { DEMO_MODE } from "@/config";

const fetchWishlists = async () => {
  // if (DEMO_MODE) {
  //   const wishlistIds = JSON.parse(localStorage.getItem("demoWishlist") || "[]");
  //   // Return the demoCourses that match the wishlist IDs
  //   return {
  //     data: {
  //       data: demoCourses.filter(course => wishlistIds.includes(course.id))
  //     }
  //   };
  // }

  return await axios.get(
    `${STUDENT_BASE_URL}/courses/wishlist`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const useFetchWishlist = () =>
  useQuery({
    queryKey: ["fetch-wishlists"],
    queryFn: fetchWishlists,
  });
