import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import GoogleAuthButton from "./components/GoogleAuthButton";
import { z } from "zod";
import AuthLayout from "./components/AuthLayout";
import ReferralAuthLayout from "./components/ReferralAuthLayout";
import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import PhoneInput from "@/Components/ui/phone-input";
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
    email: z.string().superRefine((val, ctx) => {
      if (!val) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: "This field is required" }); return; }
      if (/\\s/.test(val)) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: "⚠ Please enter a valid email address - You have entered a blank space" }); return; }
      if (!val.includes("@")) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: "⚠ Please enter a valid email address - You have missed out the @ symbol" }); return; }
      const [username, ...rest] = val.split("@");
      if (!username) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: "⚠ Please enter a valid email address - You have missed out the username" }); return; }
      const domainPart = rest.join("@");
      if (!domainPart || rest.length > 1) { 
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: !domainPart ? "⚠ Please enter a valid email address - You have missed out the domain" : "⚠ Please enter a valid email address" }); return; 
      }
      if (!domainPart.includes(".")) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: '⚠ Please enter a valid email address - You have missed out the a "."' }); return; }
      const domainParts = domainPart.split(".");
      const tld = domainParts[domainParts.length - 1];
      if (!tld || tld.length < 2) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: "⚠ Please enter a valid email address - You have missed out the Top Leve Domain" }); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { ctx.addIssue({ code: z.ZodIssueCode.custom, message: "⚠ Please enter a valid email address" }); return; }
    }),
    phoneNumber: z
      .string()
      .min(10, { message: "Please enter a valid phone number" })
      .regex(/^[0-9+\-()]*$/, {
        message:
          "Spaces are not allowed. Please enter a valid phone number format",
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
  const navigate = useNavigate();
  const location = useLocation();
  const [success, setSuccess] = useState("");
  const [title, setTitle] = useState("Sign Up and Start Learning");
  const [confirm, setConfirm] = useState(false);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState();
  const [queryString] = useSearchParams();
  const _r = queryString.get("_r");
  const redirectTo = queryString.get("redirectTo");
  const redirectTarget = redirectTo || _r;
  const from = redirectTarget ? decodeURIComponent(redirectTarget) : "";

  const [googleToken, setGoogleToken] = useState("");
  const [step, setStep] = useState(location.state?.googleToken ? "form" : "choice");
  const [showReferralReminder, setShowReferralReminder] = useState(false);
  const [pendingSignupValues, setPendingSignupValues] = useState(null);
  const [skipReferralReminder, setSkipReferralReminder] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const formRef = useRef(null);

  const courseId = queryString.get("id");
  const courseTitle = queryString.get("title");

  // Determine if this signup is a referral from the Partner page
  const isPartnerReferral = queryString.get("r") === "student" && !!queryString.get("t");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
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

  const { isSubmitting, errors } = form.formState;
  const currentPassword = form.watch("password") || "";
  const hasErrors = Object.keys(errors).length > 0;

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

      const response = await axios.post(`${url}/google-check`, {
        email: payload.email,
      });

      if (response.data.exists) {
        toast.error("Account already exists. Please log in.");
        navigate(`/login${redirectTarget ? `?redirectTo=${encodeURIComponent(redirectTarget)}` : ""}`);
        return;
      }

      form.setValue("email", payload.email);
      if (payload.given_name) form.setValue("firstName", payload.given_name);
      if (payload.family_name) form.setValue("lastName", payload.family_name);
      
      const usernamePart = payload.email.split("@")[0].toLowerCase();
      form.setValue("username", usernamePart);

      setGoogleToken(credential);
      setStep("form");
      toast.success("Google account linked. Please complete your password and phone number.");
    } catch (err) {
      console.error("Google authentication error:", err);
      toast.error("Google authentication failed. Please try again.");
    }
  };

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
        googleToken: googleToken || undefined,
      };

      const response = await axios.post(`${url}/signup`, users, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.data.status === "success") {
        if (response.data.forward_url) {
          sessionStorage.setItem(
            "signup_forward_url",
            response.data.forward_url,
          );
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
          Cookies.set("userRole", response.data.newUser.role || "student", {
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

  const code = queryString.get("code");
  if (code) {
    form.setValue("referralCode", code);
  }

  useEffect(() => {
    if (location.state?.googleToken) {
      handleGoogleCallback(location.state.googleToken);
    }
  }, [location.state]);

  // Add viewport meta tag for iOS
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.head.appendChild(meta);

    setTitle(queryString.get("ttl") || "Sign Up and Start Learning");
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

      {/* Conditionally render the appropriate layout */}
      {(() => {
        const LayoutComponent = isPartnerReferral ? ReferralAuthLayout : AuthLayout;
        return (
          <LayoutComponent
            title={step === "choice" ? "Choose Registration" : "Register Now"}
            isMobileStacked={true}
            isPage={isPage}
            alignTop={true}
            leftHeadline={isPartnerReferral ? "You've been invited!" : "Ready to Build\nIn-Demand Skills?"}
            leftSubtext={isPartnerReferral 
              ? "Join learners gaining practical knowledge, career support, and industry-ready experience through Avenue Impact." 
              : "Join learners gaining practical knowledge, career support, and industry-ready experience through "}
          >
            {step === "choice" ? (
              <div className="flex flex-col gap-6 py-6 font-poppins">
                <div className="text-center mb-2">
                  <h2 className="text-xl font-bold text-gray-900">Create your account</h2>
                  <p className="text-xs text-gray-500 mt-1">Choose how you want to register</p>
                </div>

                <GoogleAuthButton onCallback={handleGoogleCallback} text="signup_with" />

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink mx-4 text-xs font-semibold text-gray-400">OR</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-gray-300 hover:border-[#CC1747] hover:bg-gray-50/50 rounded-xl transition-all font-semibold text-gray-700 text-sm hover:text-[#CC1747]"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Register now (with form)
                </button>

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
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setStep("choice");
                    setGoogleToken("");
                    form.reset({
                      email: "",
                      password: "",
                      firstName: "",
                      lastName: "",
                      username: "",
                      confirmPassword: "",
                      referralCode: "",
                      phoneNumber: "",
                    });
                  }}
                  className="mb-4 flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#CC1747] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Choose another registration method
                </button>

                <Form {...form}>
                  <form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)}>
                    {googleToken && (
                      <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-xs text-green-800 font-medium font-poppins flex items-start gap-2.5">
                        <svg className="w-4 h-4 shrink-0 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <strong className="block mb-0.5 text-green-900 font-bold">Google account connected!</strong>
                          Create password to complete registration
                        </div>
                      </div>
                    )}
                    <div className="space-y-4">
                      <div
                        className={`${isPage ? "" : "sm:grid-cols-2"} grid gap-x-3 gap-y-4 sm:grid-cols-2`}
                      >
                        <FormInput
                          label="First Name"
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
                          label="Last Name"
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
                      <div
                        className={`${isPage ? "" : "sm:grid-cols-2"} grid gap-x-3 gap-y-4 sm:grid-cols-2`}
                      >
                        <FormInput
                          label="Username"
                          name="username"
                          control={form.control}
                          type="text"
                          id="username"
                          placeholder=""
                          onFocus={handleInputFocus}
                          autoComplete="username"
                          absoluteError
                        />
                        <FormInput
                          label="Email"
                          name="email"
                          control={form.control}
                          type="text"
                          id="email"
                          placeholder=""
                          onFocus={handleInputFocus}
                          autoComplete="email"
                          absoluteError
                        />
                      </div>
                      <PhoneInput
                        label="Phone Number"
                        name="phoneNumber"
                        control={form.control}
                        id="phoneNumber"
                        placeholder="813 696 9006"
                        absoluteError
                      />
                      <div
                        className={`${isPage ? "" : "sm:grid-cols-2"} grid gap-x-3 gap-y-4 sm:grid-cols-2`}
                      >
                        <PasswordInput
                          id="password"
                          autoComplete="new-password"
                          label="Password"
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
                          label="Confirm Password"
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
                        label="Referral Code"
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
                        I agree to the <Link to="/terms-of-service" className="text-[#C41E3A] hover:underline font-semibold">terms and conditions</Link>
                      </p>
                    </div>

                    <CommonButton
                      className="mt-4 w-full rounded-lg bg-[#C41E3A] py-3 font-poppins text-base font-semibold capitalize text-white hover:bg-[#a8103a]"
                      type="submit"
                      disabled={isSubmitting || hasErrors}
                    >
                      {isSubmitting ? "loading..." : "Submit Application"}
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
              </>
            )}
          </LayoutComponent>
        );
      })()}

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
