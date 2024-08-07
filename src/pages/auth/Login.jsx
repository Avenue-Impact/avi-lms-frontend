import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import AviNav from "@/Components/avi/AviNav";
import BorderCard from "@/Components/BorderCard";
import { Heading, Paragraph } from "./components/Text";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { PasswordInput } from "@/Components/ui/password-input";
import { CommonButton } from "@/Components/ui/button";
import Modal from "./components/Modal";
import RegisterSuccess from "./components/RegisterSuccess";
import RegisterFail from "./components/RegisterFail";
import PasswordResetSucess from "./components/PasswordResetSucess";

const loginSchema = z.object({
  username: z.string().min(1, { message: "name is required" }),
  password: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
});

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <>
      <AviNav />
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
              onSubmit={() => navigate("/dashboard")}
            >
              <FormInput
                name="username"
                label="Username/Email"
                placeholder=""
                id="username"
                type="text"
                control={form.control}
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

              <Link
                to={"/forgot-password"}
                className="block text-sm font-semibold capitalize text-primary-color-600"
              >
                forgot password?
              </Link>

              <CommonButton
                className="mt-8 w-full bg-primary-color-600 font-poppins text-xl font-semibold capitalize text-white hover:bg-primary-color-600"
                type="submit"
              >
                sign in
              </CommonButton>
            </form>
          </Form>
        </BorderCard>
        <p className="mt-6 flex items-center justify-center gap-4 text-center">
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
      {/* modals */}

      {/*  <Modal>
      {showModal &&  <PasswordResetSucess />}
      </Modal> */}
    </>
  );
};

export default Login;
