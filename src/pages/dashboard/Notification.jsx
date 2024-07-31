import EmptyNotification from "@/Components/dashboard/EmptyNotification";
import Notifications from "@/Components/dashboard/Notifications";
import { useState } from "react";
import { Heading } from "../auth/components/Text";
import { notifications } from "@/lib/notification";

function Notification() {
  const [notification, setNotifications] = useState(notifications);
  return (
    <article className="h-full">
      <Heading className="text-left">Notifications</Heading>
      {notification.length > 0 ? (
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
