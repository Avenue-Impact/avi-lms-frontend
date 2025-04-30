import OtpComponent from "@/Components/about/OtpComponent";
import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCredentials } from "@/hooks/useCredentials";
import axios from "axios";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const url = import.meta.env.VITE_AUTH_URL;

const ConfirmEmail = ({ setConfirm, setModal, setSuccess, user, form }) => {
  // const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuth();

  const inputRef = useRef();

  const { otp, setOtp } = useCredentials();

  const verify = async () => {
    try {
      const verify = await axios.post(`${url}/verifyUser`, {
        email: user.email,
        confirmCode: otp,
      });

      if (verify.data.status === "success") {
        toast.success(verify.data.status);
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
        });
      }
    } catch (error) {
      // setSuccess("fail");
      setSuccess("fail");

      toast.error(error.response?.data?.message || "something went wrong");
    }
  };

  const resendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/resend-otp`, {
        email: user.email,
      });

      if (response.data.status === "success") {
        toast.success("OTP resent successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleEdit = () => {
  //   if (user) {
  //     form.setValue("firstName", user.firstName);
  //     form.setValue("lastName", user.lastName);
  //     form.setValue("email", user.email);
  //     form.setValue("password", user.password);
  //     form.setValue("confirmPassword", user.confirmPassword);
  //     form.setValue("username", user.username);
  //     form.setValue("referralCode", user.referralCode || "");
  //   }
  //   setConfirm(false);
  // };

  return (
    <BorderCard className="w-full max-w-[731px] rounded-xl bg-white py-11 text-center">
      <div className="px-4">
        <p className="text-xl font-semibold text-[#23314A]">
          Confirm your email address
        </p>
        <p className="mx-auto mb-6 mt-3 max-w-[284px] text-center text-sm leading-[18px] text-[#98A2B3]">
          Please enter code we sent now to {user.email}
          {/* <span
            className="cursor-pointer text-primary-color-600"
            // onClick={() => inputRef.current.focus()} 
                    onClick={handleEdit}

          >
            Edit
          </span> */}
        </p>
        <div className="mx-auto w-fit">
          <OtpComponent setOtp={setOtp} inputRef={inputRef} />
        </div>
        <p className="mb-[31px] mt-6 text-sm">
          <span className="text-[#645D5D]"> Didn’t receive a code?</span>{" "}
          <span
            className={`cursor-pointer font-medium text-primary-color-600 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
            onClick={resendOtp}
          >
            {isLoading ? "Sending..." : "Resend"}
          </span>
        </p>
      </div>
      <CommonButton
        className="w-full bg-primary-color-600"
        onClick={() => {
          verify();
          setConfirm((prev) => !prev);
          setModal((prev) => !prev);
        }}
      >
        Confirm
      </CommonButton>
    </BorderCard>
  );
};

export default ConfirmEmail;
