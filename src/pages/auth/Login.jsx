import { useState } from "react";
import AuthLayout from "./components/AuthLayout";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { z } from "zod";

import { CommonButton } from "@/Components/ui/button";
import PasswordInput from "@/Components/ui/password-input";
import toast from "react-hot-toast";

import Cookies from "js-cookie";

import { useLoginUser } from "@/hooks/students/use-login-user";
import { ClipLoader } from "react-spinners";
import Modal from "./components/Modal";
import ConfirmEmail from "./components/ConfirmEmail";

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
  const _r = queryString.get("_r");
  const from = _r ? decodeURIComponent(_r) : "/dashboard";

  const { mutate, isPending } = useLoginUser();

  const [confirm, setConfirm] = useState(false);
  const [user, setUser] = useState();
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (values) => {
    const user = {
      userid: values.username,
      password: values.password,
    };
    setUser(user);

    mutate(user, {
      onSuccess: ({ data }) => {
        if (
          data.data.user.role?.toLowerCase() !== "instructor" &&
          data.data.user.user_status !== "verified"
        ) {
          setConfirm(true);
          return;
        }
        Cookies.set("token", data.data.token, {
          expires: 1,
          secure: true,
          sameSite: "strict",
          path: "/",
        });
        Cookies.set("userRole", data.data.user.role, {
          expires: 1,
          secure: true,
          sameSite: "strict",
          path: "/",
        });

        if (courseId) {
          navigate(
            `/preview-video-course/${courseId}/enroll?title=${courseTitle}`,
          );
        } else {
          const defaultPath = data.data.user.role?.toLowerCase() === "instructor" 
            ? "/instructor/dashboard" 
            : "/dashboard";
          navigate(data.forward_url || (_r ? from : defaultPath));
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
          toast.error(
            err.response?.data?.message || "Login failed. Please try again.",
          );
        }
      },
    });
  };

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div>
      {confirm && (
        <Modal>
          <ConfirmEmail
            setConfirm={setConfirm}
            setModal={setModal}
            setSuccess={setSuccess}
            user={user}
            form={form}
          />
        </Modal>
      )}

      <AuthLayout
        title="Welcome back!"
        subtitle="Use your email to sign in to your dashboard"
        isMobileStacked={true}
        leftHeadline={"Welcome Back\nto Avenue Impact"}
        leftSubtext="Log in to continue your learning journey, track your progress, and access your courses anytime. "
      >
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
              className="hover:text-primary-color-700 block text-sm font-semibold capitalize text-primary-color-600"
            >
              Forgot password?
            </Link>

            <CommonButton
              className="hover:bg-[#a8103a] mt-8 w-full bg-[#C41E3A] font-poppins text-[16px] font-[500] capitalize text-white disabled:opacity-50 rounded-lg py-3"
              type="submit"
              disabled={isPending}
            >
              {isPending ? <ClipLoader size={20} color={"#fff"} /> : "Log In"}
            </CommonButton>
          </form>
        </Form>

        <p className="mt-6 flex items-center justify-center gap-4 text-center">
          <span className="text-sm text-[#514A4A]">Don't have an account?</span>
          <Link
            to={`/signup${_r ? `?_r=${encodeURIComponent(_r)}` : ""}`}
            className="hover:text-primary-color-700 text-sm font-semibold capitalize text-primary-color-600"
          >
            Sign up
          </Link>
        </p>
      </AuthLayout>
    </div>
  );
};

export default Login;
