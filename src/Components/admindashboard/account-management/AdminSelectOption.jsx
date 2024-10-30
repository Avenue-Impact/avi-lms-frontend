import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

export function AdminSelectOption() {
  return (
    <Select className='p-0'>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Cohort" />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectGroup>
          {/* <SelectLabel>Select Course</SelectLabel> */}
          {/* <SelectLabel>Select Course</SelectLabel> */}
          <SelectItem value="fAdmin">Financial Admin</SelectItem>
          <SelectItem value="cManager">Content Manager</SelectItem>
          <SelectItem value="cAdmin">Course Admin</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}