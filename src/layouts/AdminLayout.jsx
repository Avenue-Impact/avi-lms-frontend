import AdminSideNav from "@/Components/admindashboard/AdminSideNav";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFetchNotifications } from "@/hooks/notifications/use-fetch-admin-notifications";
import toast from "react-hot-toast";

function AdminLayout() {
  const { data } = useFetchNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data?.data) {
      const notifications = data.data.data;
      const unreadBankTransfers = notifications.filter(
        (notif) =>
          notif.title &&
          notif.title.toLowerCase().includes("bank transfer") &&
          !notif.isSeen
      );

      if (unreadBankTransfers.length > 0) {
        const hasPrompted = sessionStorage.getItem("bankTransferPrompted");
        if (!hasPrompted) {
          toast(
            (t) => (
              <span
                className="cursor-pointer hover:underline"
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate("/admin/bank-transfers");
                }}
              >
                You have {unreadBankTransfers.length} pending bank transfer(s) awaiting approval. Click to view.
              </span>
            ),
            {
              icon: "🔔",
              duration: 8000,
            }
          );
          sessionStorage.setItem("bankTransferPrompted", "true");
        }
      }
    }
  }, [data, navigate]);

  return (
    <div className="relative">
      <AdminSideNav />
      <main className="ml-[249px] px-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
