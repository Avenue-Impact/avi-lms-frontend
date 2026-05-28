import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  Mail,
  Phone,
  Building2,
  Save,
  LogOut,
} from "lucide-react";
import { useInstructorAuth } from "@/hooks/instructor/use-instructor-auth";
import { axiosInstructor } from "@/services/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

/* ─────────────────────────────────────────────
   Small reusable section card
───────────────────────────────────────────── */
const SettingsCard = ({ title, subtitle, icon: Icon, children }) => (
  <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
    <div className="border-b border-gray-50 px-6 py-5">
      <div className="flex items-center gap-3">
        <div className="bg-primary-color-50 flex h-9 w-9 items-center justify-center rounded-xl text-primary-color-600">
          <Icon size={18} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900">{title}</h3>
          {subtitle && (
            <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
    <div className="px-6 py-5">{children}</div>
  </div>
);

/* ─────────────────────────────────────────────
   Text field
───────────────────────────────────────────── */
const Field = ({
  label,
  value,
  readOnly = true,
  icon: Icon,
  type = "text",
}) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
        />
      )}
      <input
        type={type}
        defaultValue={value || ""}
        readOnly={readOnly}
        className={`w-full rounded-xl border py-2.5 pr-4 text-sm text-gray-700 transition-colors focus:outline-none ${
          Icon ? "pl-9" : "pl-4"
        } ${
          readOnly
            ? "cursor-default border-gray-100 bg-gray-50 text-gray-500"
            : "focus:border-primary-color-400 border-gray-200 bg-white focus:ring-2 focus:ring-primary-color-100"
        }`}
      />
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Password field
───────────────────────────────────────────── */
const PasswordField = ({ label, value, onChange, placeholder }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </label>
      <div className="relative">
        <Lock
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
        />
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="focus:border-primary-color-400 w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-color-100"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
const InstructorSettings = () => {
  const { data: instructor } = useInstructorAuth();

  const fName = instructor?.firstname || instructor?.first_name || "";
  const lName = instructor?.lastname || instructor?.last_name || "";
  const initials =
    `${fName?.[0] || ""}${lName?.[0] || ""}`.toUpperCase() || "I";
  const fullName = `${fName} ${lName}`.trim() || "Instructor";

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  // Notification prefs (local UI only — extend with API when ready)
  const [notifySubmissions, setNotifySubmissions] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyReminders, setNotifyReminders] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setChangingPassword(true);
    try {
      await axiosInstructor.patch("/me/password", {
        current_password: currentPassword,
        new_password: newPassword,
      });
      toast.success("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to update password. Check your current password.",
      );
    } finally {
      setChangingPassword(false);
    }
  };

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("token");
    Cookies.remove("userRole");
    window.location.href = "/login?_r=/instructor/dashboard";
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-[28px] font-bold leading-tight text-gray-900">
          Account Settings
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage your profile, security, and notification preferences.
        </p>
      </div>

      {/* ── Profile Overview ── */}
      <SettingsCard
        title="Profile Information"
        subtitle="Your account details — contact admin to update."
        icon={User}
      >
        {/* Avatar row */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-color-700 text-xl font-bold text-white shadow-md">
            {initials}
          </div>
          <div>
            <p className="text-base font-bold text-gray-900">{fullName}</p>
            <p className="text-sm capitalize text-gray-400">
              {instructor?.role || "Instructor"}
            </p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="First Name" value={fName} icon={User} />
          <Field label="Last Name" value={lName} icon={User} />
          <Field label="Email Address" value={instructor?.email} icon={Mail} />
          <Field
            label="Phone"
            value={instructor?.phone || instructor?.phoneNumber || "—"}
            icon={Phone}
          />
          <Field
            label="Role"
            value={instructor?.role || "Instructor"}
            icon={Building2}
          />
        </div>
      </SettingsCard>

      {/* ── Change Password ── */}
      <SettingsCard
        title="Change Password"
        subtitle="Use a strong password with uppercase, numbers, and symbols."
        icon={Lock}
      >
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <PasswordField
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <PasswordField
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 8 characters"
            />
            <PasswordField
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
            />
          </div>

          {/* Strength hints */}
          {newPassword && (
            <ul className="grid grid-cols-2 gap-1.5 rounded-xl border border-gray-100 bg-gray-50 p-4">
              {[
                { label: "8+ characters", ok: newPassword.length >= 8 },
                { label: "Uppercase letter", ok: /[A-Z]/.test(newPassword) },
                { label: "Lowercase letter", ok: /[a-z]/.test(newPassword) },
                { label: "Number", ok: /[0-9]/.test(newPassword) },
                {
                  label: "Special character",
                  ok: /[^A-Za-z0-9]/.test(newPassword),
                },
                {
                  label: "Passwords match",
                  ok: newPassword === confirmPassword && confirmPassword !== "",
                },
              ].map((r) => (
                <li key={r.label} className="flex items-center gap-1.5">
                  <CheckCircle
                    size={12}
                    className={r.ok ? "text-emerald-500" : "text-gray-300"}
                  />
                  <span
                    className={`text-xs ${r.ok ? "text-emerald-700" : "text-gray-400"}`}
                  >
                    {r.label}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={changingPassword}
              className="hover:bg-primary-color-700 flex items-center gap-2 rounded-xl bg-primary-color-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50"
            >
              <Save size={15} />
              {changingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </SettingsCard>

      {/* ── Notifications ── */}
      {/* <SettingsCard
        title="Notification Preferences"
        subtitle="Control which in-app alerts you receive."
        icon={Bell}
      >
        <div className="space-y-4">
          {[
            {
              label: "New student submissions",
              desc: "Get notified when a student submits an assignment.",
              value: notifySubmissions,
              set: setNotifySubmissions,
            },
            {
              label: "New messages",
              desc: "Alerts when a student or admin sends you a message.",
              value: notifyMessages,
              set: setNotifyMessages,
            },
            {
              label: "Session reminders",
              desc: "Reminders 15 min before a live session starts.",
              value: notifyReminders,
              set: setNotifyReminders,
            },
          ].map((pref) => (
            <div
              key={pref.label}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">{pref.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{pref.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => pref.set((v) => !v)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  pref.value ? "bg-primary-color-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    pref.value ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </SettingsCard> */}

      {/* ── Security / Danger Zone ── */}
      <SettingsCard
        title="Security"
        subtitle="Session and account management."
        icon={Shield}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50/50 p-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Sign out of all devices
              </p>
              <p className="mt-0.5 text-xs text-gray-400">
                This will clear your session and redirect you to login.
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </SettingsCard>
    </div>
  );
};

export default InstructorSettings;
