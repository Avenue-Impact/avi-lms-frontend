import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import {
  useZoomAccounts,
  useAddZoomAccount,
  useUpdateZoomAccount,
  useToggleZoomAccount,
  useTestZoomAccount,
} from "@/hooks/zoom-management/use-zoom-accounts";
import {
  Plus,
  Pencil,
  Wifi,
  WifiOff,
  FlaskConical,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Loader2,
  Video,
} from "lucide-react";

const ZoomManagementPage = () => {
  const { showAddModal, setShowAddModal } = useOutletContext();
  const [editingAccount, setEditingAccount] = useState(null);

  const { data, isLoading } = useZoomAccounts();
  const accounts = data?.data?.data || [];

  return (
    <div>
      {/* Stats */}
      <div className="my-6 flex gap-4 rounded-[20px] border border-[#F0F2F5] bg-white p-5 shadow-md">
        <StatCard label="Total Accounts" value={accounts.length} color="blue" />
        <div className="h-full min-h-[102px] w-px bg-[#E6EDFF]"></div>
        <StatCard
          label="Active"
          value={accounts.filter((a) => a.is_active).length}
          color="green"
        />
        <div className="h-full min-h-[102px] w-px bg-[#E6EDFF]"></div>
        <StatCard
          label="Inactive"
          value={accounts.filter((a) => !a.is_active).length}
          color="red"
        />
      </div>

      {/* Account List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary-color-600" />
        </div>
      ) : accounts.length === 0 ? (
        <EmptyState onAdd={() => setShowAddModal(true)} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {accounts.map((account) => (
            <ZoomAccountCard
              key={account.id}
              account={account}
              onEdit={() => setEditingAccount(account)}
            />
          ))}
        </div>
      )}

      {(showAddModal || editingAccount) && (
        <ZoomAccountModal
          account={editingAccount}
          onClose={() => {
            setShowAddModal(false);
            setEditingAccount(null);
          }}
        />
      )}
    </div>
  );
};

/* ─── Sub-components ─── */

function StatCard({ label, value, color }) {
  return (
    <div className="w-full flex-1 pl-4">
      <p className={`mt-1 text-[28px] font-bold`}>{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

function ZoomAccountCard({ account, onEdit }) {
  const { mutate: toggle, isPending: isToggling } = useToggleZoomAccount();
  const { mutate: test, isPending: isTesting } = useTestZoomAccount();

  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <Video className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{account.name}</p>
            <p className="text-xs text-gray-400">
              {account.email || account.account_id}
            </p>
          </div>
        </div>
        <StatusBadge active={account.is_active} />
      </div>

      {/* Info */}
      <div className="mb-4 space-y-1 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>Token Type</span>
          <span className="font-medium text-gray-700">
            {account.token_type}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Last Refresh</span>
          <span className="font-medium text-gray-700">
            {account.updated_at
              ? new Date(account.updated_at).toLocaleString()
              : "Never"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => test(account.id)}
          disabled={isTesting}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-2 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-100 disabled:opacity-60"
        >
          {isTesting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <FlaskConical className="h-3.5 w-3.5" />
          )}
          Test
        </button>
        <button
          onClick={onEdit}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </button>
        <button
          onClick={() => toggle(account.id)}
          disabled={isToggling}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs font-medium transition disabled:opacity-60 ${
            account.is_active
              ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
              : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
          }`}
        >
          {isToggling ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : account.is_active ? (
            <WifiOff className="h-3.5 w-3.5" />
          ) : (
            <Wifi className="h-3.5 w-3.5" />
          )}
          {account.is_active ? "Deactivate" : "Activate"}
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ active }) {
  return (
    <span
      className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
      }`}
    >
      {active ? (
        <CheckCircle className="h-3 w-3" />
      ) : (
        <XCircle className="h-3 w-3" />
      )}
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
        <Video className="h-7 w-7 text-blue-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">
        No Zoom Accounts Yet
      </h3>
      <p className="mb-5 mt-1 max-w-xs text-sm text-gray-400">
        Add your first Zoom integration to start scheduling live sessions.
      </p>
      <button
        onClick={onAdd}
        className="hover:bg-primary-color-700 flex items-center gap-2 rounded-lg bg-primary-color-600 px-4 py-2 text-sm font-semibold text-white"
      >
        <Plus className="h-4 w-4" />
        Add Zoom Account
      </button>
    </div>
  );
}

function ZoomAccountModal({ account, onClose }) {
  const isEditing = !!account;
  const [form, setForm] = useState({
    name: account?.name || "",
    account_id: account?.account_id || "",
    client_id: account?.client_id || "",
    client_secret: "", // Don't pre-fill secrets for security, but allow updating if provided
    sdk_key: account?.sdk_key || "",
    sdk_secret: "",
  });
  const [showSecret, setShowSecret] = useState(false);
  const [showSdkSecret, setShowSdkSecret] = useState(false);
  const [showSdkFields, setShowSdkFields] = useState(!!account?.sdk_key);
  
  const { mutate: addAccount, isPending: isAdding } = useAddZoomAccount();
  const { mutate: updateAccount, isPending: isUpdating } = useUpdateZoomAccount();
  
  const isPending = isAdding || isUpdating;

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // For update, we only send fields that are not empty if they are sensitive
      // but here the backend handles it.
      updateAccount({ id: account.id, data: form }, {
        onSuccess: () => onClose(),
      });
    } else {
      addAccount(form, {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            {isEditing ? (
              <Pencil className="h-5 w-5 text-blue-600" />
            ) : (
              <Video className="h-5 w-5 text-blue-600" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {isEditing ? "Edit Zoom Account" : "Add Zoom Account"}
            </h2>
            <p className="text-xs text-gray-400">
              Server-to-Server OAuth credentials
            </p>
          </div>
        </div>

        <div className="alert alert-info my-2 text-xs font-light">
          <p>
            <span className="font-normal text-primary-color-600">Important:</span> Please follow{" "}
            <span className="font-medium text-primary-color-600 underline">
              <a href="/docs/zoom-setup" target="_blank">
                this guide
              </a>
            </span>{" "}
            carefully when creating or updating your Zoom app credentials.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field
            label="Account Label"
            name="name"
            placeholder="e.g. Main Platform Zoom"
            value={form.name}
            onChange={handleChange}
          />
          <Field
            label="Account ID"
            name="account_id"
            placeholder="From Zoom app dashboard"
            value={form.account_id}
            onChange={handleChange}
          />
          <Field
            label="Client ID"
            name="client_id"
            placeholder="From Zoom app dashboard"
            value={form.client_id}
            onChange={handleChange}
          />
          {/* Secret with toggle */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Client Secret {isEditing && <span className="text-[10px] font-normal text-gray-400 ml-1">(Leave blank to keep current)</span>}
            </label>
            <div className="relative">
              <input
                type={showSecret ? "text" : "password"}
                name="client_secret"
                placeholder={isEditing ? "••••••••••••••••" : "Encrypted before saving"}
                value={form.client_secret}
                onChange={handleChange}
                required={!isEditing}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pr-10 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={() => setShowSecret((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showSecret ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Optional SDK Section */}
          <div>
            <button
              type="button"
              onClick={() => setShowSdkFields((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              {showSdkFields ? "▾" : "▸"} Meeting SDK credentials (optional)
            </button>
            {showSdkFields && (
              <div className="mt-3 space-y-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs text-blue-600">
                  Only needed if this account has its <em>own</em> Meeting SDK
                  app. Leave blank to use the platform-wide SDK key.
                </p>
                <Field
                  label="SDK Key / API Key (Client ID)"
                  name="sdk_key"
                  placeholder="From Meeting SDK app dashboard"
                  value={form.sdk_key}
                  onChange={handleChange}
                  required={false}
                />
                {/* SDK Secret with toggle */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    SDK Secret / API Secret {isEditing && <span className="text-[10px] font-normal text-gray-400 ml-1">(Leave blank to keep)</span>}
                  </label>
                  <div className="relative">
                    <input
                      type={showSdkSecret ? "text" : "password"}
                      name="sdk_secret"
                      placeholder={isEditing ? "••••••••••••••••" : "Encrypted before saving"}
                      value={form.sdk_secret}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pr-10 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSdkSecret((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showSdkSecret ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="hover:bg-primary-color-700 flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-color-600 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {isPending ? "Saving..." : isEditing ? "Save Changes" : "Add Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, placeholder, value, onChange, required = true }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {!required && (
          <span className="ml-1 text-xs text-gray-400">(optional)</span>
        )}
      </label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
      />
    </div>
  );
}

export default ZoomManagementPage;
