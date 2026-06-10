import { useState, useRef, useEffect } from "react";
import styles from "./GetInTouch.module.css";
import Button from "../Button";
import { toast } from "react-hot-toast";
import { submitContactUsForm } from "../../services/api";

// ─── Country codes (flag emoji + name + dial code) ───────────────────────────
const COUNTRY_CODES = [
  { code: "GB", name: "United Kingdom", dial: "+44", minLen: 10, maxLen: 10 },
  { code: "NG", name: "Nigeria",         dial: "+234", minLen: 10, maxLen: 10 },
  { code: "KE", name: "Kenya",           dial: "+254", minLen: 9, maxLen: 9 },
  { code: "GH", name: "Ghana",           dial: "+233", minLen: 9, maxLen: 9 },
  { code: "ZA", name: "South Africa",    dial: "+27", minLen: 9, maxLen: 9 },
  { code: "US", name: "United States",   dial: "+1", minLen: 10, maxLen: 10 },
  { code: "CA", name: "Canada",          dial: "+1", minLen: 10, maxLen: 10 },
  { code: "AU", name: "Australia",       dial: "+61", minLen: 9, maxLen: 9 },
  { code: "IN", name: "India",           dial: "+91", minLen: 10, maxLen: 10 },
  { code: "DE", name: "Germany",         dial: "+49", minLen: 10, maxLen: 11 },
  { code: "FR", name: "France",          dial: "+33", minLen: 9, maxLen: 9 },
  { code: "AE", name: "UAE",             dial: "+971", minLen: 9, maxLen: 9 },
  { code: "SG", name: "Singapore",       dial: "+65", minLen: 8, maxLen: 8 },
  { code: "ZM", name: "Zambia",          dial: "+260", minLen: 9, maxLen: 9 },
  { code: "TZ", name: "Tanzania",        dial: "+255", minLen: 9, maxLen: 9 },
  { code: "UG", name: "Uganda",          dial: "+256", minLen: 9, maxLen: 9 },
  { code: "RW", name: "Rwanda",          dial: "+250", minLen: 9, maxLen: 9 },
  { code: "ET", name: "Ethiopia",        dial: "+251", minLen: 9, maxLen: 9 },
  { code: "SN", name: "Senegal",         dial: "+221", minLen: 9, maxLen: 9 },
  { code: "CI", name: "Côte d'Ivoire",   dial: "+225", minLen: 10, maxLen: 10 },
  { code: "CM", name: "Cameroon",        dial: "+237", minLen: 9, maxLen: 9 },
  { code: "EG", name: "Egypt",           dial: "+20", minLen: 10, maxLen: 10 },
  { code: "MA", name: "Morocco",         dial: "+212", minLen: 9, maxLen: 9 },
];

// Flag emoji helper
const flagEmoji = (code) =>
  code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397))
    .join("");

const REQUIRED_FIELDS = [
  { key: "name",    label: "Your Name" },
  { key: "phone",   label: "Phone Number" },
  { key: "email",   label: "Email Address" },
  { key: "message", label: "Comment or Message" },
];

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    localPhone: "",       // digits only, entered by user
    countryDial: "+44",   // selected dial code (default: UK)
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [popupErrors, setPopupErrors] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setCountrySearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedCountry = COUNTRY_CODES.find((c) => c.dial === formData.countryDial) || COUNTRY_CODES[0];
  const filteredCountries = COUNTRY_CODES.filter((c) =>
    `${c.name} ${c.dial}`.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const validateField = (fieldName, value, currentDial = formData.countryDial) => {
    const fieldKey = fieldName === "localPhone" ? "phone" : fieldName;
    let errorMsg = "";

    if (!value.trim()) {
      const label = REQUIRED_FIELDS.find((f) => f.key === fieldKey)?.label || fieldName;
      errorMsg = `${label} is required`;
    } else {
      if (fieldName === "email") {
        const email = value.trim();
        if (/\\s/.test(email)) errorMsg = "⚠ Please enter a valid email address - You have entered a blank space";
        else if (!email.includes("@")) errorMsg = "⚠ Please enter a valid email address - You have missed out the @ symbol";
        else {
          const [username, ...rest] = email.split("@");
          const domainPart = rest.join("@");
          if (!username) errorMsg = "⚠ Please enter a valid email address - You have missed out the username";
          else if (!domainPart || rest.length > 1) {
            if (!domainPart) errorMsg = "⚠ Please enter a valid email address - You have missed out the domain";
            else errorMsg = "⚠ Please enter a valid email address";
          } else if (!domainPart.includes(".")) errorMsg = '⚠ Please enter a valid email address - You have missed out the a "."';
          else {
            const domainParts = domainPart.split(".");
            const tld = domainParts[domainParts.length - 1];
            if (!tld || tld.length < 2) errorMsg = "⚠ Please enter a valid email address - You have missed out the Top Leve Domain";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errorMsg = "⚠ Please enter a valid email address";
          }
        }
      } else if (fieldName === "localPhone") {
        const digits = value.trim();
        if (digits.startsWith("0")) {
          errorMsg = "Phone number cannot start with a zero";
        } else {
          const country = COUNTRY_CODES.find(c => c.dial === currentDial) || COUNTRY_CODES[0];
          if (digits.length < country.minLen) {
            errorMsg = `Phone number is too short (min ${country.minLen} digits)`;
          } else if (digits.length > country.maxLen) {
            errorMsg = `Phone number is too long (max ${country.maxLen} digits)`;
          }
        }
      }
    }
    
    return errorMsg;
  };

  const validateAllFields = (currentData) => {
    const newErrors = {};
    REQUIRED_FIELDS.forEach(({ key }) => {
      const fieldName = key === "phone" ? "localPhone" : key;
      const val = currentData[fieldName];
      const errorMsg = validateField(fieldName, val, currentData.countryDial);
      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setErrors(validateAllFields(newFormData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine dial code + local number into a single phone string
    const combinedPhone = `${formData.countryDial}${formData.localPhone.trim()}`;

    // Validate all required fields
    const newErrors = validateAllFields(formData);
    const missing = [];

    REQUIRED_FIELDS.forEach(({ key, label }) => {
      if (newErrors[key]) {
        const fieldName = key === "phone" ? "localPhone" : key;
        const val = formData[fieldName];
        if (!val.trim()) {
          missing.push(`${label} is required`);
        } else {
          missing.push(`Invalid ${label}`);
        }
      }
    });

    setErrors(newErrors);

    if (missing.length > 0) {
      setPopupErrors(missing);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
      return;
    }

    // Build payload — send combined phone
    const payload = {
      name:    formData.name.trim(),
      phone:   combinedPhone,
      email:   formData.email.trim(),
      message: formData.message.trim(),
    };

    // All valid — submit
    try {
      setIsSubmitting(true);
      const response = await submitContactUsForm(payload);
      
      if (response.data.success) {
        toast.success(response.data.message || "Message sent successfully!");
        setFormData({
          name: "",
          localPhone: "",
          countryDial: "+44",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Contact Form Error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.keys(validateAllFields(formData)).length === 0;

  return (
    <div
      className={`${styles.get_in_touch} px-8 py-10 pt-20 lg:px-14 lg:pt-28 2xl:px-20 2xl:py-[50px]`}
    >
      <div className={styles.get_in_touch_info}>
        <h4 className="text-2xl font-light 2xl:text-[40px] 2xl:leading-[40px]">
          Elevate Your Business with Avenue Impact
        </h4>
        {/* <p className="2xl:text-xl 2xl:font-light">
          Let us be your partner in elevating your business to new levels of
          success. Our team of knowledgeable experts will collaborate with you
          to comprehend your specific needs and aspirations, and furnish
          customised solutions that promote growth and achievement. Get in touch
          with us today to embark on this exciting journey towards a thriving
          business.
        </p> */}
      </div>

      <form className={styles.get_in_touch_input} onSubmit={handleSubmit} noValidate>
        {/* Validation Popup Banner */}
        {showPopup && (
          <div className={styles.error_popup}>
            <div className={styles.error_popup_inner}>
              <strong>Please fill in the following required fields:</strong>
              <ul className={styles.error_popup_list}>
                {popupErrors.map((msg) => (
                  <li key={msg}>• {msg}</li>
                ))}
              </ul>
              <button
                type="button"
                className={styles.error_popup_close}
                onClick={() => setShowPopup(false)}
                aria-label="Dismiss errors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Name */}
        <label htmlFor="get-in-touch-name">
          Your Name<span>*</span>
        </label>
        <input
          id="get-in-touch-name"
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "error-name" : undefined}
        />
        {errors.name && (
          <span id="error-name" className={styles.field_error}>
            ⚠ {errors.name}
          </span>
        )}

        {/* Phone */}
        <label htmlFor="get-in-touch-phone">
          Phone Number<span>*</span>
        </label>

        {/* Country code selector + local number input */}
        <div className={styles.phone_field_wrapper}>
          {/* Custom dropdown trigger */}
          <div ref={dropdownRef} className={styles.country_select_wrapper}>
            <button
              type="button"
              id="country-code-btn"
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              aria-label={`Country code: ${selectedCountry.dial}`}
              className={styles.country_trigger}
              onClick={() => { setDropdownOpen((o) => !o); setCountrySearch(""); }}
            >
              <span aria-hidden="true">{flagEmoji(selectedCountry.code)}</span>
              <span className={styles.dial_code}>{selectedCountry.dial}</span>
              <span className={styles.caret} aria-hidden="true">{dropdownOpen ? "▲" : "▼"}</span>
            </button>

            {dropdownOpen && (
              <div className={styles.country_dropdown} role="listbox" aria-label="Select country code">
                {/* Search */}
                <div className={styles.country_search_wrap}>
                  <input
                    type="text"
                    placeholder="Search country…"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    className={styles.country_search_input}
                    aria-label="Search country"
                    autoFocus
                  />
                </div>
                <ul className={styles.country_list}>
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((c) => (
                      <li
                        key={`${c.code}-${c.dial}`}
                        role="option"
                        aria-selected={formData.countryDial === c.dial && selectedCountry.code === c.code}
                        className={`${styles.country_option} ${
                          formData.countryDial === c.dial && selectedCountry.code === c.code
                            ? styles.country_option_active
                            : ""
                        }`}
                        onClick={() => {
                          const newFormData = { ...formData, countryDial: c.dial };
                          setFormData(newFormData);
                          setDropdownOpen(false);
                          setCountrySearch("");
                          setErrors(validateAllFields(newFormData));
                        }}
                      >
                        <span aria-hidden="true">{flagEmoji(c.code)}</span>
                        <span className={styles.country_name}>{c.name}</span>
                        <span className={styles.country_dial}>{c.dial}</span>
                      </li>
                    ))
                  ) : (
                    <li className={styles.country_no_result}>No results</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Digit-only phone input */}
          <input
            id="get-in-touch-phone"
            type="tel"
            name="localPhone"
            placeholder="Enter phone number"
            value={formData.localPhone}
            onChange={(e) => {
              // Allow only digits
              const digits = e.target.value.replace(/\D/g, "");
              const newFormData = { ...formData, localPhone: digits };
              setFormData(newFormData);
              setErrors(validateAllFields(newFormData));
            }}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "error-phone" : undefined}
            inputMode="numeric"
            maxLength={15}
            className={styles.phone_number_input}
          />
        </div>
        {errors.phone && (
          <span id="error-phone" className={styles.field_error}>
            ⚠ {errors.phone}
          </span>
        )}

        {/* Email */}
        <label htmlFor="get-in-touch-email">
          Email Address<span>*</span>
        </label>
        <input
          id="get-in-touch-email"
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "error-email" : undefined}
        />
        {errors.email && (
          <span id="error-email" className={styles.field_error}>
            {(() => {
              const parts = errors.email.split(" - ");
              if (parts.length === 2) {
                return <>{parts[0]} - <strong>{parts[1]}</strong></>;
              }
              return `⚠ ${errors.email}`;
            })()}
          </span>
        )}

        {/* Message */}
        <label htmlFor="get-in-touch-message">
          Comment or Message<span>*</span>
        </label>
        <input
          id="get-in-touch-message"
          type="text"
          name="message"
          placeholder="Write a message here"
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "error-message" : undefined}
        />
        {errors.message && (
          <span id="error-message" className={styles.field_error}>
            ⚠ {errors.message}
          </span>
        )}

        <Button
          className={`mt-8 lg:mt-11 ${isSubmitting || !isFormValid ? styles.btn_inactive : ""}`}
          type="submit"
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? "Sending..." : "Send a message"}
        </Button>
      </form>
    </div>
  );
};

export default GetInTouch;
