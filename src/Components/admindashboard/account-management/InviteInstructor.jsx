import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { useInviteInstructor } from "@/hooks/account-management/use-invite-instructor";
import DashButton from "@/pages/auth/ButtonDash";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ScrollRestoration } from "react-router-dom";
import { z } from "zod";

const inviteSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .max(70, { message: "you've reached the max character length" })
    .email({ message: "Invalid email address" }),
});

const InviteInstructor = ({ setModal }) => {
  const { inviteInstructor, isInviting } = useInviteInstructor();

  const form = useForm({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    inviteInstructor(data.email, {
      onSuccess: () => {
        form.reset();
        setModal(false);
      },
    });
  };

  return (
    <div>
      <ScrollRestoration />

      <div className="space-y-4 pb-8">
        <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
          Invite New Instructor
        </h3>
        <p className="text-[#667185]">
          Enter the instructor's email address to send an invitation link.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-6">
            <p className="font-[500] mb-2">Email Address</p>
            <FormInput
              type="email"
              name="email"
              id="email"
              control={form.control}
              placeholder="e.g. instructor@example.com"
              className="w-full rounded border border-gray-300 p-3"
            />
          </div>

          <div className="w-full">
            <DashButton
              type="submit"
              className="hover:bg-primary-color-700 w-full rounded-md bg-primary-color-600 px-9 py-2 text-white"
              disabled={isInviting}
            >
              {isInviting ? "Sending Invitation..." : "Send Invitation"}
            </DashButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InviteInstructor;
