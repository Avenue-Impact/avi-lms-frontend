import { useState } from "react";
import styles from "./GetInTouch.module.css";
import Button from "../Button";
import { toast } from "react-hot-toast";
import { submitContactUsForm } from "../../services/api";

const REQUIRED_FIELDS = [
  { key: "name", label: "Your Name" },
  { key: "phone", label: "Phone Number" },
  { key: "email", label: "Email Address" },
  { key: "message", label: "Comment or Message" },
];

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [popupErrors, setPopupErrors] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear individual field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const isFormComplete = REQUIRED_FIELDS.every(
    (f) => formData[f.key].trim() !== "",
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields
    const newErrors = {};
    const missing = [];

    REQUIRED_FIELDS.forEach(({ key, label }) => {
      if (!formData[key].trim()) {
        newErrors[key] = `${label} is required`;
        missing.push(label);
      } else if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[key])) {
        newErrors[key] = "Please enter a valid email address";
        missing.push("Valid Email Address");
      }
    });

    setErrors(newErrors);

    if (missing.length > 0) {
      setPopupErrors(missing);
      setShowPopup(true);
      // Auto-hide popup after 5 seconds
      setTimeout(() => setShowPopup(false), 5000);
      return;
    }

    // All valid — submit
    try {
      setIsSubmitting(true);
      const response = await submitContactUsForm(formData);
      
      if (response.data.success) {
        toast.success(response.data.message || "Message sent successfully!");
        setFormData({
          name: "",
          phone: "",
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

  return (
    <div
      className={`${styles.get_in_touch} px-8 py-10 pt-20 lg:px-14 lg:pt-28 2xl:px-20 2xl:py-[100px]`}
    >
      <div className={styles.get_in_touch_info}>
        <h4 className="text-2xl font-light 2xl:text-[40px] 2xl:leading-[40px]">
          Elevate Your Business with Avenue Impact
        </h4>
        <p className="2xl:text-xl 2xl:font-light">
          Let us be your partner in elevating your business to new levels of
          success. Our team of knowledgeable experts will collaborate with you
          to comprehend your specific needs and aspirations, and furnish
          customised solutions that promote growth and achievement. Get in touch
          with us today to embark on this exciting journey towards a thriving
          business.
        </p>
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
        <input
          id="get-in-touch-phone"
          type="text"
          name="phone"
          placeholder="Enter Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "error-phone" : undefined}
        />
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
            ⚠ {errors.email}
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
          className={`mt-8 lg:mt-11 ${!isFormComplete || isSubmitting ? styles.btn_inactive : ""}`}
          type="submit"
          disabled={!isFormComplete || isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send a message"}
        </Button>
      </form>
    </div>
  );
};

export default GetInTouch;
