import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BroadcastsTab from "./tabs/BroadcastsTab";
import WhatsAppNumbersTab from "./tabs/WhatsAppNumbersTab";
import MessageTemplatesTab from "./tabs/MessageTemplatesTab";

const TABS = [
  { id: "broadcasts", label: "Broadcasts" },
  { id: "numbers", label: "WhatsApp numbers" },
  { id: "templates", label: "Message templates" },
];

const WhatsAppBroadcastPage = () => {
  const [activeTab, setActiveTab] = useState("broadcasts");
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen bg-white">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-[#23314A]">WhatsApp Broadcast</h1>
          <p className="text-[14px] text-[#667185] mt-1">
            Send messages to registered members, everyone or by cohort.
          </p>
        </div>

        {/* Dynamic CTA based on active tab */}
        {activeTab === "broadcasts" && (
          <button
            className="flex items-center gap-2 bg-[#CC1747] text-white px-4 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#b0133d] transition-colors"
            onClick={() => navigate("/admin/whatsapp-broadcast/new")}
          >
            <span className="text-lg leading-none">+</span>
            New broadcast
          </button>
        )}
        {activeTab === "numbers" && (
          <button
            className="flex items-center gap-2 bg-[#CC1747] text-white px-4 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#b0133d] transition-colors"
            onClick={() => navigate("/admin/whatsapp-broadcast/add-number")}
          >
            <span className="text-lg leading-none">+</span>
            Add WhatsApp Number
          </button>
        )}
        {activeTab === "templates" && (
          <button
            className="flex items-center gap-2 bg-[#CC1747] text-white px-4 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#b0133d] transition-colors"
            onClick={() => setShowAddTemplateModal(true)}
          >
            <span className="text-lg leading-none">+</span>
            Add message template
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E4E7EC] mb-6">
        <nav className="flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-[14px] font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-[#CC1747] text-[#CC1747]"
                  : "border-transparent text-[#667185] hover:text-[#23314A]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "broadcasts" && <BroadcastsTab />}
      {activeTab === "numbers" && <WhatsAppNumbersTab />}
      {activeTab === "templates" && (
        <MessageTemplatesTab
          showAddModal={showAddTemplateModal}
          onCloseAddModal={() => setShowAddTemplateModal(false)}
        />
      )}
    </div>
  );
};

export default WhatsAppBroadcastPage;
