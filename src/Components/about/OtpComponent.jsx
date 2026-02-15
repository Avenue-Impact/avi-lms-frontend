import React, { useState } from "react";
import OtpInput from "../Otp";

const OtpComponent = ({ otp, setOtp, inputRef }) => {
  const handleChangeOtp = (newOtp) => {
    setOtp(newOtp);
  };
  return (
    <OtpInput
      length={6}
      value={otp}
      onChangeOtp={handleChangeOtp}
      inputRef={inputRef}
    />
  );
};

export default OtpComponent;
