import EmptyUserNotification from "@/Components/dashboard/EmptyNotification";
import UserNotifications from "@/Components/dashboard/UserNotifications";
import { useFetchUsersNotifications } from "@/hooks/students/use-fetch-user-notifications";
import { Heading } from "../auth/components/Text";

function UserNotification() {
  const { data, isLoading, error } = useFetchUsersNotifications();

  if (isLoading) return <p>Loading ....</p>;
  if (error)
    return <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;
  return (
    <article className="h-full">
      <Heading className="text-left">
        Notifications({data?.data?.data?.length})
      </Heading>
      {data?.data?.data?.length > 0 ? (
        <UserNotifications data={data} />
      ) : (
        <EmptyUserNotification />
      )}
    </article>
  );
}

export default UserNotification;
