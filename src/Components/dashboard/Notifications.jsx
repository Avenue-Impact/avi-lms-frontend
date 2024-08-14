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
    <BorderCard className="mt-10 space-y-3 rounded-md border-none bg-white px-0">
      {notifications.map((notification) => {
        return (
          <article
            key={notification.id}
            className="flex items-center bg-primary-color-100/10 px-0 py-3 md:justify-between md:gap-3 lg:px-6 lg:py-6 2xl:px-8"
          >
            <div className="flex items-start gap-2 md:gap-4">
              <span className="flex items-center justify-center rounded-full bg-primary-color-100 px-3 py-3 text-primary-color-600">
                <FontAwesomeIcon
                  icon={notification.icon}
                  className="text-sm md:text-lg lg:text-xl"
                />
              </span>
              <article className="flex flex-wrap items-center md:justify-between">
                <div className="w-full max-w-[320px] md:max-w-[470px]">
                  <Heading className="text-left text-xs font-medium">
                    {notification.title}
                  </Heading>
                  <Paragraph className="my-[10px] text-left text-xs">
                    {notification.description}
                  </Paragraph>
                </div>
                <p className="text-[0.625rem] text-tertiary-color-800 *:capitalize md:text-sm">
                  <span>today</span> |<span>{notification.time} </span>
                </p>
                {/* <p className="text-sm text-tertiary-color-800 lg:block">
                  <span>today</span> |<span>{notification.time} </span>
                </p> */}
              </article>
            </div>
            <div className="items-center justify-self-end *:capitalize md:flex md:gap-10">
              <button
                className="block items-center gap-5 rounded-sm px-5 py-2 text-sm text-primary-color-600 md:text-lg lg:flex lg:bg-primary-color-100"
                onClick={() => handleclick(notification.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
                <span className="hidden lg:block">delete</span>
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
