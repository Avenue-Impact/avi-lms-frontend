import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CommonButton } from "../ui/button";
import PasswordInput from "../ui/password-input";
import { passwordRegex } from "@/lib/utils";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long " }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long " })
      .regex(passwordRegex, {
        message:
          "Ensure your password contains at least a lowercase letter, an upper case letter, a special symbol and a number",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters ong" })
      .regex(passwordRegex, {
        message:
          "Ensure your password contains at least a lowercase letter, an upper case letter, a special symbol and a number",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

const url = import.meta.env.VITE_USER_URL;

const ChangePassword = () => {
  const handleSubmit = async (values) => {
    const token = Cookies.get("token");

    const passwords = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      newPasswordConfirmation: values.confirmPassword,
    };

    try {
      const response = await axios.patch(`${url}/password`, passwords, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status) return toast.success(response.data.message);
    } catch (error) {
      return toast.error(
        error.message ||
          error?.response?.data?.message ||
          error?.message ||
          "something went wrong",
      );
    }
  };

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  return (
    <div>
      <Form {...form}>
        <form
          className="max-w-[405px] space-y-4 py-5"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <PasswordInput
            id="oldPassword"
            name="oldPassword"
            control={form.control}
            placeholder="Old password"
            label="Old password"
          />
          <PasswordInput
            id="new-password"
            label="new password"
            name="newPassword"
            control={form.control}
            placeholder="New password"
          />
          <PasswordInput
            id="confirmPassword"
            label="confirm password"
            name="confirmPassword"
            control={form.control}
            placeholder="Enter password"
          />
          <CommonButton
            className="mx-auto mt-48 block w-full items-center bg-[#CC1747] capitalize"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ClipLoader size={20} color={"#fff"} />
            ) : (
              "change password"
            )}
          </CommonButton>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
