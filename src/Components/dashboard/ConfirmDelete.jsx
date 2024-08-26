import axios from "axios";
import Cookies from "js-cookie";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import BorderCard from "../BorderCard";
import { Heading } from "@/pages/auth/components/Text";
import { Form } from "../ui/form";
import { CommonButton } from "../ui/button";
import PasswordInput from "../ui/password-input";
import toast from "react-hot-toast";
import { passwordRegex } from "@/lib/utils";

const DeleteSchema = z.object({
  password: z
    .string()
    .min(4, { message: "This field is required" })
    .regex(passwordRegex, {
      message:
        "Ensure your password contains at least a lowercase letter, an upper case letter, a special symbol and a number",
    }),
});
const url = import.meta.env.VITE_USER_URL;

const ConfirmDelete = ({ setShowModal }) => {
  const token = Cookies.get("token");

  const handleDelete = async (values) => {
    const password = {
      password: values.password,
    };
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: password,
      });
      console.log(response);

      if (response.status === 200) {
        toast.success(response.data.message);
        Cookies.remove("token");
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);

      if (error.message === "Network Error") return toast.error(error.message);

      // if (error)
      toast.error(
        error.response.data.message ||
          error.response.data.error.password.msg ||
          "something went wrong",
      );
    }
  };

  const form = useForm({
    resolver: zodResolver(DeleteSchema),
    defaultValues: {
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

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
      <p className="my-2 text-sm leading-[20px] text-tertiary-color-700 md:my-5">
        Are you sure you want to delete your account? This action is
        irreversible and will result in the permanent loss of all your data,
        including your enrolled courses, progress, certificates, and personal
        information.
      </p>
      <p className="text-sm leading-[20px] text-tertiary-color-700">
        Important:
      </p>
      <ul className="my-3 list-disc *:ml-8 md:my-5">
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
        <form
          className="max-w-[405px] space-y-2 py-3 md:space-y-4 md:py-5"
          onSubmit={form.handleSubmit(handleDelete)}
        >
          <PasswordInput
            id="password"
            label="Password"
            name="password"
            control={form.control}
            placeholder="Enter password"
          />
          <div className="flex gap-2 md:gap-4">
            <CommonButton
              className="bg-[#CC1747] py-[10.5px] text-sm font-normal capitalize text-[#FFEBF0] md:text-base"
              type="submit"
              disabled={isSubmitting}
            >
              Delete My Account
            </CommonButton>
            <CommonButton
              variant="outline"
              className="px-5 py-2 text-sm font-normal text-tertiary-color-700 md:px-8 md:py-[10.5px] md:text-base"
              type="button"
              disabled={isSubmitting}
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
