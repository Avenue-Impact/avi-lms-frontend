import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { PasswordInput } from "@/Components/ui/passwordInput";
import { useCreateAdminPassword } from "@/hooks/account-management/use-create-admin-password";
import { passwordRegex } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ScrollRestoration, useSearchParams } from "react-router-dom";
import * as z from "zod";

const formSchema = z
  .object({
    confirmationCode: z
      .string()
      .min(4, { message: "minimum code must be at least four characters " })
      .max(10, { message: "maximum code must be at least four characters " }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 8 characters long " })
      .regex(passwordRegex, {
        message:
          "Ensure your password contains at least a lowercase letter, an upper case letter, a special symbol and a number",
      }),
    confirmPassword: z
      .string()
      .min(4, { message: "Password must be at least 8 characters long " }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export default function AdminConfirmationRole() {
  const { create, isPending } = useCreateAdminPassword();
  const [queryString] = useSearchParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      confirmationCode: queryString.get("code") ?? "",
    },
  });

  function onSubmit(values) {
    const dataToSend = {
      password: values.password,
      password_confirm: values.confirmPassword,
    };
    create(
      {
        data: dataToSend,
        code: values.confirmationCode,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  }

  return (
    <>
      <ScrollRestoration />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[600px] space-y-8 py-16"
        >
          <div className="space-y-4 pb-8">
            <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
              Create your password
            </h3>
            <p className="text-[#667185]">
              Check your email for confirmation code. Create a strong and unique
              password to secure your account. Ensure it includes at least one
              uppercase letter, one lowercase letter, one number, and one
              special character.
            </p>
          </div>
          <FormInput
            type="number"
            name="confirmationCode"
            id="confirmationCode"
            control={form.control}
            placeholder="Enter your confirmation code"
            className="w-full rounded border border-gray-300 p-3"
            label={"confirmation code"}
          />
          <PasswordInput
            name="password"
            placeholder="Enter your password"
            label={"Password"}
            control={form.control}
          />
          <PasswordInput
            name="confirmPassword"
            placeholder="Enter your password"
            label={"Confirm Password"}
            control={form.control}
          />
          <div className="ml-auto flex w-max items-center gap-6">
            <CommonButton
              type="submit"
              className="ml-auto block w-max bg-primary-color-600"
              disabled={isPending}
            >
              Submit
            </CommonButton>
          </div>
        </form>
      </Form>
    </>
  );
}
