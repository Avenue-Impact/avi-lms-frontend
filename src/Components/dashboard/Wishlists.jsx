
import PropTypes from "prop-types";
import Courses from "./Courses";
import { Heading } from "@/pages/auth/components/Text";

function Wishlists({ wishlist }) {
  // const handleWishlist = (id) => {
  //   const newWishlists = wishlist.filter((item) => item.id !== id);
  //   setWishlists(newWishlists);
  // };

  return (
    <>
      <Heading className="text-left">Wishlist ({wishlist.length})</Heading>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {wishlist.map((item) => (
          <div className="bg-white shadow-md rounded-lg">
            <Courses
              key={item.id}
              wishlist={item}
            // handleWishlist={handleWishlist}
            />
          </div>
        ))}
      </div>
    </>
  );
}

Wishlists.propTypes = {
  wishlist: PropTypes.array,
  setWishlists: PropTypes.func,
};

export default Wishlists;

