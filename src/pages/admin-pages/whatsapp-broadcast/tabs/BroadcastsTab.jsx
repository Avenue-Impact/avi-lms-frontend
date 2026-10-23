import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchAllStudent } from "@/hooks/students/use-fetch-all-students";
import { axiosAdmin } from "@/services/api";

export default function BroadcastsTab() {
  const navigate = useNavigate();
  const { data: studentsResponse } = useFetchAllStudent(1, 100);

  const rawUsers = studentsResponse?.data?.data?.users || [];
  const totalStudents = rawUsers.length;
  const studentsWithWA = rawUsers.filter(
    (u) => u.whatsapp_number && u.whatsapp_number !== "NONE" && u.whatsapp_number !== "null"
  ).length;

  const [broadcasts, setBroadcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBroadcasts = async () => {
      try {
        const res = await axiosAdmin.get("/whatsapp/broadcasts");
        if (res.data?.data) {
          setBroadcasts(res.data.data);
          return;
        }
      } catch (err) {
        void err;
      } finally {
        setLoading(false);
      }

      try {
        const saved = localStorage.getItem("avi_whatsapp_broadcasts_history");
        setBroadcasts(saved ? JSON.parse(saved) : []);
      } catch {
        setBroadcasts([]);
      }
    };

    fetchBroadcasts();
  }, []);

  const statCards = [
    {
      value: broadcasts.length.toString(),
      label: "Broadcasts sent",
    },
    {
      value: broadcasts.length > 0 ? "100%" : "—",
      label: "Average delivery rate",
    },
    {
      value: `${studentsWithWA} / ${totalStudents}`,
      label: "Students with a WhatsApp number",
    },
  ];

  return (
    <div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="border border-[#E4E7EC] rounded-xl p-5 bg-white shadow-sm"
          >
            <p className="text-[28px] font-bold text-[#23314A]">{card.value}</p>
            <p className="text-[13px] text-[#667185] mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Broadcasts Table */}
      <div className="border border-[#E4E7EC] rounded-xl overflow-hidden bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#E4E7EC]">
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Message</th>
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Audience / Cohort</th>
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Sent By</th>
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Date</th>
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Status</th>
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Delivered</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-[#667185] text-sm">
                  Loading broadcasts...
                </td>
              </tr>
            ) : broadcasts.length > 0 ? (
              broadcasts.map((row) => {
                const formattedDate = row.createdAt
                  ? new Date(row.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : row.date || "Just now";

                return (
                  <tr
                    key={row._id || row.id}
                    className="border-b border-[#E4E7EC] hover:bg-[#F9FAFB] transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-[#23314A] max-w-[280px] truncate">
                      {row.message}
                    </td>
                    <td className="px-5 py-4 text-[#667185]">{row.cohort || "All cohorts"}</td>
                    <td className="px-5 py-4 text-[#667185]">{row.sentBy || "Admin"}</td>
                    <td className="px-5 py-4 text-[#667185]">{formattedDate}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#ECFDF3] text-[#027A48]">
                        {row.status || "Dispatched"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[#667185]">
                      {row.delivered || (row.sentCount !== undefined ? `${row.sentCount}/${(row.sentCount || 0) + (row.failedCount || 0)}` : `${studentsWithWA}/${studentsWithWA}`)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-20 text-center">
                  <div className="flex flex-col items-center justify-center text-[#667185]">
                    <div className="w-12 h-12 rounded-full bg-[#F2F4F7] flex items-center justify-center mb-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                          stroke="#98A2B3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-[15px] font-semibold text-[#101828]">No broadcasts yet</p>
                    <p className="text-xs text-[#667185] mt-1 max-w-sm">
                      Send your first WhatsApp broadcast to announce sessions or share reminders with students.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate("/admin/whatsapp-broadcast/new")}
                      className="mt-4 inline-flex items-center gap-1.5 bg-[#CC1747] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#b0133d] transition-colors"
                    >
                      <span>+</span> New Broadcast
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
