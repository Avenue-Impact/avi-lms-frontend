import { useState, useEffect } from "react";
import { Heading } from "../auth/components/Text";
import Wishlists from "@/Components/dashboard/Wishlists";
import EmptyWishlist from "@/Components/dashboard/EmptyWishlist";
import { useFetchWishlist } from "../../hooks/wishlists/use-fetch-wishlist";

function Wishlist() {
  // const [wishlist, setWishlist] = useState([]);
  const { isLoading, data, error } = useFetchWishlist();

  // useEffect(() => {
  //   if (data?.data?.data) {
  //     setWishlist(data.data.data);
  //   }
  // }, [data]);

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    return <p>{error?.response?.data?.message || "Something went wrong"}</p>;
  }

  return (
    <article className="h-full">
      {data?.data?.data?.length > 0 ? (
        <Wishlists wishlist={data?.data?.data} />
      ) : (
        <EmptyWishlist />
      )}
    </article>
  );
}

export default Wishlist;
