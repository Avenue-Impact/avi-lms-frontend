import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BorderCard from "@/Components/BorderCard";
import { Heading } from "./components/Text";
import { Form } from "@/Components/ui/form";
import { CommonButton } from "@/Components/ui/button";
import Modal from "./components/Modal";
import RegisterSuccess from "./components/RegisterSuccess";
import PasswordInput from "@/Components/ui/password-input";
import { useCredentials } from "@/hooks/useCredentials";
import { passwordRegex } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const loginSchema = z
  .object({
    password: z
      .string()
      .min(4, { message: "Password must be at least 8 characters long " })
      .regex(passwordRegex, {
        message:
          "Ensure your password contains at least a lowercase letter, an upper case letter, a special symbol and a number",
      }),
    confirmPassword: z
      .string()
      .min(4, { message: "Password must be at least 8 characters long " }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

const url = import.meta.env.VITE_AUTH_URL;

const NewPassword = () => {
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");

  const { setInfo, info } = useCredentials();

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values) => {
    const password = values.password;

    try {
      const response = await axios.post(`${url}/resetPassword`, {
        ...info,
        password,
      });

      if (response.data.status === "success") {
        toast.success(response.data.message);
        navigate("/login");
        setInfo((state) => {
          return {
            ...state,
            email: "",
            otp: "",
          };
        });
      }
    } catch (error) {
      toast.error(
        error.response.data.error.otp.msg || error.response.data.message,
      );
      navigate("/forgot-password");
    }
  };

  return (
    <>
      {modal && (
        <Modal>
          <RegisterSuccess
            title={"Password Reset Successful!"}
            text={
              "Your password has been successfully reset. You can now log in with your new password."
            }
            setModal={setModal}
            path={"/login"}
          />
        </Modal>
      )}
      <div className="flex h-[calc(100vh-100.547px)] w-full items-center justify-center px-6 py-10">
        <BorderCard className="mx-auto max-w-[465px]">
          <div className="mb-8 space-y-1">
            <Heading>Create Your New Password</Heading>
          </div>
          <Form {...form}>
            <form
              action=""
              className="space-y-2"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                label="Enter Password"
                name="password"
                control={form.control}
                placeholder=""
              />
              <PasswordInput
                id="confirmPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                label="Confirm Password"
                name="confirmPassword"
                control={form.control}
                placeholder=""
              />

              <p className="text-[12px] italic leading-[17.4px] text-primary-color-600">
                Make sure your new password is different from any previous
                passwords
              </p>

              <CommonButton
                className="mt-8 w-full bg-primary-color-600 font-poppins text-xl font-semibold capitalize text-white hover:bg-primary-color-600"
                type="submit"
              >
                reset
              </CommonButton>
            </form>
          </Form>
        </BorderCard>
      </div>
    </>
  );
};

export default NewPassword;
