import PropTypes from "prop-types";
import Courses from "./Courses";

function Wishlists({ wishlist, setWishlists }) {
  const handleWishlist = (id) => {
    const newWishlists = wishlist.filter((item) => item.id !== id);
    setWishlists(newWishlists);
  };

  return (
    <div className="mt-10 grid grid-cols-4 gap-4">
      {wishlist.map((item) => (
        <Courses
          key={item.id}
          wishlist={item}
          handleWishlist={handleWishlist}
        />
      ))}
    </div>
  );
}

Wishlists.propTypes = {
  wishlist: PropTypes.array,
  setWishlists: PropTypes.func,
};

export default Wishlists;
