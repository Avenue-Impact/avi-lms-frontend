import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import { z } from "zod";
import AuthLayout from "./components/AuthLayout";
import ReferralAuthLayout from "./components/ReferralAuthLayout";
import SocialAuthButtons from "./components/SocialAuthButtons";
import Modal from "./components/Modal";
import RegisterSuccess from "./components/RegisterSuccess";
import ConfirmEmail from "./components/ConfirmEmail";
import RegisterFail from "./components/RegisterFail";
import toast from "react-hot-toast";
import { Eye, EyeOff, Tag } from "lucide-react";
import axios from "axios";
import { route } from "@/lib/route-checker";
import { useOtpGate } from "@/context/OtpGateContext";
import PhoneInput from "@/Components/ui/phone-input";
import { Form } from "@/Components/ui/form";

const baseSignupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9+\-\s()]*$/.test(val), {
      message: "Please enter a valid phone number format",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  agreeTerms: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to the Terms of Service and Privacy Policy",
    }),
  }),
  referralCode: z.string().optional(),
});

const SignUp = ({ isPage = true }) => {
  const { requestOtpVerification } = useOtpGate();
  const navigate = useNavigate();
  const location = useLocation();

  const [success, setSuccess] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showReferralInput, setShowReferralInput] = useState(false);
  const [isReferralLocked, setIsReferralLocked] = useState(false);

  const [queryString] = useSearchParams();
  const _r = queryString.get("_r");
  const redirectTo = queryString.get("redirectTo");
  const redirectTarget = redirectTo || _r;
  const from = redirectTarget ? decodeURIComponent(redirectTarget) : "";

  const courseId = queryString.get("id");
  const courseTitle = queryString.get("title");

  // Determine if this signup is a referral from the Partner page
  const isPartnerReferral =
    queryString.get("r") === "student" && !!queryString.get("t");

  const form = useForm({
    resolver: zodResolver(baseSignupSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      agreeTerms: false,
      referralCode: "",
    },
  });

  const { isSubmitting, errors } = form.formState;
  const url = import.meta.env.VITE_AUTH_URL;

  // Auto-populate referral code from query params and lock it if present
  useEffect(() => {
    const urlReferral =
      queryString.get("code") ||
      queryString.get("ref") ||
      queryString.get("referral_code") ||
      queryString.get("referralCode");

    if (urlReferral) {
      const cleanCode = urlReferral.trim();
      form.setValue("referralCode", cleanCode);
      setIsReferralLocked(true);
      setShowReferralInput(true);
    }
  }, [queryString]);

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
        Cookies.set("userRole", loggedUser.role || "student", {
          expires: 1,
          secure: window.location.protocol === "https:",
          sameSite: "strict",
          path: "/",
        });

        toast.success("Registration successful!");
        navigate(from || "/dashboard");
      }
    } catch (err) {
      console.error("Google authentication error:", err);
      toast.error(
        err.response?.data?.message ||
          "Google authentication failed. Please try again."
      );
    }
  };

  const handleSubmit = async (values) => {
    try {
      const { firstName, lastName, password, email, phoneNumber, referralCode } = values;

      // Auto-generate clean username from email or name
      const emailPrefix = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const username =
        emailPrefix.length >= 3
          ? `${emailPrefix}${randomSuffix}`
          : `user${randomSuffix}`;

      const users = {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
        email: email.trim().toLowerCase(),
        password,
        username,
        phoneNumber: phoneNumber?.trim() || undefined,
        referral_code: referralCode ? referralCode.trim() : undefined,
        source_url: window.location.href,
      };

      const verified = await requestOtpVerification(email);
      if (!verified) return;

      const response = await axios.post(`${url}/signup`, users, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.data.status === "success") {
        if (response.data.forward_url) {
          sessionStorage.setItem("signup_forward_url", response.data.forward_url);
        } else if (from) {
          sessionStorage.setItem("signup_forward_url", from);
        }

        if (response.data.token) {
          Cookies.set("token", response.data.token, {
            expires: 1,
            secure: window.location.protocol === "https:",
            sameSite: "strict",
            path: "/",
          });
          Cookies.set("userRole", response.data.newUser?.role || "student", {
            expires: 1,
            secure: window.location.protocol === "https:",
            sameSite: "strict",
            path: "/",
          });
          toast.success("Registration successful!");
          navigate(from || "/dashboard");
          return;
        }

        setSuccess("success");
        setUser({
          firstName,
          lastName,
          email,
          password,
          confirmPassword: password,
          username,
          phoneNumber,
          referralCode,
        });
        setConfirm(true);
      }
    } catch (error) {
      if (!error.response) {
        toast.error("Network error. Please check your connection.");
        return;
      }

      if (error.response.status === 409) {
        toast.error("Email or username already exists");
      } else if (error.response.status === 400) {
        toast.error(error.response.data.message || "Invalid input data");
      } else {
        toast.error(
          error.response.data.message ||
            "Registration failed. Please try again."
        );
      }
      setSuccess("fail");
    }
  };

  const loginLink =
    route("/login", courseId, courseTitle) +
    (_r
      ? (courseId || courseTitle ? "&" : "?") + `_r=${encodeURIComponent(_r)}`
      : "");

  // If this is a partner referral, delegate to ReferralAuthLayout to preserve custom partner flow
  if (isPartnerReferral) {
    return (
      <ReferralAuthLayout
        title="Register Now"
        isMobileStacked={true}
        isPage={isPage}
        alignTop={true}
        leftHeadline="You've been invited!"
        leftSubtext="Join learners gaining practical knowledge, career support, and industry-ready experience through Avenue Impact."
      >
        {/* Partner referral standard form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  First name
                </label>
                <input
                  type="text"
                  placeholder="David"
                  {...form.register("firstName")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0D5DD] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Adeyemi"
                  {...form.register("lastName")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0D5DD] text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...form.register("email")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0D5DD] text-sm"
              />
            </div>
            <PhoneInput
              label={
                <span className="block text-xs font-semibold text-gray-700 mb-1 normal-case">
                  Phone number <span className="text-gray-400 font-normal">(optional)</span>
                </span>
              }
              name="phoneNumber"
              control={form.control}
              id="partnerPhoneNumber"
              placeholder="7123 456789"
              labelClass="!text-xs !font-semibold !text-gray-700 !normal-case"
            />
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                {...form.register("password")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0D5DD] text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#D7195A] text-white rounded-xl font-semibold"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>
        </Form>
      </ReferralAuthLayout>
    );
  }

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
        title="Create your account"
        subtitle="Start your career transformation — free to join."
        variant="signup"
        isPage={isPage}
      >
        <div className="w-full">
          {/* Social Auth Buttons (Side-by-side grid as in Mockup) */}
          <SocialAuthButtons
            onGoogleCallback={handleGoogleCallback}
            layout="grid"
          />

          {/* Divider */}
          <div className="relative my-6 flex items-center">
            <div className="flex-grow border-t border-gray-200" />
            <span className="flex-shrink mx-4 text-xs font-normal text-gray-400">
              or
            </span>
            <div className="flex-grow border-t border-gray-200" />
          </div>

          {/* Registration Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {/* First & Last Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-[#344054] mb-1.5"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder="David"
                    {...form.register("firstName")}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      errors.firstName ? "border-red-500" : "border-[#D0D5DD]"
                    } text-sm text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#D7195A]/20 focus:border-[#D7195A] transition-all`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-[#344054] mb-1.5"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Adeyemi"
                    {...form.register("lastName")}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      errors.lastName ? "border-red-500" : "border-[#D0D5DD]"
                    } text-sm text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#D7195A]/20 focus:border-[#D7195A] transition-all`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#344054] mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
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

              {/* Phone Number (Optional) with Country Code Select */}
              <PhoneInput
                label={
                  <span className="block text-sm font-semibold text-[#344054] mb-1.5 normal-case font-sans">
                    Phone number <span className="text-xs font-normal text-[#667085]">(optional)</span>
                  </span>
                }
                name="phoneNumber"
                control={form.control}
                id="phoneNumber"
                placeholder="7123 456789"
                labelClass="!text-sm !font-semibold !text-[#344054] !normal-case !font-sans"
              />

            {/* Password */}
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
                  autoComplete="new-password"
                  placeholder="Create a password"
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
              <p className="mt-1.5 text-xs text-[#667085]">
                Minimum 8 characters, one number
              </p>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Optional Referral Code Toggle */}
            {showReferralInput ? (
              <div className="pt-1">
                <label
                  htmlFor="referralCode"
                  className="block text-xs font-medium text-gray-600 mb-1"
                >
                  Referral Code (Optional)
                </label>
                <input
                  id="referralCode"
                  type="text"
                  disabled={isReferralLocked}
                  placeholder="Enter referral code"
                  {...form.register("referralCode")}
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${
                    isReferralLocked
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
                      : "border-gray-300 text-gray-800"
                  }`}
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowReferralInput(true)}
                className="text-xs text-[#667085] hover:text-[#D7195A] flex items-center gap-1.5 transition-colors pt-1"
              >
                <Tag size={13} />
                <span>Have a referral code?</span>
              </button>
            )}

            {/* Terms of Service & Privacy Policy Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#475467] select-none leading-relaxed">
                <input
                  type="checkbox"
                  {...form.register("agreeTerms")}
                  className="h-4 w-4 mt-0.5 rounded border-gray-300 accent-[#D7195A] focus:ring-[#D7195A] cursor-pointer shrink-0"
                />
                <span>
                  I agree to Avenue Impact's{" "}
                  <Link
                    to="/terms-of-service"
                    target="_blank"
                    className="underline text-gray-800 hover:text-[#D7195A]"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    target="_blank"
                    className="underline text-gray-800 hover:text-[#D7195A]"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.agreeTerms.message}
                </p>
              )}
            </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3 px-4 bg-[#D7195A] hover:bg-[#c0154e] active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#D7195A]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </form>
          </Form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-[#475467]">
            Already have an account?{" "}
            <Link
              to={loginLink}
              className="font-bold text-[#101828] hover:underline ml-1"
            >
              Log in
            </Link>
          </p>
        </div>
      </AuthLayout>

      {modal && (
        <Modal>
          {success === "success" ? (
            <RegisterSuccess
              title="Registration Successful!"
              text="You have successfully registered and can now start using your account. Enjoy your experience with us!"
              setModal={setModal}
              path={from || "/dashboard"}
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
