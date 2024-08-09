import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import AviNav from "@/Components/avi/AviNav";
import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { PasswordInput } from "@/Components/ui/password-input";
import { Heading, Paragraph } from "./components/Text";
import OtpComponent from "@/Components/about/OtpComponent";
import Modal from "./components/Modal";
import RegisterSuccess from "./components/RegisterSuccess";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
  referralCode: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
  connfirmPassword: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
  firstname: z
    .string()
    .min(1, { message: " first name must be at least 4 characters long" }),
  lastname: z
    .string()
    .min(1, { message: "last name must be at least 4 characters long" }),
  username: z
    .string()
    .min(1, { message: " username must be at least 4 characters long" }),
});

const SignUp = () => {
  // const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  // const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [success, setSuccess] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      username: "",
      connfirmPassword: "",
      referralCode: "",
    },
  });

  return (
    <>
      <AviNav />
      {confirm && (
        <Modal>
          <BorderCard className="rounded-xl bg-white px-[72px] py-11 text-center">
            <div className="px-4">
              <p className="text-xl font-semibold text-[#23314A]">
                Confirm your email address
              </p>
              <p className="mx-auto mb-6 mt-3 max-w-[284px] text-center text-sm leading-[18px] text-[#98A2B3]">
                Please enter code we sent now to aviplatform@gmail.com{" "}
                <span className="text-primary-color-600">Edit</span>
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
                setConfirm((prev) => !prev);
                setModal((prev) => !prev);
                setSuccess("success");
              }}
            >
              Confirm
            </CommonButton>
          </BorderCard>
        </Modal>
      )}
      <div className="py-6">
        <BorderCard className="mx-auto max-w-[465px]">
          <div className="mb-6 space-y-1">
            <Heading>Sign up and start learning</Heading>
            <Paragraph>Use your email to sign up</Paragraph>
          </div>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setConfirm((prev) => !prev);
              }}
            >
              <div className="space-y-[4px]">
                <FormInput
                  label="firstname"
                  name="firstname"
                  control={form.control}
                  type="text"
                  id="firstname"
                  placeholder=""
                />
                <FormInput
                  label="lastname"
                  name="lastname"
                  control={form.control}
                  type="text"
                  id="lastname"
                  placeholder=""
                />
                <FormInput
                  label="username"
                  name="username"
                  control={form.control}
                  type="text"
                  id="username"
                  placeholder=""
                />
                <FormInput
                  label="email"
                  name={"email"}
                  control={form.control}
                  type="email"
                  id="email"
                  placeholder=""
                />
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  label="password"
                  name="password"
                  control={form.control}
                  placeholder=""
                />
                <PasswordInput
                  id="confirmPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  label="confirm password"
                  name="confirmPassword"
                  control={form.control}
                  placeholder=""
                />
                <PasswordInput
                  id="referralCode"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  label="referral Code"
                  name="referralCode"
                  control={form.control}
                  placeholder=""
                />
              </div>
              <div className="mt-[18px] flex items-center gap-4">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="h-6 w-6 accent-[#D0D5DD]"
                />
                <p className="text-sm text-label">
                  Send me exclusive offers, tailored recommendations, and
                  educational tips.
                </p>
              </div>

              <CommonButton
                className="mt-6 w-full bg-primary-color-600 py-4 font-poppins text-base font-semibold capitalize text-white hover:bg-primary-color-600"
                type="submit"
              >
                sign up
              </CommonButton>
            </form>
          </Form>
        </BorderCard>
        <p className="flex items-center justify-center gap-4 text-center">
          <span className="text-sm text-[#514A4A]">
            Already have an account?
          </span>
          <Link
            to={"/login"}
            className="text-sm font-semibold capitalize text-primary-color-600"
          >
            sign in
          </Link>
        </p>
      </div>
      {modal && (
        <Modal>
          {success === "success" ? (
            <RegisterSuccess
              title={"Registration Successful!"}
              text={
                "You have successfully registered and can now start using your account. Enjoy your experience with us!"
              }
              setModal={setModal}
              path={"/dashboard"}
            />
          ) : (
            <RegisterSuccess />
          )}
        </Modal>
      )}
    </>
  );
};

export default SignUp;
