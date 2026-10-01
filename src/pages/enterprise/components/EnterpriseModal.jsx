import React, { useState } from "react";
import { X, CheckCircle2, Send, Building2, User, Mail, Phone, FileText } from "lucide-react";
import toast from "react-hot-toast";

export const EnterpriseModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    sector: "Healthcare / NHS",
    deliveryNeed: "Transformation Delivery Teams",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.fullName || !formData.organization) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Enterprise delivery inquiry submitted successfully!");
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      sector: "Healthcare / NHS",
      deliveryNeed: "Transformation Delivery Teams",
      details: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 font-inter text-[#0A1430] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="font-space text-[11px] font-bold text-[#CC1747] tracking-widest uppercase">
                ENTERPRISE INQUIRY
              </span>
              <h3 className="font-space font-extrabold text-2xl text-[#0A1430] mt-1">
                Talk to us about your delivery needs
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tell us about your project or workforce requirements. Our executive team will get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-[#CC1747]">*</span>
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#CC1747] focus:ring-1 focus:ring-[#CC1747] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email <span className="text-[#CC1747]">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="sarah@company.com"
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#CC1747] focus:ring-1 focus:ring-[#CC1747] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+44 7123 456789"
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#CC1747] focus:ring-1 focus:ring-[#CC1747] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Organization / Company <span className="text-[#CC1747]">*</span>
                </label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    name="organization"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="e.g. NHS Trust / Global Tech Ltd"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#CC1747] focus:ring-1 focus:ring-[#CC1747] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sector
                  </label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#CC1747] focus:ring-1 focus:ring-[#CC1747] outline-none bg-white"
                  >
                    <option value="Healthcare / NHS">Healthcare / NHS</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Government / Public Sector">Government / Public Sector</option>
                    <option value="Higher Education">Higher Education</option>
                    <option value="Corporate Tech">Corporate Tech</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Delivery Need
                  </label>
                  <select
                    name="deliveryNeed"
                    value={formData.deliveryNeed}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#CC1747] focus:ring-1 focus:ring-[#CC1747] outline-none bg-white"
                  >
                    <option value="Transformation Delivery Teams">Transformation Delivery Teams</option>
                    <option value="Workforce Upskilling & Scale">Workforce Upskilling & Scale</option>
                    <option value="Global Delivery Pipeline">Global Delivery Pipeline</option>
                    <option value="General Enterprise Consultation">General Enterprise Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Details / Timeline
                </label>
                <textarea
                  name="details"
                  rows={3}
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Briefly describe your project, team size requirement, or key milestones..."
                  className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#CC1747] focus:ring-1 focus:ring-[#CC1747] outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#CC1747] hover:bg-[#b0133d] text-white font-semibold text-xs sm:text-sm py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Submit Delivery Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-space font-extrabold text-2xl text-[#0A1430]">
              Inquiry Received!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
              Thank you, <strong className="text-[#0A1430]">{formData.fullName}</strong>. Our enterprise executive team has received your request and will reach out to <span className="text-[#CC1747] font-semibold">{formData.email}</span> within 24 hours.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="bg-[#0A1430] text-white text-xs font-semibold px-6 py-2.5 rounded-xl hover:bg-[#151F3D] transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterpriseModal;
