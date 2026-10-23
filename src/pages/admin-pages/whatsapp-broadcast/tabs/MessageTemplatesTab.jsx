import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";
import AddTemplateModal from "../modals/AddTemplateModal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

export default function MessageTemplatesTab({ showAddModal = false, onCloseAddModal }) {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const res = await axiosAdmin.get("/whatsapp/templates");
      if (res.data?.data) {
        setTemplates(res.data.data);
      }
    } catch (err) {
      void err;
      // Fallback to localStorage if backend offline
      try {
        const saved = localStorage.getItem("avi_custom_whatsapp_templates");
        setTemplates(saved ? JSON.parse(saved) : []);
      } catch {
        setTemplates([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleCreated = (newTpl) => {
    setTemplates((prev) => [newTpl, ...prev]);
    onCloseAddModal?.();
  };

  const handleDelete = async (id) => {
    try {
      await axiosAdmin.delete(`/whatsapp/templates/${id}`);
      setTemplates((prev) => prev.filter((t) => (t._id || t.id) !== id));
      toast.success("Template deleted");
    } catch (err) {
      void err;
      // Local fallback
      setTemplates((prev) => prev.filter((t) => (t._id || t.id) !== id));
      try {
        const saved = JSON.parse(localStorage.getItem("avi_custom_whatsapp_templates") || "[]");
        localStorage.setItem(
          "avi_custom_whatsapp_templates",
          JSON.stringify(saved.filter((t) => (t._id || t.id) !== id))
        );
      } catch {
        // ignore
      }
      toast.success("Template removed");
    }
  };

  const handleUseTemplateInBroadcast = (tpl) => {
    navigate("/admin/whatsapp-broadcast/new", {
      state: { selectedTemplate: tpl },
    });
  };

  return (
    <div>
      {/* Table */}
      <div className="border border-[#E4E7EC] rounded-xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#E4E7EC]">
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Template name</th>
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Message</th>
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Status</th>
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Last used</th>
              <th className="text-left px-5 py-3.5 text-[#667185] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E7EC]">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-[#667185] text-xs">
                  Loading templates...
                </td>
              </tr>
            ) : templates.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-[#667185]">
                  <p className="text-sm font-medium text-[#23314A] mb-1">No message templates yet</p>
                  <p className="text-xs">
                    Click &ldquo;Add message template&rdquo; above to create a reusable template.
                  </p>
                </td>
              </tr>
            ) : (
              templates.map((row) => {
                const rowId = row._id || row.id;
                return (
                  <tr key={rowId} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-5 py-4 font-semibold text-[#23314A] text-[14px]">
                      {row.name}
                    </td>
                    <td className="px-5 py-4 text-[#667185] text-[13px] max-w-[320px]">
                      <span className="line-clamp-1">
                        {row.message?.length > 60
                          ? row.message.slice(0, 60) + "..."
                          : row.message}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-[#ECFDF3] text-[#027A48]">
                        Approved
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-[#667185]">
                      {row.lastUsed
                        ? new Date(row.lastUsed).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-5 py-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F2F4F7] transition-colors text-[#667185]"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="3" r="1.2" fill="currentColor" />
                              <circle cx="8" cy="8" r="1.2" fill="currentColor" />
                              <circle cx="8" cy="13" r="1.2" fill="currentColor" />
                            </svg>
                          </button>
                        </PopoverTrigger>

                        <PopoverContent
                          align="end"
                          side="bottom"
                          sideOffset={4}
                          className="w-44 bg-white border border-[#E4E7EC] rounded-lg shadow-lg py-1 p-0"
                        >
                          <button
                            type="button"
                            onClick={() => handleUseTemplateInBroadcast(row)}
                            className="w-full text-left px-4 py-2 text-[13px] font-medium text-[#CC1747] hover:bg-[#FFF5F7] transition-colors"
                          >
                            Use in broadcast
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedTemplate(row)}
                            className="w-full text-left px-4 py-2 text-[13px] text-[#344054] hover:bg-[#F9FAFB] transition-colors"
                          >
                            View details
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(rowId)}
                            className="w-full text-left px-4 py-2 text-[13px] text-[#D92D20] hover:bg-[#FEF3F2] transition-colors"
                          >
                            Delete
                          </button>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Details modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-2xl border border-[#E4E7EC]">
            <h3 className="text-base font-bold text-[#101828] mb-1">{selectedTemplate.name}</h3>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF3] text-[#027A48] mb-4">
              Approved · {selectedTemplate.category || "Utility"}
            </span>

            <p className="text-[12px] text-[#667185] mb-2 font-medium">Template body:</p>
            <div className="bg-[#F9FAFB] p-4 rounded-xl border border-[#E4E7EC] text-xs text-[#344054] leading-relaxed font-sans mb-4 whitespace-pre-wrap">
              {selectedTemplate.message}
            </div>

            {selectedTemplate.variables?.length > 0 && (
              <div className="mb-4">
                <p className="text-[11px] text-[#667185] mb-1 font-medium">Dynamic variables:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTemplate.variables.map((v) => (
                    <span
                      key={v}
                      className="inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]"
                    >
                      {`{{${v}}}`}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedTemplate(null)}
                className="rounded-lg border border-[#D0D5DD] px-4 py-2 text-xs font-medium text-[#344054] hover:bg-[#F9FAFB]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleUseTemplateInBroadcast(selectedTemplate)}
                className="rounded-lg bg-[#CC1747] px-4 py-2 text-xs font-medium text-white hover:bg-[#b0133d]"
              >
                Use in broadcast
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddTemplateModal
          onClose={onCloseAddModal}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}

MessageTemplatesTab.propTypes = {
  showAddModal: PropTypes.bool,
  onCloseAddModal: PropTypes.func,
};
