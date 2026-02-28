import { useEffect, useRef } from "react";
import { ZoomMtg } from "@zoom/meetingsdk";
import { useParams, useSearchParams } from "react-router-dom";
//import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";

const StartMeeting = ({
  meetingNumber,
  userName,
  signature,
  apiKey,
  password,
  zak,
  obfToken,
  leaveUrl,
  userEmail,
}) => {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const zoomInitialized = useRef(false);
  useEffect(() => {
    // Preload necessary files for the Zoom Web SDK
    if (zoomInitialized.current) return; // Prevent duplicate initialization
    zoomInitialized.current = true;
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();

    ZoomMtg.init({
      leaveUrl, // Redirect URL after leaving the meeting
      patchJsMedia: true,
      isSupportAV: true,
      success: () => {
        console.log("Zoom Meeting Initialized");
        ZoomMtg.join({
          meetingNumber,
          userName,
          userEmail,
          signature,
          sdkKey: apiKey,
          passWord: password,
          // zak: obfToken || zak, 
          success: () => {
            console.log("Joined meeting successfully");
          },
          error: (error) => {
            if (error?.message?.includes("empty profile")) {
              console.warn("Empty profile warning, but the meeting works.");
            } else {
              console.error("Error joining meeting:", error);
            }
          },
        });
      },
      error: (error) => {
        console.error("Error initializing Zoom Meeting:", error);
      },
    });
    return () => {
      // Remove Zoom's injected CSS when the component unmounts
      const zoomStyles = document.querySelectorAll(
        'link[href*="zoomus"], style[data-zm]',
      );
      zoomStyles.forEach((style) => style.remove());
      console.log("Zoom styles removed on unmount");
    };
  }, [
    meetingNumber,
    userName,
    signature,
    apiKey,
    password,
    zak,
    obfToken,
    courseId,
    queryString,
  ]);

  return <div id="zmmtg-root"></div>; // Zoom SDK will render the meeting UI here
};

export default StartMeeting;
