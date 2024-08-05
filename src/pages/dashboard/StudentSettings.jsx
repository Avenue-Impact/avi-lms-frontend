import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Heading } from "../auth/components/Text";
import BorderCard from "@/Components/BorderCard";
import { Form } from "@/Components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import FormInput from "@/Components/ui/form-input";
import { PasswordInput } from "@/Components/ui/password-input";
import { CommonButton } from "@/Components/ui/button";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
});

function StudentSettings() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div>
      <header className="flex items-center justify-between">
        <Heading className="text-left">Account settings </Heading>
        <button className="text-nowrap border-0 bg-transparent text-primary-color-600 underline md:text-xl lg:text-2xl">
          Delete Account
        </button>
      </header>
      <BorderCard className="mt-4 bg-white py-3">
        <Avatar className="">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="mx-auto block w-fit rounded-full bg-primary-color-100 p-2 text-sm text-primary-color-600 md:p-4">
            MS
          </AvatarFallback>
        </Avatar>
        <Form {...form}>
          <form className="space-y-4">
            <FormInput
              name="username"
              id="username"
              label="Username"
              placeholder="@maxwell02"
              type="text"
              control={form.control}
            />
            <div className="grid gap-x-4 md:grid-cols-2">
              <FormInput
                name="firstname"
                id="firstname"
                label="First Name"
                placeholder="@maxwell02"
                type="text"
                control={form.control}
              />
              <FormInput
                name="lastname"
                id="lastname"
                label="Last Name"
                // placeholder="@maxwell02"
                type="text"
                control={form.control}
              />
            </div>
            <FormInput
              name="email"
              id="email"
              label="Email Address"
              // placeholder="@maxwell02@gmail.com"
              type="email"
              control={form.control}
            />
            <div className="grid gap-x-4 md:grid-cols-2">
              <PasswordInput
                id="password"
                autoComplete="new-password"
                label="password"
                name="password"
                control={form.control}
                // placeholder="Change Password"
              />
              <PasswordInput
                id="confirmPassword"
                autoComplete="new-password"
                label="confirm password"
                name="confirmPassword"
                control={form.control}
                placeholder="Enter password"
              />
            </div>
            <CommonButton className="bg-[#CC1747] flex items-center">Update Profile</CommonButton>
          </form>
        </Form>
      </BorderCard>
    </div>
  );
}

export default StudentSettings;
