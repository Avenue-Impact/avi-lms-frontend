import React from "react";
import BorderCard from "../BorderCard";

const ConfirmDelete = ({ setShowModal }) => {
  return (
    <BorderCard className="bg-white">
      confirm delete{" "}
      <button onClick={() => setShowModal((prev) => !prev)}>close</button>
    </BorderCard>
  );
};

export default ConfirmDelete;
