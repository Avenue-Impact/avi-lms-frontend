// "use client";

// import { useEffect, useState } from 'react';
// import { PopupButton } from "react-calendly";

// export default function CalendlyModal({ onBookingComplete }) {
//   const [rootElement, setRootElement] = useState(null);

//   useEffect(() => {
//     // This code runs after the component mounts, ensuring document is available
//     setRootElement(document.getElementById("__next") || document.body);
    
//     // Add event listener for Calendly events
//     const handleCalendlyEvent = (e) => {
//       if (e.data.event === 'calendly.event_scheduled' && onBookingComplete) {
//         onBookingComplete();
//       }
//     };

//     window.addEventListener('message', handleCalendlyEvent);
//     return () => {
//       window.removeEventListener('message', handleCalendlyEvent);
//     };
//   }, [onBookingComplete]);

//   if (!rootElement) {
//     // Don't render the PopupButton until we have a root element
//     return null;
//   }

//   return (
//     <div className="flex justify-end items-center">
//       <PopupButton
//         url="https://calendly.com/mhatons/30min"
//         rootElement={rootElement}
//         text="Book a 30-min consultation"
//         className="px-4 py-2 bg-tertiary-color-900 text-white rounded hover:bg-tertiary-color-800 transition"
//       />
//     </div> https://tidycal.com/mhatons/30-minute-meeting
//   );
// }


//  Calender integration with google calendar
// export default function CalendlyModal({ onBookingComplete }) {
  
//   setTimeout(() => {
//     onBookingComplete();
//   }, 1000);

//   return (
//     <div className="flex justify-center">
//       <iframe
//         src="https://calendar.app.google/9AfiF9GBjE2VYXw66"
//         style={{ border: 0 }}
//         width="800"
//         height="600"
//         frameBorder="0"
//         scrolling="no"
//         title="Google Calendar"
//       ></iframe>
//     </div>
//   );
// }


// Calender integration with tidyCal
export default function TidyCalModal({ onBookingComplete, name, email }) {
  // Build the booking link with prefilled query params https://tidycal.com/avenueimpact/30-minute-meeting
  const bookingUrl = `https://tidycal.com/avenueimpact/30-minute-meeting?name=${encodeURIComponent(
    name || ""
  )}&email=${encodeURIComponent(email || "")}`;

  // Example simulation: trigger callback after 1s (replace with real logic if TidyCal adds webhooks/postMessage)
  setTimeout(() => {
    if (onBookingComplete) onBookingComplete();
  }, 1000);

  return (
    <div className="flex justify-center">
      <iframe
        src={bookingUrl}
        style={{ border: 0 }}
        width="800"
        height="1000"
        frameBorder="0"
        scrolling="no"
        title="Mhatons 30-min consultation"
      ></iframe>
    </div>
  );
}

