import PropTypes from "prop-types";
import { useRef, useState } from "react";

const OtpInput = ({ length, onChangeOtp, inputRef }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (element, index) => {
    const value = element.value;
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < length - 1 && value) {
      element.nextSibling.focus();
    }

    onChangeOtp(newOtp.join(""));
  };

  const handleBackspace = (element, index) => {
    const newOtp = [...otp];
    newOtp[index] = "";
    setOtp(newOtp);

    if (index > 0) {
      element.previousSibling.focus();
    }

    onChangeOtp(newOtp.join(""));
  };

  return (
    <div className="flex gap-2">
      {otp.map((data, index) => (
        <input
          key={index}
          type="number"
          maxLength="1"
          value={data}
          ref={index === 0 ? inputRef : null}
          className="text-medium block h-[30px] w-[30px] rounded-[4.4px] border-[0.73px] border-[#D0D5DD] text-center text-2xl md:h-[47.7px] md:w-[58.7px]"
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              handleBackspace(e.target, index);
            }
          }}
        />
      ))}
    </div>
  );
};

OtpInput.propTypes = {
  length: PropTypes.number,
  onChangeOtp: PropTypes.func,
};

export default OtpInput;
