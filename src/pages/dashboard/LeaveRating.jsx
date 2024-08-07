import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import BorderCard from "@/Components/BorderCard";

const LeaveRating = ({ setShowModal }) => {
  // Function to render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />,
      );
    }
    return stars;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal((prev) => !prev);
  };
  return (
    <BorderCard className="mx-auto max-w-2xl bg-white p-6 shadow-md">
      <h3 className="mb-2 text-2xl font-semibold text-gray-800">
        How would you rate this course?
      </h3>
      <p className="mb-4 text-gray-600">Select rating</p>

      <div className="mb-6 flex space-x-1">{renderStars()}</div>

      <p className="mb-6 text-gray-600">
        Could you share your personal experience with this course? Did it align
        well with your expectations?
      </p>
      <form action="" onSubmit={handleSubmit}>
        <textarea
          className="mb-4 w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-gray-500 focus:outline-none"
          rows="6"
        ></textarea>

        <button className="focus:shadow-outline rounded bg-[#CC1747] px-4 py-2 font-[300] text-white hover:bg-[#b30e3b] focus:outline-none">
          Submit
        </button>
      </form>
    </BorderCard>
  );
};

export default LeaveRating;
