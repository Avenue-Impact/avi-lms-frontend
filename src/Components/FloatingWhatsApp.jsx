import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsApp = () => {
  const phoneNumber = "447305284671";
  const message = "Hi, I’d like to learn more about Avenue Impact courses.";
  const wwaUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={wwaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl focus:outline-none"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="h-9 w-9" />
    </a>
  );
};

export default FloatingWhatsApp;
