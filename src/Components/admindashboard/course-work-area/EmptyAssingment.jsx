import icon from "../../../assets/icons/book.png";

function EmptyAssingment() {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
      <div>
        <img src={icon} alt="" className="mx-auto block" />
        <p className="mx-auto mb-2 mt-5 text-center text-xl font-medium text-[#101928]">
          No Assignments Received
        </p>
        <p className="mx-auto max-w-[521px] text-center font-light text-[#101928]">
          There are no assignments submitted at the moment. Once students submit
          their work, {"you'll"} be able to review and manage their assignments
          here.
        </p>
      </div>
    </div>
  );
}

export default EmptyAssingment;
