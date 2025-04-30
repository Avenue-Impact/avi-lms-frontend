import PropTypes from "prop-types";
import BorderCard from "@/Components/BorderCard";
import { useDeleteNotifications } from "@/hooks/notifications/use-delete-admin-notifications";
import { useFetchNotifications } from "@/hooks/notifications/use-fetch-admin-notifications";
import { Heading, Paragraph } from "@/pages/auth/components/Text";
import { faBook, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Notifications() {
  const [deleteId, setDeleteId] = useState(null);
  const { removeFromList, isRemoving } = useDeleteNotifications();
  const handleDelete = (id) => {
    setDeleteId(id);
    removeFromList({
      notificationId: id,
    });
  };

  const { data, isLoading, error } = useFetchNotifications();

  if (isLoading) return <p className="italic">Loading...</p>;

  if (error) {
    <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;
  }

  return (
    <div className="mt-10 pb-20">
      <Heading className="text-left">
        Notifications({data?.data?.data?.length})
      </Heading>
      <BorderCard className="mt-5 space-y-3 rounded-md border-none bg-white px-0">
        {data?.data?.data?.map((notification) => {
          return (
            <article
              key={notification._id}
              className="flex items-center bg-primary-color-100/10 px-0 md:justify-between md:gap-3 "
            >
              <div className="flex items-start gap-2 md:gap-4">
                <span className="flex items-center justify-center rounded-full bg-primary-color-100 px-3 py-3 text-primary-color-600">
                  <FontAwesomeIcon
                    icon={faBook}
                    className="text-sm md:text-lg lg:text-xl"
                  />
                </span>
                <article className="flex flex-wrap items-center md:justify-between">
                  <div className="w-full max-w-[170px] md:max-w-[470px]">
                    <Heading className="w-full text-left text-lg font-medium capitalize">
                      {notification.title}
                    </Heading>
                    <Paragraph className="my-[10px] text-left text-xs capitalize">
                      {notification.message}
                    </Paragraph>
                  </div>
    
                </article>
              </div>
              <div className="items-center justify-self-end *:capitalize md:flex md:gap-10">
                <button
                  disabled={isRemoving}
                  className="block items-center gap-5 rounded-sm px-5 py-2 text-sm text-primary-color-600 md:text-lg lg:flex lg:bg-primary-color-100"
                  onClick={() => handleDelete(notification._id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                  <span className="hidden lg:block">
                    {isRemoving && deleteId === notification._id
                      ? "deleting"
                      : "delete"}
                  </span>
                </button>
              </div>
            </article>
          );
        })}
      </BorderCard>
    </div>
  );
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
  setNotifications: PropTypes.func,
};

export default Notifications;
