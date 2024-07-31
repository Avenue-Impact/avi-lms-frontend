import React from 'react';

const DashButton = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick}
      className={`px-4 py-2 rounded  bg-[#CC1747] text-white hover:bg-[#B3123F] transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default DashButton;



