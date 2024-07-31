import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { Link } from "react-router-dom";
import { Heading, Paragraph } from "./components/Text";
import BorderCard from "@/Components/BorderCard";
import AviNav from "@/Components/avi/AviNav";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
});

const ForgotPassword = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <AviNav />
      <div className="py-10">
        <BorderCard className="mx-auto max-w-[465px]">
          <div className="mb-8 space-y-1">
            <Heading>Welcome back!</Heading>
            <Paragraph>Use your email to sign in to your dashboard</Paragraph>
          </div>
          <Form {...form}>
            <form action="" className="space-y-2">
              <FormInput
                name="username"
                label="Username/Email"
                placeholder=""
                id="username"
                type="text"
                control={form.control}
              />

              <CommonButton
                className="mt-8 w-full bg-primary-color-600 font-poppins text-xl font-semibold capitalize text-white hover:bg-primary-color-600"
                type="submit"
              >
                reset
              </CommonButton>
            </form>
          </Form>
        </BorderCard>
        <p className="mt-10 flex items-center justify-center gap-4 text-center">
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
    </>
  );
};

export default ForgotPassword;
