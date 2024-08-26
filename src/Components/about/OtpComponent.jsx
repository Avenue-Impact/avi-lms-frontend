import React, { useState } from "react";
import OtpInput from "../Otp";

const OtpComponent = ({ setOtp, inputRef }) => {
  const handleChangeOtp = (newOtp) => {
    setOtp(newOtp);
  };
  return (
    <OtpInput length={6} onChangeOtp={handleChangeOtp} inputRef={inputRef} />
  );
};

export default OtpComponent;
