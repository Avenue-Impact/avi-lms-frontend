import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { Heading, Paragraph } from "./components/Text";
import Modal from "./components/Modal";
import RegisterSuccess from "./components/RegisterSuccess";
import ConfirmEmail from "./components/ConfirmEmail";
import PasswordInput from "@/Components/ui/password-input";
import axios from "axios";
import RegisterFail from "./components/RegisterFail";
import toast from "react-hot-toast";
import { passwordRegex } from "@/lib/utils";

const loginSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 8 characters long " })
      .regex(passwordRegex, {
        message:
          "Ensure your password contains at least a lowercase letter, an upper case letter, a special symbol and a number",
      }),
    referralCode: z.string().optional(),
    confirmPassword: z
      .string()
      .min(4, { message: "Password must be at least 8 characters ong" })
      .regex(passwordRegex, {
        message:
          "Ensure your password contains at least a lowercase letter, an upper case letter, a special symbol and a number",
      }),
    firstName: z
      .string()
      .min(1, { message: " first name must be at least 4 characters long" }),
    lastName: z
      .string()
      .min(1, { message: "last name must be at least 4 characters long" }),
    username: z
      .string()
      .min(1, { message: " username must be at least 4 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const [success, setSuccess] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      username: "",
      confirmPassword: "",
      referralCode: "",
    },
  });

  const { isSubmitting } = form.formState;

  const url = import.meta.env.VITE_AUTH_URL;

  const handleSubmit = async (values) => {
    console.log(values);
    const { firstName, lastName, password, email, username } = values;

    const users = {
      firstname: firstName,
      lastname: lastName,
      email,
      password,
      username,
    };

    try {
      const response = await axios.post(`${url}/signup`, users);

      console.log(response.data.status);

      if (response.data.status === "success") {
        console.log(response.data);
        setSuccess("success");

        setUser(response.data.newUser);
        setConfirm(true);

        console.log(user);
      }
    } catch (error) {
      if (!error) return toast.error("network fail");
      setSuccess("fail");

      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <div className="min-h-screen">
      {confirm && (
        <Modal>
          <ConfirmEmail
            setConfirm={setConfirm}
            setModal={setModal}
            setSuccess={setSuccess}
            user={user}
          />
        </Modal>
      )}
      <div className="flex w-full items-center justify-center px-6 2xl:h-[calc(100vh-100.547px)]">
        <div className="w-fit">
          <div className="py-6">
            <BorderCard className="mx-auto max-w-[465px]">
              <div className="mb-6 space-y-1">
                <Heading>Sign up and start learning</Heading>
                <Paragraph>Use your email to sign up</Paragraph>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <div className="space-y-[4px]">
                    <FormInput
                      label="firstname"
                      name="firstName"
                      control={form.control}
                      type="text"
                      id="firstName"
                      placeholder=""
                    />
                    <FormInput
                      label="lastname"
                      name="lastName"
                      control={form.control}
                      type="text"
                      id="lastName"
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
                      autoComplete="new-password"
                      label="password"
                      name="password"
                      control={form.control}
                      placeholder=""
                    />
                    <PasswordInput
                      id="confirmPassword"
                      autoComplete="new-password"
                      label="confirm password"
                      name="confirmPassword"
                      control={form.control}
                      placeholder=""
                    />
                    <PasswordInput
                      id="referralCode"
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
                      required
                    />
                    <p className="text-sm text-label">
                      Send me exclusive offers, tailored recommendations, and
                      educational tips.
                    </p>
                  </div>

                  <CommonButton
                    className="mt-6 w-full bg-primary-color-600 py-4 font-poppins text-base font-semibold capitalize text-white hover:bg-primary-color-600"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "loading..." : " sign up"}
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
        </div>
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
              path={"/login"}
            />
          ) : (
            <RegisterFail setModal={setModal} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default SignUp;
