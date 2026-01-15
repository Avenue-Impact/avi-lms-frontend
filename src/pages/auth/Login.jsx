import BorderCard from "@/Components/BorderCard";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Heading, Paragraph } from "./components/Text";

import { CommonButton } from "@/Components/ui/button";
import PasswordInput from "@/Components/ui/password-input";
import toast from "react-hot-toast";

import Cookies from "js-cookie";

import { useLoginUser } from "@/hooks/students/use-login-user";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import ConfirmEmail from "./components/ConfirmEmail";
import Modal from "./components/Modal";

const loginSchema = z.object({
  username: z.string().min(1, { message: "name is required" }),
  password: z
    .string()
    .min(4, { message: "password must be at least 4 characters long" }),
});

const Login = () => {
  const navigate = useNavigate();
  const [queryString] = useSearchParams();
  const courseId = queryString.get("id");
  const courseTitle = queryString.get("title");

  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const { mutate, isPending } = useLoginUser();

  const handleSubmit = async (values) => {
    const user = {
      userid: values.username,
      password: values.password,
    };

    mutate(user, {
      onSuccess: ({ data }) => {
        console.log("Login Success Data:", data); // DEBUG: Check full response
        console.log("Token from backend:", data?.data?.token); // DEBUG: Check specific token path

        // Handle Pending User (OTP Sent, No Token)
        if (data?.data?.user?.user_status === 'pending') {
             toast.success(data?.message || "Verification code sent to your email.");
             setCurrentUser(data.data.user);
             setShowModal(true);
             return;
        }

        if (!data?.data?.token) {
             toast.error("Login succeeded but no token received!");
             return;
        }

        Cookies.set("token", data.data.token, {
          expires: 1,
          secure: false,
          sameSite: 'Lax', // Relaxed from 'Strict' for testing
          path: '/'
        });

        console.log("Cookie Check immediately after set:", Cookies.get("token")); // DEBUG: Verify set

        if (courseId) {
          navigate(
            `/preview-video-course/${courseId}/enroll?title=${courseTitle}`,
          );
        } else {
          navigate("/dashboard");
        }
      },
      onError: (err) => {
        if (!err.response) {
          toast.error("Network error. Please check your connection.");
          return;
        }
        
        if (err.response.status === 401) {
          toast.error("Invalid username or password");
        } else if (err.response.status === 403) {
          toast.error("Account is locked. Please contact support.");
        } else {
          toast.error(err.response?.data?.message || "Login failed. Please try again.");
        }
      },
    });
  };

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="flex min-h-[calc(100vh-100.547px)] w-full items-center justify-center px-4">
      <div className="w-full max-w-[465px] py-10">
        <BorderCard className="mx-auto">
          <div className="mb-8 space-y-1">
            <Heading>Welcome back!</Heading>
            <Paragraph>Use your email to sign in to your dashboard</Paragraph>
          </div>
          <Form {...form}>
            <form
              action=""
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormInput
                name="username"
                label="Username/Email"
                placeholder="Enter your username or email"
                id="username"
                type="text"
                control={form.control}
                autoComplete="username"
                className="w-full"
              />
              <PasswordInput
                id="password"
                autoComplete="current-password"
                label="Password"
                name="password"
                control={form.control}
                placeholder="Enter your password"
                className="w-full"
              />

              <Link
                to={"/forgot-password"}
                className="block text-sm font-semibold capitalize text-primary-color-600 hover:text-primary-color-700"
              >
                Forgot password?
              </Link>

              <CommonButton
                className="mt-8 w-full bg-primary-color-600 font-poppins text-[16px] font-[500] capitalize text-white hover:bg-primary-color-700 disabled:opacity-50"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <ClipLoader size={20} color={"#fff"} />
                ) : (
                  "Sign in"
                )}
              </CommonButton>
            </form>
          </Form>
          
          <p className="mt-6 flex items-center justify-center gap-4 text-center">
            <span className="text-sm text-[#514A4A]">
              Don't have an account?
            </span>
            <Link
              to={"/signup"}
              className="text-sm font-semibold capitalize text-primary-color-600 hover:text-primary-color-700"
            >
              Sign up
            </Link>
          </p>
        </BorderCard>
      </div>
      {showModal && (
        <Modal>
            <ConfirmEmail
                setConfirm={setShowModal}
                setModal={setShowModal}
                setSuccess={(status) => {
                    if (status === 'success') {
                         setShowModal(false);
                         // Optionally fetch profile or redirect
                    }
                }}
                user={currentUser}
                form={{}}
            />
        </Modal>
      )}
    </div>
  );
};

export default Login;
