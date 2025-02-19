import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useCreateAdminRole } from "@/hooks/account-management/use-create-admin-role";
import DashButton from "@/pages/auth/ButtonDash";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollRestoration } from "react-router-dom";
import { z } from "zod";

const sessionSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: "This field is required" })
    .max(70, { message: "you've reached the max character length" }),
  last_name: z
    .string()
    .min(1, { message: "This field is required" })
    .max(70, { message: "you've reached the max character length" }),

  email: z
    .string()
    .min(1, { message: "This field is required" })
    .max(70, { message: "you've reached the max character length" })
    .email({ message: "Invalid email address" }),
});

const CreateAdminRole = ({ setAdminModal }) => {
  const { create, isPending } = useCreateAdminRole();
  const [adminRole, setAdminRole] = useState("");
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      role: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    if (!adminRole) return setError("select a role for the admin");
    const adminData = {
      ...data,
      role: adminRole,
    };
    create(adminData, {
      onSuccess: () => {
        form.reset();
        setAdminRole("");
        setAdminModal(false);
      },
    });
  };

  return (
    <div>
      <ScrollRestoration />

      <div className="space-y-4 pb-8">
        <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
          Add New Admin
        </h3>
        <p className="text-[#667185]">
          Enter credentials to create admin account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4">
            <p className="font-[500]">First Name</p>
            <FormInput
              type="text"
              name="first_name"
              id="first_name"
              control={form.control}
              placeholder="Enter First Name"
              className="w-full rounded border border-gray-300 p-3"
            />
          </div>

          <div className="mb-4">
            <p className="font-[500]">Last Name</p>
            <FormInput
              type="text"
              name="last_name"
              id="last_name"
              control={form.control}
              placeholder="Enter Last Name"
              className="w-full rounded border border-gray-300 p-3"
            />
          </div>

          <div className="mb-6">
            <p className="font-[500]">Email Address</p>
            <FormInput
              type="email"
              name="email"
              id="email"
              control={form.control}
              placeholder="Enter Email Address"
              className="w-full rounded border border-gray-300 p-3"
            />
          </div>

          <div className="mb-6">
            <p className="font-[500]">Select Admin Role</p>
            <Select
              onValueChange={(value) => {
                setError("");
                setAdminRole(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Admin Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Admin Role</SelectLabel>
                  <SelectItem value="Financial Admin">
                    Financial Admin
                  </SelectItem>
                  <SelectItem value="Content Manager">
                    Content Manager
                  </SelectItem>
                  <SelectItem value="Course Admin">Course Admin</SelectItem>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p>
              {error ? (
                <span className="text-[#ff0000]">{error}</span>
              ) : (
                <span></span>
              )}
            </p>
          </div>

          <div className="w-full">
            <DashButton
              type="submit"
              className="hover:bg-primary-color-700 w-full rounded-md bg-primary-color-600 px-9 py-2 text-white"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Account"}
            </DashButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateAdminRole;
