import { Link, useRouteError } from "react-router-dom";
import { CommonButton } from "./Components/ui/button";

const AdminErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div>
        <h1 className="text3xl text-center font-bold capitalize">
          something went wrong form admin
        </h1>
        <p>{error?.statusText ?? error?.message ?? ""}</p>
        <CommonButton className="mt-4">
          <Link to="/admin/course/management">Back to home</Link>
        </CommonButton>
      </div>
    </div>
  );
};

export default AdminErrorPage;
