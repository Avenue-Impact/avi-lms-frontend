// import uitoolkit from "@zoom/videosdk-ui-toolkit";
// import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";
// import "./zoom.css";

// const ZoomMeeting = () => {
//   let sessionContainer = null;
//   // set your auth endpoint here
//   // a sample is available here: https://github.com/zoom/videosdk-auth-endpoint-sample
//   const authEndpoint = ""; // http://localhost:4000
//   const config = {
//     videoSDKJWT: "",
//     sessionName: "test",
//     userName: "React",
//     sessionPasscode: "123",
//     features: ["video", "audio", "settings", "users", "chat", "share"],
//     options: { init: {}, audio: {}, video: {}, share: {} },
//     virtualBackground: {
//       allowVirtualBackground: true,
//       allowVirtualBackgroundUpload: true,
//       virtualBackgrounds: [
//         "https://images.unsplash.com/photo-1715490187538-30a365fa05bd?q=80&w=1945&auto=format&fit=crop",
//       ],
//     },
//   };
//   const role = 1;

//   function getVideoSDKJWT() {
//     sessionContainer = document.getElementById("sessionContainer");
//     document.getElementById("join-flow").style.display = "none";
//     fetch(authEndpoint, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ sessionName: config.sessionName, role: role }),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         if (data.signature) {
//           console.log(data.signature);
//           config.videoSDKJWT = data.signature;
//           joinSession();
//         } else {
//           console.log(data);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   function joinSession() {
//     console.log(config);
//     if (sessionContainer) {
//       uitoolkit.joinSession(sessionContainer, config);
//       sessionContainer && uitoolkit.onSessionClosed(sessionClosed);
//     }
//   }

//   const sessionClosed = () => {
//     console.log("session closed");
//     sessionContainer && uitoolkit.closeSession(sessionContainer);
//     document.getElementById("join-flow").style.display = "block";
//   };

//   return (
//     <div className="App">
//       <main>
//         <div id="join-flow">
//           <h1>Zoom Video SDK Sample React</h1>
//           <p>User interface offered by the Video SDK UI Toolkit</p>
//           <button onClick={getVideoSDKJWT}>Join Session</button>
//         </div>
//         <div id="sessionContainer"></div>
//       </main>
//     </div>
//   );
// };

// export default ZoomMeeting;
import { useEffect, useState } from "react";
import { ZoomMtg } from "@zoom/meetingsdk";
import axios from "axios";
import Cookies from "js-cookie";
const ZoomMeeting = () => {
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    // const { ZoomMtg } = import("@zoom/meetingsdk");
    // loads WebAssembly assets
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
    ZoomMtg.setZoomJSLib("https://source.zoom.us/3.10.0/lib");
  }, []);

  const getSignature = async () => {
    setloading(true);
    try {
      const res = await axios.get(
        `https://https://avi-lms-5478f16284c6.herokuapp.com/api/v1/admins/courses/6725c38cf96fa51479095277/cohorts/6725c3aff96fa5147909527f/live-session/start`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")} `,
          },
        },
      );
      console.log(res.data.status);
      if (res.data.status === "success") {
        console.log("success", res.data.data);
        setloading(false);
        setMeetingDetails(res.data.data);

        startMeeting(meetingDetails);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);

      console.log({ meetingDetails });
    }
  };

  // useEffect(() => {
  // 	getSignature();
  // }, []);

  function startMeeting(meetingDetailss) {
    document.getElementById("zmmtg-root").style.display = "block";
  const baseUrl = import.meta.env.VITE_USER_BASE_URL;

    ZoomMtg.init({
      leaveUrl: `${baseUrl}`,
      patchJsMedia: true,
      leaveOnPageUnload: true,
      success: (success) => {
        console.log(success, { meetingDetailss });
        // can this be async?
        meetingDetailss &&
          ZoomMtg.join({
            signature: meetingDetailss.signature,
            sdkKey: "wdbCZxGORbyesUjR_bqjFg",
            meetingNumber: meetingDetailss.meetingNumber,
            passWord: meetingDetailss.passWord,
            userName: "meetingDetails.userName",
            userEmail: "meetingDetails.userEmail",
            tk: "",
            zak: "",
            success: (success) => {
              console.log(success);
            },
            error: (error) => {
              console.log(error);
            },
          });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  if (loading) {
    return <p>loading....</p>;
  }

  return (
    <div>
      <button onClick={getSignature}>join</button>
      {/* <div id="zmmtg-root"></div> */}
    </div>
  );
};

export default ZoomMeeting;
