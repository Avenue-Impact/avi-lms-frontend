import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const LeaveRating = () => {
  // Function to render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
      );
    }
    return stars;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">How would you rate this course?</h3>
        <p className="text-gray-600 mb-4">Select rating</p>
      
      <div className="flex space-x-1 mb-6">
        {renderStars()} 
      </div>
      
        <p className="text-gray-600 mb-6">Could you share your personal experience with this course? Did it align well with your expectations?</p>
      
      <textarea
        className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
        rows="6"
      ></textarea>

      <button className=" bg-[#CC1747] text-white font-[300] py-2 px-4 rounded hover:bg-[#b30e3b] focus:outline-none focus:shadow-outline">
        Submit
      </button>
    </div>
  );
};

export default LeaveRating;
