import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AviNav from "@/Components/avi/AviNav";
import BorderCard from "@/Components/BorderCard";
import { Heading } from "./components/Text";
import { Form } from "@/Components/ui/form";
import { PasswordInput } from "@/Components/ui/password-input";
import { CommonButton } from "@/Components/ui/button";
import Modal from "./components/Modal";
import RegisterSuccess from "./components/RegisterSuccess";

const loginSchema = z.object({
  username: z.string().min(1, { message: "name is required" }),
  password: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
});

const NewPassword = () => {
  const [password, setPassword] = useState("");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [modal, setModal] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setModal((prev) => !prev);
  };

  return (
    <>
      {" "}
      <AviNav />
      {modal && (
        <Modal>
          <RegisterSuccess
            title={"Password Reset Successful!"}
            text={
              "Your password has been successfully reset. You can now log in with your new password."
            }
            setModal={setModal}
            path={"/login"}
          />
        </Modal>
      )}
      <div className="flex h-[calc(100vh-100.547px)] w-full items-center justify-center py-10">
        <BorderCard className="mx-auto max-w-[465px]">
          <div className="mb-8 space-y-1">
            <Heading>Create Your New Password</Heading>
          </div>
          <Form {...form}>
            <form action="" className="space-y-2" onSubmit={handleSubmit}>
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                label="Enter Password"
                name="password"
                control={form.control}
                placeholder=""
              />
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                label="Confirm Password"
                name="password"
                control={form.control}
                placeholder=""
              />

              <p className="text-[12px] italic leading-[17.4px] text-primary-color-600">
                Make sure your new password is different from any previous
                passwords
              </p>

              <CommonButton
                className="mt-8 w-full bg-primary-color-600 font-poppins text-xl font-semibold capitalize text-white hover:bg-primary-color-600"
                type="submit"
              >
                reset
              </CommonButton>
            </form>
          </Form>
        </BorderCard>
      </div>
    </>
  );
};

export default NewPassword;
