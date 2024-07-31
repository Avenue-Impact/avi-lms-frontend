import { Heading } from "@/pages/auth/components/Text";
import emptyState from "../../assets/images/empty-state.png";
import BorderCard from "../BorderCard";
function EmptyNotification() {
  return (
    <div className="flex h-full items-center justify-center">
      <BorderCard className="mx-auto h-fit w-fit align-middle">
        <img src={emptyState} alt="an image for an empty state" />
        <Heading>No notification</Heading>
      </BorderCard>
    </div>
  );
}

export default EmptyNotification;
