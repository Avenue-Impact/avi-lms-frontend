import { useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

export const COUNTRY_CODES = [
  { code: "GB", name: "United Kingdom", dial: "+44", minLen: 10, maxLen: 10 },
  { code: "NG", name: "Nigeria", dial: "+234", minLen: 10, maxLen: 10 },
  { code: "KE", name: "Kenya", dial: "+254", minLen: 9, maxLen: 9 },
  { code: "GH", name: "Ghana", dial: "+233", minLen: 9, maxLen: 9 },
  { code: "ZA", name: "South Africa", dial: "+27", minLen: 9, maxLen: 9 },
  { code: "US", name: "United States", dial: "+1", minLen: 10, maxLen: 10 },
  { code: "CA", name: "Canada", dial: "+1", minLen: 10, maxLen: 10 },
  { code: "AU", name: "Australia", dial: "+61", minLen: 9, maxLen: 9 },
  { code: "IN", name: "India", dial: "+91", minLen: 10, maxLen: 10 },
  { code: "DE", name: "Germany", dial: "+49", minLen: 10, maxLen: 11 },
  { code: "FR", name: "France", dial: "+33", minLen: 9, maxLen: 9 },
  { code: "AE", name: "UAE", dial: "+971", minLen: 9, maxLen: 9 },
  { code: "SG", name: "Singapore", dial: "+65", minLen: 8, maxLen: 8 },
  { code: "ZM", name: "Zambia", dial: "+260", minLen: 9, maxLen: 9 },
  { code: "TZ", name: "Tanzania", dial: "+255", minLen: 9, maxLen: 9 },
  { code: "UG", name: "Uganda", dial: "+256", minLen: 9, maxLen: 9 },
  { code: "RW", name: "Rwanda", dial: "+250", minLen: 9, maxLen: 9 },
  { code: "ET", name: "Ethiopia", dial: "+251", minLen: 9, maxLen: 9 },
  { code: "SN", name: "Senegal", dial: "+221", minLen: 9, maxLen: 9 },
  { code: "CI", name: "Côte d'Ivoire", dial: "+225", minLen: 10, maxLen: 10 },
  { code: "CM", name: "Cameroon", dial: "+237", minLen: 9, maxLen: 9 },
  { code: "EG", name: "Egypt", dial: "+20", minLen: 10, maxLen: 10 },
  { code: "MA", name: "Morocco", dial: "+212", minLen: 9, maxLen: 9 },
];

export const flagEmoji = (code) =>
  code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397))
    .join("");

/**
 * Validates a local phone number against selected country rules.
 * Returns null if valid, or an error string if invalid.
 */
export function validatePhoneNumber(localDigits, country) {
  const digits = (localDigits || "").trim();
  if (!digits) return "Phone number is required";
  if (digits.startsWith("0")) {
    return "Phone number cannot start with a zero";
  }
  if (!/^\d+$/.test(digits)) {
    return "Phone number must contain digits only";
  }
  if (digits.length < country.minLen) {
    return `Phone number is too short (min ${country.minLen} digits)`;
  }
  if (digits.length > country.maxLen) {
    return `Phone number is too long (max ${country.maxLen} digits)`;
  }
  return null;
}

/**
 * WhatsAppPhoneInput - Reusable phone input with country flag selector & validation.
 * Matches GetInTouch.jsx contact form styling and admin dashboard standards.
 */
export default function WhatsAppPhoneInput({
  value = "",
  onChange,
  disabled = false,
  label = "WhatsApp Number",
  required = false,
  placeholder = "e.g. 7377653977",
  id = "whatsapp-phone-input",
  error: externalError,
  helperText,
}) {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]); // default UK
  const [localNumber, setLocalNumber] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [touched, setTouched] = useState(false);
  const dropdownRef = useRef(null);

  // Parse initial value (e.g. "+2349041189378")
  useEffect(() => {
    if (value) {
      const clean = value.trim();
      const sorted = [...COUNTRY_CODES].sort((a, b) => b.dial.length - a.dial.length);
      const matched = sorted.find((c) => clean.startsWith(c.dial));
      if (matched) {
        setSelectedCountry(matched);
        setLocalNumber(clean.slice(matched.dial.length).replace(/\D/g, ""));
      } else {
        setLocalNumber(clean.replace(/\D/g, ""));
      }
    }
  }, [value]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return COUNTRY_CODES;
    const s = search.toLowerCase();
    return COUNTRY_CODES.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.dial.includes(s) ||
        c.code.toLowerCase().includes(s)
    );
  }, [search]);

  const validationError = useMemo(() => {
    if (!touched && !localNumber) return null;
    return validatePhoneNumber(localNumber, selectedCountry);
  }, [localNumber, selectedCountry, touched]);

  const displayError = externalError || (touched ? validationError : null);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
    setSearch("");
    const fullNumber = localNumber ? `${country.dial}${localNumber}` : "";
    const err = validatePhoneNumber(localNumber, country);
    onChange?.({
      fullNumber,
      country,
      localNumber,
      isValid: !err,
      error: err,
    });
  };

  const handleLocalChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setLocalNumber(raw);
    setTouched(true);
    const fullNumber = raw ? `${selectedCountry.dial}${raw}` : "";
    const err = validatePhoneNumber(raw, selectedCountry);
    onChange?.({
      fullNumber,
      country: selectedCountry,
      localNumber: raw,
      isValid: !err,
      error: err,
    });
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-[13px] font-semibold text-[#344054] mb-1.5"
        >
          {label} {required && <span className="text-[#CC1747]">*</span>}
        </label>
      )}

      {/* Input wrapper matching contact page phone field */}
      <div className="relative flex items-stretch rounded-lg border border-[#D0D5DD] bg-white transition-all focus-within:border-[#CC1747] focus-within:ring-2 focus-within:ring-[#CC1747]/10">
        {/* Country code selector button */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            onClick={() => {
              if (disabled) return;
              setDropdownOpen((o) => !o);
              setSearch("");
            }}
            className="flex h-full items-center gap-1.5 bg-[#F9FAFB] px-3 text-[13px] font-medium text-[#344054] border-r border-[#D0D5DD] hover:bg-[#F2F4F7] transition-colors rounded-l-lg select-none disabled:opacity-60"
          >
            <span className="text-base leading-none" aria-hidden="true">
              {flagEmoji(selectedCountry.code)}
            </span>
            <span className="font-semibold text-[#101828] text-[13px]">
              {selectedCountry.dial}
            </span>
            <span className="text-[10px] text-[#667185]" aria-hidden="true">
              {dropdownOpen ? "▲" : "▼"}
            </span>
          </button>

          {/* Searchable dropdown */}
          {dropdownOpen && (
            <div
              className="absolute left-0 top-[calc(100%+4px)] z-50 w-72 max-h-72 overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-xl flex flex-col"
              role="listbox"
            >
              <div className="p-2 border-b border-[#E4E7EC] bg-[#FAFAFA]">
                <input
                  type="text"
                  placeholder="Search country or code..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                  className="w-full rounded-md border border-[#D0D5DD] bg-white px-2.5 py-1.5 text-xs text-[#344054] placeholder-[#98A2B3] focus:border-[#CC1747] focus:outline-none"
                />
              </div>

              <div className="overflow-y-auto max-h-56 divide-y divide-[#F2F4F7]">
                {filteredCountries.length === 0 ? (
                  <div className="p-3 text-center text-xs text-[#98A2B3]">
                    No country found
                  </div>
                ) : (
                  filteredCountries.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      role="option"
                      aria-selected={c.code === selectedCountry.code}
                      onClick={() => handleCountrySelect(c)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-[#F9FAFB] ${
                        c.code === selectedCountry.code
                          ? "bg-[#FFF0F2] text-[#CC1747] font-semibold"
                          : "text-[#344054]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{flagEmoji(c.code)}</span>
                        <span>{c.name}</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#667185]">
                        {c.dial}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Local number input */}
        <input
          id={id}
          type="tel"
          disabled={disabled}
          value={localNumber}
          onChange={handleLocalChange}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          className="flex-1 rounded-r-lg bg-transparent px-3 py-2.5 text-[14px] text-[#101828] placeholder-[#98A2B3] focus:outline-none disabled:opacity-60"
        />
      </div>

      {/* Helper text or validation error */}
      {displayError ? (
        <p className="mt-1 text-xs text-[#CC1747] flex items-center gap-1 font-medium">
          <span>⚠</span> {displayError}
        </p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-[#667185]">{helperText}</p>
      ) : null}
    </div>
  );
}

WhatsAppPhoneInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
};
