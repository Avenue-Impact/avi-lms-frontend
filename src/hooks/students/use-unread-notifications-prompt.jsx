import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFetchUsersNotifications } from "./use-fetch-user-notifications";

export const useUnreadNotificationsPrompt = () => {
  const { data } = useFetchUsersNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data?.data) {
      const notifications = data.data.data;
      const unreadNotifications = notifications.filter(
        (notif) => !notif.isSeen,
      );

      if (unreadNotifications.length > 0) {
        const hasPrompted = sessionStorage.getItem("userNotificationPrompted");
        if (!hasPrompted) {
          toast(
            (t) => (
              <span
                className="cursor-pointer hover:underline"
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate("/dashboard/notification");
                }}
              >
                You have {unreadNotifications.length} unread notification(s).
                Click here to view.
              </span>
            ),
            {
              icon: "🔔",
              duration: 8000,
            },
          );
          sessionStorage.setItem("userNotificationPrompted", "true");
        }
      }
    }
  }, [data, navigate]);
};
