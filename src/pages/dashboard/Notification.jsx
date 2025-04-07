import EmptyNotification from "@/Components/dashboard/EmptyNotification";
import Notifications from "@/Components/dashboard/Notifications";
import { useState } from "react";
import { Heading } from "../auth/components/Text";
import { notifications } from "@/lib/notification";
import { useFetchNotifications } from "@/hooks/students/use-fetch-notifications";

function Notification() {
  const { data } = useFetchNotifications();

  const [notification, setNotifications] = useState(notifications);
  return (
    <article className="h-full">
      <Heading className="text-left">
        Notifications({data?.data?.data?.length})
      </Heading>
      {data?.data?.data?.length > 0 ? (
        <Notifications
          notifications={notification}
          setNotifications={setNotifications}
        />
      ) : (
        <EmptyNotification />
      )}
    </article>
  );
}

export default Notification;
