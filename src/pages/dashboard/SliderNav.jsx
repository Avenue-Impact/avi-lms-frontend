import React from "react";
// {
//     "status": "success",
//     "user": {
//         "id": "66c5019cb77de580f4274c96",
//         "firstname": "zainab",
//         "lastname": "wunmi",
//         "username": "lawal",
//         "email": "lawalzainabomowumi2021@gmail.com",
//         "status": "verified",
//         "wishlist": [],
//         "avatar": null,
//         "referral_code": "lawalPIM28AYSIG"
//     },
//     "message": "User verification successful, Please login to gain full access"
// }

// {
//     "status": "success",
//     "data": {
//         "user": {
//             "id": "66c5019cb77de580f4274c96",
//             "firstname": "zainab",
//             "lastname": "wunmi",
//             "username": "lawal",
//             "email": "lawalzainabomowumi2021@gmail.com",
//             "status": "verified",
//             "wishlist": [],
//             "avatar": null,
//             "referral_code": "lawalPIM28AYSIG"
//         },
//         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzUwMTljYjc3ZGU1ODBmNDI3NGM5NiIsImVtYWlsIjoibGF3YWx6YWluYWJvbW93dW1pMjAyMUBnbWFpbC5jb20iLCJpYXQiOjE3MjQxODc0ODUsImV4cCI6MTcyNDIwMTg4NX0.5QwTd79q7HST5aBb52_Zr0PCG6QRagPvRFgXeswuEs8"
//     },
//     "message": "Login successful"
// }

const SliderNav = () => {
  return (
    <div className="w-full overflow-hidden bg-emerald-100">
      <ul className="flex items-center justify-start gap-3 overflow-scroll *:px-8">
        <li className="after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full">
          home
        </li>
        <li>about</li>
        <li>figure</li>
        <li>queque</li>
        <li>hopig</li>
      </ul>
    </div>
  );
};

export default SliderNav;
