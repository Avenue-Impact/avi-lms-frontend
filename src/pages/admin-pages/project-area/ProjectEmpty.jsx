import icon from "../../../assets/icons/file-icon.png";

function ProjectEmpty() {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
      <div>
        <img src={icon} alt="" className="mx-auto block" />
        <p className="mx-auto mb-2 mt-5 text-center text-xl font-medium text-[#101928]">
          No Course Available{" "}
        </p>
        <p className="mx-auto text-center font-light text-[#101928]">
          Start by creating a course
        </p>
      </div>
    </div>
  );
}

export default ProjectEmpty;
