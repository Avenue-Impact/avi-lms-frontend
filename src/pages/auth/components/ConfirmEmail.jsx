// import OtpComponent from "@/Components/about/OtpComponent";
// import BorderCard from "@/Components/BorderCard";
// import { CommonButton } from "@/Components/ui/button";
// import { useAuth } from "@/hooks/useAuth";
// import { useCredentials } from "@/hooks/useCredentials";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useRef, useState } from "react";
// import toast from "react-hot-toast";

// const url = import.meta.env.VITE_AUTH_URL;

// const ConfirmEmail = ({ setConfirm, setModal, setSuccess, user, form }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [deliveryMethod, setDeliveryMethod] = useState('email'); // 'email' or 'sms'
//   const { dispatch } = useAuth();
//   const inputRef = useRef();
//   const { otp, setOtp } = useCredentials();

//   const verify = async () => {
//     if (!otp || otp.length < 4) {
//       toast.error("Please enter a valid verification code");
//       return;
//     }

//     try {
//       const verify = await axios.post(`${url}/verifyUser`, {
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         confirmCode: otp,
//         deliveryMethod
//       });

//       if (verify.data.status === "success") {
//         toast.success("Account verified successfully!");
//         setSuccess("success");
//         dispatch({
//           type: "auth/login",
//           payload: {
//             ...verify.data.data.user,
//           },
//         });

//         Cookies.set("token", verify.data.data.token, {
//           expires: 1,
//           secure: true,
//           sameSite: 'strict',
//           path: '/'
//         });
//       }
//     } catch (error) {
//       setSuccess("fail");
//       if (error.response?.status === 400) {
//         toast.error("Invalid verification code");
//       } else if (error.response?.status === 401) {
//         toast.error("Verification code expired. Please request a new one.");
//       } else {
//         toast.error(error.response?.data?.message || "Verification failed. Please try again.");
//       }
//     }
//   };

//   const resendOtp = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post(`${url}/resend-otp`, {
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         deliveryMethod
//       });

//       if (response.data.status === "success") {
//         toast.success(`OTP resent successfully via ${deliveryMethod === 'email' ? 'email' : 'SMS'}!`);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to resend OTP");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//    // Add timeout for OTP expiration
//    useEffect(() => {
//     const timeout = setTimeout(() => {
//       setOtp("");
//       toast.error("Verification code expired. Please request a new one.");
//     }, 10 * 60 * 1000); // 10 minutes

//     return () => clearTimeout(timeout);
//   }, [setOtp]);

//   return (
//     <BorderCard className="w-full max-w-[731px] rounded-xl bg-white py-11 text-center">
//       <div className="px-4">
//         <p className="text-xl font-semibold text-[#23314A]">
//           Verify your account
//         </p>
//         <p className="mx-auto mb-6 mt-3 max-w-[284px] text-center text-sm leading-[18px] text-[#98A2B3]">
//           Please enter the code sent to your {deliveryMethod === 'email' ? 'email' : 'phone'}
//         </p>

//         {/* Delivery method toggle */}
//         <div className="mb-6 flex justify-center space-x-4">
//           <button
//             className={`px-4 py-2 rounded ${deliveryMethod === 'email' ? 'bg-primary-color-600 text-white' : 'bg-gray-200'
//               }`}
//             onClick={() => setDeliveryMethod('email')}
//           >
//             Email
//           </button>
//           <button
//             className={`px-4 py-2 rounded ${deliveryMethod === 'sms' ? 'bg-primary-color-600 text-white' : 'bg-gray-200'
//               }`}
//             onClick={() => setDeliveryMethod('sms')}
//           >
//             SMS
//           </button>
//         </div>

//         <div className="mx-auto w-fit">
//           <OtpComponent setOtp={setOtp} inputRef={inputRef} />
//         </div>
//         <p className="mb-[31px] mt-6 text-sm">
//           <span className="text-[#645D5D]">Didn't receive a code?</span>{" "}
//           <span
//             className={`cursor-pointer font-medium text-primary-color-600 ${isLoading ? "pointer-events-none opacity-50" : ""
//               }`}
//             onClick={resendOtp}
//           >
//             {isLoading ? "Sending..." : "Resend"}
//           </span>
//         </p>
//       </div>
//       <CommonButton
//         className="w-full bg-primary-color-600"
//         onClick={() => {
//           verify();
//           setConfirm((prev) => !prev);
//           setModal((prev) => !prev);
//         }}
//         disabled={isLoading || !otp || otp.length < 4}
//       >
//         {isLoading ? "Verifying..." : "Confirm"}
//       </CommonButton>
//     </BorderCard>
//   );
// };

// export default ConfirmEmail;











import { useRef, useState, useEffect } from "react"; // Add useEffect to imports
import OtpComponent from "@/Components/about/OtpComponent";
import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCredentials } from "@/hooks/useCredentials";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const url = import.meta.env.VITE_AUTH_URL;

const ConfirmEmail = ({ setConfirm, setModal, setSuccess, user, form }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('email');
  const { dispatch } = useAuth();
  const inputRef = useRef();
  const { otp, setOtp } = useCredentials();

  const verify = async () => {
    if (!otp || otp.length < 4) {
      toast.error("Please enter a valid verification code");
      return;
    }

    try {
      const verify = await axios.post(`${url}/verifyUser`, {
        email: user.email,
        phoneNumber: user.phoneNumber,
        confirmCode: otp,
        deliveryMethod
      });

      if (verify.data.status === "success") {
        toast.success("Account verified successfully!");
        setSuccess("success");
        dispatch({
          type: "auth/login",
          payload: {
            ...verify.data.data.user,
          },
        });

        Cookies.set("token", verify.data.data.token, {
          expires: 1,
          secure: true,
          sameSite: 'strict',
          path: '/'
        });
      }
    } catch (error) {
      setSuccess("fail");
      if (error.response?.status === 400) {
        toast.error("Invalid verification code");
      } else if (error.response?.status === 401) {
        toast.error("Verification code expired. Please request a new one.");
      } else {
        toast.error(error.response?.data?.message || "Verification failed. Please try again.");
      }
    }
  };

  const resendOtp = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/resend-otp`, {
        email: user.email,
        phoneNumber: user.phoneNumber,
        deliveryMethod
      });

      if (response.data.status === "success") {
        toast.success(`Verification code resent successfully via ${deliveryMethod === 'email' ? 'email' : 'SMS'}!`);
        setOtp(""); // Clear previous OTP
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend verification code");
    } finally {
      setIsLoading(false);
    }
  };

  // Add timeout for OTP expiration
  useEffect(() => {
    const timeout = setTimeout(() => {
      setOtp("");
      toast.error("Verification code expired. Please request a new one.");
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearTimeout(timeout);
  }, [setOtp]);

  return (
    <BorderCard className="w-full max-w-[731px] rounded-xl bg-white py-11 text-center">
      <div className="px-4">
        <p className="text-xl font-semibold text-[#23314A]">
          Verify your account
        </p>
        <p className="mx-auto mb-6 mt-3 max-w-[284px] text-center text-sm leading-[18px] text-[#98A2B3]">
          Please enter the code sent to your {deliveryMethod === 'email' ? 'email' : 'phone'}
        </p>
        
        <div className="mb-6 flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              deliveryMethod === 'email' ? 'bg-primary-color-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setDeliveryMethod('email')}
            disabled={isLoading}
          >
            Email
          </button>
          {/* <button
            className={`px-4 py-2 rounded ${
              deliveryMethod === 'sms' ? 'bg-primary-color-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setDeliveryMethod('sms')}
            disabled={isLoading}
          >
            SMS
          </button> */}
        </div>

        <div className="mx-auto w-fit">
          <OtpComponent setOtp={setOtp} inputRef={inputRef} />
        </div>
        <p className="mb-[31px] mt-6 text-sm">
          <span className="text-[#645D5D]">Didn't receive a code?</span>{" "}
          <span
            className={`cursor-pointer font-medium text-primary-color-600 ${
              isLoading ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={resendOtp}
          >
            {isLoading ? "Sending..." : "Resend"}
          </span>
        </p>
      </div>
      <CommonButton
        className="w-full bg-primary-color-600"
        onClick={verify}
        disabled={isLoading || !otp || otp.length < 4}
      >
        {isLoading ? "Verifying..." : "Confirm"}
      </CommonButton>
    </BorderCard>
  );
};

export default ConfirmEmail;