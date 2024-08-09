import { Form } from "../ui/form";
import { PasswordInput } from "../ui/password-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CommonButton } from "../ui/button";
const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
});

const ChangePassword = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div>
      <Form {...form}>
        <form className="max-w-[405px] space-y-4 py-5">
          <PasswordInput
            id="old-password"
            autoComplete="old-password"
            label="Old password"
            name="password"
            control={form.control}
            placeholder="Old password"
          />
          <PasswordInput
            id="new-password"
            autoComplete="new-password"
            label="new password"
            name="newPassword"
            control={form.control}
            placeholder="New password"
          />
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            label="confirm password"
            name="confirmPassword"
            control={form.control}
            placeholder="Enter password"
          />
          <CommonButton
            className="mx-auto mt-48 block w-full items-center bg-[#CC1747] capitalize"
            type="submit"
          >
            change password
          </CommonButton>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
