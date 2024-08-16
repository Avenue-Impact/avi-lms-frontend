import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CommonButton } from "../ui/button";
import { PasswordInput } from "../ui/password-input";
import FormInput from "../ui/form-input";
import { Form } from "../ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Modal from "@/pages/auth/components/Modal";
import BorderCard from "../BorderCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
});

const EditProfile = () => {
  const [modal, setModal] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setModal((prev) => !prev);
  };
  return (
    <>
      {modal && (
        <Modal>
          <BorderCard className="relative rounded-md bg-white py-16 text-center">
            <button
              type="button"
              className="absolute right-4 top-4 w-fit cursor-pointer"
              onClick={() => setModal((prev) => !prev)}
            >
              <FontAwesomeIcon
                icon={faClose}
                className="text-2xl text-tertiary-color-700"
              />
            </button>
            <div className="px-24">
              <p className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#61C478] text-2xl text-white">
                <FontAwesomeIcon icon={faCheck} />
              </p>
              <p className="mb-6 mt-8 text-base font-semibold text-[#23314A] lg:text-xl">
                Account Settings Updated
              </p>
              <p className="text-sm text-[#98A2B3]">
                Your account settings have been successfully updated.
              </p>
            </div>
            <CommonButton
              className="mt-8 bg-[#CC1747] px-[39px] py-[10px] capitalize"
              onClick={() => setModal((prev) => !prev)}
            >
              ok
            </CommonButton>
          </BorderCard>
        </Modal>
      )}
      <div className="mx-auto max-w-[716px]">
        <Avatar className="mx-auto block h-14 w-14 md:h-20 md:w-20">
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="m-auto block rounded-full"
          />
          <AvatarFallback className="mx-auto w-full rounded-full bg-primary-color-100 p-2 text-sm text-primary-color-600 md:p-4">
            MS
          </AvatarFallback>
        </Avatar>
        <Form {...form}>
          <form className="">
            <div className="space-y-4">
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
                  placeholder="@maxwell02"
                  type="text"
                  control={form.control}
                />
              </div>
              <FormInput
                name="email"
                id="email"
                label="Email Address"
                placeholder="@maxwell02@gmail.com"
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
                  placeholder="Change Password"
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
            </div>

            <CommonButton
              className="mx-auto mt-6 block w-[55.865%] items-center bg-[#CC1747]"
              type="submit"
              onClick={handleSubmit}
            >
              Update Profile
            </CommonButton>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditProfile;
