import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { Link, useNavigate } from "react-router-dom";
import { Heading, Paragraph } from "./components/Text";
import BorderCard from "@/Components/BorderCard";
import Modal from "./components/Modal";
import OtpComponent from "@/Components/about/OtpComponent";
import axios from "axios";
import toast from "react-hot-toast";
import { useCredentials } from "@/hooks/useCredentials";

const forgetPasswordSchema = z.object({
  email: z.string().min(4, { message: "field is required" }),
});

const url = import.meta.env.VITE_AUTH_URL;

const ForgotPassword = () => {
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const { otp, setOtp, setInfo } = useCredentials();

  const verify = () => {
    setInfo((state) => {
      return { ...state, otp };
    });

    navigate("/new-password");
  };

  const handleSubmit = async (username) => {
    try {
      const response = await axios.post(`${url}/forgetPassword`, username);

      if (response?.data?.status === "success") {
        toast.success(response.data.message);
        setModal(true);

        setInfo((state) => {
          return { ...state, email: username.email };
        });
      }
    } catch (error) {
      if (!error) return toast.error("network fail");

      if (error.response.status === 404) return toast.error("Email not found");

      if (error.response.status === 400) return toast.error("invalid email");

      toast.error(
        error.response?.data?.error?.msg || error.response.data.message,
      );
    }
  };

  const form = useForm({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;
  const { info } = useCredentials();

  return (
    <div className="px-6">
      {modal && (
        <Modal>
          <BorderCard className="w-full max-w-[731px] rounded-xl bg-white py-11 text-center">
            <div className="px-4">
              <p className="text-xl font-semibold text-[#23314A]">
                Password Reset Email Sent!
              </p>
              <p className="mx-auto mb-6 mt-3 max-w-[284px] text-center text-sm leading-[18px] text-[#98A2B3]">
                Please enter code we sent now to {info.email}
              </p>
              <div className="mx-auto w-fit">
                <OtpComponent setOtp={setOtp} />
              </div>
              <p className="mb-[31px] mt-6 text-sm">
                <span className="text-[#645D5D]"> Didn’t receive a code?</span>{" "}
                <span className="font-medium text-primary-color-600">
                  Resend
                </span>
              </p>
            </div>
            <CommonButton
              className="w-full bg-primary-color-600"
              onClick={verify}
            >
              Confirm
            </CommonButton>
          </BorderCard>
        </Modal>
      )}
      <div className="flex h-[calc(100vh-100.547px)] w-full items-center justify-center">
        <div className="py-10">
          <BorderCard className="mx-auto max-w-[465px]">
            <div className="mb-8 space-y-1">
              <Heading>Welcome back!</Heading>
              <Paragraph>Use your email to sign in to your dashboard</Paragraph>
            </div>
            <Form {...form}>
              <form
                action=""
                className="space-y-2"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <FormInput
                  name="email"
                  label="Username/Email"
                  placeholder=""
                  id="email"
                  type="text"
                  control={form.control}
                />

                <CommonButton
                  className="mt-8 w-full bg-primary-color-600 font-poppins text-xl font-semibold capitalize text-white hover:bg-primary-color-600"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "loading ..." : "reset"}
                </CommonButton>
              </form>
            </Form>
          </BorderCard>
          <p className="mt-10 flex items-center justify-center gap-4 text-center">
            <span className="text-sm text-[#514A4A]">
              Already have an account?
            </span>
            <Link
              to={"/signup"}
              className="text-sm font-semibold capitalize text-primary-color-600"
            >
              sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
