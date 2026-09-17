import React, { useState } from "react";
import { Mail, User, Phone, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function AssessmentLeadModal({ isOpen, onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "Please enter your first name.";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Please enter your last name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative overflow-hidden">
        {/* Subtle accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D7195A] via-[#CC1747] to-[#0A1430]" />

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#D7195A] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#D7195A]">
              Step 4 Completed
            </span>
            <h2 className="font-space font-bold text-xl sm:text-2xl text-[#0A1430]">
              Where should we send your results?
            </h2>
          </div>
        </div>

        {/* Explain why details are required (Scenario 2) */}
        <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3.5 mb-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-inter flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            Enter your details so your personalized assessment results, recommended career pathway, and course syllabus can be sent directly to your email.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* First Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-inter">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: null }));
                  }}
                  placeholder="e.g. Sarah"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm font-inter text-[#0A1430] placeholder-slate-400 focus:outline-hidden transition-all ${
                    errors.firstName
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-slate-300 bg-white focus:border-[#D7195A] focus:ring-1 focus:ring-[#D7195A]"
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className="text-[11px] text-red-500 mt-1 font-inter">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-inter">
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: null }));
                  }}
                  placeholder="e.g. Jenkins"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm font-inter text-[#0A1430] placeholder-slate-400 focus:outline-hidden transition-all ${
                    errors.lastName
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-slate-300 bg-white focus:border-[#D7195A] focus:ring-1 focus:ring-[#D7195A]"
                  }`}
                />
              </div>
              {errors.lastName && (
                <p className="text-[11px] text-red-500 mt-1 font-inter">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-inter">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                }}
                placeholder="name@example.com"
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm font-inter text-[#0A1430] placeholder-slate-400 focus:outline-hidden transition-all ${
                  errors.email
                    ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-slate-300 bg-white focus:border-[#D7195A] focus:ring-1 focus:ring-[#D7195A]"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-500 mt-1 font-inter">{errors.email}</p>
            )}
          </div>

          {/* Phone Number (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-inter">
              Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+44 7123 456789"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-inter text-[#0A1430] placeholder-slate-400 focus:outline-hidden focus:border-[#D7195A] focus:ring-1 focus:ring-[#D7195A] transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#D7195A] hover:bg-[#c0144d] text-white font-inter font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-[#D7195A]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Continue Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
