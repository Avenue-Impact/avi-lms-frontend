import { useDeleteUsersNotifications } from "@/hooks/students/use-delete-user-notifications";
import { Heading, Paragraph } from "@/pages/auth/components/Text";
import { faBook, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState } from "react";
import BorderCard from "../BorderCard";

function UserNotifications({ data }) {
  const [deleteId, setDeleteId] = useState(null);

  const { removeFromList, isRemoving } = useDeleteUsersNotifications();
  const handleclick = (id) => {
    setDeleteId(id);
    removeFromList({
      notificationId: id,
    });
  };

  return (
    <BorderCard className="mt-10 space-y-3 rounded-md border-none bg-white px-0">
      {data?.data?.data?.map((notification) => {
        return (
          <article
            key={notification._id}
            className="flex items-center justify-between bg-primary-color-100/10 px-0 py-3 md:gap-3 lg:px-6 lg:py-6 2xl:px-8"
          >
            <div className="flex w-full items-start gap-2 md:gap-4">
              <div>
                <span className="flex items-center justify-center rounded-full bg-primary-color-100 px-3 py-3 text-primary-color-600">
                  <FontAwesomeIcon
                    icon={faBook}
                    className="text-sm md:text-lg lg:text-xl"
                  />
                </span>
              </div>
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
                  {isRemoving && deleteId === notification?._id
                    ? "deleting"
                    : "delete"}
                </span>
              </button>
            </div>
          </article>
        );
      })}
    </BorderCard>
  );
}

UserNotifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
  setNotifications: PropTypes.func,
};

export default UserNotifications;
