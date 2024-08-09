import React, { useState } from "react";
import OtpInput from "../Otp";

const OtpComponent = () => {
  const [otp, setOtp] = useState("");

  const handleChangeOtp = (newOtp) => {
    setOtp(newOtp);
  };
  return <OtpInput length={5} onChangeOtp={handleChangeOtp} />;
};

export default OtpComponent;
