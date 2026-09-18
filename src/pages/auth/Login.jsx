import { useState } from "react";
import AuthLayout from "./components/AuthLayout";
import SocialAuthButtons from "./components/SocialAuthButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { z } from "zod";
import { useLoginUser } from "@/hooks/students/use-login-user";
import { ClipLoader } from "react-spinners";
import Modal from "./components/Modal";
import ConfirmEmail from "./components/ConfirmEmail";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import {
  setStoredAssessmentUser,
  submitAssessmentDraftForUser,
} from "@/utils/careerAssessment";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email or username is required" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" }),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const navigate = useNavigate();
  const [queryString] = useSearchParams();
  const courseId = queryString.get("id");
  const courseTitle = queryString.get("title");
  const _r = queryString.get("_r");
  const redirectTo = queryString.get("redirectTo");
  const redirectTarget = redirectTo || _r;
  const from = redirectTarget ? decodeURIComponent(redirectTarget) : "/dashboard";

  const { mutate, isPending } = useLoginUser();

  const [confirm, setConfirm] = useState(false);
  const [user, setUser] = useState();
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const url = import.meta.env.VITE_AUTH_URL;

  const handleGoogleCallback = async (credential) => {
    try {
      const base64Url = credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const payload = JSON.parse(jsonPayload);
      if (!payload || !payload.email) {
        toast.error("Failed to retrieve user details from Google");
        return;
      }

      const loginResponse = await axios.post(`${url}/google-login`, {
        credential,
      });

      if (loginResponse.data.status === "success") {
        const { token, user: loggedUser } = loginResponse.data.data;

        Cookies.set("token", token, {
          expires: 1,
          secure: window.location.protocol === "https:",
          sameSite: "strict",
          path: "/",
        });
        Cookies.set("userRole", loggedUser.role, {
          expires: 1,
          secure: window.location.protocol === "https:",
          sameSite: "strict",
          path: "/",
        });

        const userDetails = {
          firstName: loggedUser.first_name || loggedUser.firstName || payload.given_name || "Student",
          lastName: loggedUser.last_name || loggedUser.lastName || payload.family_name || "",
          email: loggedUser.email || payload.email,
        };
        setStoredAssessmentUser(userDetails);
        submitAssessmentDraftForUser(userDetails).catch((err) =>
          console.warn("Error submitting assessment on Google login:", err)
        );

        toast.success("Login successful");
        navigate(
          redirectTarget ? from : loginResponse.data.forward_url || "/dashboard"
        );
      }
    } catch (err) {
      console.error("Google login failed:", err);
      toast.error(
        err.response?.data?.message ||
          "Google authentication failed. Please try again."
      );
    }
  };

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { errors } = form.formState;

  const handleSubmit = async (values) => {
    const user = {
      userid: values.email,
      password: values.password,
    };
    setUser(user);

    mutate(user, {
      onSuccess: ({ data }) => {
        if (data?.data?.user) {
          setUser(data.data.user);
        }
        if (
          data.data.user.role?.toLowerCase() !== "instructor" &&
          data.data.user.user_status !== "verified"
        ) {
          setConfirm(true);
          return;
        }
        Cookies.set("token", data.data.token, {
          expires: values.rememberMe ? 30 : 1,
          secure: window.location.protocol === "https:",
          sameSite: "strict",
          path: "/",
        });
        Cookies.set("userRole", data.data.user.role, {
          expires: values.rememberMe ? 30 : 1,
          secure: window.location.protocol === "https:",
          sameSite: "strict",
          path: "/",
        });

        const loggedUser = data.data.user;
        const userDetails = {
          firstName: loggedUser.first_name || loggedUser.firstName || "Student",
          lastName: loggedUser.last_name || loggedUser.lastName || "",
          email: loggedUser.email || values.email,
        };
        setStoredAssessmentUser(userDetails);
        submitAssessmentDraftForUser(userDetails).catch((err) =>
          console.warn("Error submitting assessment on password login:", err)
        );

        if (courseId) {
          navigate(
            `/preview-video-course/${courseId}/enroll?title=${courseTitle}`
          );
        } else {
          const defaultPath =
            data.data.user.role?.toLowerCase() === "instructor"
              ? "/instructor/dashboard"
              : "/dashboard";
          navigate(redirectTarget ? from : data.forward_url || defaultPath);
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
            err.response?.data?.message || "Login failed. Please try again."
          );
        }
      },
    });
  };

  const forgotPasswordLink = `/forgot-password${
    redirectTarget ? `?redirectTo=${encodeURIComponent(redirectTarget)}` : ""
  }`;

  const signupLink = `/signup${
    redirectTarget ? `?redirectTo=${encodeURIComponent(redirectTarget)}` : ""
  }`;

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
        title="Welcome back"
        subtitle="Log in to continue your career journey."
        variant="login"
      >
        <div className="w-full">
          {/* Social Auth Buttons (Stacked vertically as in Mockup) */}
          <SocialAuthButtons
            onGoogleCallback={handleGoogleCallback}
            layout="vertical"
          />

          {/* Divider */}
          <div className="relative my-6 flex items-center">
            <div className="flex-grow border-t border-gray-200" />
            <span className="flex-shrink mx-4 text-xs font-semibold uppercase text-gray-400">
              OR
            </span>
            <div className="flex-grow border-t border-gray-200" />
          </div>

          {/* Credentials Form */}
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#344054] mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="text"
                autoComplete="email username"
                placeholder="you@example.com"
                {...form.register("email")}
                className={`w-full px-3.5 py-2.5 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-[#D0D5DD]"
                } text-sm text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#D7195A]/20 focus:border-[#D7195A] transition-all`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#344054] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...form.register("password")}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${
                    errors.password ? "border-red-500" : "border-[#D0D5DD]"
                  } text-sm text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#D7195A]/20 focus:border-[#D7195A] transition-all pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#475467] select-none">
                <input
                  type="checkbox"
                  {...form.register("rememberMe")}
                  className="h-4 w-4 rounded border-gray-300 accent-[#D7195A] focus:ring-[#D7195A] cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <Link
                to={forgotPasswordLink}
                className="text-sm font-semibold text-[#D7195A] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-4 py-3 px-4 bg-[#D7195A] hover:bg-[#c0154e] active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#D7195A]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <ClipLoader size={18} color="#ffffff" />
              ) : (
                "Log in"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-[#475467]">
            Don't have an account?{" "}
            <Link
              to={signupLink}
              className="font-bold text-[#101828] hover:underline ml-1"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </AuthLayout>
    </div>
  );
};

export default Login;
