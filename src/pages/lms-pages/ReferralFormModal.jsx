import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BorderCard from "@/Components/BorderCard";
import { CommonButton } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { Heading, Paragraph } from "../../pages/auth/components/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import PasswordInput from "@/Components/ui/password-input";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
});

const ReferralFormModal = ({ setModal }) => {
  // const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  // const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <BorderCard className="w-full max-w-[670px] bg-white">
      <div className="flex items-start justify-between">
        <div className="mb-5 space-y-1 text-left 2xl:mb-8">
          <Heading className="text-left">Request to withdraw</Heading>
          <Paragraph className="text-left">
            Request to withdraw your referrals’ fund
          </Paragraph>
        </div>
        <button
          type="button"
          className=""
          onClick={() => setModal((prev) => !prev)}
        >
          <FontAwesomeIcon
            icon={faClose}
            className="text-2xl text-tertiary-color-700"
          />
        </button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            console.log("form validated");
          })}
          className="space-y-1 2xl:space-y-3"
        >
          <FormInput
            label="full name"
            name="firstname"
            control={form.control}
            type="text"
            id="firstname"
            placeholder=""
          />
          <FormInput
            label="bank name"
            name="lastname"
            control={form.control}
            type="text"
            id="lastname"
            placeholder=""
          />
          <FormInput
            label="account number"
            name="username"
            control={form.control}
            type="number"
            id="username"
            placeholder=""
          />
          <FormInput
            label="sort code"
            name="email"
            control={form.control}
            type="text"
            id="sort code"
            placeholder=""
          />
          <FormInput
            label="amount to withdraw"
            name="email"
            control={form.control}
            type="number"
            id="email"
            placeholder=""
          />
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            label="enter password"
            name="password"
            control={form.control}
            placeholder=""
          />
          <p className="my-1 max-w-[429px] text-sm italic leading-[20.3px] text-primary-color-600">
            Enter your password to confirm that you want to withdraw your
            referral funds. This takes 4 to 5 working days.
          </p>
          <CommonButton
            className="bg-primary-color-600 font-poppins font-medium capitalize text-white hover:bg-primary-color-600 md:w-2/4 md:text-xl md:font-semibold"
            type="submit"
          >
            Request Withdrawal
          </CommonButton>
        </form>
      </Form>
    </BorderCard>
  );
};

export default ReferralFormModal;
