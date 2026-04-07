import { useState } from "react";
import { axiosAdmin } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

export default function GlobalCohortManager() {
  const [month, setMonth] = useState("January Cohort");
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await axiosAdmin.post("/data/global-cohorts", { month, year: Number(year) });
      setMessage("Cohort created successfully!");
      queryClient.invalidateQueries(["global-cohorts"]);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating cohort");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-[12px] shadow-sm border border-[#E4E7EC] mt-6">
      <h3 className="text-lg font-semibold text-[#101828] mb-4">Create Global Cohort (Intake)</h3>
      <form onSubmit={handleCreate} className="flex gap-4 items-end flex-wrap sm:flex-nowrap">
        <div className="flex-1 w-full sm:w-auto">
          <label className="block text-sm font-medium text-[#344054] mb-1">Cohort Month Label</label>
          <input
            type="text"
            required
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full h-11 px-4 border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-0"
            placeholder="e.g. October Cohort"
          />
        </div>
        <div className="w-full sm:w-[150px]">
          <label className="block text-sm font-medium text-[#344054] mb-1">Year</label>
          <input
            type="number"
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full h-11 px-4 border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-0"
            placeholder="2027"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="h-11 px-6 bg-[#CD0000] hover:bg-[#A30000] text-white font-medium rounded-[8px] disabled:opacity-50 transition-colors w-full sm:w-auto"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
      {message && <p className="mt-3 text-sm text-[#CD0000] font-medium">{message}</p>}
    </div>
  );
}
