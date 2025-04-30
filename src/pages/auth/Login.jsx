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

  const { mutate, isPending } = useLoginUser();

  const handleSubmit = async (values) => {
    const user = {
      userid: values.username,
      password: values.password,
    };

    mutate(user, {
      onSuccess: ({ data }) => {
        Cookies.set("token", data.data.token, {
          expires: 1,
          secure: true,
        });
        if (courseId) {
          navigate(
            `/preview-video-course/${courseId}/enroll?title=${courseTitle}`,
          );
        } else {
          navigate("/dashboard");
        }
      },
      onError: (err) => {
        if (!err.response) toast.error("Network Fail");
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
                  name="username"
                  label="Username/Email"
                  placeholder=""
                  id="username"
                  type="text"
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
                  disabled={isPending}
                >
                  {isPending ? (
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

          <div className="text-center">
            <Link
              to={"/admin/login"}
              className="text-sm font-semibold text-white hover:text-primary-color-300"
            >
              Login Admin
            </Link>
          </div>
        </div>
      </div>

      {/* modals */}

      {/*  <Modal>
      {showModal &&  <PasswordResetSucess />}
      </Modal> */}
    </>
  );
};

export default Login;
