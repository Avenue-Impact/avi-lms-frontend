import React, { useEffect, useRef } from "react";

const GoogleAuthButton = ({ onCallback, text = "signin_with" }) => {
  const googleBtnRef = useRef(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  useEffect(() => {
    if (!clientId) {
      console.warn("VITE_GOOGLE_CLIENT_ID is not configured in .env");
      return;
    }

    const initGoogleGSI = () => {
      if (window.google?.accounts?.id && googleBtnRef.current) {
        // Use a slight timeout to ensure container layout has been computed
        setTimeout(() => {
          if (!googleBtnRef.current) return;
          const computedWidth = googleBtnRef.current.offsetWidth || 350;

          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response) => {
              onCallback(response.credential);
            },
          });

          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: "outline",
            size: "large",
            text: text,
            width: computedWidth,
            shape: "rectangular",
          });
        }, 50);
      }
    };

    let timer;
    if (window.google?.accounts?.id) {
      initGoogleGSI();
    } else {
      timer = setInterval(() => {
        if (window.google?.accounts?.id) {
          initGoogleGSI();
          clearInterval(timer);
        }
      }, 500);
    }

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initGoogleGSI();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (timer) clearInterval(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [clientId, onCallback, text]);

  if (!clientId) {
    return (
      <div className="w-full text-center text-xs text-red-500 py-2 border border-red-200 bg-red-50 rounded-lg animate-fade-in">
        Google Client ID is missing in frontend env
      </div>
    );
  }

  return (
    <div className="w-full mt-4">
      <div ref={googleBtnRef} className="w-full" />
    </div>
  );
};

export default GoogleAuthButton;
