import { useEditStudentProfile } from "@/hooks/students/use-edit-student-profile";
import { useProfile } from "@/hooks/students/use-fetch-student-profile";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CommonButton } from "../ui/button";
import { Form } from "../ui/form";
import FormInput from "../ui/form-input";
import { Skeleton } from "../ui/skeleton";

// Validation schema
const profileSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
});

const EditProfileForm = () => {
  const { isLoading, data, isSuccess } = useProfile();

  const [avatar, setAvatar] = useState({
    file: null,
    preview: null,
  });

  const { editProfile, isEditing } = useEditStudentProfile();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
    },
  });
  useEffect(() => {
    isSuccess && form.setValue("firstname", data?.data?.data.firstname);
    isSuccess && form.setValue("lastname", data?.data?.data.lastname);
    isSuccess && form.setValue("username", data?.data?.data.username);
    isSuccess && form.setValue("email", data?.data?.data.email);
  }, [data, form, isSuccess]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    console.log(file);

    if (file) {
      setAvatar((prev) => ({
        ...prev,
        preview: URL.createObjectURL(file),
        file: file,
      }));
    }
  };
  // Handle form submission
  const handleSubmit = async (data) => {
    if (avatar.file) return editProfile({ ...data, avatar: avatar.file });
    editProfile(data);
  };

  const { isSubmitting } = form.formState;
  if (isLoading) return <p>loading..</p>;
  return (
    <>
      <div className="mx-auto max-w-[716px]">
        <div className="relative mx-auto h-14 w-14 md:h-20 md:w-20">
          {isLoading ? (
            <Skeleton className="mx-auto block h-14 w-14 rounded-full md:h-20 md:w-20" />
          ) : (
            <Avatar className="h-full w-full">
              <AvatarImage
                src={avatar.preview || data?.data?.data.avatar}
                className="m-auto block rounded-full"
              />
              <AvatarFallback className="mx-auto w-full rounded-full bg-primary-color-100 p-2 text-2xl text-primary-color-600 md:p-4">
                {`${data?.data?.data.firstname.charAt(0).toUpperCase() ?? "A"}${data?.data?.data.lastname.charAt(0).toUpperCase() ?? "I"}`}
              </AvatarFallback>
            </Avatar>
          )}
          <label
            htmlFor="avatar"
            className="absolute right-1 top-2"
            // onClick={() => imgRef.current.click()}
          >
            <FontAwesomeIcon
              icon={faPen}
              className="cursor-pointer text-sm text-primary-color-600"
            />
          </label>
        </div>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {/* <label
            htmlFor="avatar"
            className="absolute cursor-pointer rounded-full p-2 lg:left-[360px]"
          >
            <FontAwesomeIcon
              icon={faPen}
              className="text-xs text-primary-color-600"
            /> */}
        {/* </label> */}

        {isLoading ? (
          <div className="mt-4">
            <div>
              <Skeleton className="h-12 w-full max-w-[760px]" />
            </div>
            <div className="my-4 flex gap-2">
              <Skeleton className="h-12 w-full max-w-[380px]" />
              <Skeleton className="h-12 w-full max-w-[380px]" />
            </div>
            <div>
              <Skeleton className="h-12 w-full max-w-[760px]" />
            </div>
          </div>
        ) : (
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
                  disabled={true}
                />
              </div>

              <CommonButton
                type="submit"
                className="mx-auto mt-6 block w-[55.865%] items-center bg-[#CC1747]"
                disabled={isEditing}
              >
                {isSubmitting ? (
                  <ClipLoader size={20} color={"#fff"} />
                ) : (
                  "Update Profile"
                )}
              </CommonButton>
            </form>
          </Form>
        )}
      </div>
    </>
  );
};

export default EditProfileForm;
