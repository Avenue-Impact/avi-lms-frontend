import { useState } from "react";
import { Heading } from "../auth/components/Text";
import Wishlists from "@/Components/dashboard/Wishlists";
import EmptyWishlist from "@/Components/dashboard/EmptyWishlist";
import { wishlists } from "@/lib/wishlists";

function Wishlist() {
  const [wishlist, setWishlists] = useState(wishlists);
  return (
    <article className="h-full">
      <Heading className="text-left">Wishlist</Heading>
      {wishlist.length > 0 ? (
        <Wishlists wishlist={wishlist} setWishlists={setWishlists} />
      ) : (
        <EmptyWishlist />
      )}
    </article>
  );
}

export default Wishlist;
