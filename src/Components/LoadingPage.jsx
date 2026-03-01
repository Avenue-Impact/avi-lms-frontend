import React from "react";
import { BeatLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* You can add a logo here if desired */}
        {/* <img src="/logo.svg" alt="Logo" className="w-24 mb-4" /> */}
        <BeatLoader color="#CC1747" size={20} margin={5} />
        <p className="animate-pulse text-sm font-medium text-gray-500">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
