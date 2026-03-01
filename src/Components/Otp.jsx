import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const OtpInput = ({ length, value, onChangeOtp, inputRef }) => {
  // Initialize local state. If value is provided, use it, otherwise empty array.
  const [otp, setOtp] = useState(
    value 
      ? value.split("").concat(new Array(length - value.length).fill("")) 
      : new Array(length).fill("")
  );

  // Sync local state with value prop when it changes (external control)
  useEffect(() => {
    if (value !== undefined) {
      const newOtpArr = new Array(length).fill("");
      for (let i = 0; i < length && i < value.length; i++) {
        newOtpArr[i] = value[i];
      }
      setOtp(newOtpArr);
    }
  }, [value, length]);

  const handleChange = (element, index) => {
    const val = element.value;
    if (!val) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp); // Update local state immediately

    if (index < length - 1 && val) {
      element.nextSibling.focus();
    }

    onChangeOtp(newOtp.join("")); // Sync up
  };

  const handleBackspace = (element, index) => {
    if (!otp[index] && index > 0) {
      element.previousSibling.focus();
      return;
    }
    
    const newOtp = [...otp];
    newOtp[index] = "";
    setOtp(newOtp); // Update local state immediately

    if (index > 0 && !otp[index]) {
      element.previousSibling.focus();
    }
    
    onChangeOtp(newOtp.join("")); // Sync up
  };
  
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
         const newOtp = [...otp];
         newOtp[index] = "";
         setOtp(newOtp);
         onChangeOtp(newOtp.join(""));
      } else {
         if (index > 0) {
            e.target.previousSibling.focus();
         }
      }
    }
  };


  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    if (!pasteData) return;

    const newOtp = [...otp];
    pasteData.split("").forEach((char, index) => {
      newOtp[index] = char;
    });
    setOtp(newOtp);
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
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
};

OtpInput.propTypes = {
  length: PropTypes.number,
  onChangeOtp: PropTypes.func,
  value: PropTypes.string,
};

export default OtpInput;
