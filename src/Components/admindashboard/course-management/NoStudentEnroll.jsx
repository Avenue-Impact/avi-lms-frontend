import img from "../../../assets/images/admin/no-student-icon.png";
const NoStudentEnroll = () => {
  return (
    <div className="grid h-full w-full">
      <div className="mx-auto mt-6 w-max">
        <img src={img} alt="no student enroll icon" />
      </div>

      <div className="mt-5 space-y-2">
        <h4 className="text-center font-poppins text-xl font-medium text-[#101928]">
          No Students Enrolled Yet{" "}
        </h4>
        <p className="text-center font-poppins font-light text-[#101928]">
          There are currently no students enrolled in this course
        </p>
      </div>
    </div>
  );
};

export default NoStudentEnroll;
