import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { z } from "zod";
import AuthLayout from "./components/AuthLayout";
import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import Modal from "./components/Modal";
import RegisterSuccess from "./components/RegisterSuccess";
import ConfirmEmail from "./components/ConfirmEmail";
import PasswordInput from "@/Components/ui/password-input";
import axios from "axios";
import RegisterFail from "./components/RegisterFail";
import toast from "react-hot-toast";
import { CheckCircle2, Circle } from "lucide-react";
import { passwordRegex } from "@/lib/utils";
import { route } from "@/lib/route-checker";

const loginSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    phoneNumber: z
      .string()
      .min(10, { message: "Please enter a valid phone number" })
      .regex(/^[0-9+\-\s()]*$/, {
        message: "Please enter a valid phone number format",
      }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 8 characters long " })
      .regex(passwordRegex, {
        message:
          "Ensure your password contains at least a lowercase letter, an upper case letter, a special symbol and a number",
      }),
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
    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

const SignUp = ({ isPage = true }) => {
  const [success, setSuccess] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState();
  const [queryString] = useSearchParams();
  const _r = queryString.get("_r");
  const from = _r ? decodeURIComponent(_r) : "";

  const [showReferralReminder, setShowReferralReminder] = useState(false);
  const [pendingSignupValues, setPendingSignupValues] = useState(null);
  const [skipReferralReminder, setSkipReferralReminder] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const formRef = useRef(null);

  const courseId = queryString.get("id");
  const courseTitle = queryString.get("title");
  const [searchParams] = useSearchParams();

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
      phoneNumber: "",
    },
  });

  const { isSubmitting } = form.formState;
  const currentPassword = form.watch("password") || "";

  const passwordRequirements = [
    { label: "At least 8 characters", valid: currentPassword.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(currentPassword) },
    { label: "One lowercase letter", valid: /[a-z]/.test(currentPassword) },
    { label: "One number", valid: /[0-9]/.test(currentPassword) },
    {
      label: "One special character",
      valid: /[#?!@$%^&*-]/.test(currentPassword),
    },
  ];

  const url = import.meta.env.VITE_AUTH_URL;

  const handleSubmit = async (values) => {
    try {
      const {
        firstName,
        lastName,
        password,
        email,
        username,
        referralCode,
        phoneNumber,
      } = values;

      // Validate all required fields
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !username ||
        !phoneNumber
      ) {
        toast.error("All fields are required");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      // Validate phone number format
      const phoneRegex = /^[0-9+\-\s()]*$/;
      if (!phoneRegex.test(phoneNumber)) {
        toast.error("Please enter a valid phone number");
        return;
      }

      // Validate password strength
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
      }

      // If referralCode is empty, show reminder modal (unless skipping)
      if (!values.referralCode && !skipReferralReminder) {
        setPendingSignupValues(values);
        setShowReferralReminder(true);
        return;
      }

      const users = {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        username,
        referral_code: referralCode,
        phoneNumber,
        source_url: window.location.href,
      };

      const response = await axios.post(`${url}/signup`, users, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log("Signup Response:", response.data);

      if (response.data.status === "success") {
        console.log("forward Url:", response.data.forward_url);
        if (response.data.forward_url) {
          sessionStorage.setItem(
            "signup_forward_url",
            response.data.forward_url,
          );
        } else if (from) {
          sessionStorage.setItem("signup_forward_url", from);
        }
        setSuccess("success");
        setUser({
          firstName,
          lastName,
          email,
          password,
          confirmPassword: password,
          username,
          referralCode,
          phoneNumber,
        });
        setConfirm(true);
      }
    } catch (error) {
      if (!error.response) {
        toast.error("Network error. Please check your connection.");
        return;
      }

      // Log the full error response
      console.error("Error Response:", error.response);

      // Handle specific error cases
      if (error.response.status === 409) {
        toast.error("Email or username already exists");
      } else if (error.response.status === 400) {
        toast.error(error.response.data.message || "Invalid input data");
      } else {
        toast.error(
          error.response.data.message ||
            "Registration failed. Please try again.",
        );
      }
      setSuccess("fail");
    } finally {
      setSkipReferralReminder(false);
    }
  };

  const code = searchParams.get("code");
  if (code) {
    form.setValue("referralCode", code);
  }

  // Add viewport meta tag for iOS
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  // Add iOS-specific input handling
  const handleInputFocus = (e) => {
    // Prevent zoom on focus for iOS
    e.target.style.fontSize = "16px";
  };

  return (
    <div className="">
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

      {showReferralReminder && (
        <Modal>
          <div className="w-full max-w-[350px] rounded-lg bg-white p-8 text-center shadow-lg">
            <h2 className="mb-2 text-lg font-semibold text-[#CC1747]">
              Did you enter a referral code?
            </h2>
            <p className="mb-4 text-sm text-gray-700">
              If you have a referral code, please enter it before signing up to
              enjoy referral benefits. You cannot add it later.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <button
                className="rounded bg-[#CC1747] px-4 py-2 text-white hover:bg-[#b30e3b]"
                onClick={() => {
                  setShowReferralReminder(false);
                  setPendingSignupValues(null);
                  // Do not proceed, let user enter code
                }}
              >
                I haven't inputted
              </button>

              <button
                className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                onClick={() => {
                  setShowReferralReminder(false);
                  setSkipReferralReminder(true);
                  if (pendingSignupValues) {
                    Object.entries(pendingSignupValues).forEach(
                      ([key, value]) => {
                        form.setValue(key, value);
                      },
                    );
                    form.setValue("referralCode", "");
                    setTimeout(() => {
                      if (formRef.current) {
                        formRef.current.requestSubmit();
                      }
                    }, 0);
                    setPendingSignupValues(null);
                  }
                }}
              >
                I wasn't referred
              </button>
            </div>
          </div>
        </Modal>
      )}

      <AuthLayout
        title="Sign up and start learning"
        subtitle="Use your email to sign up"
        isMobileStacked={true}
        isPage={isPage}
        alignTop={true}
      >
        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="">
              <div className={`${isPage ? "" : "grid-cols-2"} grid gap-x-3`}>
                <FormInput
                  label="firstname"
                  name="firstName"
                  control={form.control}
                  type="text"
                  id="firstName"
                  placeholder=""
                  onFocus={handleInputFocus}
                  autoComplete="given-name"
                  autoCapitalize="words"
                  absoluteError
                />
                <FormInput
                  label="lastname"
                  name="lastName"
                  control={form.control}
                  type="text"
                  id="lastName"
                  placeholder=""
                  onFocus={handleInputFocus}
                  autoComplete="family-name"
                  autoCapitalize="words"
                  absoluteError
                />
              </div>
              <div className={`${isPage ? "" : "grid-cols-2"} grid gap-x-3`}>
                <FormInput
                  label="username"
                  name="username"
                  control={form.control}
                  type="text"
                  id="username"
                  placeholder=""
                  onFocus={handleInputFocus}
                  autoComplete="username"
                  autoCapitalize="words"
                  absoluteError
                />
                <FormInput
                  label="email"
                  name={"email"}
                  control={form.control}
                  type="email"
                  id="email"
                  placeholder=""
                  onFocus={handleInputFocus}
                  autoComplete="email"
                  autoCapitalize="none"
                  absoluteError
                />
              </div>
              <FormInput
                label="Phone Number"
                name="phoneNumber"
                control={form.control}
                type="tel"
                id="phoneNumber"
                placeholder=""
                autoComplete="tel"
                absoluteError
              />
              <div className={`${isPage ? "" : "grid-cols-2"} grid gap-x-3`}>
                <PasswordInput
                  id="password"
                  autoComplete="new-password"
                  label="password"
                  name="password"
                  control={form.control}
                  placeholder=""
                  onFocus={(e) => {
                    handleInputFocus(e);
                    setIsPasswordFocused(true);
                  }}
                  onBlur={() => {
                    setIsPasswordFocused(false);
                  }}
                  absoluteError
                />
                <PasswordInput
                  id="confirmPassword"
                  autoComplete="new-password"
                  label="confirm password"
                  name="confirmPassword"
                  control={form.control}
                  placeholder=""
                  onFocus={(e) => {
                    handleInputFocus(e);
                    setIsPasswordFocused(true);
                  }}
                  onBlur={() => {
                    setIsPasswordFocused(false);
                  }}
                  absoluteError
                />
              </div>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isPasswordFocused
                    ? "mb-4 mt-2 grid-rows-[1fr] opacity-100"
                    : "mb-0 mt-0 grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-2 rounded-md border border-gray-100 bg-gray-50 p-4">
                    <p className="mb-1 text-xs font-semibold text-gray-700">
                      Password must contain:
                    </p>
                    {passwordRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        {req.valid ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 transition-colors duration-300" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-300 transition-colors duration-300" />
                        )}
                        <span
                          className={`text-xs transition-colors duration-300 ${req.valid ? "text-green-700" : "text-gray-500"}`}
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <FormInput
                label="Referral Code (Optional)"
                name="referralCode"
                control={form.control}
                type="text"
                id="referralCode"
                placeholder=""
                onFocus={handleInputFocus}
                autoComplete="off"
                absoluteError
              />
            </div>
            <div className="mt-[10px] flex items-center gap-4">
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

            <div className="mt-[10px] flex items-center gap-4">
              <input
                type="checkbox"
                name=""
                id=""
                className="h-4 w-4 accent-[#D0D5DD]"
                required
              />

              <p className="text-sm text-label">
                I agree to the terms and conditions
              </p>
            </div>

            <CommonButton
              className="mt-4 w-full bg-primary-color-600 py-4 font-poppins text-base font-semibold capitalize text-white hover:bg-primary-color-600"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "loading..." : " sign up"}
            </CommonButton>
          </form>
        </Form>

        <p className="mt-4 flex items-center justify-center gap-4 text-center">
          <span className="text-sm text-[#514A4A]">
            Already have an account?
          </span>
          <Link
            to={
              route("/login", courseId, courseTitle) +
              (_r
                ? (courseId || courseTitle ? "&" : "?") +
                  `_r=${encodeURIComponent(_r)}`
                : "")
            }
            className="text-sm font-semibold capitalize text-primary-color-600"
          >
            sign in
          </Link>
        </p>
      </AuthLayout>

      {modal && (
        <Modal>
          {success === "success" ? (
            <RegisterSuccess
              title={"Registration Successful!"}
              text={
                "You have successfully registered and can now start using your account. Enjoy your experience with us!"
              }
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
