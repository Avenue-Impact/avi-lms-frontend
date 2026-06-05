import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { z } from "zod";
import AuthLayout from "./components/AuthLayout";
import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import PhoneInput from "@/Components/ui/phone-input";
import Modal from "./components/Modal";
import RegisterSuccess from "./components/RegisterSuccess";
import ConfirmEmail from "./components/ConfirmEmail";
import PasswordInput from "@/Components/ui/password-input";
import { passwordRegex } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";
import { route } from "@/lib/route-checker";
import { useValidateInviteToken } from "@/hooks/account-management/use-validate-invite-token";
import { useInstructorRegister } from "@/hooks/account-management/use-instructor-register";

const registerSchema = z
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
      .min(1, { message: "username must be at least 4 characters long" }),
    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

const InstructorSignUp = ({ isPage = true }) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [success, setSuccess] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [user, setUser] = useState();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // 1. Validate the invitation token
  const {
    data: inviteData,
    isLoading: isValidating,
    error: validationError,
  } = useValidateInviteToken(token);

  // 2. Registration hook
  const { registerInstructor, isRegistering } = useInstructorRegister();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      username: "",
      confirmPassword: "",
      referralCode: searchParams.get("code") || "",
      phoneNumber: "",
    },
  });

  // Auto-fill email if token is valid
  useEffect(() => {
    if (inviteData?.data?.email) {
      form.setValue("email", inviteData.data.email, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [inviteData, form]);

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

  const handleSubmit = async (values) => {
    if (!token) {
      return;
    }

    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      password: values.password,
      password_confirm: values.confirmPassword,
      phone: values.phoneNumber,
      token: token
    };

    registerInstructor(
      { data: payload, token },
      {
        onSuccess: () => {
          setSuccess("success");
          setUser(values);
          setConfirm(true);
        },
        onError: (error) => {
          console.error("Registration error:", error);
          setSuccess("fail");
        },
      },
    );
  };

  // Add viewport meta tag for iOS
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.head.appendChild(meta);

    return () => {
      if (document.head.contains(meta)) {
        document.head.removeChild(meta);
      }
    };
  }, []);

  // Handle referral code from URL
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      form.setValue("referralCode", code);
    }
  }, [searchParams, form]);

  // Add iOS-specific input handling
  const handleInputFocus = (e) => {
    // Prevent zoom on focus for iOS
    e.target.style.fontSize = "16px";
  };

  const { isSubmitting } = form.formState;

  if (!token) {
    return (
      <AuthLayout title="Invalid Access">
        <div className="p-10 text-center">
          <p className="text-lg font-semibold text-red-600">
            No invitation token found.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Please check your email for the correct invitation link.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-block font-medium text-primary-color-600"
          >
            Back to Login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  if (isValidating) {
    return (
      <AuthLayout title="Verifying Invitation">
        <div className="flex flex-col items-center justify-center gap-4 p-20">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary-color-600"></div>
          <p className="animate-pulse text-gray-600">
            Validating your invitation...
          </p>
        </div>
      </AuthLayout>
    );
  }

  if (validationError) {
    return (
      <AuthLayout title="Invitation Expired">
        <div className="p-10 text-center">
          <p className="text-lg font-semibold text-red-600">
            {validationError?.response?.data?.message ||
              "Invalid or expired invitation link."}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Please contact the administrator for a new invite.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-block font-medium text-primary-color-600"
          >
            Back to Login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <div className="">
      <AuthLayout
        title="Instructor Registration"
        subtitle="Complete your profile to join the platform"
        isMobileStacked={true}
        isPage={isPage}
        alignTop={true}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="">
              <div className={`${isPage ? "" : "sm:grid-cols-2"} grid sm:grid-cols-2 gap-x-3 gap-y-4`}>
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
              <div className={`${isPage ? "" : "sm:grid-cols-2"} grid sm:grid-cols-2 gap-x-3 gap-y-4`}>
                <FormInput
                  label="User Name"
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
                  readOnly // Email is tied to the invitation token
                  absoluteError
                  disabled={inviteData?.data?.email ? true : false}
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
              <div className={`${isPage ? "" : "sm:grid-cols-2"} grid sm:grid-cols-2 gap-x-3 gap-y-4`}>
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
                I agree to the <Link to="/terms-of-service" className="text-primary-color-600 hover:underline font-semibold">terms and conditions</Link>
              </p>
            </div>

            <CommonButton
              className="mt-4 w-full bg-primary-color-600 py-4 font-poppins text-base font-semibold capitalize text-white hover:bg-primary-color-600"
              type="submit"
              disabled={isRegistering || isSubmitting || !form.formState.isValid}
            >
              {isRegistering ? "Registering..." : "Complete Registration"}
            </CommonButton>
          </form>
        </Form>

        <p className="mt-4 flex items-center justify-center gap-4 text-center">
          <span className="text-sm text-[#514A4A]">Back to</span>
          <Link
            to="/login"
            className="text-sm font-semibold capitalize text-primary-color-600"
          >
            sign in
          </Link>
        </p>
      </AuthLayout>

      {confirm && (
        <Modal>
          {success === "success" ? (
            <RegisterSuccess
              title={"Registration Successful!"}
              text={
                "Your instructor account has been activated. You can now log in to access your dashboard."
              }
              setModal={() => setConfirm(false)}
              path={"/login"}
            />
          ) : (
            <div className="w-full max-w-md rounded-lg bg-white p-8 text-center">
              <h2 className="mb-4 text-xl font-bold text-red-600">
                Registration Failed
              </h2>
              <p className="mb-6 text-gray-600">
                Something went wrong during registration. Please try again or
                contact support.
              </p>
              <CommonButton
                onClick={() => setConfirm(false)}
                className="w-full"
              >
                Try Again
              </CommonButton>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default InstructorSignUp;
