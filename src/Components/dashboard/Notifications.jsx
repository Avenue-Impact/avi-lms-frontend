import PropTypes from "prop-types";
import BorderCard from "../BorderCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heading, Paragraph } from "@/pages/auth/components/Text";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useFetchNotifications } from "@/hooks/students/use-fetch-notifications";
import { useDeleteNotifications } from "@/hooks/students/use-delete-notifications";

function Notifications({ notifications, setNotifications }) {

  const { removeFromList, isRemoving } = useDeleteNotifications();
  const handleclick = (id) => {
    // const newNotifications = data?.data?.data?.filter((data) => data.id !== id);
    // setNotifications(newNotifications);
    removeFromList({
      notificationId: id,
    });
  };

  const { data, isLoading, isError } = useFetchNotifications();
  // console.log("Fetch the notifications", data);
  // console.log("Fetch the notifications", isLoading);

  return (
    <BorderCard className="mt-10 space-y-3 rounded-md border-none bg-white px-0">
      {isLoading ? (
        "Loading..."
      ) : isError ? (
        <p>{isError?.response?.data?.message ?? "Something went wrong"}</p>
      ) : (
        data?.data?.data?.map((notification) => {
          return (
            <article
              key={notification._id}
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
                  <div className="w-full max-w-[170px] md:max-w-[470px]">
                    <Heading className="w-full text-left text-xs font-medium capitalize">
                      {notification.title}
                    </Heading>
                    <Paragraph className="my-[10px] text-left text-xs capitalize">
                      {notification.message}
                    </Paragraph>
                  </div>
                  {/* <p className="text-[0.625rem] text-tertiary-color-800 *:capitalize md:text-sm">
                  <span>today</span> |<span>{notification.time} </span>
                </p> */}
                  {/* <p className="text-sm text-tertiary-color-800 lg:block">
                  <span>today</span> |<span>{notification.time} </span>
                </p> */}
                </article>
              </div>
              <div className="items-center justify-self-end *:capitalize md:flex md:gap-10">
                <button
                  disabled={isRemoving}
                  className="block items-center gap-5 rounded-sm px-5 py-2 text-sm text-primary-color-600 md:text-lg lg:flex lg:bg-primary-color-100"
                  onClick={() => handleclick(notification._id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                  <span className="hidden lg:block">
                    {isRemoving ? "deleting" : "delete"}
                  </span>
                </button>
              </div>
            </article>
          );
        })
      )}
    </BorderCard>
  );
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
  setNotifications: PropTypes.func,
};

export default Notifications;
