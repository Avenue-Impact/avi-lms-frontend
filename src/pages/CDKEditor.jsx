// // MyCKEditor.js
// import React from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// const MyCKEditor = ({ value, onChange }) => {
//   return (
//     <CKEditor
//       editor={ClassicEditor}
//       data={value}
//       onChange={(event, editor) => {
//         const data = editor.getData();
//         onChange(data); // Pass the data to the parent component
//       }}
//     />
//   );
// };

// export default MyCKEditor;


// <div className="mb-6">
//                   <p className="mb-2 text-[#475367] font-[500]">
//                     Course Includes: <span className='text-[#CC1747]'>*</span>
//                   </p>
//                   <MyCKEditor
//                     value={formData.courseIncludes}
//                     onChange={(data) => handleInputChange({ target: { name: 'courseIncludes', value: data } })}
//                   />
//                   <p className="text-right text-gray-500">{formData.courseIncludes.length}/100</p>
//               </div>