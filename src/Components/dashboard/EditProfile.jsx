import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { CommonButton } from "../ui/button";
import FormInput from "../ui/form-input";
import { Form } from "../ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Modal from "@/pages/auth/components/Modal";
import BorderCard from "../BorderCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faPen } from "@fortawesome/free-solid-svg-icons";
import PasswordInput from "../ui/password-input";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "../ui/skeleton";
import { useProfile } from "@/services/queries";
import { ClipLoader } from "react-spinners";

// Validation schema
const profileSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  avatar: z.instanceof(File).optional(),
});

const EditProfile = () => {
  const { userDetails } = useAuth();
  const { isLoading, data } = useProfile();

  const [modal, setModal] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(userDetails?.avatar || "");

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstname: userDetails?.firstname || "",
      lastname: userDetails?.lastname || "",
      username: userDetails?.username || "",
      email: userDetails?.email || "",
      avatar: null,
    },
  });

  // Handle file change event
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      form.setValue("avatar", file);
    }
  };

  // Handle form submission
  const handleSubmit = async (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("firstname", formData.firstname);
    formDataToSend.append("lastname", formData.lastname);
    formDataToSend.append("username", formData.username);

    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }

    const token = Cookies.get("token");

    try {
      const response = await axios.patch(
        "https://avi-lms-backend.onrender.com/api/v1/users/me",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        setModal(true); // Show success modal
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error, maybe show a notification or modal
    }
  };

  const {isSubmitting} = form.formState;

  return (
    <>
      {modal && (
        <Modal>
          <BorderCard className="relative w-full max-w-[731px] rounded-md bg-white py-16 text-center">
            <button
              type="button"
              className="absolute right-4 top-4 w-fit cursor-pointer"
              onClick={() => setModal(false)}
            >
              <FontAwesomeIcon
                icon={faClose}
                className="text-2xl text-tertiary-color-700"
              />
            </button>
            <div className="maxw w-full">
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
              onClick={() => setModal(false)}
            >
              Ok
            </CommonButton>
          </BorderCard>
        </Modal>
      )}
      <div className="mx-auto max-w-[716px]">
        <div className="relative">
          <Avatar className="mx-auto block h-14 w-14 md:h-20 md:w-20">
            <AvatarImage
              src={avatarPreview}
              className="m-auto block rounded-full"
            />
            <AvatarFallback className="mx-auto w-full rounded-full bg-primary-color-100 p-2 text-2xl text-primary-color-600 md:p-4">
              {userDetails.firstname ? (
                `${userDetails.firstname.charAt(0).toUpperCase()}${userDetails.lastname.charAt(0).toUpperCase()}`
              ) : isLoading ? (
                <Skeleton className="h-12 w-12 rounded-full" />
              ) : (
                `${data?.data?.data.firstname.charAt(0).toUpperCase()}${data?.data?.data.lastname.charAt(0).toUpperCase()}`
              )}
            </AvatarFallback>
          </Avatar>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="avatar"
            className="absolute bottom-0 -top-1 left-64 lg:left-[360px] p-2 rounded-full cursor-pointer"
          >
            <FontAwesomeIcon icon={faPen} className="text-primary-color-600 text-xs" />
          </label>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-4">
              <FormInput
                name="username"
                id="username"
                label="Username"
                placeholder=""
                type="text"
                control={form.control}
              />
              <div className="grid gap-x-4 md:grid-cols-2">
                <FormInput
                  name="firstname"
                  id="firstname"
                  label="First Name"
                  placeholder=""
                  type="text"
                  control={form.control}
                />
                <FormInput
                  name="lastname"
                  id="lastname"
                  label="Last Name"
                  placeholder=""
                  type="text"
                  control={form.control}
                />
              </div>
              {/* Disabled fields */}
              <FormInput
                name="email"
                id="email"
                label="Email Address"
                placeholder=""
                type="email"
                control={form.control}
                disabled
              />
              <div className="grid gap-x-4 md:grid-cols-2">
                <PasswordInput
                  id="password"
                  label="Password"
                  name="password"
                  control={form.control}
                  placeholder="Change Password"
                  disabled
                />
                <PasswordInput
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  control={form.control}
                  placeholder="Enter password"
                  disabled
                />
              </div>
            </div>

            <CommonButton
              type="submit"
              className="mx-auto mt-6 block w-[55.865%] items-center bg-[#CC1747]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ClipLoader size={20} color={"#fff"} />
              ) : (
              
                  "Update Profile"

              )}
            </CommonButton>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditProfile;
