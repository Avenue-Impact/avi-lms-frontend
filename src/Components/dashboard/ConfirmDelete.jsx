import React from "react";
import BorderCard from "../BorderCard";
import { Heading } from "@/pages/auth/components/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { PasswordInput } from "../ui/password-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { CommonButton } from "../ui/button";
const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
});

const ConfirmDelete = ({ setShowModal }) => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <BorderCard className="w-full max-w-[731px] bg-white">
      <header className="flex items-center justify-between">
        <Heading className="font-medium">Delete Your Account</Heading>
        <button onClick={() => setShowModal((prev) => !prev)}>
          <FontAwesomeIcon
            icon={faClose}
            className="text-2xl text-tertiary-color-700"
          />
        </button>
      </header>
      <p className="my-5 text-sm leading-[20px] text-tertiary-color-700">
        Are you sure you want to delete your account? This action is
        irreversible and will result in the permanent loss of all your data,
        including your enrolled courses, progress, certificates, and personal
        information.
      </p>
      <p className="text-sm leading-[20px] text-tertiary-color-700">
        Important:
      </p>
      <ul className="my-5 list-disc *:ml-8">
        <li className="text-sm leading-[20px] text-tertiary-color-700">
          You will lose access to all courses and learning materials.
        </li>
        <li className="text-sm leading-[20px] text-tertiary-color-700">
          Your progress and achievements will be permanently deleted.
        </li>
        <li className="text-sm leading-[20px] text-tertiary-color-700">
          Any certificates earned will no longer be available.
        </li>
        <li className="text-sm leading-[20px] text-tertiary-color-700">
          This action cannot be undone.
        </li>
      </ul>
      <p className="w-full max-w-[522px] text-sm font-medium leading-[20px] text-black">
        If you’re sure you want to proceed, please confirm by entering your
        password below:
      </p>
      <Form {...form}>
        <form className="max-w-[405px] space-y-4 py-5">
          <PasswordInput
            id="password"
            autoComplete="old-password"
            label="Password"
            name="password"
            control={form.control}
            placeholder="Enter password"
          />
          <div className="flex gap-4">
            <CommonButton
              className="bg-[#CC1747] py-[10.5px] font-normal capitalize text-[#FFEBF0]"
              type="submit"
            >
              Delete My Account
            </CommonButton>
            <CommonButton
              variant="outline"
              className="px-8 py-[10.5px] font-normal text-tertiary-color-700"
              type="button"
              onClick={() => setShowModal((prev) => !prev)}
            >
              Cancel
            </CommonButton>
          </div>
        </form>
      </Form>
    </BorderCard>
  );
};

export default ConfirmDelete;
