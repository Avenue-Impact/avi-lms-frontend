import { CommonButton } from "./ui/button";

const Error = ({ error, refetch }) => {
  <div className="mt-6 h-full w-full space-y-3">
    <p className="text-center">
      Something Went Wrong{error?.response?.data?.message ?? ""}
    </p>

    <CommonButton
      className="mx-auto block bg-primary-color-600"
      onClick={refetch}
    >
      {"Retry"}
    </CommonButton>
  </div>;
};

export default Error;
