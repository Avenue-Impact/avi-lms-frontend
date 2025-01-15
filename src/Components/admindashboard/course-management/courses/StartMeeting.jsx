// // import { CommonButton } from "@/Components/ui/button";
// // import { useEffect } from "react";

// // import { ZoomMtg } from "@zoom/meetingsdk";
// // // import { useEffect } from "react";
// // // import _ from "lodash";
// // // window._ = _;

// // // loads WebAssembly assets
// // ZoomMtg.preLoadWasm();
// // ZoomMtg.prepareWebSDK();
// // ZoomMtg.setZoomJSLib("https://source.zoom.us/2.15.1/lib", "/av");
// // ZoomMtg.preLoadWasm();
// // ZoomMtg.prepareJssdk();
// // const StartMeeting = ({ setMeeting }) => {
// //   	document.getElementById("zmmtg-root").style.display = "block";
// //   useEffect(() => {
// //     const meetConfig = {
// //       apiKey: "YOUR_SDK_KEY",
// //       signature: "GENERATED_SIGNATURE", // Generate this server-side
// //       meetingNumber: "MEETING_ID",
// //       password: "MEETING_PASSWORD",
// //       userName: "YOUR_NAME",
// //       leaveUrl: "http://localhost:5173/",
// //       role: 0, // 0 for attendee, 1 for host
// //     };

// //     ZoomMtg.init({
// //       leaveUrl: meetConfig.leaveUrl,
// //       success: () => {
// //         ZoomMtg.join({
// //           signature: meetConfig.signature,
// //           apiKey: meetConfig.apiKey,
// //           meetingNumber: meetConfig.meetingNumber,
// //           userName: meetConfig.userName,
// //           password: meetConfig.password,
// //           success: (res) => {
// //             console.log("Join meeting success", res);
// //           },
// //           error: (err) => {
// //             console.error(err);
// //           },
// //         });
// //       },
// //       error: (err) => {
// //         console.error(err);
// //       },
// //     });
// //   }, []);

// //   return <div id="zmmtg-ro"></div>;
// // };

// // export default StartMeeting;
// import axios from "axios";
// import { ZoomMtg } from "@zoom/meetingsdk";
// import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();

// function StartMeeting() {
//   const client = ZoomMtgEmbedded.createClient();
//   const authEndpoint = ""; // http://localhost:4000
//   const sdkKey = import.meta.env.VITE_ZOOM_SDK_KEY;
//   const meetingNumber = "87627027762";
//   const passWord = "653297";
//   const role = 0;
//   const userName = "React";
//   const userEmail = "";
//   const registrantToken = "";
//   const zakToken = "";
//   const leaveUrl = "http://localhost:5174";

//   const getSignature = async () => {
//     try {
//       // const req = await fetch(authEndpoint, {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json"

//       //    },
//       //   body: JSON.stringify({
//       //     meetingNumber: meetingNumber,
//       //     role: role,
//       //   }),
//       // });
//       const req = await axios.get(
//         `https://avi-lms-backend.onrender.com/api/v1/admins/courses/6725c38cf96fa51479095277/cohorts/6725c3aff96fa5147909527f/live-session/start`,
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDg3MTliNDk5YTUxMjVhNzY0Yjc3MiIsImVtYWlsIjoib3hsZWU4MTQ5QGdtYWlsLmNvbSIsImlhdCI6MTczNDI0NDE2NiwiZXhwIjoxNzM0MzMwNTY2fQ.Y7O67OyGtZdF_Eg_Y-CY2dQGfksQuBnPS4Mfeq50Tjw",
//           },
//         },
//       );

//       console.log(req);
//       // const res = await req.json()
//       // const signature = res.signature as string;
//       startMeeting(req.data.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   async function startMeeting(signature) {
//     const meetingSDKElement = document.getElementById("meetingSDKElement");
//     try {
//       await client.init({
//         zoomAppRoot: meetingSDKElement,
//         language: "en-US",
//         patchJsMedia: true,
//         leaveOnPageUnload: true,
//       });
//       await client.join({
//         signature: signature,
//         sdkKey: sdkKey,
//         meetingNumber: meetingNumber,
//         password: passWord,
//         userName: userName,
//         userEmail: userEmail,
//         tk: registrantToken,
//         zak: zakToken,
//       });
//       console.log("joined successfully");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // function startMeeting(data) {
//   //   document.getElementById("zmmtg-root").style.display = "block";

//   //   ZoomMtg.init({
//   //     leaveUrl: leaveUrl,
//   //     patchJsMedia: true,
//   //     leaveOnPageUnload: true,
//   //     success: (success) => {
//   //       console.log(success);
//   //       // can this be async?
//   //       ZoomMtg.join({
//   //         signature: data.signature,
//   //         sdkKey: sdkKey,
//   //         meetingNumber: data.meeting_id,
//   //         passWord: data.password,
//   //         userName: userName,
//   //         userEmail: userEmail,
//   //         tk: registrantToken,
//   //         zak: zakToken,
//   //         success: (success) => {
//   //           console.log(success);
//   //         },
//   //         error: (error) => {
//   //           console.log(error);
//   //         },
//   //       });
//   //     },
//   //     error: (error) => {
//   //       console.log(error);
//   //     },
//   //   });
//   // }

//   return (
//     <div className="App">
//       <main>
//         <h1>Zoom Meeting SDK Sample React</h1>
//         <button >Join Meeting</button>
//       </main>
//     </div>
//   );
// }

// export default StartMeeting;
