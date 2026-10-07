import React, { useState, useRef, useEffect, useMemo } from "react";
import { ArrowRight, ChevronDown, Check, Search } from "lucide-react";
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString } from "libphonenumber-js/min";
import darkLogo from "@/assets/logo/logo.svg";

// Initialize the display names API for country localized names (matching phone-input.jsx pattern)
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

// Helper to convert 2-letter ISO country code into Unicode flag emoji
const getCountryFlag = (countryCode) => {
  if (!countryCode || countryCode.length !== 2) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

// Generate list of all countries supported by libphonenumber-js
const ALL_COUNTRIES = getCountries()
  .map((countryCode) => {
    let countryName = countryCode;
    try {
      countryName = regionNames.of(countryCode) || countryCode;
    } catch (e) {
      // Fallback if region name parsing fails
    }
    return {
      code: countryCode, // e.g. 'NG', 'GB', 'US'
      dialCode: `+${getCountryCallingCode(countryCode)}`,
      name: countryName,
      flag: getCountryFlag(countryCode),
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

// Default to Nigeria (NG, +234) as shown in design
const DEFAULT_COUNTRY = ALL_COUNTRIES.find((c) => c.code === "NG") || ALL_COUNTRIES[0];

export default function AssessmentLeadModal({ isOpen, onClose, onSubmit, isSubmitting = false }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sendResources, setSendResources] = useState(true);
  const [errors, setErrors] = useState({});

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter countries using libphonenumber country records
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return ALL_COUNTRIES;
    const lowerQuery = searchQuery.toLowerCase().trim();
    return ALL_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.dialCode.includes(lowerQuery) ||
        c.code.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isCountryDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isCountryDropdownOpen]);

  // Close country dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
        setSearchQuery("");
      }
    }
    if (isCountryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCountryDropdownOpen]);

  // Handle ESC key to close if allowed
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (!nameRegex.test(firstName.trim())) {
      newErrors.firstName = "Please enter a valid first name";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (!nameRegex.test(lastName.trim())) {
      newErrors.lastName = "Please enter a valid last name";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Mobile number is required";
    } else {
      try {
        const parsed = parsePhoneNumberFromString(phoneNumber.trim(), selectedCountry.code);
        if (!parsed || !parsed.isPossible()) {
          newErrors.phoneNumber = "Please enter a valid mobile number";
        }
      } catch (e) {
        newErrors.phoneNumber = "Please enter a valid mobile number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneInputChange = (e) => {
    let val = e.target.value;

    // Auto-detect country if user pasted with a leading +
    if (val.startsWith("+")) {
      const sortedCodes = [...ALL_COUNTRIES].sort(
        (a, b) => b.dialCode.length - a.dialCode.length
      );
      for (const c of sortedCodes) {
        if (val.startsWith(c.dialCode)) {
          setSelectedCountry(c);
          val = val.slice(c.dialCode.length);
          break;
        }
      }
    }

    setPhoneNumber(val);
    if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanedPhone = phoneNumber.trim().replace(/^0+/, "");
    const fullPhoneNumber = `${selectedCountry.dialCode} ${cleanedPhone}`;

    onSubmit({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: fullPhoneNumber,
      dialCode: selectedCountry.dialCode,
      countryCode: selectedCountry.code,
      subscribe: sendResources,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200">
      <div
        className="w-full max-w-[460px] rounded-3xl bg-white p-7 sm:p-9 shadow-2xl border border-gray-100 transition-all transform animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Logo */}
        <div className="flex justify-center">
          <img
            src={darkLogo}
            alt="Avenue Impact"
            className="h-10 sm:h-11 w-auto object-contain"
          />
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="my-5 h-px w-full bg-gray-100" />

        {/* Headings */}
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#101928]">
            Almost there!
          </h2>
          <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#667185]">
            We'll email your full career match breakdown
            <br />
            so you can revisit it anytime.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                First name *
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: null }));
                }}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#101928] placeholder-gray-400 bg-white transition-all focus:outline-none ${
                  errors.firstName
                    ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 focus:border-[#D7195A] focus:ring-1 focus:ring-[#D7195A]"
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-[11px] text-red-500">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                Last name *
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: null }));
                }}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#101928] placeholder-gray-400 bg-white transition-all focus:outline-none ${
                  errors.lastName
                    ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 focus:border-[#D7195A] focus:ring-1 focus:ring-[#D7195A]"
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-[11px] text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-xs font-semibold text-[#344054] mb-1.5">
              Mobile *
            </label>
            <div className="flex gap-2 relative">
              {/* Country Code Selector Box */}
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  className="flex h-full min-w-[96px] items-center justify-between gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-[#101928] hover:bg-gray-50 transition-colors focus:outline-none focus:border-[#D7195A]"
                >
                  <span className="text-base leading-none">{selectedCountry.flag}</span>
                  <span className="text-xs font-semibold text-[#344054]">{selectedCountry.dialCode}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                </button>

                {/* Country Dropdown Menu powered by libphonenumber-js */}
                {isCountryDropdownOpen && (
                  <div className="absolute left-0 top-full z-50 mt-1 max-h-64 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl flex flex-col">
                    {/* Search inside country list */}
                    <div className="p-2 border-b border-gray-100 bg-gray-50/50">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search country..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#D7195A]"
                        />
                      </div>
                    </div>

                    {/* Scrollable list */}
                    <div className="overflow-y-auto max-h-48 py-1">
                      {filteredCountries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsCountryDropdownOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex w-full items-center justify-between px-3 py-2 text-left text-xs hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-base shrink-0">{country.flag}</span>
                            <span className="font-medium text-[#344054] truncate">{country.name}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400 shrink-0 ml-2">
                            <span className="font-mono text-[11px]">{country.dialCode}</span>
                            {selectedCountry.code === country.code && (
                              <Check className="h-3 w-3 text-[#D7195A]" />
                            )}
                          </div>
                        </button>
                      ))}
                      {filteredCountries.length === 0 && (
                        <div className="p-3 text-center text-xs text-gray-400">
                          No countries found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Phone Input */}
              <div className="flex-1">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneInputChange}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#101928] placeholder-gray-400 bg-white transition-all focus:outline-none ${
                    errors.phoneNumber
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-[#D7195A] focus:ring-1 focus:ring-[#D7195A]"
                  }`}
                />
              </div>
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-[11px] text-red-500">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#344054] mb-1.5">
              Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
              }}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#101928] placeholder-gray-400 bg-white transition-all focus:outline-none ${
                errors.email
                  ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-200 focus:border-[#D7195A] focus:ring-1 focus:ring-[#D7195A]"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="sendResources"
              checked={sendResources}
              onChange={(e) => setSendResources(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#D7195A] accent-[#D7195A] cursor-pointer shrink-0"
            />
            <label
              htmlFor="sendResources"
              className="text-xs text-[#667185] leading-snug cursor-pointer select-none font-inter"
            >
              Send me my results + free resources to help me land my first tech role.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D7195A] py-3.5 text-sm font-semibold text-white shadow-md shadow-[#D7195A]/30 transition-all hover:bg-[#c0144d] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? "Submitting..." : "Get My Results"}</span>
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
