import LiveSession from "./LiveSession";
import RecordedSession from "./RecordedSession";

function LIveOrRecordedSelectionTabs() {
  return (
    <>
      <div className="mb-4 flex w-max gap-4 border-b border-[#98A2B3]">
        {/* <button
          className={`border-b-2 px-4 py-2 font-[600] ${tab === 1 ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "border-b-transparent text-[#344054]"} `}
          onClick={() => setTab(1)}
        >
          Live Session
        </button> */}

        <button
          className={`border-b-2 px-4 py-2 font-[600]  border-b-primary-color-600 text-primary-color-600 `}
          // onClick={() => setTab(2)}
        >
          Recorded
        </button>
      </div>

      {/* {tab === 1 && <LiveSession />} */}

      <RecordedSession />
    </>
  );
}

export default LIveOrRecordedSelectionTabs;
