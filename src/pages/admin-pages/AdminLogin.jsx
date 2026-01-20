import BorderCard from "@/Components/BorderCard";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { CommonButton } from "@/Components/ui/button";
import PasswordInput from "@/Components/ui/password-input";
// import { useAuth } from "@/hooks/useAuth";

import { useLoginAdmin } from "@/hooks/admin-auth/use-admin-login";
import { BeatLoader } from "react-spinners";
import { Heading, Paragraph } from "../auth/components/Text";
// {
//     "status": "success",
//     "user": {
//         "id": "66c5019cb77de580f4274c96",
//         "firstname": "zainab",
//         "lastname": "wunmi",
//         "username": "lawal",
//         "email": "lawalzainabomowumi2021@gmail.com",
//         "status": "verified",
//         "wishlist": [],
//         "avatar": null,
//         "referral_code": "lawalPIM28AYSIG"
//     },
//     "message": "User verification successful, Please login to gain full access"
// }

// {
//     "status": "success",
//     "data": {
//         "user": {
//             "id": "66c5019cb77de580f4274c96",
//             "firstname": "zainab",
//             "lastname": "wunmi",
//             "username": "lawal",
//             "email": "lawalzainabomowumi2021@gmail.com",
//             "status": "verified",
//             "wishlist": [],
//             "avatar": null,
//             "referral_code": "lawalPIM28AYSIG"
//         },
//         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzUwMTljYjc3ZGU1ODBmNDI3NGM5NiIsImVtYWlsIjoibGF3YWx6YWluYWJvbW93dW1pMjAyMUBnbWFpbC5jb20iLCJpYXQiOjE3MjQxODc0ODUsImV4cCI6MTcyNDIwMTg4NX0.5QwTd79q7HST5aBb52_Zr0PCG6QRagPvRFgXeswuEs8"
//     },
//     "message": "Login successful"
// }

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "password must be at least 4 characters long" }),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  // const { dispatch } = useAuth();

  const { mutate, isPending, error } = useLoginAdmin();

  const handleSubmit = async (values) => {
    const user = {
      email: values.email,
      password: values.password,
    };
    mutate(user, { 
      // onSuccess handled by hook
      onError(err) {
        const validationErrors = err.response?.data?.error;
        if (validationErrors) {
          Object.keys(validationErrors).forEach((key) => {
            if (validationErrors[key]?.msg) {
              form.setError(key, {
                type: "server",
                message: validationErrors[key].msg,
              });
            }
          });
        }
      }
    });
  };

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <div className="flex h-[calc(100vh-100.547px)] w-full items-center justify-center">
        <div className="py-10">
          <BorderCard className="mx-auto max-w-[465px]">
            <div className="mb-8 space-y-1">
              <Heading>Welcome back!</Heading>
              <Paragraph>Use your email to sign in to your dashboard</Paragraph>
              {error && (
                <div className="mt-2 rounded bg-red-100 p-2 text-center text-sm text-red-600">
                  {error.response?.data?.message || "Login failed"}
                </div>
              )}
            </div>
            <Form {...form}>
              <form
                action=""
                className="space-y-2"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <FormInput
                  name="email"
                  label="Email"
                  placeholder=""
                  id="email"
                  type="email"
                  control={form.control}
                  disabled={isPending}
                />
                <PasswordInput
                  id="password"
                  autoComplete="new-password"
                  label="password"
                  name="password"
                  control={form.control}
                  disabled={isPending}
                  placeholder=""
                />

                <Link
                  to={"/forgot-password"}
                  className="block text-sm font-semibold capitalize text-primary-color-600"
                >
                  forgot password?
                </Link>

                <CommonButton
                  className="mt-8 w-full bg-primary-color-600 font-poppins text-[16px] font-[500] capitalize text-white hover:bg-primary-color-600"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <BeatLoader size={10} color={"#fff"} />
                  ) : (
                    "sign in"
                  )}
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
      </div>

      {/* modals */}

      {/*  <Modal>
      {showModal &&  <PasswordResetSucess />}
      </Modal> */}
    </>
  );
};

export default AdminLogin;
