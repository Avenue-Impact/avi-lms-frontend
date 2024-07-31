import PropTypes from "prop-types";
import BorderCard from "../BorderCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heading, Paragraph } from "@/pages/auth/components/Text";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Notifications({ notifications, setNotifications }) {
  const handleclick = (id) => {
    const newNotifications = notifications?.filter((data) => data.id !== id);
    setNotifications(newNotifications);
  };
  return (
    <BorderCard className="mt-10 space-y-3 bg-white">
      {notifications.map((notification) => {
        return (
          <article
            key={notification.id}
            className="flex items-center justify-between bg-primary-color-100/10 px-8 py-6"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-color-100 text-primary-color-600">
                <FontAwesomeIcon icon={notification.icon} />
              </span>
              <article className="max-w-[470px]">
                <Heading className="text-left">{notification.title}</Heading>
                <Paragraph className="text-left">
                  {notification.description}
                </Paragraph>
              </article>
            </div>
            <div className="flex items-center gap-10 *:capitalize">
              <p className="text-tertiary-color-800 text-sm">
                <span>today</span> |<span>{notification.time} </span>
              </p>
              <button
                className="flex items-center gap-5 rounded-sm bg-primary-color-100 px-5 py-2 text-primary-color-600"
                onClick={() => handleclick(notification.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
                <span>delete</span>
              </button>
            </div>
          </article>
        );
      })}
    </BorderCard>
  );
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
  setNotifications: PropTypes.func,
};

export default Notifications;
