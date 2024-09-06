import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import BorderCard from "@/Components/BorderCard";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";

import { CommonButton } from "@/Components/ui/button";
import PasswordInput from "@/Components/ui/password-input";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import { ClipLoader } from "react-spinners";
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

const url = import.meta.env.VITE_ADMIN_URL;

const AdminLogin = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleSubmit = async (values) => {
    const user = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axios.post(`${url}/login`, user);

      console.log(response);

      if (response.data.status === "success") {
        dispatch({
          type: "auth/login",
          payload: {
            ...response.data.data.user,
            token: response.data.data.token,
          },
        });

        Cookies.set("adminToken", response.data.data.token, {
          expires: 1,
          secure: true,
        });

        const decoded = jwtDecode(response.data.data.token);
        console.log("decoded", decoded);

        navigate("/admin/dashboard");
        toast.success("login successful");
      }
    } catch (error) {
      if (!error.response) return toast.error("network fail");
      toast.error(error.response.data.message);
    }
  };

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  return (
    <>
      <div className="flex h-[calc(100vh-100.547px)] w-full items-center justify-center">
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
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <FormInput
                  name="email"
                  label="Email"
                  placeholder=""
                  id="email"
                  type="email"
                  control={form.control}
                />
                <PasswordInput
                  id="password"
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
                  className="mt-8 w-full bg-primary-color-600 font-poppins text-[16px] font-[500] capitalize text-white hover:bg-primary-color-600"
                  type="submit"
                >
                  {isSubmitting ? (
                    <ClipLoader size={20} color={"#fff"} />
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
