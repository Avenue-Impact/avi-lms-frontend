import icon from "../../../assets/icons/book.png";
const EmptyCourseArea = () => {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
      <div>
        <img src={icon} alt="" className="mx-auto block" />
        <p className="mx-auto mb-2 mt-5 text-center text-xl font-medium text-[#101928]">
          No Course Available{" "}
        </p>
        <p className="mx-auto max-w-[521px] text-center font-light text-[#101928]">
          You haven’t created any courses yet. Start building your first course
          to engage your students and share your knowledge.
        </p>
      </div>
    </div>
  );
};

export default EmptyCourseArea;
