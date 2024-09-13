import icon from "../../../assets/icons/file-icon.png";

function EmptyGroup() {
  return (
    <div className="baby flex h-[calc(70vh-100px)] w-full items-center justify-center overflow-y-auto">
      <div>
        <img
          src={icon}
          alt=""
          className="mx-auto block w-24"
          width={100}
          height={110}
        />
        <p className="mx-auto mb-2 mt-5 text-center text-xl font-medium text-[#101928]">
          No Group Available
        </p>
        <p className="mx-auto text-center font-light text-[#101928]">
          There are no groups created in this area yet.
        </p>
      </div>
    </div>
  );
}

export default EmptyGroup;
