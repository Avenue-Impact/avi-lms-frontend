import { useState } from "react";
import WhatsAppPhoneInput, { COUNTRY_CODES, flagEmoji } from "@/Components/common/WhatsAppPhoneInput";
import { useFetchAllStudent } from "@/hooks/students/use-fetch-all-students";
import { axiosAdmin } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function WhatsAppNumbersTab() {
  const queryClient = useQueryClient();
  const { data: studentsResponse, isLoading, error } = useFetchAllStudent(1, 100);

  const rawUsers = studentsResponse?.data?.data?.users || [];

  const [cohortFilter, setCohortFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Edit Modal State
  const [editingStudent, setEditingStudent] = useState(null);
  const [editPhoneState, setEditPhoneState] = useState({
    fullNumber: "",
    isValid: true,
    error: null,
  });
  const [isSaving, setIsSaving] = useState(false);

  // Normalize user items
  const studentsList = rawUsers.map((u) => {
    const fullName = `${u.first_name || ""} ${u.last_name || ""}`.trim() || u.user_name || u.username || "Student";
    const wa = u.whatsapp_number && u.whatsapp_number !== "NONE" && u.whatsapp_number !== "null" ? u.whatsapp_number : null;
    const isOptedOut = u.whatsapp_number === "NONE" || u.whatsapp_dismissed;
    const status = wa ? "Registered" : isOptedOut ? "Opted Out" : "Not provided";
    const cohort = u.cohort || u.cohortName || u.cohort_name || "—";

    return {
      id: u._id || u.id,
      name: fullName,
      email: u.email || "—",
      phone: u.phone || u.phoneNumber || null,
      whatsapp_number: wa,
      status,
      cohort,
      raw: u,
    };
  });

  // Derive unique cohorts for dropdown
  const cohortOptions = ["all", ...new Set(studentsList.map((s) => s.cohort).filter((c) => c && c !== "—"))];

  const filtered = studentsList.filter((m) => {
    const matchesCohort = cohortFilter === "all" || m.cohort === cohortFilter;
    const matchesSearch =
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.whatsapp_number && m.whatsapp_number.includes(search));
    return matchesCohort && matchesSearch;
  });

  const getCountryFlagForNumber = (num) => {
    if (!num) return null;
    const sorted = [...COUNTRY_CODES].sort((a, b) => b.dial.length - a.dial.length);
    const matched = sorted.find((c) => num.startsWith(c.dial));
    return matched ? flagEmoji(matched.code) : "📱";
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    const num = student.whatsapp_number || "";
    setEditPhoneState({
      fullNumber: num,
      isValid: Boolean(num),
      error: null,
    });
  };

  const handleSaveEdit = async () => {
    if (editPhoneState.error) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSaving(true);
    try {
      const cleanNum = editPhoneState.fullNumber ? editPhoneState.fullNumber.trim() : null;
      await axiosAdmin.patch(`/users/${editingStudent.id}`, {
        whatsapp_number: cleanNum,
        whatsapp_dismissed: false,
      });

      queryClient.invalidateQueries(["fetch-all-student"]);
      toast.success("Student WhatsApp number updated successfully");
      setEditingStudent(null);
    } catch (err) {
      void err;
      toast.error(err?.response?.data?.message || "Failed to update WhatsApp number");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearNumber = async () => {
    setIsSaving(true);
    try {
      await axiosAdmin.patch(`/users/${editingStudent.id}`, {
        whatsapp_number: "NONE",
        whatsapp_dismissed: true,
      });

      queryClient.invalidateQueries(["fetch-all-student"]);
      toast.success("WhatsApp number removed");
      setEditingStudent(null);
    } catch (err) {
      void err;
      toast.error(err?.response?.data?.message || "Failed to clear WhatsApp number");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {/* Filters — matching design: cohort dropdown + search */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {/* Cohort filter dropdown */}
        <div className="relative">
          <select
            value={cohortFilter}
            onChange={(e) => setCohortFilter(e.target.value)}
            className="appearance-none border border-[#D0D5DD] rounded-lg pl-3 pr-8 py-2 text-[13px] text-[#344054] bg-white focus:outline-none focus:ring-1 focus:ring-[#CC1747] focus:border-[#CC1747] min-w-[140px]"
          >
            <option value="all">All cohorts</option>
            {cohortOptions.slice(1).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-2.5 top-3 pointer-events-none"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
          >
            <path d="M1 1L6 6L11 1" stroke="#667185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <svg
            className="absolute left-3 top-2.5"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <circle cx="6" cy="6" r="5" stroke="#667185" strokeWidth="1.5" />
            <path d="M10.5 10.5L13 13" stroke="#667185" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-[#D0D5DD] rounded-lg pl-9 pr-4 py-2 text-[13px] text-[#344054] focus:outline-none focus:ring-1 focus:ring-[#CC1747] focus:border-[#CC1747]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#E4E7EC] rounded-xl overflow-hidden bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#E4E7EC]">
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Member</th>
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Cohort</th>
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Whatsapp Number</th>
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E7EC]">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-14 text-center text-[#667185] text-[13px]">
                  Loading students...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="py-14 text-center text-[#D92D20] text-[13px]">
                  Failed to load student records.
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-14 text-center text-[#667185] text-[13px]">
                  {studentsList.length === 0
                    ? "No students found. When students register, they will appear here."
                    : "No matching students found."}
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                  onClick={() => handleOpenEdit(row)}
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#23314A] text-[14px]">{row.name}</p>
                    <p className="text-[12px] text-[#667185]">{row.email}</p>
                  </td>
                  <td className="px-5 py-4 text-[13px] text-[#667185]">{row.cohort}</td>
                  <td className="px-5 py-4">
                    {row.whatsapp_number ? (
                      <span className="flex items-center gap-1.5 font-mono text-[13px] text-[#101828]">
                        <span>{getCountryFlagForNumber(row.whatsapp_number)}</span>
                        <span>{row.whatsapp_number}</span>
                      </span>
                    ) : (
                      <span className="text-[13px] text-[#98A2B3] italic">
                        {row.status === "Opted Out" ? "Opted out" : "Not provided"}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {row.status === "Registered" ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-[#ECFDF3] text-[#027A48]">
                        Registered
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-[#F2F4F7] text-[#667185]">
                        {row.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Admin Edit WhatsApp Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-[460px] rounded-2xl bg-white p-6 shadow-2xl border border-[#E4E7EC]">
            <h3 className="text-[17px] font-bold text-[#101828] mb-1">
              Edit WhatsApp Number
            </h3>
            <p className="text-xs text-[#667185] mb-5">
              Updating WhatsApp contact for <strong>{editingStudent.name}</strong> ({editingStudent.email}).
            </p>

            <div className="space-y-4">
              <WhatsAppPhoneInput
                value={editPhoneState.fullNumber}
                onChange={setEditPhoneState}
                label="WhatsApp Number"
                required
                helperText="Select country code and enter digits without leading zero."
              />

              {editingStudent.phone && (
                <div className="p-3 rounded-lg bg-[#F9FAFB] border border-[#E4E7EC] flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-[#667185]">Registered Phone on Profile:</p>
                    <p className="text-xs font-mono font-medium text-[#101828]">{editingStudent.phone}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditPhoneState({
                        fullNumber: editingStudent.phone,
                        isValid: true,
                        error: null,
                      });
                    }}
                    className="text-xs font-semibold text-[#25D366] hover:underline"
                  >
                    Use this
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#F2F4F7]">
              <button
                type="button"
                disabled={isSaving}
                onClick={handleClearNumber}
                className="text-xs text-[#D92D20] hover:underline disabled:opacity-50"
              >
                Remove number
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setEditingStudent(null)}
                  className="px-3.5 py-2 text-xs font-medium text-[#475467] hover:text-[#101828]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSaveEdit}
                  className="rounded-lg bg-[#CC1747] px-4 py-2 text-xs font-semibold text-white hover:bg-[#B0143D] transition-colors disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
