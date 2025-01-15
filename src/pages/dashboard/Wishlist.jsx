import { useState } from "react";
import { Heading } from "../auth/components/Text";
import Wishlists from "@/Components/dashboard/Wishlists";
import EmptyWishlist from "@/Components/dashboard/EmptyWishlist";
import { wishlists } from "@/lib/wishlists";
import { useFetchWishlist } from "./use-fetch-wishlist";

function Wishlist() {
  const [wishlist, setWishlists] = useState(wishlists);

  const { isLoading, data, error } = useFetchWishlist();

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;

  console.log(data);

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
