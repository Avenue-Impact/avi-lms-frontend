// import * as React from "react";
// import { Controller } from "react-hook-form";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/Components/ui/select";

// export function AdminSelectOption({ name, control }) {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => (
//         <Select
//           value={field.value}
//           onValueChange={field.onChange} // Correctly capture the selected value
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Select Admin Role" />
//           </SelectTrigger>
//           <SelectContent className="max-h-60 overflow-y-auto">
//             <SelectGroup>
//               <SelectItem value="Financial Admin">Financial Admin</SelectItem>
//               <SelectItem value="Content Manager">Content Manager</SelectItem>
//               <SelectItem value="Course Admin">Course Admin</SelectItem>
//               <SelectItem value="Super Admin">Super Admin</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       )}
//     />
//   );
// }

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
