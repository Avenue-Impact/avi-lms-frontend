import { useNavigate, useNavigation } from "react-router-dom";
import BorderCard from "../BorderCard";
import { CommonButton } from "../ui/button";

function EmptyWishlist() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-96 items-center justify-center">
      <BorderCard className="mx-auto h-fit w-full max-w-72">
        <CommonButton
          className="w-full bg-primary-color-600 px-28 text-base capitalize text-white"
          onClick={() => navigate("/discover-courses")}
        >
          Browse courses now
        </CommonButton>
      </BorderCard>
    </div>
  );
}

export default EmptyWishlist;
