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
import AviNav from "@/Components/avi/AviNav";
import Modal from "./components/Modal";
import OtpComponent from "@/Components/about/OtpComponent";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
});

const ForgotPassword = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setModal((prev) => !prev);
  };

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <AviNav />
      {modal && (
        <Modal>
          <BorderCard className="rounded-xl bg-white px-[72px] py-11 text-center">
            <div className="px-4">
              <p className="text-xl font-semibold text-[#23314A]">
                Password Reset Email Sent!
              </p>
              <p className="mx-auto mb-6 mt-3 max-w-[284px] text-center text-sm leading-[18px] text-[#98A2B3]">
                Please enter code we sent now to aviplatform@gmail.com{" "}
              </p>
              <OtpComponent />
              <p className="mb-[31px] mt-6 text-sm">
                <span className="text-[#645D5D]"> Didn’t receive a code?</span>{" "}
                <span className="font-medium text-primary-color-600">
                  Resend
                </span>
              </p>
            </div>
            <CommonButton
              className="w-full bg-primary-color-600"
              onClick={() => {
                setModal((prev) => !prev);
                navigate("/new-password");
              }}
            >
              Confirm
            </CommonButton>
          </BorderCard>
        </Modal>
      )}
      <div className="py-10">
        <BorderCard className="mx-auto max-w-[465px]">
          <div className="mb-8 space-y-1">
            <Heading>Welcome back!</Heading>
            <Paragraph>Use your email to sign in to your dashboard</Paragraph>
          </div>
          <Form {...form}>
            <form action="" className="space-y-2">
              <FormInput
                name="username"
                label="Username/Email"
                placeholder=""
                id="username"
                type="text"
                control={form.control}
              />

              <CommonButton
                className="mt-8 w-full bg-primary-color-600 font-poppins text-xl font-semibold capitalize text-white hover:bg-primary-color-600"
                type="submit"
                onClick={handleSubmit}
              >
                reset
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
    </>
  );
};

export default ForgotPassword;
